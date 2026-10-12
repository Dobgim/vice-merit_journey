import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Icon from '../ui/Icon'

/**
 * Keeps visitors on the latest deployed version. Phones (and WhatsApp's
 * in-app browser) often keep an old copy of the site open for days; this
 * checks the live index.html every few minutes and whenever the page comes
 * back into view. When a new build is live it offers a refresh, and reloads
 * automatically on the next page change so nobody is stuck on old data.
 */
const CHECK_EVERY = 5 * 60_000

function currentBuild() {
  const src = document.querySelector('script[type="module"][src*="/assets/"]')?.getAttribute('src') ?? ''
  return src.match(/\/assets\/[^"']+\.js/)?.[0] ?? null
}

async function liveBuild() {
  const res = await fetch(`/?v=${Date.now()}`, { cache: 'no-store' })
  const html = await res.text()
  return html.match(/\/assets\/[^"']+\.js/)?.[0] ?? null
}

export default function UpdateBanner() {
  const [outdated, setOutdated] = useState(false)
  const mine = useRef(currentBuild())
  const { pathname } = useLocation()
  const firstPath = useRef(pathname)

  useEffect(() => {
    if (import.meta.env.DEV || !mine.current) return
    let stopped = false
    const check = async () => {
      try {
        const live = await liveBuild()
        if (!stopped && live && live !== mine.current) setOutdated(true)
      } catch {
        /* offline — try again later */
      }
    }
    const onVisible = () => document.visibilityState === 'visible' && check()
    const timer = setInterval(check, CHECK_EVERY)
    document.addEventListener('visibilitychange', onVisible)
    check()
    return () => {
      stopped = true
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  // A new version is live: load it on the next navigation (no lost input).
  useEffect(() => {
    if (outdated && pathname !== firstPath.current) window.location.reload()
    firstPath.current = pathname
  }, [pathname, outdated])

  if (!outdated) return null

  return (
    <div className="fixed inset-x-0 top-0 z-[90] flex justify-center px-3 pt-3" role="status">
      <div className="flex items-center gap-3 rounded-full bg-navy-950 py-2 pl-4 pr-2 text-sm text-white shadow-lift">
        <Icon name="sparkle" className="h-4 w-4 text-gold-300" />
        New version available
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-gradient-to-br from-gold-300 to-gold-500 px-3.5 py-1.5 text-sm font-semibold text-navy-950"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}
