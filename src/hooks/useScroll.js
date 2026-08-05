import { useEffect, useState } from 'react'

/** True once the page has scrolled past `offset` — drives the navbar transition. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

/** Returns the id of the section currently in the reading zone. */
export function useScrollSpy(ids, { offset = 140 } = {}) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const onScroll = () => {
      // Pin the last link once we reach the bottom of the page.
      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 80
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }

      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= offset) current = id
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ids, offset])

  return active
}

/** Locks body scroll — used by the mobile menu. */
export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [locked])
}
