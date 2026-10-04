import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingActions from './FloatingActions'

/**
 * Jump to the top on every navigation. Done synchronously in a layout effect
 * so the new page never paints at the old scroll offset.
 */
function useScrollToTop() {
  const { pathname } = useLocation()

  // Block body, not a concise arrow — an implicit return here would be read
  // by React as an effect cleanup function.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
}

export default function RootLayout() {
  const { pathname } = useLocation()
  useScrollToTop()

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
