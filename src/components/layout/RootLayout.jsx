import { useEffect, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { Outlet, useLocation, useNavigationType } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActions from './FloatingActions'

// Scroll offsets per history entry, so Back returns you to where you were.
const positions = new Map()

/**
 * New page (link click): start at the top. Back / Forward (a POP navigation):
 * restore the scroll position that history entry had when you left it.
 */
function useScrollRestoration() {
  const { pathname, key } = useLocation()
  const navType = useNavigationType()

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
  }, [])

  // Keep the current entry's offset up to date while the visitor scrolls.
  useEffect(() => {
    const save = () => positions.set(key, window.scrollY)
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [key])

  useLayoutEffect(() => {
    const top = navType === 'POP' ? (positions.get(key) ?? 0) : 0
    window.scrollTo({ top, behavior: 'instant' })
    // Pathname, not key: query-string updates (e.g. filters) must not jump the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}

export default function RootLayout() {
  const { pathname } = useLocation()
  useScrollRestoration()

  return (
    <div className="min-h-screen overflow-x-clip bg-mist">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-950 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Navbar />

      {/* Short, cheap cross-fade. Anything longer reads as lag rather than polish. */}
      <motion.main
        id="main"
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.main>

      <Footer />
      <FloatingActions />
    </div>
  )
}
