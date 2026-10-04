import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../../data/site'
import { useLockBody, useScrolled } from '../../hooks/useScroll'
import { EASE } from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(20)
  const { pathname } = useLocation()

  // Only the home page opens on a dark hero, so only there does the
  // un-scrolled navbar invert to stay legible.
  const overHero = pathname === '/' && !scrolled

  // Never leave the drawer open across a navigation.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useLockBody(open)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'border-b border-navy-900/[0.07] bg-white/80 shadow-soft backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav
            className={`container flex items-center justify-between transition-all duration-500 ${
              scrolled ? 'h-[68px]' : 'h-[86px]'
            }`}
            aria-label="Primary"
          >
            <Logo tone={overHero ? 'light' : 'dark'} />

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      `relative rounded-full px-2.5 py-2 text-[0.88rem] font-medium xl:px-4 xl:text-[0.9rem] transition-colors duration-300 ${
                        overHero
                          ? isActive
                            ? 'text-white'
                            : 'text-navy-100/70 hover:text-white'
                          : isActive
                            ? 'text-navy-950'
                            : 'text-navy-700/75 hover:text-navy-950'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className={`absolute inset-0 -z-10 rounded-full ${
                              overHero ? 'bg-white/10' : 'bg-navy-900/[0.06]'
                            }`}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        {link.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2.5">
              <Button
                to="/contact"
                size="sm"
                variant={overHero ? 'gold' : 'primary'}
                icon="calendar"
                iconRight={false}
                className="hidden whitespace-nowrap sm:inline-flex"
              >
                Book Consultation
              </Button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-colors lg:hidden ${
                  overHero
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'border-navy-900/10 bg-white/70 text-navy-900 hover:bg-white'
                }`}
                aria-label="Open navigation menu"
                aria-expanded={open}
              >
                <Icon name="menu" className="h-5 w-5" />
              </button>
            </div>
          </nav>
        </div>

        {/* Reading progress hairline */}
        <motion.div
          style={{ scaleX: progress }}
          className={`h-[2px] origin-left bg-gradient-to-r from-gold-400 via-gold-300 to-navy-400 transition-opacity duration-500 ${
            scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-navy-950/50 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: EASE }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[85%] max-w-sm flex-col bg-white p-6 shadow-lift lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/10 text-navy-900"
                  aria-label="Close navigation menu"
                >
                  <Icon name="close" className="h-5 w-5" />
                </button>
              </div>

              <ul className="mt-10 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE }}
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-xl transition-colors ${
                          isActive
                            ? 'bg-navy-50 text-navy-950'
                            : 'text-navy-900 hover:bg-navy-50'
                        }`
                      }
                    >
                      {link.label}
                      <Icon name="arrowUpRight" className="h-4 w-4 text-navy-400" />
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 pt-8">
                <Button to="/contact" onClick={() => setOpen(false)} size="md" icon="calendar" iconRight={false} className="w-full">
                  Book Consultation
                </Button>
                <p className="text-center text-xs text-navy-500">
                  Free 20-minute discovery call · No obligation
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
