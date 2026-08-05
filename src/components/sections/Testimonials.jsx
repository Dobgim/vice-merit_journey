import { testimonials } from '../../data/site'
import { Aurora, Badge, Section, Stars } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'

function TestimonialCard({ t }) {
  return (
    <figure className="group relative flex h-full flex-col rounded-2xl border border-white/[0.09] bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-gold-300/25 hover:bg-white/[0.07]">
      <Icon
        name="quote"
        className="absolute right-6 top-6 h-9 w-9 text-white/[0.06] transition-colors duration-500 group-hover:text-gold-300/20"
      />

      <Stars count={t.rating} />

      <blockquote className="relative mt-5 flex-1 text-[0.97rem] leading-[1.8] text-navy-100/80">
        “{t.quote}”
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-3.5 border-t border-white/[0.08] pt-5">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-200 to-gold-400 font-display text-sm font-semibold text-navy-950">
          {t.initials}
        </span>
        <div className="min-w-0">
          <div className="truncate font-semibold text-white">{t.name}</div>
          <div className="truncate text-[0.78rem] text-navy-100/55">{t.role}</div>
        </div>
      </figcaption>

      <Badge variant="dark" icon="award" className="mt-4 self-start">
        {t.award}
      </Badge>
    </figure>
  )
}

export default function Testimonials() {
  return (
    <Section id="stories" tone="dark" className="overflow-hidden">
      <Aurora />

      <div className="container relative">
        <SectionHeading
          tone="dark"
          eyebrow="Success stories"
          title="The students behind"
          accent="the numbers"
          lede="Every award below belongs to someone who was once unsure whether they were even eligible."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={0.08 * (i % 3)}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>

        {/* Aggregate rating strip */}
        <Reveal delay={0.15} className="mt-14">
          <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 sm:flex-row sm:gap-10">
            <div className="flex items-center gap-3">
              <Stars />
              <span className="font-display text-lg text-white">4.9 / 5</span>
            </div>
            <span className="hidden h-8 w-px bg-white/10 sm:block" />
            <p className="text-center text-[0.9rem] text-navy-100/65 sm:text-left">
              Average advisor rating across{' '}
              <span className="font-semibold text-white">610 verified reviews</span> from students
              in 34 countries.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
