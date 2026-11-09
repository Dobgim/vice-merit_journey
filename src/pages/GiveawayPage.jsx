import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Card, Section } from '../components/ui/Primitives'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import NotFound from './NotFound'
import useNow from '../hooks/useNow'
import { useOpportunities } from '../hooks/useScholarships'
import { formatDate } from '../lib/deadline'
import { submitGiveawayEntry } from '../lib/supabase'
import { giveaway, isGiveawayOpen } from '../data/giveaway'

const DOCUMENTS = [
  'Valid passport',
  'Transcripts and certificates',
  'English test result or medium-of-instruction letter',
  'CV',
  '2 referees who have agreed',
  'Birth certificate',
  'Medical certificate',
  'Research proposal (PhD)',
]
const LEVELS = ["Bachelor's", "Master's", 'PhD']

const input =
  'w-full rounded-xl border border-navy-900/[0.14] bg-white px-4 text-base text-navy-950 placeholder:text-navy-400 transition-colors hover:border-navy-900/25 focus:outline-none focus:ring-2 focus:ring-gold-400/60'

function Field({ label, hint, error, required, children, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-semibold text-navy-900">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      {hint && <p className="-mt-0.5 mb-2 text-sm text-navy-500">{hint}</p>}
      {children}
      {error && <p className="mt-1.5 text-sm font-medium text-rose-600">{error.message}</p>}
    </div>
  )
}

