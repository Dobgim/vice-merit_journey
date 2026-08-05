import { services } from '../../data/site'
import { Card, IconTile, Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

export default function Services() {
  const [lead, ...rest] = services

  return (
    <Section id="services" tone="light">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="What we do"
            title="Everything between ambition and"
            accent="acceptance"
            lede="Take the full journey with an advisor, or pick only the pieces you need. Each service is delivered by a specialist, not a generalist."
          />
          <Reveal direction="left" delay={0.2} className="hidden lg:block">
            <Button to="/contact" variant="outline" size="md" icon="arrowRight">
              Discuss your package
            </Button>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {/* Feature card — the entry service, given extra visual weight */}
          <Reveal className="lg:row-span-2">
            <Card className="group flex h-full flex-col justify-between bg-navy-950 p-8 text-white" hover>
              <div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-400/20 opacity-70 blur-[70px] transition-opacity duration-700 group-hover:opacity-100"
                />
                <div className="relative">
                  <IconTile name={lead.icon} tone="glass" />
                  <span className="ml-3 inline-flex -translate-y-3 items-center rounded-full bg-gold-400/15 px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-gold-200 ring-1 ring-gold-300/25">
                    Start here
                  </span>

                  <h3 className="mt-6 font-display text-2xl font-semibold">{lead.title}</h3>
                  <p className="mt-3.5 text-[0.96rem] leading-[1.75] text-navy-100/70">{lead.body}</p>

                  <ul className="mt-7 space-y-3">
                    {lead.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-[0.9rem] text-navy-100/85">
                        <Icon name="check" className="h-4 w-4 shrink-0 text-gold-300" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button to="/contact" variant="gold" size="sm" icon="arrowRight" className="relative mt-9 self-start">
                Get matched
              </Button>
            </Card>
          </Reveal>

          {rest.map((s, i) => (
            <Reveal key={s.title} delay={0.06 * (i % 2)}>
              <Card className="group h-full p-7">
                  <div className="flex items-start gap-4">
                    <IconTile
                      name={s.icon}
                      tone="light"
                      className="transition-colors duration-500 group-hover:bg-navy-900 group-hover:text-gold-200"
                    />
                    <div>
                      <h3 className="font-display text-[1.15rem] font-semibold text-navy-950">
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-[0.9rem] leading-[1.7] text-navy-700/80">{s.body}</p>
                    </div>
                  </div>

                  <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2 border-t border-navy-900/[0.06] pt-4">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-navy-600"
                      >
                        <Icon name="check" className="h-3.5 w-3.5 text-gold-500" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 lg:hidden">
          <Button to="/contact" variant="outline" size="md" icon="arrowRight" className="w-full">
            Discuss your package
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}
