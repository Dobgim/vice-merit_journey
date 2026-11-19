import { useMemo, useState } from 'react'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import OpportunityGrid from '../components/ui/OpportunityGrid'
import Button from '../components/ui/Button'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import { useOpportunities } from '../hooks/useScholarships'
import { byDeadline } from '../lib/deadline'
import { LEVELS, matchesLevel } from '../lib/eligibility'
import { CSC_COVER, CSC_GROUPS, CSC_STEPS, CSC_TIPS, chinaSeo, cscType, isChinaGov } from '../lib/chinaGov'

const LEVEL_CHOICES = [{ slug: 'all', short: 'All levels' }, ...LEVELS.filter((l) => ['undergraduate', 'masters', 'phd'].includes(l.slug))]

/**
 * Every open Chinese Government Scholarship call, grouped by how you apply
 * (Type B through the university, Type A through the embassy, special
 * programmes), with a short guide to the CSC process.
 */
export default function ChinaGovScholarshipsPage() {
  const scholarships = useOpportunities('scholarships')
  const [level, setLevel] = useState('all')

  const all = useMemo(() => scholarships.filter(isChinaGov).sort(byDeadline), [scholarships])
  const shown = level === 'all' ? all : all.filter((i) => matchesLevel(i, LEVELS.find((l) => l.slug === level)))
  const groups = CSC_GROUPS.map((g) => ({ ...g, items: shown.filter((i) => cscType(i) === g.key) }))

  return (
    <>
      <Seo title={chinaSeo.title} description={chinaSeo.description} />

      <PageHeader
        crumbs={[{ label: 'Scholarships', to: '/scholarships' }]}
        crumb="Chinese Government Scholarship"
        eyebrow="Study in China · CSC"
        title="Chinese Government"
        accent="Scholarships 2027."
        lede="Fully funded places at Chinese universities, paid for by the Chinese government through the China Scholarship Council (CSC). Every call here is open now, with its deadline checked on the university’s own website."
      >
        <p className="mb-6 inline-flex items-baseline gap-2.5 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20 backdrop-blur">
          <span className="font-display text-3xl font-semibold leading-none text-gold-300 tabular-nums">{all.length}</span>
          <span className="text-base font-semibold text-white">open calls</span>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#calls" variant="gold" size="lg" icon="arrowRight">
            See the open calls
          </Button>
          <Button to="/book-consultation" variant="ghostLight" size="lg" icon="arrowRight">
            Get help with your CSC application
          </Button>
        </div>
      </PageHeader>

      <Section tone="light">
        <div className="container max-w-5xl">
          <h2 className="text-balance text-center font-display text-3xl font-semibold text-navy-950">Type A, Type B and special programmes</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-navy-700">{CSC_COVER}</p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {CSC_GROUPS.map((g) => (
              <a key={g.key} href={`#csc-${g.key}`} className="rounded-2xl border border-navy-900/[0.07] bg-white p-6 shadow-soft transition-colors hover:border-navy-900/20">
                <h3 className="font-display text-xl font-semibold text-navy-950">{g.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-navy-700">{g.body}</p>
              </a>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy-950">How to apply</h2>
              <ol className="mt-4 list-decimal space-y-3 pl-5 text-base leading-relaxed text-navy-700">
                {CSC_STEPS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy-950">Good to know</h2>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-navy-700">
                {CSC_TIPS.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="light" id="calls" className="scroll-mt-24">
        <div className="container">
          <div className="mask-fade-x -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
            {LEVEL_CHOICES.map((l) => (
              <button
                key={l.slug}
                type="button"
                onClick={() => setLevel(l.slug)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  level === l.slug ? 'bg-navy-900 text-white' : 'border border-navy-900/10 bg-white text-navy-700 hover:border-navy-900/30'
                }`}
              >
                {l.short}
              </button>
            ))}
          </div>

          {groups.map((g) => (
            <div key={g.key} id={`csc-${g.key}`} className="mb-16 scroll-mt-24">
              <h2 className="text-center font-display text-2xl font-semibold text-navy-950">
                {g.title} <span className="text-navy-400">({g.items.length})</span>
              </h2>
              <div className="mt-8">
                <OpportunityGrid
                  entries={g.items.map((item) => ({ kind: 'scholarships', item }))}
                  empty={
                    g.key === 'A'
                      ? 'Type A deadlines are set by the Chinese embassy in your country. Ask the embassy for this year’s date, and check the Type B calls above.'
                      : 'Nothing open at this level right now. New calls are added as universities publish them.'
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <WhatsAppGroup />
    </>
  )
}
