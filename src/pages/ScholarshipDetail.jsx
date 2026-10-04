import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Newsletter from '../components/sections/Newsletter'
import { ScholarshipCard } from '../components/sections/Scholarships'
import { Badge, Card, IconTile, Section } from '../components/ui/Primitives'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import DeadlineChip from '../components/ui/DeadlineChip'
import ShareBar from '../components/ui/ShareBar'
import Icon from '../components/ui/Icon'
import useScholarships from '../hooks/useScholarships'
import { byDeadline, deadlineStatus, formatDate } from '../lib/deadline'
import { company } from '../data/site'
import NotFound from './NotFound'

/* ----------------------------------------------------------------- Helpers */

/** Highlights the table-of-contents entry for the section currently in view. */
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  const key = ids.join('|')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id)
      },
      { rootMargin: '-110px 0px -60% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return active
}

function Block({ id, icon, title, children }) {
  return (
    <Reveal as="section" id={id} className="scroll-mt-28" blur={false}>
      <Card hover={false} className="p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <IconTile name={icon} tone="light" />
          <h2 className="font-display text-[1.45rem] font-semibold text-navy-950">{title}</h2>
        </div>
        <div className="mt-6">{children}</div>
      </Card>
    </Reveal>
  )
}

function Checklist({ items, icon = 'check', tone = 'text-emerald-600' }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.95rem] leading-[1.65] text-navy-800">
          <Icon name={icon} className={`mt-1 h-4 w-4 shrink-0 ${tone}`} />
          {item}
        </li>
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------- Page */

