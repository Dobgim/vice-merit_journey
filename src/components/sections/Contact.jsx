import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { company, countryOptions, studyLevels } from '../../data/site'
import { submitConsultation } from '../../lib/supabase'
import { Aurora, Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { EASE } from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
  'Hi Merit Ledger — I would like to book a scholarship consultation.'
)}`

/* --------------------------------------------------------------- Field shell */

const fieldBase =
  'w-full rounded-xl border bg-white px-4 text-[0.95rem] text-navy-950 placeholder:text-navy-400 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gold-400/60'

function Field({ label, error, required, children, className = '' }) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[0.82rem] font-semibold text-navy-800">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] font-medium text-rose-600"
          >
            <Icon name="close" className="h-3 w-3" />
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

const borderFor = (error) =>
  error ? 'border-rose-300' : 'border-navy-900/[0.12] hover:border-navy-900/25'

/* ------------------------------------------------------------------ Section */

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      studyLevel: '',
      country: '',
      message: '',
    },
  })

  const onSubmit = async (values) => {
    setServerError(null)
    const result = await submitConsultation(values)

    if (!result.ok) {
      setServerError('We could not send that just now. Please email us directly and we will reply today.')
      return
    }

    setSent(true)
    reset()
  }

  return (
    <Section id="contact" tone="dark" className="overflow-hidden">
      <Aurora />

      <div className="container relative">
        <SectionHeading
          tone="dark"
          eyebrow="Book a consultation"
          title="Twenty minutes that can change"
          accent="your next five years"
          lede="Tell us where you are and where you want to study. An advisor replies within one working day with an honest first read on your chances."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          {/* ------------------------------------------------------- Form */}
          <Reveal>
            <div className="rounded-3xl border border-white/[0.09] bg-white/[0.04] p-6 backdrop-blur-sm sm:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.5, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.15 }}
                      className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/15 ring-1 ring-emerald-300/30"
                    >
                      <Icon name="checkCircle" className="h-8 w-8 text-emerald-300" />
                    </motion.span>

                    <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                      Request received
                    </h3>
                    <p className="mt-3 max-w-sm text-[0.95rem] leading-[1.7] text-navy-100/70">
                      An advisor will email you within one working day to arrange your free
                      discovery call. Check your spam folder if you do not see us.
                    </p>

                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="mt-7 text-[0.88rem] font-semibold text-gold-300 underline-offset-4 hover:underline"
                    >
                      Send another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    noValidate
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <Field label="Full name" required error={errors.fullName}>
                      <input
                        type="text"
                        placeholder="Amara Okonkwo"
                        autoComplete="name"
                        className={`${fieldBase} ${borderFor(errors.fullName)} h-12`}
                        {...register('fullName', {
                          required: { value: true, message: 'Please tell us your name' },
                          minLength: { value: 2, message: 'That name looks too short' },
                        })}
                      />
                    </Field>

                    <Field label="Email address" required error={errors.email}>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={`${fieldBase} ${borderFor(errors.email)} h-12`}
                        {...register('email', {
                          required: { value: true, message: 'We need an email to reply' },
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                            message: 'Please check that email address',
                          },
                        })}
                      />
                    </Field>

                    <Field label="Phone / WhatsApp" error={errors.phone}>
                      <input
                        type="tel"
                        placeholder="+44 7700 900123"
                        autoComplete="tel"
                        className={`${fieldBase} ${borderFor(errors.phone)} h-12`}
                        {...register('phone', {
                          pattern: {
                            value: /^[+\d][\d\s()-]{6,}$/,
                            message: 'Use digits, spaces and + only',
                          },
                        })}
                      />
                    </Field>

                    <Field label="Study level" required error={errors.studyLevel}>
                      <div className="relative">
                        <select
                          className={`${fieldBase} ${borderFor(errors.studyLevel)} h-12 appearance-none pr-10`}
                          defaultValue=""
                          {...register('studyLevel', {
                            required: { value: true, message: 'Select your study level' },
                          })}
                        >
                          <option value="" disabled>
                            Select level
                          </option>
                          {studyLevels.map((l) => (
                            <option key={l} value={l}>
                              {l}
                            </option>
                          ))}
                        </select>
                        <Icon
                          name="arrowRight"
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-navy-400"
                        />
                      </div>
                    </Field>

                    <Field label="Country of interest" required error={errors.country} className="sm:col-span-2">
                      <div className="relative">
                        <select
                          className={`${fieldBase} ${borderFor(errors.country)} h-12 appearance-none pr-10`}
                          defaultValue=""
                          {...register('country', {
                            required: { value: true, message: 'Choose a destination (or “Undecided”)' },
                          })}
                        >
                          <option value="" disabled>
                            Select a destination
                          </option>
                          {countryOptions.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                        <Icon
                          name="arrowRight"
                          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 rotate-90 text-navy-400"
                        />
                      </div>
                    </Field>

                    <Field label="Tell us about your goals" required error={errors.message} className="sm:col-span-2">
                      <textarea
                        rows={5}
                        placeholder="Your current qualification, intended field of study, target intake, and anything you are unsure about."
                        className={`${fieldBase} ${borderFor(errors.message)} resize-none py-3.5`}
                        {...register('message', {
                          required: { value: true, message: 'A sentence or two is enough' },
                          minLength: { value: 20, message: 'Please add a little more detail' },
                        })}
                      />
                    </Field>

                    {serverError && (
                      <p className="sm:col-span-2 rounded-xl bg-rose-500/10 p-3.5 text-[0.85rem] text-rose-200 ring-1 ring-rose-400/25">
                        {serverError}
                      </p>
                    )}

                    <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <Button
                        as="button"
                        type="submit"
                        variant="gold"
                        size="lg"
                        icon={isSubmitting ? undefined : 'arrowRight'}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Sending…' : 'Request my consultation'}
                      </Button>
                      <p className="text-[0.78rem] leading-relaxed text-navy-100/50">
                        No fee for the discovery call.
                        <br className="hidden sm:block" /> Your details stay confidential.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* --------------------------------------------- Direct contact rail */}
          <Reveal delay={0.15} direction="left">
            <div className="flex h-full flex-col gap-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl bg-[#1FA855] p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Icon name="whatsapp" className="h-6 w-6 text-white" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white">Chat on WhatsApp</div>
                  <div className="text-[0.82rem] text-white/75">Typical reply in under 2 hours</div>
                </div>
                <Icon
                  name="arrowUpRight"
                  className="h-4 w-4 shrink-0 text-white/70 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              {[
                {
                  icon: 'mail',
                  label: 'Email an advisor',
                  value: company.email,
                  href: `mailto:${company.email}`,
                  hint: 'We reply within one working day',
                },
                {
                  icon: 'phone',
                  label: 'Call the office',
                  value: company.phone,
                  href: `tel:${company.phone.replace(/[^\d+]/g, '')}`,
                  hint: company.hours,
                },
                {
                  icon: 'mapPin',
                  label: 'Visit us',
                  value: company.address,
                  href: '#contact',
                  hint: 'By appointment only',
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.04] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300/30 hover:bg-white/[0.07]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-gold-200 ring-1 ring-white/10">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[0.78rem] uppercase tracking-wider text-navy-100/45">
                      {c.label}
                    </div>
                    <div className="mt-1 break-words font-semibold text-white">{c.value}</div>
                    <div className="mt-0.5 text-[0.78rem] text-navy-100/50">{c.hint}</div>
                  </div>
                </a>
              ))}

              <div className="mt-auto rounded-2xl border border-gold-300/20 bg-gold-400/[0.07] p-5">
                <div className="flex items-center gap-2.5">
                  <Icon name="calendar" className="h-4 w-4 text-gold-300" />
                  <span className="text-[0.78rem] font-semibold uppercase tracking-wider text-gold-200">
                    Next intake deadline
                  </span>
                </div>
                <p className="mt-2.5 text-[0.92rem] leading-[1.7] text-navy-100/75">
                  Most 2027 awards close between{' '}
                  <span className="font-semibold text-white">November and February</span>. Advisor
                  slots for this cycle are limited — book early.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
