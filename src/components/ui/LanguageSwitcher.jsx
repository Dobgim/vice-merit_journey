import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LANGUAGES, currentLanguage, setLanguage } from '../../lib/translate'
import Icon from './Icon'

/** Globe + language code; opens a menu of languages. `tone="light"` for dark backgrounds. */
export default function LanguageSwitcher({ tone = 'dark', className = '' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const active = LANGUAGES.find((l) => l.code === currentLanguage()) ?? LANGUAGES[0]
  const onDark = tone === 'light'

  useEffect(() => {
    if (!open) return
    const close = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !ref.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    document.addEventListener('keydown', close)
    return () => {
      document.removeEventListener('mousedown', close)
      document.removeEventListener('keydown', close)
    }
  }, [open])

  return (
    <div ref={ref} className={`notranslate relative ${className}`} translate="no">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${active.label}. Change language`}
        className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-3 text-[0.82rem] font-semibold backdrop-blur transition-colors ${
          onDark
            ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
            : 'border-navy-900/10 bg-white/70 text-navy-900 hover:bg-white'
        }`}
      >
        <Icon name="globe" className="h-4 w-4" />
        {active.short}
        <Icon name="chevronDown" className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label="Choose language"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-[80] mt-2 max-h-[70vh] w-52 overflow-y-auto rounded-2xl border border-navy-900/10 bg-white p-1.5 text-navy-900 shadow-lift"
          >
            {LANGUAGES.map((l) => {
              const selected = l.code === active.code
              return (
                <li key={l.code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      setLanguage(l.code)
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[0.88rem] transition-colors ${
                      selected ? 'bg-navy-50 font-semibold' : 'hover:bg-navy-50'
                    }`}
                  >
                    <span>{l.label}</span>
                    {selected ? (
                      <Icon name="check" className="h-4 w-4 text-gold-600" />
                    ) : (
                      <span className="text-[0.7rem] font-semibold text-navy-400">{l.short}</span>
                    )}
                  </button>
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
