import { AnimatePresence, motion } from 'framer-motion'
import { company } from '../../data/site'
import { useScrolled } from '../../hooks/useScroll'
import Icon from '../ui/Icon'

const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
  'Hi Merit Ledger — I would like to book a scholarship consultation.'
)}`

/** Persistent WhatsApp shortcut + back-to-top, revealed after the hero. */
export default function FloatingActions() {
  const past = useScrolled(700)

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {past && (
          <motion.button
            key="top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/10 bg-white/90 text-navy-800 shadow-soft backdrop-blur transition-colors hover:bg-white"
          >
            <Icon name="arrowRight" className="h-4 w-4 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 260, damping: 18 }}
        whileHover={{ y: -3 }}
        aria-label="Chat with an advisor on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-lift"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#1FA855]/40" aria-hidden />
        <Icon name="whatsapp" className="relative h-7 w-7" />

        {/* Label expands on hover, desktop only */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-navy-950 px-3.5 py-2 text-[0.8rem] font-medium text-white opacity-0 shadow-lift transition-opacity duration-300 group-hover:opacity-100 sm:block">
          Chat with an advisor
        </span>
      </motion.a>
    </div>
  )
}
