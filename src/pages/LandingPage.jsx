import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import OpportunityGrid from '../components/ui/OpportunityGrid'
import Button from '../components/ui/Button'
import Newsletter from '../components/sections/Newsletter'
import useAllOpportunities from '../hooks/useAllOpportunities'
import { buildLandingPages } from '../lib/eligibility'
import NotFound from './NotFound'

const CRUMB = { for: 'By nationality', 'study-in': 'By study country', level: 'By level' }

/**
 * One landing page per nationality (/for/cameroon), host country
 * (/study-in/germany) or level (/level/phd) — the open opportunities that
 * match, so searches like "scholarships for Cameroonian students" land on a
 * page made for them.
 */
export default function LandingPage({ type }) {
  const { slug } = useParams()
  const entries = useAllOpportunities()
  const pages = useMemo(() => buildLandingPages(entries), [entries])
  const page = pages.find((p) => p.type === type && p.slug === slug)
  const matches = useMemo(() => (page ? entries.filter(page.test) : []), [entries, page])

  // Neighbouring pages of the same kind, for easy browsing.
  const siblings = pages.filter((p) => p.type === type && p.slug !== slug).slice(0, 18)

  if (!page) return <NotFound />

  return (
    <>
      <Seo title={page.title} description={`${page.lede} ${matches.length} open now.`} />

      <PageHeader
        crumbs={[{ label: 'Explore', to: '/explore' }]}
        crumb={page.label}
        eyebrow={CRUMB[type]}
        title={page.heading[0]}
        accent={page.heading[1]}
        lede={page.lede}
      >
        <p className="mb-6 inline-flex items-baseline gap-2.5 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20 backdrop-blur">
          <span className="font-display text-3xl font-semibold leading-none text-gold-300 tabular-nums">{matches.length}</span>
          <span className="text-base font-semibold text-white">open opportunities</span>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/eligibility" variant="gold" size="lg" icon="arrowRight">
            Am I eligible?
          </Button>
          <Button to="/book-consultation" variant="ghostLight" size="lg" icon="arrowRight">
            Get expert help applying
          </Button>
        </div>
      </PageHeader>

      <Section tone="light">
        <div className="container">
          {type === 'for' && (
            <p className="mx-auto mb-10 max-w-2xl text-center text-sm leading-relaxed text-navy-600">
              Based on each call’s published “who can apply” rules. Some programmes use a country list — always confirm your eligibility on the official page before applying.
            </p>
          )}
          <OpportunityGrid entries={matches} empty="Nothing open right now — check back soon, new calls are added every day." />

          {siblings.length > 0 && (
            <div className="mt-16 text-center">
              <h2 className="font-display text-xl font-semibold text-navy-950">Explore more</h2>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {siblings.map((p) => (
                  <Link key={p.path} to={p.path} className="rounded-full border border-navy-900/10 bg-white px-4 py-2 text-sm font-medium text-navy-700 transition-colors hover:border-navy-900/30 hover:text-navy-950">
                    {p.label}
                  </Link>
                ))}
                <Link to="/explore" className="rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white">
                  See all
                </Link>
              </div>
            </div>
          )}
        </div>
      </Section>

      <Newsletter />
    </>
  )
}
