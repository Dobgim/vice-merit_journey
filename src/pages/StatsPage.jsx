import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import Button from '../components/ui/Button'
import { useOpportunities } from '../hooks/useScholarships'
import { scholarshipStats, statsSeo, COLLECTIONS } from '../lib/collections'
import { CALENDAR_PATH } from '../lib/deadlineCalendar'

/** A headline figure. */
function Stat({ value, label }) {
  return (
    <div className="rounded-2xl border border-navy-900/[0.07] bg-white p-5 shadow-soft">
      <p className="font-display text-4xl font-semibold leading-none text-navy-950 tabular-nums">{value}</p>
      <p className="mt-2 text-sm leading-snug text-navy-700">{label}</p>
    </div>
  )
}

/**
 * One measure as horizontal bars (a single series, so no legend: the heading
 * names it). Each bar is labelled with its value and shows a tooltip on hover.
 */
function Bars({ title, rows, unit }) {
  const max = Math.max(1, ...rows.map((r) => r.count))
  return (
    <figure className="rounded-2xl border border-navy-900/[0.07] bg-white p-6 shadow-soft">
      <figcaption className="font-display text-xl font-semibold text-navy-950">{title}</figcaption>
      <ol className="mt-5 grid gap-2.5">
        {rows.map((r) => (
          <li key={r.label ?? r.name} className="grid grid-cols-[minmax(7rem,11rem)_1fr] items-center gap-3 text-sm" title={`${r.label ?? r.name}: ${r.count} ${unit}`}>
            <span className="truncate text-navy-800">{r.label ?? r.name}</span>
            <span className="flex items-center gap-2">
              <span className="h-3 rounded-r-[4px] bg-navy-700" style={{ width: `${Math.max(2, (r.count / max) * 100)}%` }} />
              <span className="shrink-0 font-semibold tabular-nums text-navy-950">{r.count}</span>
            </span>
          </li>
        ))}
      </ol>
    </figure>
  )
}

/** The 2027 scholarship statistics report, worked out from every open listing. */
export default function StatsPage() {
  const scholarships = useOpportunities('scholarships')
  const fellowships = useOpportunities('fellowships')
  const grants = useOpportunities('grants')
  const internships = useOpportunities('internships')
  const competitions = useOpportunities('competitions')
  const s = useMemo(
    () =>
      scholarshipStats(scholarships, {
        fellowships: fellowships.length,
        grants: grants.length,
        internships: internships.length,
        competitions: competitions.length,
      }),
    [scholarships, fellowships, grants, internships, competitions]
  )
  const all = s.total + Object.values(s.otherCounts).reduce((a, b) => a + b, 0)

  return (
    <>
      <Seo title={statsSeo.title} description={statsSeo.description} />

      <PageHeader
        crumbs={[{ label: 'Scholarships', to: '/scholarships' }]}
        crumb="Statistics 2027"
        eyebrow="Research"
        title="Scholarship statistics"
        accent="2027."
        lede={`What ${all} open opportunities tell us about funding for 2027: how much is fully funded, which countries and levels offer the most, and when deadlines fall. Worked out from every call we track, each checked on the funder’s own site, and updated every day.`}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#figures" variant="gold" size="lg" icon="arrowRight">
            See the figures
          </Button>
          <Button to={CALENDAR_PATH} variant="ghostLight" size="lg" icon="arrowRight">
            Fully funded deadline calendar
          </Button>
        </div>
      </PageHeader>

      <Section tone="light" id="figures" className="scroll-mt-24">
        <div className="container max-w-5xl">
          <h2 className="font-display text-2xl font-semibold text-navy-950">Key figures</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Stat value={s.total} label="scholarships open now" />
            <Stat value={`${s.fullPct}%`} label={`fully funded (${s.full} of ${s.total})`} />
            <Stat value={s.countryCount} label="host countries" />
            <Stat value={all - s.total} label="fellowships, grants, internships and competitions" />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-navy-700">
            Fully funded awards cover tuition and living costs. The rest pay part of the costs: we only list partial awards worth at least half of tuition, US$10,000 a year, or a stipend.
            {s.busiest ? ` The busiest deadline month is ${s.busiest.label}, with ${s.busiest.count} scholarships closing.` : ''}{' '}
            Beyond scholarships, we track {s.otherCounts.fellowships} fellowships, {s.otherCounts.grants} grants, {s.otherCounts.internships} internships and {s.otherCounts.competitions} competitions.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Bars title="Scholarships closing each month" rows={s.byMonth} unit="scholarships closing" />
            <Bars title="Top 10 host countries" rows={s.topCountries} unit="open scholarships" />
          </div>

          <h2 className="mt-14 font-display text-2xl font-semibold text-navy-950">By level of study</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-900/[0.07] bg-white shadow-soft">
            <table className="w-full text-left text-base">
              <thead className="border-b border-navy-900/10 text-sm text-navy-600">
                <tr>
                  <th className="px-5 py-3 font-semibold">Level</th>
                  <th className="px-5 py-3 text-right font-semibold">Open scholarships</th>
                  <th className="px-5 py-3 text-right font-semibold">Fully funded</th>
                  <th className="px-5 py-3 text-right font-semibold">Share fully funded</th>
                </tr>
              </thead>
              <tbody>
                {s.levels.map((l) => (
                  <tr key={l.label} className="border-b border-navy-900/[0.05] last:border-0">
                    <td className="px-5 py-3 text-navy-900">{l.label}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{l.count}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{l.full}</td>
                    <td className="px-5 py-3 text-right tabular-nums">{l.count ? Math.round((l.full / l.count) * 100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-navy-600">A scholarship open to several levels is counted under each.</p>

          <h2 className="mt-14 font-display text-2xl font-semibold text-navy-950">How we count</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-navy-700">
            <li>Only calls that are open now, with a fixed closing date confirmed on the funder’s own website.</li>
            <li>Closed calls drop out automatically, so the figures change every day.</li>
            <li>
              {s.noIelts} open scholarships ({s.noIeltsPct}%) state in their official requirements that you can prove English without IELTS:{' '}
              <Link to={COLLECTIONS['no-ielts'].path} className="font-semibold text-navy-900 underline underline-offset-4">
                see them here
              </Link>
              .
            </li>
            <li>
              You may quote these figures with a link to this page (meritleaders.com/scholarship-statistics-2027).
            </li>
          </ul>
        </div>
      </Section>
    </>
  )
}
