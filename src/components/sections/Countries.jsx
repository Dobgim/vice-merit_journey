import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { countries } from '../../data/site'
import { Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { Stagger, StaggerItem } from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

const MotionLink = motion.create(Link)

export default function Countries() {
  return (
    <Section id="countries" tone="white" className="overflow-hidden">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          {/* Sticky intro column */}
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="Destinations"
              title="34 countries. One"
              accent="honest recommendation"
              lede="We advise on the destinations we know deeply — visa rules, committee culture, cost of living and post-study work rights included."
            />

            <Reveal delay={0.25} className="mt-9">
              <div className="rounded-2xl border border-navy-900/[0.07] bg-mist p-6">
                <div className="flex items-center gap-3">
                  <Icon name="mapPin" className="h-5 w-5 text-gold-600" />
                  <h3 className="font-display text-lg font-semibold text-navy-950">
                    Not sure where to apply?
                  </h3>
                </div>
                <p className="mt-3 text-[0.92rem] leading-[1.7] text-navy-700/80">
                  Destination choice is a funding decision as much as an academic one. We compare
                  your shortlist on award density, living costs and work rights before you commit.
                </p>
                <Button to="/book-consultation" variant="outline" size="sm" icon="arrowRight" className="mt-5">
                  Compare destinations
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Country grid */}
          <Stagger className="grid gap-3.5 sm:grid-cols-2" gap={0.06}>
            {countries.map((c) => (
              <StaggerItem key={c.name}>
                <MotionLink
                  to="/book-consultation"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                  className="group flex h-full items-center gap-4 rounded-xl border border-navy-900/[0.07] bg-white p-4 shadow-soft transition-colors duration-300 hover:border-gold-300/60"
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mist text-xl ring-1 ring-navy-900/[0.06] transition-transform duration-500 group-hover:scale-110"
                    aria-hidden
                  >
                    {c.flag}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold text-navy-950">{c.name}</div>
                    <div className="truncate text-[0.78rem] text-navy-500">{c.note}</div>
                  </div>

                  <div className="shrink-0 text-right">
                    <div className="text-[0.78rem] font-semibold text-gold-600">{c.awards}</div>
                    <Icon
                      name="arrowUpRight"
                      className="ml-auto mt-1 h-3.5 w-3.5 text-navy-300 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy-600"
                    />
                  </div>
                </MotionLink>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </Section>
  )
}
