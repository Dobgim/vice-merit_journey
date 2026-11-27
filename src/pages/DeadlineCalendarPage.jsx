import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import Button from '../components/ui/Button'
import DeadlineChip from '../components/ui/DeadlineChip'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import { useOpportunities } from '../hooks/useScholarships'
import { parseDate } from '../lib/deadline'
import { LEVELS, matchesLevel } from '../lib/eligibility'
import { byMonth, calendarSeo, isFullyFunded } from '../lib/deadlineCalendar'

const LEVEL_CHOICES = [{ slug: 'all', short: 'All levels' }, ...LEVELS.filter((l) => ['undergraduate', 'masters', 'phd'].includes(l.slug))]

const DAY = new Intl.DateTimeFormat('en-GB', { day: 'numeric' })
const WEEKDAY = new Intl.DateTimeFormat('en-GB', { weekday: 'short' })
const SHORT_MONTH = new Intl.DateTimeFormat('en-GB', { month: 'short' })

/** One scholarship in the calendar: its date on the left, what it is on the right. */
function Row({ item }) {
  const date = parseDate(item.deadline)
  return (
    <li className="relative flex gap-4 rounded-2xl border border-navy-900/[0.07] bg-white p-4 shadow-soft transition-colors hover:border-navy-900/25 sm:gap-5 sm:p-5">
      <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-navy-950 py-2 text-white sm:w-16">
        <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-gold-300">{SHORT_MONTH.format(date)}</span>
        <span className="font-display text-2xl font-semibold leading-none tabular-nums">{DAY.format(date)}</span>
        <span className="mt-0.5 text-[0.7rem] text-navy-100/70">{WEEKDAY.format(date)}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-lg font-semibold leading-snug text-navy-950">
          <Link to={`/scholarships/${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
            {item.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-navy-700">
          {item.flag ? `${item.flag} ` : ''}
          {item.country}
          {item.level ? ` · ${item.level}` : ''}
        </p>
        <DeadlineChip deadline={item.deadline} className="mt-2.5" />
      </div>
    </li>
  )
}

/**
 * Every open fully funded scholarship, month by month by deadline, so students
 * can plan the year: filter by level and jump to a month.
 */
export default function DeadlineCalendarPage() {
  const scholarships = useOpportunities('scholarships')
  const [level, setLevel] = useState('all')

  const all = useMemo(() => scholarships.filter(isFullyFunded), [scholarships])
  const months = useMemo(() => {
    const shown = level === 'all' ? all : all.filter((i) => matchesLevel(i, LEVELS.find((l) => l.slug === level)))
    return byMonth(shown)
  }, [all, level])

  return (
    <>
      <Seo title={calendarSeo.title} description={calendarSeo.description} />

      <PageHeader
        crumbs={[{ label: 'Scholarships', to: '/scholarships' }]}
        crumb="Deadline calendar"
        eyebrow="Plan your applications"
        title="Fully funded scholarships"
        accent="2027 deadline calendar."
        lede="Every fully funded scholarship open to international students right now, month by month by its closing date. Each one covers tuition and living costs, and every deadline is checked on the funder’s own website."
      >
        <p className="mb-6 inline-flex items-baseline gap-2.5 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20 backdrop-blur">
          <span className="font-display text-3xl font-semibold leading-none text-gold-300 tabular-nums">{all.length}</span>
          <span className="text-base font-semibold text-white">fully funded scholarships open now</span>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#calendar" variant="gold" size="lg" icon="arrowRight">
            See the calendar
          </Button>
          <Button to="/eligibility" variant="ghostLight" size="lg" icon="arrowRight">
            Check what I’m eligible for
          </Button>
        </div>
      </PageHeader>

      <Section tone="light" id="calendar" className="scroll-mt-24">
        <div className="container max-w-4xl">
          <div className="mask-fade-x -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {LEVEL_CHOICES.map((l) => (
              <button
                key={l.slug}
                type="button"
                onClick={() => setLevel(l.slug)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  level === l.slug ? 'bg-navy-900 text-white' : 'border border-navy-900/10 bg-white text-navy-700 hover:border-navy-900/30'
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>

          {months.length > 0 && (
            <nav aria-label="Jump to a month" className="mb-12 flex flex-wrap justify-center gap-2">
              {months.map((m) => (
                <a
                  key={m.key}
                  href={`#month-${m.key}`}
                  className="rounded-full bg-gold-300/25 px-3 py-1.5 text-sm font-semibold text-navy-900 ring-1 ring-gold-400/40 transition-colors hover:bg-gold-300/50"
                >
                  {m.label} <span className="text-navy-500">({m.items.length})</span>
                </a>
              ))}
            </nav>
          )}

          {months.length === 0 && (
            <p className="rounded-2xl border border-navy-900/[0.07] bg-white p-8 text-center text-base text-navy-700 shadow-soft">
              No fully funded scholarships are open at this level right now. New ones are added every day.
            </p>
          )}

          {months.map((m) => (
            <section key={m.key} id={`month-${m.key}`} className="mb-14 scroll-mt-24">
              <h2 className="mb-5 font-display text-2xl font-semibold text-navy-950">
                {m.label} <span className="text-navy-400">({m.items.length})</span>
              </h2>
              <ol className="grid gap-3">
                {m.items.map((item) => (
                  <Row key={item.slug} item={item} />
                ))}
              </ol>
            </section>
          ))}

          <div className="mt-6 flex flex-col items-center gap-4 rounded-2xl bg-navy-950 p-8 text-center text-white sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-2xl font-semibold">Want help with an application?</h2>
              <p className="mt-2 text-base text-navy-100/80">We help students choose the right scholarships and prepare strong applications.</p>
            </div>
            <Button to="/book-consultation" variant="gold" size="lg" icon="arrowRight">
              Book a free consultation
            </Button>
          </div>
        </div>
      </Section>

      <WhatsAppGroup />
    </>
  )
}
