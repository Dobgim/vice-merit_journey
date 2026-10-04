import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { stats, trustLogos } from '../../data/site'
import { useCountUp } from '../../hooks/useCountUp'
import { Aurora } from '../ui/Primitives'
import Button from '../ui/Button'
import Icon from '../ui/Icon'
import { EASE } from '../ui/Reveal'

/* ------------------------------------------------------------- Stat counter */

function Stat({ item, delay }) {
  const { ref, value } = useCountUp(item.value)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className="group"
    >
      <div className="font-display text-[1.85rem] font-semibold text-white sm:text-[2.15rem]">
        {item.prefix}
        {value.toLocaleString()}
        <span className="text-gold-300">{item.suffix}</span>
      </div>
      <div className="mt-1 text-[0.82rem] font-medium text-navy-100/70">{item.label}</div>
      <div className="text-[0.72rem] text-navy-100/40">{item.hint}</div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------- Hero */

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Gentle parallax: the copy drifts slower than the photograph behind it.
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0.15])

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-32 text-white sm:pb-24 sm:pt-36 lg:pb-28 lg:pt-44"
    >
      {/* Photographic ground layer — the scene stays legible; only a light
          blur and a navy wash sit between it and the copy. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.img
          src="/hero-graduation.jpg"
          alt=""
          fetchpriority="high"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: reduce ? 1.12 : 1.04, opacity: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
          className="h-full w-full object-cover object-center opacity-[0.78] blur-[1.5px]"
        />
        {/* Navy wash — light enough to keep the photograph readable, heavy
            enough to hold the headline above the contrast floor. */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/70 via-navy-950/55 to-navy-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(6,14,35,0.62),rgba(6,14,35,0.25)_65%,transparent_85%)]" />
      </div>

      <Aurora />

      <motion.div style={{ opacity: fade }} className="container relative">
        <div className="flex flex-col items-center">
          {/* ------------------------------------------------ Centred copy */}
          <motion.div style={{ y: yCopy }} className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            >
              <span className="eyebrow rounded-full bg-white/[0.07] px-3.5 py-2 text-gold-200 ring-1 ring-white/15">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-300 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-300" />
                </span>
                2027 intake · Applications now open
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: EASE, delay: 0.25 }}
              className="mt-7 font-display text-[2.7rem] font-semibold leading-[1.04] tracking-tight balance [text-shadow:0_2px_28px_rgba(4,10,28,0.55)] sm:text-[3.7rem] lg:text-[4.6rem]"
            >
              Win the scholarship
              <br className="hidden sm:block" /> you actually{' '}
              <span className="relative inline-block">
                <span className="text-gradient italic">deserve.</span>
                <motion.svg
                  viewBox="0 0 300 12"
                  className="absolute -bottom-1 left-0 h-3 w-full text-gold-400/70"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
                  aria-hidden
                >
                  <motion.path
                    d="M3 8c60-5 120-6 180-4s90 3 114 1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </motion.svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.4 }}
              className="mx-auto mt-7 max-w-2xl text-[1.05rem] leading-[1.75] text-navy-100/85 [text-shadow:0_1px_16px_rgba(4,10,28,0.6)] sm:text-[1.15rem]"
            >
              Merit Leaders matches undergraduate, graduate, postgraduate and international students
              with the funding they are genuinely competitive for — then works through every essay,
              form and interview with them until it is won.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center"
            >
              <Button to="/book-consultation" variant="gold" size="lg" icon="arrowRight">
                Book a free consultation
              </Button>
              <Button to="/scholarships" variant="ghostLight" size="lg" icon="search" iconRight={false}>
                Browse scholarships
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.85rem] text-navy-100/75"
            >
              {[
                { icon: 'checkCircle', label: 'No upfront fee for discovery' },
                { icon: 'shield', label: 'Written from your real story' },
                { icon: 'award', label: '200+ students advised' },
              ].map((t) => (
                <span
                  key={t.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-sm transition-colors duration-300 hover:border-gold-300/30 hover:bg-white/[0.1]"
                >
                  <Icon name={t.icon} className="h-4 w-4 text-gold-300" />
                  {t.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* -------------------------------------------------------- Stat bar */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-3 gap-4 border-t border-white/[0.08] pt-10 text-center sm:mt-20 sm:gap-8">
          {stats.map((s, i) => (
            <Stat key={s.label} item={s} delay={0.9 + i * 0.1} />
          ))}
        </div>
      </motion.div>

      {/* ---------------------------------------------------- Partner marquee */}
      <div className="relative mt-16 border-t border-white/[0.06] pt-9">
        <p className="container text-center text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-navy-100/35">
          Scholarships offered by
        </p>
        <div className="mask-fade-x mt-6 flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-14 pr-14">
            {[...trustLogos, ...trustLogos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="whitespace-nowrap font-display text-lg text-white/35 transition-colors hover:text-white/70"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
