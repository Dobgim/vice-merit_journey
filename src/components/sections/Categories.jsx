import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { categories } from '../../data/site'
import { Aurora, Badge, Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import { Stagger, StaggerItem } from '../ui/Reveal'
import Icon from '../ui/Icon'

const MotionLink = motion.create(Link)

export default function Categories() {
  return (
    <Section id="categories" tone="dark" className="overflow-hidden">
      <Aurora />

      <div className="container relative">
        <SectionHeading
          tone="dark"
          eyebrow="Scholarship categories"
          title="Funding for every stage of"
          accent="your journey"
          lede="Whatever you are studying and wherever you are starting from, there is a category built for your profile — and an advisor who specialises in it."
        />

        <Stagger className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <StaggerItem key={c.title}>
              <MotionLink
                to={
                  c.filter && c.filter !== 'All'
                    ? `/scholarships?type=${encodeURIComponent(c.filter)}`
                    : '/scholarships'
                }
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative block h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-500 hover:border-gold-300/30 hover:bg-white/[0.07]"
              >
                {/* Gradient wash keyed to the category */}
                <span
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${c.accent} opacity-0 transition-opacity duration-700 group-hover:opacity-30`}
                />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.07] text-gold-200 ring-1 ring-white/15 transition-transform duration-500 group-hover:-rotate-6">
                      <Icon name={c.icon} className="h-[1.35rem] w-[1.35rem]" />
                    </span>
                    <Badge variant="dark">{c.count}</Badge>
                  </div>

                  <h3 className="mt-6 font-display text-xl font-semibold text-white">{c.title}</h3>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-[1.7] text-navy-100/65">{c.body}</p>

                  <span className="mt-6 inline-flex items-center gap-2 text-[0.83rem] font-semibold text-gold-200">
                    Explore awards
                    <Icon
                      name="arrowRight"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </MotionLink>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
