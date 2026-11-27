import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import Button from '../components/ui/Button'
import DeadlineChip from '../components/ui/DeadlineChip'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import { useOpportunities } from '../hooks/useScholarships'
import { byDeadline, formatDate } from '../lib/deadline'
import { COLLECTIONS, englishRoute } from '../lib/collections'
import { CALENDAR_PATH } from '../lib/deadlineCalendar'

/** One scholarship: name, where and level, deadline, and (on the IELTS page) how English is proven. */
function Row({ item, showRoute }) {
  const routes = showRoute ? englishRoute(item) : []
  return (
    <li className="relative rounded-2xl border border-navy-900/[0.07] bg-white p-5 shadow-soft transition-colors hover:border-navy-900/25">
      <h3 className="font-display text-lg font-semibold leading-snug text-navy-950">
        <Link to={`/scholarships/${item.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {item.name}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-navy-700">
        {item.flag ? `${item.flag} ` : ''}
        {item.country}
        {item.level ? ` · ${item.level}` : ''}
        {item.funding ? ` · ${item.funding}` : ''}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-navy-900">Deadline {formatDate(item.deadline)}</span>
        <DeadlineChip deadline={item.deadline} />
        {routes.map((r) => (
          <span key={r} className="rounded-full bg-gold-300/25 px-3 py-1 text-xs font-semibold text-navy-900 ring-1 ring-gold-400/40">
            {r}
          </span>
        ))}
      </div>
    </li>
  )
}

/**
 * A topic page built from the open scholarships (see lib/collections.js):
 * scholarships without IELTS, fully funded scholarships for Africans.
 */
export default function CollectionPage({ which }) {
  const c = COLLECTIONS[which]
  const scholarships = useOpportunities('scholarships')
  const all = useMemo(() => scholarships.filter(c.test).sort(byDeadline), [scholarships, c])

  // Each listing appears once, in the first group it fits.
  const groups = useMemo(() => {
    if (!c.groups) return [{ key: 'all', title: null, items: all }]
    const seen = new Set()
    return c.groups.map((g) => {
      const items = all.filter((i) => !seen.has(i.slug) && g.test(i))
      items.forEach((i) => seen.add(i.slug))
      return { ...g, items }
    })
  }, [all, c])

  return (
    <>
      <Seo title={c.seo.title} description={c.seo.description} />

      <PageHeader crumbs={[{ label: 'Scholarships', to: '/scholarships' }]} crumb={c.eyebrow} eyebrow={c.eyebrow} title={c.title} accent={c.accent} lede={c.lede}>
        <p className="mb-6 inline-flex items-baseline gap-2.5 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20 backdrop-blur">
          <span className="font-display text-3xl font-semibold leading-none text-gold-300 tabular-nums">{all.length}</span>
          <span className="text-base font-semibold text-white">open now</span>
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#list" variant="gold" size="lg" icon="arrowRight">
            See the scholarships
          </Button>
          <Button to="/book-consultation" variant="ghostLight" size="lg" icon="arrowRight">
            Get help applying
          </Button>
        </div>
      </PageHeader>

      <Section tone="light">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl font-semibold text-navy-950">Before you apply</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-relaxed text-navy-700">
            {c.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="light" id="list" className="scroll-mt-24">
        <div className="container max-w-4xl">
          {all.length === 0 && (
            <p className="rounded-2xl border border-navy-900/[0.07] bg-white p-8 text-center text-base text-navy-700 shadow-soft">
              Nothing is open right now. New scholarships are added every day.
            </p>
          )}
          {groups.map((g) =>
            g.items.length ? (
              <section key={g.key} className="mb-14">
                {g.title && (
                  <h2 className="mb-5 font-display text-2xl font-semibold text-navy-950">
                    {g.title} <span className="text-navy-400">({g.items.length})</span>
                  </h2>
                )}
                <ol className="grid gap-3">
                  {g.items.map((item) => (
                    <Row key={item.slug} item={item} showRoute={which === 'no-ielts'} />
                  ))}
                </ol>
              </section>
            ) : null
          )}

          <p className="mt-4 text-center text-base text-navy-700">
            Planning ahead? See every{' '}
            <Link to={CALENDAR_PATH} className="font-semibold text-navy-900 underline underline-offset-4">
              fully funded scholarship by deadline month
            </Link>
            .
          </p>
        </div>
      </Section>

      <WhatsAppGroup />
    </>
  )
}
