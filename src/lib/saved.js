import { useEffect, useState } from 'react'

/**
 * Listings a visitor has saved, kept in this browser only (localStorage) and
 * shared between every component on the page through a window event.
 */
const KEY = 'ml_saved_listings'
const EVENT = 'ml-saved-change'

function read() {
  try {
    return new Set(JSON.parse(localStorage.getItem(KEY) ?? '[]'))
  } catch {
    return new Set()
  }
}

export function toggleSaved(slug) {
  const next = read()
  if (next.has(slug)) next.delete(slug)
  else next.add(slug)
  try {
    localStorage.setItem(KEY, JSON.stringify([...next]))
  } catch {
    /* storage blocked — saving just won't persist */
  }
  window.dispatchEvent(new Event(EVENT))
}

/** The current set of saved slugs; re-renders when it changes in any tab. */
export default function useSaved() {
  const [saved, setSaved] = useState(read)
  useEffect(() => {
    const update = () => setSaved(read())
    window.addEventListener(EVENT, update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener(EVENT, update)
      window.removeEventListener('storage', update)
    }
  }, [])
  return saved
}
