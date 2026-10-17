import { kinds } from '../../data/opportunities'
import { useOpportunities } from '../../hooks/useScholarships'

/**
 * "95 scholarships available now" — shown in the page banner so the number of
 * open listings is the first thing visitors see. Closed calls are excluded,
 * so the count drops on its own as deadlines pass.
 */
export default function OpportunityCount({ kind }) {
  const items = useOpportunities(kind)
  const config = kinds[kind]
  return (
    <p className="mb-6 inline-flex items-baseline gap-2.5 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20 backdrop-blur" aria-live="polite">
      <span className="font-display text-3xl font-semibold leading-none text-gold-300 tabular-nums">{items.length}</span>
      <span className="text-base font-semibold text-white">
        {items.length === 1 ? config.singular : config.plural} available now
      </span>
    </p>
  )
}
