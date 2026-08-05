import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Eased count-up that fires once, when the element scrolls into view.
 * Respects prefers-reduced-motion by snapping straight to the final value.
 */
export function useCountUp(target, { duration = 1800, decimals = 0 } = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }

    let frame
    const start = performance.now()
    // easeOutExpo — fast start, long graceful settle
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const next = target * ease(progress)
      setValue(decimals ? Number(next.toFixed(decimals)) : Math.round(next))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration, decimals])

  return { ref, value }
}
