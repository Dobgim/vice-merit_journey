import { benefits } from '../../data/site'
import { Card, GridBackdrop, IconTile, Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { Stagger, StaggerItem } from '../ui/Reveal'
import Icon from '../ui/Icon'

export default function WhyChooseUs() {
  return (
    <Section id="about" tone="white" className="overflow-hidden">
      <GridBackdrop />

      <div className="container relative">
        <SectionHeading
          eyebrow="Why Merit Ledger"
          title="Guidance built on judgement,"
          accent="not guesswork"
          lede="Most students do not lose scholarships because they are unqualified. They lose them to weak targeting, a flat personal statement and a missed deadline. We fix all three."
        />

        <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <StaggerItem key={b.title}>
              <Card className="group h-full p-7">
                {/* Gold wash that blooms in on hover */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <IconTile name={b.icon} className="transition-transform duration-500 group-hover:scale-105" />
                  <h3 className="mt-6 font-display text-xl font-semibold text-navy-950">{b.title}</h3>
                  <p className="mt-3 text-[0.94rem] leading-[1.7] text-navy-700/80">{b.body}</p>
                </div>

                <span className="pointer-events-none absolute -bottom-px left-7 right-7 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Card>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ------------------------------------------------- Credibility strip */}
        <Reveal delay={0.1} className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 p-8 text-white sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold-400/15 blur-[90px]"
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
              <div>
                <h3 className="font-display text-[1.7rem] font-semibold leading-tight balance sm:text-[2.1rem]">
                  We tell students the truth about their chances — even when it costs us the sale.
                </h3>
                <p className="mt-5 max-w-xl text-[0.98rem] leading-[1.75] text-navy-100/70">
                  Nine years advising applicants has taught us that a realistic shortlist beats an
                  ambitious one. Every engagement opens with a candid profile audit: where you are
                  competitive, where you are not, and what would have to change.
                </p>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {[
                  ['Advisors are former scholars and reviewers', 'award'],
                  ['Written odds assessment before you commit', 'doc'],
                  ['Needs-based fee reductions available', 'wallet'],
                ].map(([label, icon]) => (
                  <li
                    key={label}
                    className="flex items-start gap-3.5 rounded-xl bg-white/[0.05] p-4 ring-1 ring-white/10"
                  >
                    <Icon name={icon} className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                    <span className="text-[0.9rem] leading-snug text-navy-100/85">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
