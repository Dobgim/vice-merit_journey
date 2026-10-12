import { useEffect, useState } from 'react'

/**
 * The current time, refreshed every `intervalMs`. One shared timer per
 * interval serves every component, so 150 deadline chips cost one tick.
 * Also refreshes when the tab or phone app comes back into view, so a page
 * left open overnight shows the right number of days.
 */
const channels = new Map() // interval -> { timer, listeners:Set }

function subscribe(intervalMs, fn) {
  let ch = channels.get(intervalMs)
  if (!ch) {
    ch = { listeners: new Set(), timer: setInterval(() => ch.listeners.forEach((l) => l(new Date())), intervalMs) }
    channels.set(intervalMs, ch)
  }
  ch.listeners.add(fn)
  return () => {
    ch.listeners.delete(fn)
    if (!ch.listeners.size) {
      clearInterval(ch.timer)
      channels.delete(intervalMs)
    }
  }
}

export default function useNow(intervalMs = 60_000) {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const unsubscribe = subscribe(intervalMs, setNow)
    const onVisible = () => document.visibilityState === 'visible' && setNow(new Date())
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('focus', onVisible)
    return () => {
      unsubscribe()
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('focus', onVisible)
    }
  }, [intervalMs])

  return now
}