export default function ScholarshipDetail() {
  const { slug } = useParams()
  const items = useScholarships()
  const s = items.find((i) => i.slug === slug)

  const related = useMemo(() => {
    if (!s) return []
    const score = (i) => (i.level === s.level ? 2 : 0) + (i.country === s.country ? 1 : 0) + (i.funding === s.funding ? 1 : 0)
    return items
      .filter((i) => i.slug !== s.slug && deadlineStatus(i.deadline).state !== 'closed')
      .sort((a, b) => score(b) - score(a) || byDeadline(a, b))
      .slice(0, 3)
  }, [items, s])

  const sections = s
    ? [
        { id: 'at-a-glance', label: 'At a glance', show: true },
        { id: 'overview', label: 'Overview', show: s.overview?.length },
        { id: 'eligibility', label: 'Eligibility', show: s.eligibility?.length },
        { id: 'benefits', label: 'Benefits', show: s.benefits?.length },
        { id: 'documents', label: 'Required documents', show: s.documents?.length },
        { id: 'how-to-apply', label: 'How to apply', show: s.howToApply?.length },
        { id: 'key-dates', label: 'Key dates', show: s.timeline?.length },
        { id: 'faq', label: 'FAQ', show: s.faqs?.length },
      ].filter((x) => x.show)
    : []

  const active = useActiveSection(sections.map((x) => x.id))

  if (!s) return <NotFound />

  const status = deadlineStatus(s.deadline)
  const helpHref = `/book-consultation?scholarship=${encodeURIComponent(s.name)}`
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const facts = [
    { label: 'Host / provider', value: s.org, icon: 'building' },
    { label: 'Host country', value: `${s.flag} ${s.country}`, icon: 'globe' },
    { label: 'Study level', value: s.level, icon: 'cap' },
    { label: 'Funding type', value: s.funding, icon: 'wallet' },
    { label: 'Award value', value: s.amount, icon: 'award' },
    { label: 'Duration', value: s.duration, icon: 'clock' },
    { label: 'Eligible applicants', value: s.nationalities, icon: 'users' },
    { label: 'Fields of study', value: s.fields, icon: 'book' },
    { label: 'Application deadline', value: formatDate(s.deadline), icon: 'calendar' },
    { label: 'Last verified', value: s.verified ? formatDate(s.verified) : null, icon: 'shield' },
  ].filter((f) => f.value)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Scholarships', item: `${window.location.origin}/scholarships` },
          { '@type': 'ListItem', position: 3, name: s.name, item: pageUrl },
        ],
      },
      {
        '@type': 'MonetaryGrant',
        name: s.name,
        description: s.summary,
        url: s.officialUrl,
        funder: { '@type': 'Organization', name: s.org },
      },
      ...(s.faqs?.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: s.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ],
  }

  return (
    <>
      <Seo
        title={s.name}
        description={`${s.name}: ${s.summary} Eligibility, benefits, required documents, deadline and how to apply.`}
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow={`${s.country} · ${s.level}`}
        title={s.name}
        lede={s.summary}
        crumbs={[{ label: 'Scholarships', to: '/scholarships' }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={s.funding === 'Fully Funded' ? 'gold' : 'dark'} icon={s.funding === 'Fully Funded' ? 'star' : 'half'}>
            {s.funding}
          </Badge>
          <DeadlineChip deadline={s.deadline} tone="dark" />
          <Badge variant="dark" icon="calendar">
            Deadline {formatDate(s.deadline)}
          </Badge>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {s.officialUrl && (
            <Button href={s.officialUrl} target="_blank" rel="noopener noreferrer" variant="gold" size="lg" icon="external">
              {status.state === 'closed' ? 'Official page' : 'Apply on official site'}
            </Button>
          )}
          <Button to={helpHref} variant="ghostLight" size="lg" icon="arrowRight">
            Get expert help applying
          </Button>
        </div>
      </PageHeader>

      <Section tone="light" className="!pt-12 sm:!pt-16">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <div className="grid min-w-0 gap-6">
            {status.state === 'closed' && (
              <div className="flex gap-3 rounded-2xl border border-gold-300/60 bg-gold-50 p-5 text-[0.92rem] leading-[1.65] text-gold-900">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                <p>
                  <span className="font-semibold">This cycle has closed.</span> Most awards reopen on a similar
                  timetable each year — use the details below to prepare early, or{' '}
                  <a href="#alerts" className="font-semibold underline underline-offset-2">
                    get an alert
                  </a>{' '}
                  when the next round opens.
                </p>
              </div>
            )}

            <Block id="at-a-glance" icon="list" title="At a glance">
              <dl className="grid overflow-hidden rounded-xl border border-navy-900/[0.07] sm:grid-cols-2">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="-mb-px flex gap-3 border-b border-navy-900/[0.07] p-4 sm:even:border-l"
                  >
                    <Icon name={f.icon} className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                    <div className="min-w-0">
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-wider text-navy-500">{f.label}</dt>
                      <dd className="mt-1 text-[0.93rem] font-semibold leading-snug text-navy-900">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Block>

            {s.overview?.length > 0 && (
              <Block id="overview" icon="doc" title="Overview">
                <div className="grid gap-4 text-[0.98rem] leading-[1.8] text-navy-800">
                  {s.overview.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
              </Block>
            )}

            {s.eligibility?.length > 0 && (
              <Block id="eligibility" icon="checkCircle" title="Who can apply">
                <Checklist items={s.eligibility} />
              </Block>
            )}

            {s.benefits?.length > 0 && (
              <Block id="benefits" icon="award" title="What the award covers">
                <Checklist items={s.benefits} icon="star" tone="text-gold-500" />
              </Block>
            )}

            {s.documents?.length > 0 && (
              <Block id="documents" icon="file" title="Required documents">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {s.documents.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 rounded-xl border border-navy-900/[0.07] bg-mist/60 p-3.5 text-[0.9rem] leading-[1.55] text-navy-800"
                    >
                      <Icon name="doc" className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Block>
            )}

            {s.howToApply?.length > 0 && (
              <Block id="how-to-apply" icon="pen" title="How to apply, step by step">
                <ol className="grid gap-4">
                  {s.howToApply.map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-semibold text-gold-200">
                        {i + 1}
                      </span>
                      <p className="pt-1 text-[0.95rem] leading-[1.65] text-navy-800">{step}</p>
                    </li>
                  ))}
                </ol>
                {s.officialUrl && (
                  <div className="mt-7 flex flex-col gap-3 border-t border-navy-900/[0.07] pt-6 sm:flex-row">
                    <Button href={s.officialUrl} target="_blank" rel="noopener noreferrer" size="md" icon="external">
                      Go to official application
                    </Button>
                    <Button to={helpHref} variant="outline" size="md" icon="arrowRight">
                      Have an advisor review my file
                    </Button>
                  </div>
                )}
              </Block>
            )}

            {s.timeline?.length > 0 && (
              <Block id="key-dates" icon="calendar" title="Key dates">
                <ol className="relative grid gap-5 border-l border-navy-900/10 pl-6">
                  {s.timeline.map((t) => (
                    <li key={t.label} className="relative">
                      <span className="absolute -left-[1.81rem] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-gold-400 ring-1 ring-gold-400/40" />
                      <div className="text-[0.78rem] font-semibold uppercase tracking-wider text-gold-700">{t.date}</div>
                      <div className="mt-0.5 text-[0.95rem] font-medium text-navy-900">{t.label}</div>
                    </li>
                  ))}
                </ol>
              </Block>
            )}

            {s.faqs?.length > 0 && (
              <Block id="faq" icon="quote" title="Frequently asked questions">
                <div className="grid gap-3">
                  {s.faqs.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-xl border border-navy-900/[0.08] bg-white p-4 open:bg-mist/60"
                    >
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                        {f.q}
                        <Icon name="plus" className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45" />
                      </summary>
                      <p className="mt-3 text-[0.93rem] leading-[1.7] text-navy-700">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Block>
            )}

            <p className="flex gap-3 rounded-2xl border border-navy-900/[0.07] bg-white p-5 text-[0.82rem] leading-[1.65] text-navy-600">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
              <span>
                Details were checked against the official source
                {s.verified ? ` on ${formatDate(s.verified)}` : ''}. Awarding bodies can change terms and dates
                at any time, so always confirm on the official website before applying. {company.name} is an
                independent consultancy and is not affiliated with {s.org}.
              </span>
            </p>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0">
            <div className="grid gap-5 lg:sticky lg:top-24">
              <Card hover={false} className="hidden p-5 lg:block">
                <p className="eyebrow text-navy-500">On this page</p>
                <nav aria-label="On this page" className="mt-3 grid gap-0.5">
                  {sections.map((x) => (
                    <a
                      key={x.id}
                      href={`#${x.id}`}
                      className={`rounded-lg border-l-2 px-3 py-1.5 text-[0.88rem] transition-colors ${
                        active === x.id
                          ? 'border-gold-400 bg-mist font-semibold text-navy-950'
                          : 'border-transparent text-navy-600 hover:text-navy-950'
                      }`}
                    >
                      {x.label}
                    </a>
                  ))}
                </nav>
              </Card>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 p-6 text-white shadow-lift">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/25 blur-[60px]" />
                <div className="relative">
                  <IconTile name="users" tone="glass" />
                  <h3 className="mt-4 font-display text-[1.25rem] font-semibold leading-snug">
                    Want a stronger shot at this award?
                  </h3>
                  <p className="mt-2 text-[0.88rem] leading-[1.65] text-navy-100/70">
                    An advisor will check your eligibility, review your essays and run a mock interview for this
                    exact scholarship.
                  </p>
                  <Button to={helpHref} variant="gold" size="sm" icon="arrowRight" className="mt-5 w-full">
                    Book a free consultation
                  </Button>
                  <a
                    href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Hi ${company.name} — I need help applying for the ${s.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center justify-center gap-2 text-[0.83rem] font-semibold text-navy-100/80 hover:text-white"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    Or ask on WhatsApp
                  </a>
                </div>
              </div>

              <Card hover={false} className="p-5">
                <p className="eyebrow text-navy-500">Share this scholarship</p>
                <p className="mt-2 text-[0.85rem] leading-[1.6] text-navy-600">
                  Know someone who should apply? Send it to them.
                </p>
                <div className="mt-4">
                  <ShareBar title={s.name} url={pageUrl} />
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="white" className="!py-16 sm:!py-20">
          <div className="container">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-navy-500">Keep exploring</p>
                <h2 className="mt-3 font-display text-[1.9rem] font-semibold text-navy-950">Similar scholarships</h2>
              </div>
              <Button to="/scholarships" variant="outline" size="sm" icon="arrowRight">
                All scholarships
              </Button>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ScholarshipCard key={item.slug} item={item} />
              ))}
            </div>
          </div>
        </Section>
      )}

      <div id="alerts" className="scroll-mt-24">
        <Newsletter />
      </div>
    </>
  )
}
