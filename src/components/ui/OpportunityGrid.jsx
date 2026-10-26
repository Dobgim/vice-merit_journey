import { useMemo, useState } from 'react'
import { kinds } from '../../data/opportunities'
import { ScholarshipCard } from '../sections/Scholarships'
import Button from './Button'

const PAGE = 24

/**
 * Cards for a mixed list of { kind, item } — used by the landing pages and
 * the eligibility matcher. A row of type pills (with counts) narrows the list,
 * and results load 24 at a time so long lists stay quick.
 */
export default function OpportunityGrid({ entries, empty }) {
  const [type, setType] = useState('all')
  const [shown, setShown] = useState(PAGE)

  const counts = useMemo(() => {
    const c = { all: entries.length }
    for (const e of entries) c[e.kind] = (c[e.kind] ?? 0) + 1
    return c
  }, [entries])

  const list = type === 'all' ? entries : entries.filter((e) => e.kind === type)
  const types = ['all', ...Object.keys(kinds).filter((k) => counts[k])]

  if (!entries.length) {
    return <p className="mx-auto max-w-xl text-center text-lg leading-[1.75] text-navy-700/80">{empty}</p>
  }

  return (
    <>
      {types.length > 2 && (
        <div className="mask-fade-x -mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {types.map((k) => {
            const active = type === k
            return (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setType(k)
                  setShown(PAGE)
                }}
                aria-pressed={active}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-navy-900 text-white shadow-soft' : 'border border-navy-900/10 bg-white text-navy-700 hover:text-navy-950'
                }`}
              >
                {k === 'all' ? 'All' : kinds[k].title} <span className={active ? 'text-white/70' : 'text-navy-400'}>{counts[k]}</span>
              </button>
            )
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.slice(0, shown).map((e) => (
          <ScholarshipCard key={`${e.kind}-${e.item.slug}`} item={e.item} kind={e.kind} />
        ))}
      </div>

      {list.length > shown && (
        <div className="mt-10 flex justify-center">
          <Button as="button" type="button" variant="outline" icon="arrowRight" onClick={() => setShown((n) => n + PAGE)}>
            Show more ({list.length - shown} left)
          </Button>
        </div>
      )}
    </>
  )
}
