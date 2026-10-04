import { forwardRef, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import { kinds } from '../../data/opportunities'
import { useOpportunities } from '../../hooks/useScholarships'
import { byDeadline, deadlineStatus, formatDate } from '../../lib/deadline'
import { Badge, Card, Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { EASE } from '../ui/Reveal'
import Button from '../ui/Button'
import DeadlineChip from '../ui/DeadlineChip'
import Flyer from '../ui/Flyer'
import Flag from '../ui/Flag'
import Icon from '../ui/Icon'

const SORTS = {
  deadline: { label: 'Deadline (soonest)', fn: byDeadline },
  name: { label: 'Name (A–Z)', fn: (a, b) => a.name.localeCompare(b.name) },
  verified: {
    label: 'Recently verified',
    fn: (a, b) => String(b.verified ?? '').localeCompare(String(a.verified ?? '')),
  },
}

function matchesQuery(item, q) {
  if (!q) return true
  const haystack = [item.name, item.org, item.country, item.level, item.fields, item.category, ...(item.tags ?? [])]
    .join(' ')
    .toLowerCase()
  return q
    .toLowerCase()
    .split(/\s+/)
    .every((word) => haystack.includes(word))
}

/** Gold for the strongest funding, neutral for everything else. */
function fundingBadge(funding = '') {
  if (funding === 'Partially Funded') return { variant: 'neutral', icon: 'half', text: 'Partial' }
  if (/fully|paid|seed|prize|grant/i.test(funding)) return { variant: 'gold', icon: 'star', text: funding }
  return { variant: 'neutral', icon: 'wallet', text: funding }
}

/* -------------------------------------------------------------- Award card */

// forwardRef is required: AnimatePresence `popLayout` measures each child.
export const ScholarshipCard = forwardRef(function ScholarshipCard({ item, kind = 'scholarships' }, ref) {
  const config = kinds[kind]
  const badge = fundingBadge(item.funding)
  const closed = deadlineStatus(item.deadline).state === 'closed'
  const href = `${config.path}/${item.slug}`

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="h-full"
    >
      <Card className={`group flex h-full flex-col ${closed ? 'opacity-80' : ''}`}>
        <div className="overflow-hidden">
          <Flyer
            item={item}
            kind={kind}
            label={config.flyerLabel}
            className="transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <Flag emoji={item.flag} className="h-5 w-7" emojiClassName="text-2xl" />
              <div className="min-w-0">
                <div className="text-[0.78rem] font-semibold text-navy-800">{item.country}</div>
                <div className="truncate text-[0.72rem] text-navy-500">{item.org}</div>
              </div>
            </div>

            <Badge variant={badge.variant} icon={badge.icon} className="shrink-0">
              {badge.text}
            </Badge>
          </div>

          <h3 className="mt-5 font-display text-[1.22rem] font-semibold leading-snug text-navy-950 transition-colors duration-300 group-hover:text-navy-800">
            {/* Stretched link: the whole card opens the detail page */}
            <Link to={href} className="after:absolute after:inset-0 after:content-['']">
              {item.name}
            </Link>
          </h3>

          <p className="mt-3 flex-1 text-[0.9rem] leading-[1.7] text-navy-700/80">{item.summary}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            <Badge variant="outline">{item.level}</Badge>
            {item.tags?.map((t) => (
              <Badge key={t} variant="outline">
                {t}
              </Badge>
            ))}
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-navy-900/[0.07] pt-5 text-sm">
            <div>
              <dt className="text-[0.7rem] uppercase tracking-wider text-navy-500">Value</dt>
              <dd className="mt-1 font-semibold text-navy-900">{item.amount}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] uppercase tracking-wider text-navy-500">Deadline</dt>
              <dd className="mt-1 inline-flex items-center gap-1.5 font-semibold text-navy-900">
                <Icon name="calendar" className="h-3.5 w-3.5" />
                {item.deadline ? formatDate(item.deadline) : 'Rolling'}
              </dd>
            </div>
          </dl>

          <div className="mt-4">
            <DeadlineChip deadline={item.deadline} />
          </div>

          <span className="mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-navy-900/15 bg-white/70 text-sm font-semibold text-navy-900 transition-colors duration-300 group-hover:border-navy-900/35 group-hover:bg-navy-900 group-hover:text-white">
            {closed ? 'See details & next cycle' : 'View full details'}
            <Icon
              name="arrowRight"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Card>
    </motion.div>
  )
})

/* --------------------------------------------------------------- Filter UI */

