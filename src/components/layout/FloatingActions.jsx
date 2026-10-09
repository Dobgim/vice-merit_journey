import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import useGoBack from '../../hooks/useGoBack'
import { useScrolled } from '../../hooks/useScroll'
import Icon from '../ui/Icon'

/** Back (inner pages) and back-to-top buttons, revealed after the header. */
export default function FloatingActions() {
  const past = useScrolled(700)
  const { pathname } = useLocation()
  const goBack = useGoBack()

  return (
    <>
      <AnimatePresence>
        {pathname !== '/' && past && (
          <motion.button
            key="back"
            type="button"
            onClick={goBack}
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            whileHover={{ y: -3 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            aria-label="Go back to the previous page"
            className="fixed bottom-5 left-5 z-40 inline-flex h-11 items-center gap-2 rounded-full border border-navy-900/10 bg-white/90 px-4 text-[0.85rem] font-semibold text-navy-900 shadow-soft backdrop-blur transition-colors hover:bg-white sm:bottom-7 sm:left-7"
          >
            <Icon name="arrowLeft" className="h-4 w-4" />
            Back
          </motion.button>
        )}
      </AnimatePresence>

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
            aria-label="Scroll to top of this page"
            title="Top of page"
            className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/10 bg-white/90 text-navy-800 shadow-soft backdrop-blur transition-colors hover:bg-white sm:bottom-7 sm:right-7"
          >
            <Icon name="arrowRight" className="h-4 w-4 -rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
