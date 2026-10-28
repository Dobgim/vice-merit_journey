import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Newsletter from '../components/sections/Newsletter'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import { ScholarshipCard } from '../components/sections/Scholarships'
import { Badge, Card, IconTile, Section } from '../components/ui/Primitives'
import { hasApplicationFee } from '../lib/fees'
import { formatPosted } from '../lib/timing'
import useSaved, { toggleSaved } from '../lib/saved'
import { downloadDeadline } from '../lib/calendar'
import Reveal from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import DeadlineChip from '../components/ui/DeadlineChip'
import ShareBar from '../components/ui/ShareBar'
import Icon from '../components/ui/Icon'
import { useOpportunities } from '../hooks/useScholarships'
import useNow from '../hooks/useNow'
import { kinds } from '../data/opportunities'
import Flyer from '../components/ui/Flyer'
import FlyerDownload from '../components/ui/FlyerDownload'
import Countdown from '../components/ui/Countdown'
import OrgLogo from '../components/ui/OrgLogo'
import { byDeadline, deadlineStatus, formatDate } from '../lib/deadline'
import { company } from '../data/site'
import { buildOverview } from '../lib/overview'
import { criteriaFor } from '../data/criteria'
import { photos } from '../data/photos'
import { posts } from '../data/posts'
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
          <h2 className="font-display text-xl font-semibold text-navy-950">{title}</h2>
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
        <li key={item} className="flex gap-3 text-base leading-[1.65] text-navy-800">
          <Icon name={icon} className={`mt-1 h-4 w-4 shrink-0 ${tone}`} />
          {item}
        </li>
      ))}
    </ul>
  )
}

/* -------------------------------------------------------------------- Page */

