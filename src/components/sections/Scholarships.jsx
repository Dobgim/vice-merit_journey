import { forwardRef, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { scholarships as fallbackScholarships } from '../../data/site'
import { fetchScholarships } from '../../lib/supabase'
import { Badge, Card, Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { EASE } from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

const FILTERS = ['All', 'Undergraduate', 'Graduate', 'Postgraduate', 'PhD', 'Fully Funded', 'Partially Funded']

function matches(item, filter) {
  if (filter === 'All') return true
  if (filter === 'Fully Funded' || filter === 'Partially Funded') return item.funding === filter
  return item.level === filter
}

/* -------------------------------------------------------------- Award card */

// forwardRef is required: AnimatePresence `popLayout` measures each child.
const ScholarshipCard = forwardRef(function ScholarshipCard({ item }, ref) {
  const fullyFunded = item.funding === 'Fully Funded'

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
      <Card className="group flex h-full flex-col p-6">
        {/* Top edge accent */}
        <span
          className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r transition-transform duration-500 group-hover:scale-x-100 ${
            fullyFunded ? 'from-gold-400 to-gold-200' : 'from-navy-500 to-navy-300'
          }`}
        />

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl leading-none" aria-hidden>
              {item.flag}
            </span>
            <div>
              <div className="text-[0.78rem] font-semibold text-navy-800">{item.country}</div>
              <div className="text-[0.72rem] text-navy-500">{item.org}</div>
            </div>
          </div>

          <Badge variant={fullyFunded ? 'gold' : 'neutral'} icon={fullyFunded ? 'star' : 'half'}>
            {fullyFunded ? 'Fully Funded' : 'Partial'}
          </Badge>
        </div>

        <h3 className="mt-5 font-display text-[1.22rem] font-semibold leading-snug text-navy-950 transition-colors duration-300 group-hover:text-navy-800">
          {item.name}
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
            <dd
              className={`mt-1 inline-flex items-center gap-1.5 font-semibold ${
                item.urgent ? 'text-rose-600' : 'text-navy-900'
              }`}
            >
              <Icon name="calendar" className="h-3.5 w-3.5" />
              {item.deadline}
            </dd>
          </div>
        </dl>

        {item.urgent && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-rose-600">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
            </span>
            Closing this cycle — start now
          </p>
        )}

        <Button
          to="/contact"
          variant="outline"
          size="sm"
          icon="arrowUpRight"
          className="mt-6 w-full"
          aria-label={`Check your eligibility for ${item.name}`}
        >
          Check my eligibility
        </Button>
      </Card>
    </motion.div>
  )
})

/* ------------------------------------------------------------------ Section */

export default function Scholarships() {
  const [filter, setFilter] = useState('All')
  const [items, setItems] = useState(fallbackScholarships)

  // Reads from Supabase when configured; silently keeps placeholders otherwise.
  useEffect(() => {
    let alive = true
    fetchScholarships(fallbackScholarships).then((data) => {
      if (alive) setItems(data)
    })
    return () => {
      alive = false
    }
  }, [])

  const visible = useMemo(() => items.filter((i) => matches(i, filter)), [items, filter])

  return (
    <Section id="scholarships" tone="light">
      <div className="container">
        <SectionHeading
          eyebrow="Featured scholarships"
          title="Open awards worth"
          accent="building a year around"
          lede="A live sample from our tracked database of 2,300+ awards. Filter by level or funding type, then ask us where you stand."
        />

        {/* Filter rail */}
        <Reveal delay={0.15} className="mt-12">
          <div className="mask-fade-x -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
            {FILTERS.map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  aria-pressed={active}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-[0.85rem] font-medium transition-colors duration-300 ${
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
        </Reveal>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <ScholarshipCard key={item.name} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-14 text-center text-navy-600">
            No awards in this category right now — ask an advisor about upcoming cycles.
          </p>
        )}

        <Reveal delay={0.1} className="mt-14">
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-navy-900/[0.07] bg-white p-8 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-display text-xl font-semibold text-navy-950">
                This is 9 of 2,300+ tracked awards.
              </h3>
              <p className="mt-1.5 text-[0.93rem] text-navy-700/80">
                Tell us your profile and we will send the ones you can actually win.
              </p>
            </div>
            <Button to="/contact" size="md" icon="arrowRight" className="shrink-0">
              Request my shortlist
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
