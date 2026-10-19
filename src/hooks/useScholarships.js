import { useEffect, useState } from 'react'
import { kinds } from '../data/opportunities'
import { requirements } from '../data/requirements'
import { fetchOpportunities } from '../lib/supabase'
import { deadlineStatus, slugify } from '../lib/deadline'
import useNow from './useNow'

const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null)

/**
 * Fill in who-can-apply and documents from data/requirements.js, but only
 * where a listing still has what it was imported with — anything edited in
 * the dashboard is left alone.
 */
function withRequirements(item, kind) {
  const req = requirements[item.slug]
  if (!req) return item
  const original = kinds[kind].items.find((i) => i.slug === item.slug)
  const out = { ...item }
  for (const field of ['eligibility', 'documents']) {
    if (req[field] && (!original || same(item[field], original[field]))) out[field] = req[field]
  }
  return out
}

const prepare = (list, kind) =>
  list.map((s) => withRequirements(s.slug ? s : { ...s, slug: slugify(s.name) }, kind))

// Fetched once per type per session and shared, so moving between a listing
// and a detail page never re-requests or flashes the bundled data.
const cache = {}
const pending = {}

/**
 * Listings for one opportunity type: what the admin has published plus any
 * built-in listing not imported yet (see fetchOpportunities)
 * Listings whose deadline has passed drop out automatically (re-checked every
 * minute) unless `includeClosed` is set — the detail page uses that so old
 * links and flyers can still explain that the call has closed.
 */
export function useOpportunities(kind = 'scholarships', { includeClosed = false } = {}) {
  const now = useNow(60_000)
  const bundled = kinds[kind].items
  const [items, setItems] = useState(() => cache[kind] ?? prepare(bundled, kind))

  useEffect(() => {
    if (cache[kind]) {
      setItems(cache[kind])
      return
    }
    let alive = true
    pending[kind] ??= fetchOpportunities(kind, bundled).then((data) => (cache[kind] = prepare(data, kind)))
    pending[kind].then((data) => alive && setItems(data))
    return () => {
      alive = false
    }
  }, [kind, bundled])

  return includeClosed ? items : items.filter((i) => deadlineStatus(i.deadline, now).state !== 'closed')
}

/** Admin calls this after saving so the public pages pick up the change. */
export function clearOpportunityCache() {
  for (const k of Object.keys(cache)) delete cache[k]
  for (const k of Object.keys(pending)) delete pending[k]
}

export default function useScholarships() {
  return useOpportunities('scholarships')
}
