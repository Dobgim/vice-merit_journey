import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navLinks } from '../../data/site'
import { useLockBody, useScrolled } from '../../hooks/useScroll'
import { EASE } from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'
import LanguageSwitcher from '../ui/LanguageSwitcher'
import { hasManualMenu, menuLabel } from '../../lib/translate'

/** Hand-translated where we have it (kept away from Google), otherwise left to Google. */
function MenuLabel({ label }) {
  if (!hasManualMenu()) return label
  return (
    <span className="notranslate" translate="no">
      {menuLabel(label)}
    </span>
  )
}

const linkTone = (overHero, isActive) =>
  overHero
    ? isActive
      ? 'text-white'
      : 'text-navy-100/70 hover:text-white'
    : isActive
      ? 'text-navy-950'
      : 'text-navy-700/75 hover:text-navy-950'

function ActivePill({ overHero }) {
  return (
    <motion.span
      layoutId="nav-pill"
      className={`absolute inset-0 -z-10 rounded-full ${overHero ? 'bg-white/10' : 'bg-navy-900/[0.06]'}`}
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
    />
  )
}

/** Desktop dropdown for a link group (e.g. Opportunities → Scholarships, Grants, Internships). */
function NavGroup({ group, overHero, pathname }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const isActive = group.children.some((c) => pathname.startsWith(c.to))

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const close = (e) => !ref.current?.contains(e.target) && setOpen(false)
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [open])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 text-[0.88rem] font-medium transition-colors duration-300 xl:px-4 xl:text-[0.9rem] ${linkTone(overHero, isActive)}`}
      >
        {isActive && <ActivePill overHero={overHero} />}
        <MenuLabel label={group.label} />
        <Icon name="chevronDown" className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 top-full z-[80] w-72 -translate-x-1/2 pt-2"
          >
            <ul className="rounded-2xl border border-navy-900/10 bg-white p-2 shadow-lift">
              {group.children.map((c) => (
                <li key={c.to}>
                  <Link
                    to={c.to}
                    className={`block rounded-xl px-4 py-3 transition-colors hover:bg-navy-50 ${
                      pathname.startsWith(c.to) ? 'bg-navy-50' : ''
                    }`}
                  >
                    <span className="block text-[0.92rem] font-semibold text-navy-950"><MenuLabel label={c.label} /></span>
                    {c.hint && <span className="mt-0.5 block text-[0.78rem] text-navy-500">{c.hint}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(20)
  const { pathname } = useLocation()

  // Every page opens on a dark header, so the un-scrolled navbar always
  // inverts to stay legible.
  const overHero = !scrolled

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
            className={`container flex items-center justify-between gap-3 transition-all duration-500 ${
              scrolled ? 'h-[68px]' : 'h-[86px]'
            }`}
            aria-label="Primary"
          >
            <Logo tone={overHero ? 'light' : 'dark'} />

            {/* Desktop links */}
            <ul className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => (
                <li key={link.label}>
                  {link.children ? (
                    <NavGroup group={link} overHero={overHero} pathname={pathname} />
                  ) : (
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      className={({ isActive }) =>
                        `relative whitespace-nowrap rounded-full px-2.5 py-2 text-[0.88rem] font-medium transition-colors duration-300 xl:px-4 xl:text-[0.9rem] ${linkTone(overHero, isActive)}`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && <ActivePill overHero={overHero} />}
                          <MenuLabel label={link.label} />
                        </>
                      )}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <LanguageSwitcher tone={overHero ? 'light' : 'dark'} />

              {/* Full label where there is room; icon-only between lg and xl */}
              <Button
                to="/book-consultation"
                size="sm"
                variant={overHero ? 'gold' : 'primary'}
                icon="calendar"
                iconRight={false}
                className="hidden whitespace-nowrap sm:inline-flex lg:hidden xl:inline-flex"
              >
                Book Consultation
              </Button>
              <Link
                to="/book-consultation"
                aria-label="Book consultation"
                title="Book consultation"
                className={`hidden h-10 w-10 items-center justify-center rounded-full shadow-soft transition-colors lg:inline-flex xl:hidden ${
                  overHero
                    ? 'bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950'
                    : 'bg-navy-900 text-white hover:bg-navy-800'
                }`}
              >
                <Icon name="calendar" className="h-4 w-4" />
              </Link>

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
              className="fixed inset-y-0 right-0 z-[70] flex w-[85%] max-w-sm flex-col overflow-y-auto bg-white p-6 shadow-lift lg:hidden"
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

              <ul className="mt-8 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.5, ease: EASE }}
                  >
                    {link.children ? (
                      <div className="rounded-xl bg-mist/80 px-2 py-2">
                        <p className="px-2 pb-1 pt-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy-500">
                          <MenuLabel label={link.label} />
                        </p>
                        {link.children.map((c) => (
                          <NavLink
                            key={c.to}
                            to={c.to}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                              `flex items-center justify-between rounded-lg px-3 py-2.5 font-display text-lg transition-colors ${
                                isActive ? 'bg-white text-navy-950 shadow-soft' : 'text-navy-900 hover:bg-white'
                              }`
                            }
                          >
                            <MenuLabel label={c.label} />
                            <Icon name="arrowUpRight" className="h-4 w-4 text-navy-400" />
                          </NavLink>
                        ))}
                      </div>
                    ) : (
                      <NavLink
                        to={link.to}
                        end={link.to === '/'}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between rounded-xl px-4 py-3 font-display text-xl transition-colors ${
                            isActive ? 'bg-navy-50 text-navy-950' : 'text-navy-900 hover:bg-navy-50'
                          }`
                        }
                      >
                        <MenuLabel label={link.label} />
                        <Icon name="arrowUpRight" className="h-4 w-4 text-navy-400" />
                      </NavLink>
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 pt-8">
                <Button to="/book-consultation" onClick={() => setOpen(false)} size="md" icon="calendar" iconRight={false} className="w-full">
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
