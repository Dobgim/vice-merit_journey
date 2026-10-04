import { useEffect, useState } from 'react'
import { scholarships as fallback } from '../data/site'
import { kinds } from '../data/opportunities'
import { fetchScholarships } from '../lib/supabase'
import { slugify } from '../lib/deadline'

const withSlug = (list) => list.map((s) => (s.slug ? s : { ...s, slug: slugify(s.name) }))

// Fetched once per session and shared, so moving between the listing and a
// detail page never re-requests or flashes placeholder data.
let cache = null
let pending = null

/** Scholarships from Supabase when configured, the bundled list otherwise. */
export default function useScholarships() {
  const [items, setItems] = useState(() => cache ?? withSlug(fallback))

  useEffect(() => {
    if (cache) return
    let alive = true
    pending ??= fetchScholarships(fallback).then((data) => (cache = withSlug(data)))
    pending.then((data) => alive && setItems(data))
    return () => {
      alive = false
    }
  }, [])

  return items
}

/** Listings for any opportunity type. Only scholarships come from Supabase. */
export function useOpportunities(kind = 'scholarships') {
  const scholarships = useScholarships()
  return kind === 'scholarships' ? scholarships : withSlug(kinds[kind].items)
}
