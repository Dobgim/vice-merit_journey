import Reveal from './Reveal'
import Icon from './Icon'

/** Eyebrow + display title + lede, in light or dark context. */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  lede,
  align = 'center',
  tone = 'light',
  className = '',
}) {
  const dark = tone === 'dark'
  const centered = align === 'center'

  return (
    <div
      className={`${centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl text-left'} ${className}`}
    >
      {eyebrow && (
        <Reveal>
          <span
            className={`eyebrow rounded-full px-3.5 py-1.5 ${
              dark
                ? 'bg-white/10 text-gold-200 ring-1 ring-white/15'
                : 'bg-navy-900/[0.04] text-navy-600 ring-1 ring-navy-900/[0.07]'
            }`}
          >
            <Icon name="sparkle" className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2
          className={`mt-5 font-display text-[2rem] font-semibold leading-[1.12] tracking-tight balance sm:text-[2.6rem] lg:text-[3.05rem] ${
            dark ? 'text-white' : 'text-navy-950'
          }`}
        >
          {title}{' '}
          {accent && (
            <span className={dark ? 'text-gradient' : 'italic text-gold-600'}>{accent}</span>
          )}
        </h2>
      </Reveal>

      {lede && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-[1.02rem] leading-[1.75] balance sm:text-[1.08rem] ${
              dark ? 'text-navy-100/70' : 'text-navy-700/80'
            }`}
          >
            {lede}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.24}>
        <span
          className={`mt-7 block h-px w-24 ${centered ? 'mx-auto' : ''} bg-gradient-to-r ${
            centered
              ? 'from-transparent via-gold-400 to-transparent'
              : 'from-gold-400 to-transparent'
          }`}
        />
      </Reveal>
    </div>
  )
}
