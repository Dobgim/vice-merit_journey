import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Icon from './Icon'

const MotionLink = motion.create(Link)

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-colors duration-300 disabled:opacity-60 disabled:pointer-events-none'

const variants = {
  primary: 'bg-navy-900 text-white shadow-soft hover:bg-navy-800 hover:shadow-lift',
  gold: 'bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 shadow-soft hover:shadow-glow',
  outline:
    'border border-navy-900/15 bg-white/70 text-navy-900 backdrop-blur hover:border-navy-900/35 hover:bg-white',
  ghostLight:
    'border border-white/25 bg-white/5 text-white backdrop-blur hover:bg-white/15 hover:border-white/45',
  whatsapp: 'bg-[#1FA855] text-white shadow-soft hover:bg-[#188f47] hover:shadow-lift',
}

const sizes = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
}

/**
 * One button for the whole site.
 * Pass `to` for in-app routes, `href` for external links, or `as="button"`.
 */
export default function Button({
  as,
  to,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight = true,
  className = '',
  children,
  ...rest
}) {
  const Tag = to ? MotionLink : (motion[as ?? 'a'] ?? motion.a)
  const tagProps = to ? { to } : {}

  return (
    <Tag
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...tagProps}
      {...rest}
    >
      {icon && !iconRight && <Icon name={icon} className="h-[1.05em] w-[1.05em]" />}
      <span className="relative z-10">{children}</span>
      {icon && iconRight && (
        <Icon
          name={icon}
          className="h-[1.05em] w-[1.05em] transition-transform duration-300 group-hover:translate-x-0.5"
        />
      )}

      {/* Light sweep on hover — the micro-interaction that sells the premium feel */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 -translate-x-full bg-sheen opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:animate-[shimmer_0.9s_ease-out]" />
      </span>
    </Tag>
  )
}
