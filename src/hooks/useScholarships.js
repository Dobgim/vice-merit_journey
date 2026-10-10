import { useEffect, useState } from 'react'
import { kinds } from '../data/opportunities'
import { fetchOpportunities } from '../lib/supabase'
import { slugify } from '../lib/deadline'

const withSlug = (list) => list.map((s) => (s.slug ? s : { ...s, slug: slugify(s.name) }))

// Fetched once per type per session and shared, so moving between a listing
// and a detail page never re-requests or flashes the bundled data.
const cache = {}
const pending = {}

/**
 * Listings for one opportunity type: what the admin has published, or the
 * bundled list in src/data/ until anything of that type has been added.
 */
export function useOpportunities(kind = 'scholarships') {
  const bundled = kinds[kind].items
  const [items, setItems] = useState(() => cache[kind] ?? withSlug(bundled))

  useEffect(() => {
    if (cache[kind]) {
      setItems(cache[kind])
      return
    }
    let alive = true
    pending[kind] ??= fetchOpportunities(kind, bundled).then((data) => (cache[kind] = withSlug(data)))
    pending[kind].then((data) => alive && setItems(data))
    return () => {
      alive = false
    }
  }, [kind, bundled])

  return items
}

/** Admin calls this after saving so the public pages pick up the change. */
export function clearOpportunityCache() {
  for (const k of Object.keys(cache)) delete cache[k]
  for (const k of Object.keys(pending)) delete pending[k]
}

export default function useScholarships() {
  return useOpportunities('scholarships')
}
