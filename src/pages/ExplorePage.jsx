import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import Button from '../components/ui/Button'
import useAllOpportunities from '../hooks/useAllOpportunities'
import { buildLandingPages } from '../lib/eligibility'

const GROUPS = [
  { type: 'level', title: 'By study level' },
  { type: 'study-in', title: 'By country you want to study in' },
  { type: 'for', title: 'By your nationality' },
]

/** Hub linking every landing page, with live counts. */
export default function ExplorePage() {
  const entries = useAllOpportunities()
  const pages = useMemo(
    () => buildLandingPages(entries).map((p) => ({ ...p, count: entries.filter(p.test).length })),
    [entries]
  )

  return (
    <>
      <Seo
        title="Explore opportunities by country, nationality and level"
        description="Browse open scholarships, fellowships, grants and internships by your nationality, the country you want to study in, or your study level."
      />
      <PageHeader
        crumb="Explore"
        eyebrow="Find your fit faster"
        title="Browse by where you’re from,"
        accent="where you want to go."
        lede="Pick your nationality, a study destination or your level to see only the opportunities that fit."
      >
        <Button to="/eligibility" variant="gold" size="lg" icon="arrowRight">
          Am I eligible?
        </Button>
      </PageHeader>

      <Section tone="light">
        <div className="container grid gap-14">
          {GROUPS.map((g) => (
            <div key={g.type}>
              <h2 className="font-display text-2xl font-semibold text-navy-950">{g.title}</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {pages
                  .filter((p) => p.type === g.type && p.count > 0)
                  .sort((a, b) => (g.type === 'level' ? 0 : a.label.localeCompare(b.label)))
                  .map((p) => (
                    <Link
                      key={p.path}
                      to={p.path}
                      className="inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-white px-4 py-2 text-sm font-medium text-navy-700 shadow-soft transition-colors hover:border-navy-900/30 hover:text-navy-950"
                    >
                      {p.label}
                      <span className="text-xs text-navy-400">{p.count}</span>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
