import { motion } from 'framer-motion'
import Icon from './Icon'

/* ------------------------------------------------------------------ Section */

/** Consistent vertical rhythm + anchor target for every section on the page. */
export function Section({ id, className = '', children, tone = 'light', ...rest }) {
  const tones = {
    light: 'bg-mist',
    white: 'bg-white',
    dark: 'bg-navy-950 text-white',
    none: '',
  }

  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-20 sm:py-24 lg:py-28 ${tones[tone]} ${className}`}
      {...rest}
    >
      {children}
    </section>
  )
}

/* -------------------------------------------------------------------- Badge */

export function Badge({ children, variant = 'neutral', icon, className = '' }) {
  const variants = {
    neutral: 'bg-navy-900/[0.05] text-navy-700 ring-navy-900/[0.08]',
    gold: 'bg-gold-100 text-gold-800 ring-gold-300/60',
    navy: 'bg-navy-900 text-white ring-navy-900',
    outline: 'bg-white text-navy-700 ring-navy-900/[0.12]',
    danger: 'bg-rose-50 text-rose-700 ring-rose-200',
    success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
    dark: 'bg-white/10 text-navy-100 ring-white/15',
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold tracking-wide ring-1 ${variants[variant]} ${className}`}
    >
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}

/* --------------------------------------------------------------------- Card */

/** Base surface: hairline ring, soft shadow, optional lift-on-hover. */
export function Card({ children, className = '', hover = true, as = 'div', ...rest }) {
  const Tag = motion[as] ?? motion.div

  return (
    <Tag
      className={`relative overflow-hidden rounded-2xl border border-navy-900/[0.07] bg-white shadow-soft ${
        hover ? 'card-hover hover:border-navy-900/[0.12]' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/* ------------------------------------------------------------------ IconTile */

/** The rounded gradient square that fronts most cards. */
export function IconTile({ name, tone = 'navy', className = '' }) {
  const tones = {
    navy: 'bg-gradient-to-br from-navy-800 to-navy-950 text-gold-200 ring-navy-900/20',
    gold: 'bg-gradient-to-br from-gold-200 to-gold-400 text-navy-900 ring-gold-500/25',
    light: 'bg-navy-50 text-navy-700 ring-navy-900/10',
    glass: 'bg-white/10 text-gold-200 ring-white/15 backdrop-blur',
  }

  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ${tones[tone]} ${className}`}
    >
      <Icon name={name} className="h-[1.35rem] w-[1.35rem]" />
    </span>
  )
}

/* ------------------------------------------------------------------- Aurora */

/**
 * Soft, slow-drifting gradient blobs used behind dark sections.
 * Purely decorative — always aria-hidden and pointer-events-none.
 */
export function Aurora({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <div className="absolute -left-24 top-[-10%] h-[34rem] w-[34rem] rounded-full bg-navy-500/25 blur-[110px] animate-drift" />
      <div
        className="absolute -right-32 top-[18%] h-[30rem] w-[30rem] rounded-full bg-gold-400/15 blur-[120px] animate-drift"
        style={{ animationDelay: '-6s' }}
      />
      <div
        className="absolute bottom-[-18%] left-1/3 h-[28rem] w-[28rem] rounded-full bg-navy-400/20 blur-[130px] animate-drift"
        style={{ animationDelay: '-12s' }}
      />
    </div>
  )
}

/** Faint blueprint grid, fading out toward the edges. */
export function GridBackdrop({ className = '' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 bg-grid-faint [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)] ${className}`}
    />
  )
}

/* --------------------------------------------------------------- Star rating */

export function Stars({ count = 5, className = '' }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Icon key={i} name="star" className="h-4 w-4 fill-gold-400 text-gold-400" />
      ))}
    </div>
  )
}
