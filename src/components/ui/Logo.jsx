import { Link } from 'react-router-dom'
import { company } from '../../data/site'

/** Wordmark + graduation-cap monogram. `tone` flips it for dark backgrounds. */
export default function Logo({ tone = 'dark', className = '', onClick }) {
  const onDark = tone === 'light'

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label={`${company.name} — home`}
    >
      <span
        className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-500 group-hover:-rotate-6 ${
          onDark
            ? 'bg-white/10 ring-1 ring-white/20'
            : 'bg-gradient-to-br from-navy-800 to-navy-950 ring-1 ring-navy-900/20'
        }`}
      >
        <svg viewBox="0 0 24 24" className="h-[1.35rem] w-[1.35rem]" aria-hidden>
          <path d="M12 4 2.8 8.4 12 12.8l9.2-4.4L12 4Z" fill="#dcbf72" />
          <path
            d="M6.4 10.9v4.3c0 1.9 2.5 3.4 5.6 3.4s5.6-1.5 5.6-3.4v-4.3"
            fill="none"
            stroke="#dcbf72"
            strokeWidth="1.7"
            strokeLinecap="round"
            opacity=".75"
          />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.28rem] font-semibold tracking-tight ${
            onDark ? 'text-white' : 'text-navy-950'
          }`}
        >
          Merit<span className="text-gold-500">Ledger</span>
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