export default function ScholarshipDetail({ kind = 'scholarships' }) {
  const config = kinds[kind]
  const { slug } = useParams()
  // Include closed calls so old links and flyers explain that the call has ended.
  const items = useOpportunities(kind, { includeClosed: true })
  const now = useNow(60_000)
  const isSaved = useSaved().has(slug)
  const s = items.find((i) => i.slug === slug)

  const related = useMemo(() => {
    if (!s) return []
    const score = (i) => (i.level === s.level ? 2 : 0) + (i.country === s.country ? 1 : 0) + (i.funding === s.funding ? 1 : 0)
    return items
      .filter((i) => i.slug !== s.slug && deadlineStatus(i.deadline, now).state !== 'closed')
      .sort((a, b) => score(b) - score(a) || byDeadline(a, b))
      .slice(0, 3)
  }, [items, s, now])

  const sections = s
    ? [
        { id: 'at-a-glance', label: 'At a glance', show: true },
        { id: 'can-i-apply', label: 'Can I apply?', show: true },
        { id: 'overview', label: 'Overview', show: true },
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

  // Deadline passed: the listing is no longer shown anywhere on the site.
  if (deadlineStatus(s.deadline, now).state === 'closed') {
    return (
      <>
        <Seo title={`${s.name} (closed)`} description={`Applications for ${s.name} have closed. See open ${config.plural} instead.`} />
        <PageHeader
          eyebrow={`${config.flyerLabel} · closed`}
          title={s.name}
          lede={`Applications closed on ${formatDate(s.deadline)}, so this ${config.singular} is no longer listed on our website.`}
          crumbs={[{ label: config.title, to: config.path }]}
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to={config.path} variant="gold" size="lg" icon="arrowRight">
              See open {config.plural}
            </Button>
            <Button href="#alerts" variant="ghostLight" size="lg" icon="bell" iconRight={false}>
              Alert me when it reopens
            </Button>
          </div>
        </PageHeader>

        {related.length > 0 && (
          <Section tone="light" className="!py-16 sm:!py-20">
            <div className="container">
              <p className="eyebrow text-navy-500">Still open</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-navy-950">Similar {config.plural} you can apply for now</h2>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ScholarshipCard key={item.slug} item={item} kind={kind} />
                ))}
              </div>
            </div>
          </Section>
        )}

        <div id="alerts" className="scroll-mt-24">
          <WhatsAppGroup />
          <Newsletter />
        </div>
      </>
    )
  }

  const status = deadlineStatus(s.deadline)
  const helpHref = `/book-consultation?scholarship=${encodeURIComponent(s.name)}`
  // Only ever link to the funder's own page — never a web search.
  const applyUrl = !s.officialSearch && s.officialUrl
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  const facts = [
    { label: 'Host / provider', value: s.org, icon: 'building' },
    { label: 'Host country', value: s.country, icon: 'globe' },
    { label: config.labels.level, value: s.level, icon: 'cap' },
    { label: config.labels.funding, value: s.funding, icon: 'wallet' },
    { label: config.labels.amount, value: s.amount, icon: 'award' },
    { label: 'Duration', value: s.duration, icon: 'clock' },
    { label: 'Eligible applicants', value: s.nationalities, icon: 'users' },
    { label: 'Fields of study', value: s.fields, icon: 'book' },
    { label: 'Application deadline', value: s.deadline ? formatDate(s.deadline) : s.deadlineNote ?? 'Rolling', icon: 'calendar' },
    { label: 'Posted', value: formatPosted(s), icon: 'sparkle' },
    { label: 'Last verified', value: s.verified ? formatDate(s.verified) : null, icon: 'shield' },
  ].filter((f) => f.value)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${window.location.origin}/` },
          { '@type': 'ListItem', position: 2, name: config.title, item: `${window.location.origin}${config.path}` },
          { '@type': 'ListItem', position: 3, name: s.name, item: pageUrl },
        ],
      },
      {
        '@type': 'MonetaryGrant',
        name: s.name,
        description: s.summary,
        url: applyUrl || pageUrl,
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
        eyebrow={`${config.flyerLabel} · ${s.country}`}
        title={s.name}
        lede={s.summary}
        crumbs={[{ label: config.title, to: config.path }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={/fully|paid|seed|prize|grant/i.test(s.funding ?? '') ? 'gold' : 'dark'} icon="star">
            {s.funding}
          </Badge>
          <Badge variant={hasApplicationFee(s) ? 'danger' : 'success'} icon={hasApplicationFee(s) ? 'wallet' : 'check'}>
            {hasApplicationFee(s) ? 'Application fee' : 'Free to apply'}
          </Badge>
          <DeadlineChip deadline={s.deadline} tone="dark" />
          <Badge variant="dark" icon="calendar">
            {s.deadline ? `Deadline ${formatDate(s.deadline)}` : 'Rolling deadline'}
          </Badge>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          {applyUrl && (
            <Button href={applyUrl} target="_blank" rel="noopener noreferrer" variant="gold" size="lg" icon="external">
              {status.state === 'closed' ? 'Official page' : 'Apply on official site'}
            </Button>
          )}
          <Button to={helpHref} variant="ghostLight" size="lg" icon="arrowRight">
            Get expert help applying
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-3">
          <Button as="button" type="button" onClick={() => toggleSaved(s.slug)} variant="ghostLight" size="sm" icon="bookmark" iconRight={false} aria-pressed={isSaved}>
            {isSaved ? 'Saved' : 'Save for later'}
          </Button>
          {s.deadline && status.state !== 'closed' && (
            <Button as="button" type="button" onClick={() => downloadDeadline(s, pageUrl)} variant="ghostLight" size="sm" icon="calendar" iconRight={false}>
              Add deadline to calendar
            </Button>
          )}
        </div>
      </PageHeader>

      <Section tone="light" className="!pt-12 sm:!pt-16">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main column */}
          <div className="grid min-w-0 gap-6">
            <Reveal blur={false}>
              <div className="overflow-hidden rounded-2xl shadow-lift ring-1 ring-navy-900/10">
                <Flyer item={s} kind={kind} label={config.flyerLabel} size="hero" />
              </div>
              {!s.image && photos[s.slug] && (
                <p className="mt-2 text-right text-xs text-navy-500">
                  Photo: {photos[s.slug].subject} —{' '}
                  <a href={photos[s.slug].page} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-navy-800">
                    {photos[s.slug].credit}, {photos[s.slug].license}
                  </a>
                  , via Wikimedia Commons
                </p>
              )}
            </Reveal>

            {!s.deadline && s.deadlineNote && (
              <div className="flex gap-3 rounded-2xl border border-navy-900/[0.08] bg-white p-5 text-base leading-[1.65] text-navy-800">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                <p>{s.deadlineNote}</p>
              </div>
            )}

            {s.deadline && s.deadlineNote && (
              <p className="flex gap-2 text-sm text-navy-600">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                {s.deadlineNote}
              </p>
            )}

            {status.state === 'closed' && (
              <div className="flex gap-3 rounded-2xl border border-gold-300/60 bg-gold-50 p-5 text-base leading-[1.65] text-gold-900">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                <p>
                  <span className="font-semibold">This cycle has closed.</span> Most opportunities reopen on a similar
                  timetable each year — use the details below to prepare early, or{' '}
                  <a href="#alerts" className="font-semibold underline underline-offset-2">
                    get an alert
                  </a>{' '}
                  when the next round opens.
                </p>
              </div>
            )}

            {s.deadline && <Countdown deadline={s.deadline} />}

            {s.org && (
              <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-navy-900/[0.07] bg-white p-4 shadow-soft">
                <OrgLogo item={s} size="lg" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-500">Offered by</p>
                  <p className="font-display text-lg font-semibold leading-snug text-navy-950">{s.org}</p>
                  <p className="text-sm text-navy-600">{s.country}</p>
                </div>
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
                      <dt className="text-xs font-semibold uppercase tracking-wider text-navy-500">{f.label}</dt>
                      <dd className="mt-1 text-base font-semibold leading-snug text-navy-900">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </Block>

            <Block id="can-i-apply" icon="checkCircle" title="Can I apply?">
              <p className="-mt-1 mb-4 text-base text-navy-700">
                Check each statement. If all of them are true for you, you can apply for this {config.singular}.
              </p>
              <dl className="overflow-hidden rounded-xl border border-navy-900/[0.08]">
                {criteriaFor(s, kind).map((c, i) => (
                  <div
                    key={c.label}
                    className={`grid gap-1 p-4 sm:grid-cols-[11rem_1fr] sm:gap-4 ${i ? 'border-t border-navy-900/[0.07]' : 'bg-gold-50/60'}`}
                  >
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-navy-500">
                      <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-gold-600" />
                      {c.label}
                    </dt>
                    <dd className={`text-base leading-snug text-navy-900 ${i ? '' : 'font-semibold'}`}>{c.text}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block id="overview" icon="doc" title="Overview">
              <div className="grid gap-7">
                {buildOverview(s, kind, config).map((part) => (
                  <div key={part.heading}>
                    <h3 className="font-display text-lg font-semibold text-navy-950">{part.heading}</h3>
                    {part.paragraphs?.map((p) => (
                      <p key={p.slice(0, 48)} className="mt-2.5 text-base leading-[1.8] text-navy-800">
                        {p}
                      </p>
                    ))}
                    {part.bullets && (
                      <ul className="mt-2.5 grid gap-2">
                        {part.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-base leading-[1.7] text-navy-800">
                            <Icon name="check" className="mt-1.5 h-4 w-4 shrink-0 text-gold-500" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Block>

            {s.eligibility?.length > 0 && (
              <Block id="eligibility" icon="checkCircle" title="Full eligibility details">
                <Checklist items={s.eligibility} />
              </Block>
            )}

            {s.benefits?.length > 0 && (
              <Block id="benefits" icon="award" title="What you get">
                <Checklist items={s.benefits} icon="star" tone="text-gold-500" />
              </Block>
            )}

            {s.documents?.length > 0 && (
              <Block id="documents" icon="file" title="Required documents">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {s.documents.map((d) => (
                    <li
                      key={d}
                      className="flex gap-3 rounded-xl border border-navy-900/[0.07] bg-mist/60 p-3.5 text-base leading-[1.55] text-navy-800"
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
                      <p className="pt-1 text-base leading-[1.65] text-navy-800">{step}</p>
                    </li>
                  ))}
                </ol>
                {applyUrl && (
                  <div className="mt-7 flex flex-col gap-3 border-t border-navy-900/[0.07] pt-6 sm:flex-row">
                    <Button href={applyUrl} target="_blank" rel="noopener noreferrer" size="md" icon="external">
                      Apply on official site
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
                      <div className="text-sm font-semibold uppercase tracking-wider text-gold-700">{t.date}</div>
                      <div className="mt-0.5 text-base font-medium text-navy-900">{t.label}</div>
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
                      <p className="mt-3 text-base leading-[1.7] text-navy-700">{f.a}</p>
                    </details>
                  ))}
                </div>
              </Block>
            )}

            <p className="flex gap-3 rounded-2xl border border-navy-900/[0.07] bg-white p-5 text-sm leading-[1.65] text-navy-600">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-navy-400" />
              <span>
                {s.source
                  ? `Details come from ${s.source} as of ${formatDate(s.verified)} and have not yet been checked against the official website.`
                  : `Details were checked against the official source${s.verified ? ` on ${formatDate(s.verified)}` : ''}.`}{' '}
                Awarding bodies can change terms and dates at any time, so always confirm on the official website before applying. {company.name} is an
                independent consultancy and is not affiliated with {s.org}.
              </span>
            </p>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0">
            {/* Only the section list stays pinned; the taller cards scroll with the page */}
            <div className="grid gap-5">
              <Card hover={false} id="flyer" className="scroll-mt-28 p-5">
                <p className="eyebrow text-navy-500">Flyer to share</p>
                <p className="mt-2 text-sm leading-[1.6] text-navy-600">
                  A ready-made image with the key details and the apply link — post it on WhatsApp, Facebook or
                  Instagram.
                </p>
                <div className="mt-4">
                  <FlyerDownload item={s} kind={kind} label={config.flyerLabel} />
                </div>
              </Card>

              {posts
                .filter((p) => p.related.includes(`${config.path}/${slug}`))
                .map((p) => (
                  <Link
                    key={p.slug}
                    to={p.to}
                    className="flex items-center gap-3 rounded-2xl border border-navy-900/[0.08] bg-white p-5 shadow-soft transition-colors hover:border-navy-900/[0.18]"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-950 text-gold-200">
                      <Icon name="book" className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="flex items-center gap-1.5 font-semibold text-navy-950">
                        Read our application guide
                        <Icon name="arrowRight" className="h-3.5 w-3.5" />
                      </span>
                      <span className="mt-0.5 block text-sm leading-snug text-navy-600">{p.title}</span>
                    </span>
                  </Link>
                ))}

              <Link
                to="/eligibility"
                className="flex items-center gap-3 rounded-2xl border border-gold-400/40 bg-gradient-to-br from-gold-50 to-white p-5 transition-colors hover:border-gold-400"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950">
                  <Icon name="checkCircle" className="h-5 w-5" />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-semibold text-navy-950">
                    Am I eligible?
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                  </span>
                  <span className="mt-0.5 block text-sm leading-snug text-navy-600">
                    See every open opportunity that accepts your nationality and level.
                  </span>
                </span>
              </Link>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 p-6 text-white shadow-lift">
                <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-400/25 blur-[60px]" />
                <div className="relative">
                  <IconTile name="users" tone="glass" />
                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
                    Want a stronger shot at this one?
                  </h3>
                  <p className="mt-2 text-sm leading-[1.65] text-navy-100/70">
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
                    className="mt-3 flex items-center justify-center gap-2 text-sm font-semibold text-navy-100/80 hover:text-white"
                  >
                    <Icon name="whatsapp" className="h-4 w-4" />
                    Or ask on WhatsApp
                  </a>
                </div>
              </div>

              <Card hover={false} className="p-5">
                <p className="eyebrow text-navy-500">Share this {config.singular}</p>
                <p className="mt-2 text-sm leading-[1.6] text-navy-600">
                  Know someone who should apply? Send it to them.
                </p>
                <div className="mt-4">
                  <ShareBar title={s.name} url={pageUrl} />
                </div>
              </Card>

              <Card hover={false} className="hidden p-5 lg:sticky lg:top-24 lg:block">
                <p className="eyebrow text-navy-500">On this page</p>
                <nav aria-label="On this page" className="mt-3 grid gap-0.5">
                  {sections.map((x) => (
                    <a
                      key={x.id}
                      href={`#${x.id}`}
                      className={`rounded-lg border-l-2 px-3 py-1.5 text-sm transition-colors ${
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
                <h2 className="mt-3 font-display text-3xl font-semibold text-navy-950">Similar {config.plural}</h2>
              </div>
              <Button to={config.path} variant="outline" size="sm" icon="arrowRight">
                All {config.plural}
              </Button>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ScholarshipCard key={item.slug} item={item} kind={kind} />
              ))}
            </div>
          </div>
        </Section>
      )}

      <div id="alerts" className="scroll-mt-24">
        <WhatsAppGroup />
        <Newsletter />
      </div>
    </>
  )
}
