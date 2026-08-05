import { motion } from 'framer-motion'

/** Shared easing — a slow, expensive-feeling settle used site-wide. */
export const EASE = [0.16, 1, 0.3, 1]

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 32, y: 0 },
  right: { x: -32, y: 0 },
  none: { x: 0, y: 0 },
}

/** Fade + slide an element in the first time it enters the viewport. */
export default function Reveal({
  children,
  delay = 0,
  duration = 0.75,
  direction = 'up',
  blur = true,
  className = '',
  as = 'div',
  ...rest
}) {
  const Tag = motion[as] ?? motion.div
  const offset = directions[direction] ?? directions.up

  return (
    <Tag
      initial={{ opacity: 0, ...offset, filter: blur ? 'blur(6px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  )
}

/** Parent that staggers its Reveal-styled children. Pair with <StaggerItem>. */
export function Stagger({ children, className = '', delay = 0, gap = 0.09, ...rest }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-70px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', y = 26, ...rest }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y, filter: 'blur(6px)' },
        show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