/** Days, hours, minutes and seconds until entries close, ticking every second. */
function Countdown({ now }) {
  const left = Math.max(0, new Date(giveaway.closesAt) - now)
  const parts = [
    ['days', Math.floor(left / 86_400_000)],
    ['hours', Math.floor(left / 3_600_000) % 24],
    ['minutes', Math.floor(left / 60_000) % 60],
    ['seconds', Math.floor(left / 1000) % 60],
  ]
  return (
    <div className="mt-8">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-200">Entries close in</p>
      <div className="mt-3 flex gap-3" role="timer" aria-live="off">
        {parts.map(([label, n]) => (
          <div key={label} className="w-[4.5rem] rounded-2xl bg-white/[0.07] py-3 text-center ring-1 ring-white/10 sm:w-20">
            <div className="font-display text-3xl font-semibold tabular-nums text-white sm:text-4xl">
              {String(n).padStart(2, '0')}
            </div>
            <div className="mt-0.5 text-xs uppercase tracking-wider text-navy-100/60">{label}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-navy-100/70">{giveaway.closesLabel}</p>
    </div>
  )
}

/** Searchable list of open scholarships; the student ticks up to `giveaway.maxPicks`. */
function ScholarshipPicker({ picked, onChange, error }) {
  const all = useOpportunities('scholarships')
  const [q, setQ] = useState('')
  const options = useMemo(
    () =>
      all
        .filter((s) => s.deadline >= giveaway.pickFrom)
        .sort((a, b) => a.deadline.localeCompare(b.deadline)),
    [all]
  )
  const shown = options.filter((s) =>
    `${s.name} ${s.country ?? ''} ${s.focus ?? ''} ${s.level ?? ''}`.toLowerCase().includes(q.trim().toLowerCase())
  )
  const isPicked = (s) => picked.some((p) => p.slug === s.slug)
  const toggle = (s) => {
    if (isPicked(s)) onChange(picked.filter((p) => p.slug !== s.slug))
    else if (picked.length < giveaway.maxPicks) onChange([...picked, s])
  }

  return (
    <div>
      <div className="relative">
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
        <input
          type="search"
          name="scholarship-filter"
          autoComplete="off"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter the list, e.g. Germany, engineering, PhD"
          className={`${input} h-12 pl-11`}
        />
      </div>

      {picked.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {picked.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => toggle(s)}
              className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 py-1.5 pl-3.5 pr-2.5 text-sm font-medium text-white"
            >
              {s.name}
              <Icon name="close" className="h-3 w-3 text-gold-200" />
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 max-h-80 overflow-y-auto rounded-xl border border-navy-900/[0.1] bg-white">
        {shown.length === 0 && <p className="p-4 text-sm text-navy-500">No open scholarship matches that search.</p>}
        {shown.map((s) => {
          const on = isPicked(s)
          const full = !on && picked.length >= giveaway.maxPicks
          return (
            <div
              key={s.slug}
              className={`flex items-start gap-3 border-b border-navy-900/[0.06] px-4 py-3 last:border-0 ${on ? 'bg-gold-50' : ''} ${full ? 'opacity-50' : ''}`}
            >
              <input
                type="checkbox"
                checked={on}
                disabled={full}
                onChange={() => toggle(s)}
                aria-label={`Choose ${s.name}`}
                className="mt-1 h-4 w-4 shrink-0 accent-navy-900"
              />
              <div className="min-w-0 flex-1">
                <button type="button" onClick={() => !full && toggle(s)} className="text-left font-semibold leading-snug text-navy-950">
                  {s.flag} {s.name}
                </button>
                <p className="mt-0.5 text-sm text-navy-600">
                  {[s.level, s.funding, `closes ${formatDate(s.deadline)}`].filter(Boolean).join(' · ')}
                </p>
              </div>
              <Link
                to={`/scholarships/${s.slug}`}
                target="_blank"
                rel="noopener"
                className="shrink-0 text-sm font-semibold text-navy-700 underline-offset-4 hover:underline"
              >
                Details
              </Link>
            </div>
          )
        })}
      </div>
      <p className="mt-2 text-sm text-navy-500">
        {picked.length}/{giveaway.maxPicks} chosen · Only scholarships closing after {formatDate(giveaway.pickFrom)} are
        shown, so there is time to prepare. Browse them all on the{' '}
        <Link to="/scholarships" target="_blank" rel="noopener" className="font-semibold text-navy-900 underline underline-offset-4">
          scholarships page
        </Link>
        .
      </p>
      {error && <p className="mt-1.5 text-sm font-medium text-rose-600">{error}</p>}
    </div>
  )
}

export default function GiveawayPage() {
  const now = useNow(1000)
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState(null)
  const [picked, setPicked] = useState([])
  const [pickError, setPickError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { documents: [] } })

  if (!isGiveawayOpen(now)) return <NotFound />

  const onSubmit = async (values) => {
    if (!picked.length) {
      setPickError('Choose at least one scholarship you would like to apply for.')
      return
    }
    setServerError(null)
    const result = await submitGiveawayEntry({ ...values, documents: values.documents || [], scholarships: picked })
    if (!result.ok) {
      setServerError('We could not send your entry just now. Please try again, or send us your details on WhatsApp.')
      return
    }
    setSent(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const checkPicks = () => setPickError(picked.length ? null : 'Choose at least one scholarship you would like to apply for.')

  return (
    <>
      <Seo
        title="Free Scholarship Application Support for 5 Students"
        description={`Merit Leaders will guide ${giveaway.places} students through a full scholarship application for free. Open to all nationalities. Entries close ${giveaway.closesLabel}.`}
      />

      <PageHeader
        crumb="Free application support"
        eyebrow="First-ever giveaway"
        title={`We'll guide ${giveaway.places} students through a scholarship application,`}
        accent="free."
        lede="From choosing the right scholarship to the moment you press submit. Open to students of every nationality applying for a Bachelor's, Master's or PhD."
      >
        <Countdown now={now} />
      </PageHeader>

      <Section tone="light">
        <div className="container grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <aside className="space-y-6">
            <Card hover={false} className="p-6">
              <h2 className="font-display text-xl font-semibold text-navy-950">What you get</h2>
              <ul className="mt-3 space-y-2 text-base leading-relaxed text-navy-700">
                <li>The right scholarships for your profile</li>
                <li>A full check of your documents</li>
                <li>Honest feedback on your motivation letter and CV</li>
                <li>Step-by-step guidance until you submit</li>
              </ul>
            </Card>
            <Card hover={false} className="p-6">
              <h2 className="font-display text-xl font-semibold text-navy-950">How it works</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-navy-700">
                <li>Follow Merit Leaders on Facebook, LinkedIn or WhatsApp.</li>
                <li>Comment "I'M READY" on our post.</li>
                <li>Fill in this form and choose up to {giveaway.maxPicks} scholarships.</li>
                <li>
                  On {giveaway.drawLabel} we draw {giveaway.places} names at random from eligible entries and share the
                  video of the draw.
                </li>
              </ol>
            </Card>
            <p className="rounded-2xl bg-navy-950 p-5 text-base leading-relaxed text-white">
              <strong className="text-gold-200">We never ask for money</strong> for this offer. You submit your own
              application; we guide and review.
            </p>
          </aside>

          <Card hover={false} className="p-6 sm:p-9">
            {sent ? (
              <div className="flex min-h-[24rem] flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 ring-1 ring-emerald-200">
                  <Icon name="checkCircle" className="h-8 w-8 text-emerald-600" />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold text-navy-950">You're in the draw!</h2>
                <p className="mt-3 max-w-md text-base leading-relaxed text-navy-700">
                  Thank you. We draw the {giveaway.places} winners on {giveaway.drawLabel} and contact them on WhatsApp.
                  In the meantime, keep your documents ready and follow Merit Leaders for new scholarships.
                </p>
                <Button to="/scholarships" variant="primary" size="md" icon="arrowRight" className="mt-7">
                  Browse scholarships
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit, checkPicks)} noValidate className="grid gap-5 sm:grid-cols-2">
                <h2 className="font-display text-2xl font-semibold text-navy-950 sm:col-span-2">Enter the draw</h2>

                <Field label="Full name" required error={errors.fullName}>
                  <input className={`${input} h-12`} autoComplete="name" {...register('fullName', { required: 'Please tell us your name' })} />
                </Field>
                <Field label="Email" required error={errors.email}>
                  <input
                    type="email"
                    className={`${input} h-12`}
                    autoComplete="email"
                    {...register('email', {
                      required: 'We need an email to contact you',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Please check that email address' },
                    })}
                  />
                </Field>
                <Field label="WhatsApp number" hint="With country code" required error={errors.phone}>
                  <input
                    type="tel"
                    placeholder="+234 803 000 0000"
                    className={`${input} h-12`}
                    autoComplete="tel"
                    {...register('phone', {
                      required: 'We contact winners on WhatsApp',
                      pattern: { value: /^\+[\d\s()-]{7,}$/, message: 'Start with + and your country code' },
                    })}
                  />
                </Field>
                <Field label="Your name where you follow us" hint="Facebook, LinkedIn or WhatsApp" required error={errors.followName}>
                  <input className={`${input} h-12`} {...register('followName', { required: 'So we can check you follow Merit Leaders' })} />
                </Field>
                <Field label="Nationality" required error={errors.nationality}>
                  <input className={`${input} h-12`} {...register('nationality', { required: 'Many scholarships depend on nationality' })} />
                </Field>
                <Field label="Level you want to apply for" required error={errors.level}>
                  <select className={`${input} h-12`} defaultValue="" {...register('level', { required: 'Choose a level' })}>
                    <option value="" disabled>
                      Select level
                    </option>
                    {LEVELS.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Field of study" required error={errors.field}>
                  <input placeholder="e.g. Civil engineering" className={`${input} h-12`} {...register('field', { required: 'Tell us your field' })} />
                </Field>
                <Field label="Last completed qualification and grade" required error={errors.qualification}>
                  <input
                    placeholder="e.g. BSc Biology, 2:1 or GPA 3.4/4"
                    className={`${input} h-12`}
                    {...register('qualification', { required: 'This helps us match scholarships' })}
                  />
                </Field>

                <Field label="Documents you have ready now" className="sm:col-span-2">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {DOCUMENTS.map((d) => (
                      <label key={d} className="flex items-start gap-2.5 text-base text-navy-800">
                        <input type="checkbox" value={d} className="mt-1 h-4 w-4 accent-navy-900" {...register('documents')} />
                        {d}
                      </label>
                    ))}
                  </div>
                </Field>

                <Field
                  label={`Scholarships you'd like to apply for (up to ${giveaway.maxPicks})`}
                  hint="Pick the ones that fit your level, field and nationality. Open “Details” to check before you choose."
                  required
                  className="sm:col-span-2"
                >
                  <ScholarshipPicker
                    picked={picked}
                    onChange={(p) => {
                      setPicked(p)
                      if (p.length) setPickError(null)
                    }}
                    error={pickError}
                  />
                </Field>

                <Field label="In 2–3 sentences, why do you want to study abroad?" required error={errors.why} className="sm:col-span-2">
                  <textarea
                    rows={4}
                    className={`${input} resize-none py-3`}
                    {...register('why', {
                      required: 'A few sentences is enough',
                      minLength: { value: 40, message: 'Please add a little more detail' },
                    })}
                  />
                </Field>

                <label className="flex items-start gap-3 text-base leading-relaxed text-navy-800 sm:col-span-2">
                  <input type="checkbox" className="mt-1.5 h-4 w-4 shrink-0 accent-navy-900" {...register('agree', { required: true })} />
                  <span>
                    If selected, I will submit my own application, give honest information, and share a short testimonial
                    about my experience with Merit Leaders.
                    {errors.agree && <span className="mt-1 block text-sm font-medium text-rose-600">Please tick to enter.</span>}
                  </span>
                </label>

                {serverError && (
                  <p className="rounded-xl bg-rose-50 p-3.5 text-sm text-rose-700 ring-1 ring-rose-200 sm:col-span-2">{serverError}</p>
                )}

                <div className="sm:col-span-2">
                  <Button as="button" type="submit" variant="gold" size="lg" icon={isSubmitting ? undefined : 'arrowRight'} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Enter the draw'}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </Section>
    </>
  )
}