function FilterRail({ filters, filter, onChange }) {
  return (
    <div className="mask-fade-x -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
      {filters.map(({ label: f }) => {
        const active = filter === f
        return (
          <button
            key={f}
            type="button"
            onClick={() => onChange(f)}
            aria-pressed={active}
            className={`relative isolate shrink-0 rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors duration-300 ${
              active ? 'text-white' : 'text-navy-700 hover:text-navy-950'
            }`}
          >
            {active && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-navy-900 shadow-soft"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {!active && (
              <span className="absolute inset-0 -z-10 rounded-full border border-navy-900/10 bg-white" />
            )}
            {f}
          </button>
        )
      })}
    </div>
  )
}

const controlBase =
  'h-12 w-full rounded-xl border border-navy-900/[0.12] bg-white text-[0.92rem] text-navy-950 transition-colors duration-300 hover:border-navy-900/25 focus:outline-none focus:ring-2 focus:ring-gold-400/60'

/* ------------------------------------------------------------------ Section */

/**
 * Searchable listing for one opportunity type (`kind`): search, country,
 * sort and filter pills, all mirrored in the URL so a filtered view can be
 * bookmarked or shared.
 */
export default function Scholarships({ kind = 'scholarships' }) {
  const config = kinds[kind]
  const items = useOpportunities(kind)
  const [params, setParams] = useSearchParams()

  const filterLabels = config.filters.map((f) => f.label)
  const filter = filterLabels.includes(params.get('type')) ? params.get('type') : 'All'
  const query = params.get('q') ?? ''
  const country = params.get('country') ?? 'All'
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'deadline'

  const setParam = (key, value, fallback) => {
    const next = new URLSearchParams(params)
    if (!value || value === fallback) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  const countries = useMemo(
    () => ['All', ...[...new Set(items.map((i) => i.country))].sort()],
    [items]
  )

  const visible = useMemo(() => {
    const test = config.filters.find((f) => f.label === filter).test
    const list = items
      .filter(test)
      .filter((i) => matchesQuery(i, query.trim()))
      .filter((i) => country === 'All' || i.country === country)
    return [...list].sort(SORTS[sort].fn)
  }, [items, config, filter, query, country, sort])

  const openCount = items.filter((i) => deadlineStatus(i.deadline).state !== 'closed').length
  const hasRefinements = filter !== 'All' || query || country !== 'All'

  return (
    <Section id={kind} tone="light">
      <div className="container">
        <SectionHeading
          eyebrow={config.eyebrow}
          title={config.heading[0]}
          accent={config.heading[1]}
          lede={config.lede}
        />

        <Reveal delay={0.1} className="mt-12">
          <div className="grid gap-3 rounded-2xl border border-navy-900/[0.07] bg-white p-3 shadow-soft sm:grid-cols-[1fr_auto_auto]">
            <label className="relative block">
              <span className="sr-only">Search {config.plural}</span>
              <Icon
                name="search"
                className="pointer-events-none absolute left-4 top-1/2 h-[1.05rem] w-[1.05rem] -translate-y-1/2 text-navy-400"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setParam('q', e.target.value, '')}
                placeholder={`Search ${config.plural}, organisations, countries…`}
                className={`${controlBase} pl-11 pr-4 placeholder:text-navy-400`}
              />
            </label>

            <label className="block">
              <span className="sr-only">Filter by country</span>
              <select
                value={country}
                onChange={(e) => setParam('country', e.target.value, 'All')}
                className={`${controlBase} px-4 sm:w-52`}
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c === 'All' ? 'All locations' : c}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setParam('sort', e.target.value, 'deadline')}
                className={`${controlBase} px-4 sm:w-52`}
              >
                {Object.entries(SORTS).map(([key, s]) => (
                  <option key={key} value={key}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-6">
          <FilterRail filters={config.filters} filter={filter} onChange={(f) => setParam('type', f, 'All')} />
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[0.85rem] text-navy-600">
          <p aria-live="polite">
            Showing <span className="font-semibold text-navy-900">{visible.length}</span> of {items.length}{' '}
            {config.plural} · {openCount} currently open
          </p>
          {hasRefinements && (
            <button
              type="button"
              onClick={() => setParams(new URLSearchParams(), { replace: true, preventScrollReset: true })}
              className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-navy-950"
            >
              <Icon name="close" className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <ScholarshipCard key={item.slug} item={item} kind={kind} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-14 text-center text-navy-600">
            Nothing matches that search right now — ask an advisor about upcoming cycles.
          </p>
        )}

        <Reveal delay={0.1} className="mt-14">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-navy-900/[0.07] bg-white p-8 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-xl font-semibold text-navy-950">
                Not sure which of these you can win?
              </h3>
              <p className="mt-1.5 text-[0.93rem] text-navy-700/80">
                Tell us your profile and we will tell you where you are genuinely competitive.
              </p>
            </div>
            <Button to="/book-consultation" size="md" icon="arrowRight" className="shrink-0">
              Request my shortlist
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
