import { Link } from 'react-router-dom'
import { company } from '../../data/site'

/** Emblem + wordmark. `tone` flips the text colours for dark backgrounds. */
export default function Logo({ tone = 'dark', className = '', onClick }) {
  const onDark = tone === 'light'

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${company.name} — home`}
    >
      {/* The emblem is navy-on-white artwork, so it always sits on a white tile */}
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-0.5 transition-transform duration-500 group-hover:-rotate-3 ${
          onDark ? 'ring-1 ring-white/30' : 'ring-1 ring-navy-900/10 shadow-soft'
        }`}
      >
        <img src="/logo-mark.png" alt="" width="40" height="40" className="h-full w-full object-contain" />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.28rem] font-semibold tracking-tight ${
            onDark ? 'text-white' : 'text-navy-950'
          }`}
        >
          Merit <span className="text-gold-500">Leaders</span>
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] ${
            onDark ? 'text-navy-100/50' : 'text-navy-500/70'
          }`}
        >
          {company.tagline}
        </span>
      </span>
    </Link>
  )
}
