import { motion } from 'framer-motion'
import { steps } from '../../data/site'
import { Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

export default function HowItWorks() {
  return (
    <Section id="process" tone="white">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps from"
          accent="uncertain to funded"
          lede="No long onboarding, no jargon. A short call, a clear shortlist, and an advisor beside you until you submit."
        />

        <div className="relative mt-16">
          {/* Connector line that draws itself as the section enters view */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="absolute left-0 right-0 top-[3.25rem] hidden h-px origin-left bg-gradient-to-r from-navy-200 via-gold-300 to-navy-200 lg:block"
            aria-hidden
          />

          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.n} delay={0.15 + i * 0.15} className="relative">
                <div className="flex items-center gap-5 lg:block">
                  <span className="relative z-10 inline-flex h-[6.5rem] w-[6.5rem] shrink-0 items-center justify-center rounded-2xl bg-white lg:h-auto lg:w-auto lg:bg-transparent">
                    <span className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-gradient-to-br from-navy-800 to-navy-950 font-display text-2xl font-semibold text-gold-200 shadow-lift ring-1 ring-navy-900/20">
                      {s.n}
                    </span>
                  </span>

                  <h3 className="font-display text-[1.4rem] font-semibold text-navy-950 lg:mt-7">
                    {s.title}
                  </h3>
                </div>

                <p className="mt-4 text-[0.96rem] leading-[1.75] text-navy-700/80 lg:pr-6">{s.body}</p>

                <ul className="mt-5 space-y-2.5">
                  {s.detail.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-[0.87rem] text-navy-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-100 ring-1 ring-gold-300/50">
                        <Icon name="check" className="h-3 w-3 text-gold-700" />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <Button to="/book-consultation" size="lg" icon="arrowRight">
            Start with a free call
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}
