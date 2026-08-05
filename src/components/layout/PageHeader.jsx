import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Aurora } from '../ui/Primitives'
import Icon from '../ui/Icon'
import { EASE } from '../ui/Reveal'

/**
 * The compact dark banner every inner page opens with. Gives each route its
 * own identity while keeping the navbar's dark-on-hero treatment consistent.
 */
export default function PageHeader({ eyebrow, title, accent, lede, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/hero-graduation.jpg"
          alt=""
          className="h-full w-full scale-105 object-cover object-center opacity-[0.42] blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/75 to-navy-950" />
      </div>

      <Aurora />

      <div className="container relative">
        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[0.8rem] text-navy-100/55"
        >
          <Link to="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <Icon name="arrowRight" className="h-3.5 w-3.5 text-navy-100/35" />
          <span className="text-navy-100/85">{title}</span>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
          className="eyebrow mt-7 text-gold-200"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.12 }}
          className="mt-4 max-w-3xl font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight balance sm:text-[3rem] lg:text-[3.5rem]"
        >
          {title}
          {accent && <span className="text-gradient italic"> {accent}</span>}
        </motion.h1>

        {lede && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-6 max-w-2xl text-[1.02rem] leading-[1.75] text-navy-100/75"
          >
            {lede}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  )
}
