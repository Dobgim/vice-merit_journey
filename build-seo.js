/**
 * Vite build plugin for search engines and social media. After the app is
 * built it writes, from the same data the site renders:
 *
 *  - dist/sitemap.xml — every page, opportunity and landing page;
 *  - dist/feeds/new.xml and dist/feeds/closing-soon.xml — RSS feeds that
 *    Make.com reads to post to Facebook, Instagram and LinkedIn: each item's
 *    description is the ready-to-post caption (lib/caption.js) and its
 *    enclosure the opportunity's flyer, drawn as dist/flyers/<kind>/<slug>.jpg;
 *  - a pre-rendered HTML file per opportunity, listing page, landing page
 *    and fixed page (dist/scholarships/<slug>.html, dist/about.html …, and
 *    the home page in dist/index.html) with its own title, description,
 *    canonical URL, social preview tags and readable content. Vercel serves
 *    these directly (cleanUrls), so Google and link previews see real content
 *    at once; the React app then takes over as usual;
 *  - dist/indexnow.json — the pages whose content changed since the version
 *    that is live, which .github/workflows/indexnow.yml submits to IndexNow
 *    (Bing, Yandex and others) once the deployment is live.
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { kinds } from './src/data/opportunities.js'
import { SITE_URL, benefits, company, countries, faqs, packageAddons, packageFaqs, packageSteps, packages, services, starterOffers, stats, steps } from './src/data/site.js'
import { courseFields, courses } from './src/data/courses.js'
import { destinations } from './src/data/destinations.js'
import { legal } from './src/data/legal.js'
import { photos } from './src/data/photos.js'
import { buildLandingPages } from './src/lib/eligibility.js'
import { socialCaption } from './src/lib/caption.js'
import { drawFlyer } from './src/lib/flyerImage.js'
import { parsePost, postJsonLd } from './src/lib/posts.js'
import { kindDescription, kindTitle, landingDescription, listingSeo, pageTitle, staticSeo } from './src/lib/seo.js'
import { buildOverview } from './src/lib/overview.js'
import { criteriaFor } from './src/data/criteria.js'
import { requirements } from './src/data/requirements.js'
import { retiredSlugs, withDirectLink } from './src/data/fixes-oct21-2026.js'
import { hasFixedDeadline, isOpenYet } from './src/lib/deadline.js'
import { giveaway, isGiveawayOpen } from './src/data/giveaway.js'

const LOGO = `${SITE_URL}/merit-leaders-logo.jpg`
const STATIC_PAGES = [
  '/', '/about', '/services', '/packages', '/scholarships', '/fellowships', '/grants', '/internships',
  '/competitions', '/courses', '/countries', '/blog', '/faq', '/book-consultation', '/eligibility', '/explore', '/privacy', '/terms',
]

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const isoDay = (s) => (/^\d{4}-\d{2}-\d{2}/.test(s ?? '') ? s.slice(0, 10) : null)
const today = () => new Date().toISOString().slice(0, 10)
const prettyDate = (iso) =>
  iso ? new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Rolling'
const imageFor = (item) => photos[item.slug]?.src ?? LOGO

/** Articles published on the site (content/blog/*.md). */
function blogPosts(root) {
  const dir = path.join(root, 'content', 'blog')
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => parsePost(f, fs.readFileSync(path.join(dir, f), 'utf8')))
}

/** Who can apply and documents from data/requirements.js, as the app adds them (hooks/useScholarships.js). */
const withRequirements = (item) => ({ ...item, ...requirements[item.slug] })

/**
 * Listings the site actually shows, as { kind, path, item }: the same
 * corrections, links and retirements as the app, so no page is pre-rendered
 * (or put in the sitemap) that the app would answer with "not found".
 */
function allEntries() {
  const seen = new Set()
  return Object.values(kinds).flatMap((k) =>
    k.items
      .filter((i) => i.slug && !retiredSlugs.has(i.slug))
      .map((i) => withRequirements(withDirectLink(i)))
      .filter((i) => hasFixedDeadline(i) && isOpenYet(i))
      .map((item) => ({ kind: k.key, path: `${k.path}/${item.slug}`, item }))
      .filter((e) => !seen.has(e.path) && seen.add(e.path))
  )
}
const isOpen = (item) => (isoDay(item.deadline) ?? '') >= today()

/* ---------------------------------------------------------------- Sitemap */

/**
 * Only pages worth indexing: closed listings stay online (they are noindex)
 * but are left out. lastmod is given only where it is a real date — stamping
 * every page with the build date teaches Google to ignore lastmod entirely.
 */
function sitemap(entries, landing, posts) {
  const urls = [
    ...posts.map((p) => ({ loc: p.to, lastmod: p.date?.toISOString().slice(0, 10) })),
    ...STATIC_PAGES.map((p) => ({ loc: p })),
    // The giveaway page is only listed while entries are open (see src/data/giveaway.js).
    ...(isGiveawayOpen() ? [{ loc: giveaway.path }] : []),
    ...entries.filter((e) => isOpen(e.item)).map((e) => ({ loc: e.path, lastmod: isoDay(e.item.verified) ?? isoDay(e.item.posted) })),
    ...landing.map((p) => ({ loc: p.path })),
  ]
  const body = urls
    .map((u) => `  <url><loc>${esc(SITE_URL + u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

/* ------------------------------------------------------------------ Feeds */

/** `flyers` maps a listing path to its flyer image URL; the description is the ready-to-post caption. */
function rss(title, description, entries, flyers) {
  const items = entries
    .map(({ kind, path: p, item }) => {
      const what = kinds[kind].singular
      const text = socialCaption(kind, item)
      return `    <item>
      <title>${esc(`${item.name} (${what}) — deadline ${prettyDate(item.deadline)}`)}</title>
      <link>${esc(SITE_URL + p)}</link>
      <guid isPermaLink="true">${esc(SITE_URL + p)}</guid>
      <pubDate>${new Date(/T\d\d:\d\d/.test(item.posted ?? '') ? item.posted : `${isoDay(item.posted) ?? isoDay(item.verified) ?? today()}T07:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(kinds[kind].title)}</category>
      <description>${esc(text)}</description>
      <enclosure url="${esc(flyers.get(p) ?? imageFor(item))}" length="0" type="image/jpeg" />
    </item>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(title)}</title>
    <link>${SITE_URL}</link>
    <description>${esc(description)}</description>
    <language>en</language>
${items}
  </channel>
</rss>
`
}

/* -------------------------------------------------------------- Prerender */

// Plain HTML for search engines; people with JavaScript see a spinner until the app replaces it.

const STYLE = `<style>.pr{max-width:960px;margin:0 auto;padding:7rem 1.25rem 4rem;font-family:'Source Sans 3',system-ui,sans-serif;color:#0f1b3d;line-height:1.65}.pr h1{font-family:'Source Serif 4',Georgia,serif;font-size:2rem;line-height:1.2;margin:.5rem 0 1rem}.pr .eb{color:#835525;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:.8rem}.pr dl{display:grid;grid-template-columns:max-content 1fr;gap:.4rem 1.25rem;margin:1.5rem 0}.pr dt{font-weight:700}.pr ul{padding-left:1.1rem}.pr a{color:#25376c}html.js .pr{visibility:hidden}html.js #root:has(.pr)::before{content:'';position:fixed;top:50%;left:50%;width:36px;height:36px;margin:-18px 0 0 -18px;border:3px solid #e5e7eb;border-top-color:#c9a227;border-radius:50%;animation:prs .8s linear infinite}@keyframes prs{to{transform:rotate(360deg)}}</style><script>document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.remove('js')},10000)</script>`

/**
 * <link rel="modulepreload"> tags for one page's code (src/pages/<name>.jsx)
 * and the chunks it imports, so the browser fetches them alongside the main
 * script instead of after it. `chunks` comes from the build (generateBundle).
 */
function preloadTags(chunks, name) {
  const files = new Set()
  // index.html already preloads the main script and what it imports.
  const loaded = new Set([...chunks.values()].filter((c) => c.isEntry).flatMap((c) => [c.fileName, ...c.imports]))
  const add = (file) => {
    const c = chunks.get(file)
    if (!c || loaded.has(file) || files.has(file)) return
    files.add(file)
    c.imports.forEach(add)
  }
  for (const c of chunks.values()) if (c.facadeModuleId?.endsWith(`/src/pages/${name}.jsx`)) add(c.fileName)
  return [...files].map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`).join('')
}

/** Links to the main pages, added under every pre-rendered page so each one can be reached by following links. */
const SITE_LINKS = [
  ['/', 'Home'], ['/scholarships', 'Scholarships'], ['/fellowships', 'Fellowships'], ['/grants', 'Grants'], ['/internships', 'Internships'],
  ['/competitions', 'Competitions & Awards'], ['/courses', 'Free Courses'], ['/explore', 'Browse by nationality & level'], ['/eligibility', 'Am I eligible?'],
  ['/countries', 'Study Destinations'], ['/services', 'Services'], ['/packages', 'Packages & Pricing'], ['/blog', 'Blog'], ['/faq', 'FAQ'],
  ['/about', 'About Us'], ['/book-consultation', 'Book a Consultation'], ['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Service'],
]
const siteNav = () => `<nav aria-label="Site"><h2>${esc(company.name)}</h2><p>${SITE_LINKS.map(([to, label]) => `<a href="${to}">${esc(label)}</a>`).join(' · ')}</p></nav>`

function page(template, { title, description, url, image, body, preload = '', noindex = false }) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, (_, a, b) => a + esc(description) + b)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, (_, a, b) => a + esc(title) + b)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, (_, a, b) => a + esc(description) + b)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, (_, a, b) => a + esc(url) + b)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, (_, a, b) => a + esc(image) + b)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, (_, a, b) => a + esc(title) + b)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, (_, a, b) => a + esc(description) + b)
    .replace('</head>', () => `<link rel="canonical" href="${esc(url)}" />${noindex ? '<meta name="robots" content="noindex, follow" />' : ''}${preload}${STYLE}</head>`)
    .replace('<div id="root"></div>', () => `<div id="root"><main class="pr">${body}${siteNav()}</main></div>`)
}

const linkList = (list) =>
  `<ul>${list.map((e) => `<li><a href="${esc(e.path)}">${esc(e.item.name)}</a> — deadline ${prettyDate(e.item.deadline)}</li>`).join('')}</ul>`

/** As linkList, with each opportunity's one-line summary: used where the list is the page's main content. */
const summaryList = (list) =>
  `<ul>${list.map((e) => `<li><a href="${esc(e.path)}">${esc(e.item.name)}</a> — ${esc(kinds[e.kind].singular)}${e.item.country ? `, ${esc(e.item.country)}` : ''}. Deadline ${prettyDate(e.item.deadline)}.${e.item.summary ? ` ${esc(e.item.summary)}` : ''}</li>`).join('')}</ul>`

const items = (list, tag = 'ul') => `<${tag}>${list.map((x) => `<li>${esc(x)}</li>`).join('')}</${tag}>`
const section = (title, html) => (html ? `<h2>${esc(title)}</h2>${html}` : '')

/** Same three suggestions as the detail page: closest level, country and funding first. */
function similar(entry, open) {
  const s = entry.item
  const score = (i) => (i.level === s.level ? 2 : 0) + (i.country === s.country ? 1 : 0) + (i.funding === s.funding ? 1 : 0)
  return open
    .filter((e) => e.kind === entry.kind && e.item.slug !== s.slug)
    .sort((a, b) => score(b.item) - score(a.item) || a.item.deadline.localeCompare(b.item.deadline))
    .slice(0, 3)
}

/** The detail page's content as plain HTML, section for section. */
function detailBody(entry, open) {
  const { kind, item } = entry
  const config = kinds[kind]
  const closed = !isOpen(item)
  const official = !item.officialSearch && item.officialUrl
  const facts = [
    ['Host / provider', item.org],
    ['Host country', item.country],
    [config.labels.level, item.level],
    [config.labels.funding, item.funding],
    [config.labels.amount, item.amount],
    ['Duration', item.duration],
    ['Eligible applicants', item.nationalities],
    ['Fields of study', item.fields],
    ['Application deadline', item.deadline ? prettyDate(item.deadline) : item.deadlineNote],
    ['Last verified', item.verified && prettyDate(item.verified)],
  ].filter(([, v]) => v)
  const overview = buildOverview(item, kind, config)
    .map((part) => `<h3>${esc(part.heading)}</h3>${(part.paragraphs ?? []).map((p) => `<p>${esc(p)}</p>`).join('')}${part.bullets ? items(part.bullets) : ''}`)
    .join('')
  const can = criteriaFor(item, kind)
  return [
    `<nav><a href="/">Home</a> › <a href="${esc(config.path)}">${esc(config.title)}</a></nav>`,
    `<p class="eb">${esc(config.singular)}${item.country ? ` · ${esc(item.country)}` : ''}${closed ? ' · closed' : ''}</p><h1>${esc(item.name)}</h1><p>${esc(item.summary ?? '')}</p>`,
    closed ? '<p><strong>Applications for this cycle have closed.</strong> Most opportunities reopen on a similar timetable each year.</p>' : '',
    section('At a glance', `<dl>${facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`),
    item.deadlineNote ? `<p>${esc(item.deadlineNote)}</p>` : '',
    section('Can I apply?', can.length ? `<dl>${can.map((c) => `<dt>${esc(c.label)}</dt><dd>${esc(c.text)}</dd>`).join('')}</dl>` : ''),
    section('Overview', overview),
    section('Full eligibility details', item.eligibility?.length ? items(item.eligibility) : ''),
    section('What you get', item.benefits?.length ? items(item.benefits) : ''),
    section('Required documents', item.documents?.length ? items(item.documents) : ''),
    section('How to apply, step by step', item.howToApply?.length ? items(item.howToApply, 'ol') : ''),
    section('Key dates', item.timeline?.length ? items(item.timeline.map((t) => `${t.date}: ${t.label}`)) : ''),
    section('Frequently asked questions', (item.faqs ?? []).map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')),
    official ? `<p><a href="${esc(official)}" rel="noopener">Apply on the official site</a></p>` : '',
    section(`Similar ${config.plural} you can apply for now`, linkList(similar(entry, open))),
    `<p><a href="${esc(config.path)}">More ${esc(config.plural)}</a> · <a href="/eligibility">Am I eligible?</a> · <a href="/book-consultation">Get expert help applying</a></p>`,
  ].join('\n')
}

/* ------------------------------------------------------------ Fixed pages */

const money = (p) => (p ? `$${p.USD} / ${p.XAF.toLocaleString('en-US')} FCFA` : '')
const para = (list) => list.map((t) => `<p>${esc(t)}</p>`).join('')
const faqHtml = (list) => list.map((q) => `<h3>${esc(q.q)}</h3><p>${esc(q.a)}</p>`).join('')
const faqJsonLd = (list) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: list.map((q) => ({ '@type': 'Question', name: q.q, acceptedAnswer: { '@type': 'Answer', text: q.a } })),
})
const landingLinks = (landing, type) =>
  `<ul>${landing.filter((p) => p.type === type).map((p) => `<li><a href="${esc(p.path)}">${esc(p.title)}</a> — ${p.matches.length} open now</li>`).join('')}</ul>`

/** The pages of the same type listed just after this one (wrapping round), so every landing page is linked from several others. */
function neighbours(landing, p, count = 8) {
  const same = landing.filter((q) => q.type === p.type)
  const at = same.indexOf(p)
  return Array.from({ length: Math.min(count, same.length - 1) }, (_, i) => same[(at + 1 + i) % same.length])
}

/** One legal document (data/legal.js): paragraphs, with nested arrays as bullet lists. */
const legalBody = (doc) =>
  `<p class="eb">Legal</p><h1>${esc(doc.title)}</h1><p>${esc(doc.lede)}</p><p>Last updated ${esc(doc.updated)}.</p>` +
  doc.sections.map((sec) => `<h2>${esc(sec.title)}</h2>${sec.body.map((b) => (Array.isArray(b) ? items(b) : `<p>${esc(b)}</p>`)).join('')}`).join('')

/**
 * The fixed pages (home, about, services …) as { path, seo, body, jsonLd? }:
 * the same words the app shows, in plain HTML, so each has its own heading,
 * text and links instead of an empty shell.
 */
function staticPages({ open, landing, posts }) {
  const byKind = Object.values(kinds).map((k) => ({ k, count: open.filter((e) => e.kind === k.key).length }))
  const kindLinks = `<ul>${byKind.map(({ k, count }) => `<li><a href="${esc(k.path)}">${esc(k.title)}</a> — ${count} open now. ${esc(k.lede)}</li>`).join('')}</ul>`
  const postLinks = (list) => `<ul>${list.map((p) => `<li><a href="${esc(p.to)}">${esc(p.title)}</a> — ${esc(p.excerpt)}</li>`).join('')}</ul>`
  const newest = [...posts].sort((a, b) => (b.date ?? 0) - (a.date ?? 0))
  const closing = [...open].sort((a, b) => a.item.deadline.localeCompare(b.item.deadline)).slice(0, 12)
  const studyIn = new Map(landing.filter((p) => p.type === 'study-in').map((p) => [p.label, p]))
  const whatsapp = `https://wa.me/${company.whatsapp}`
  const contact = `<p>WhatsApp: <a href="${whatsapp}" rel="noopener">${esc(company.whatsappDisplay)}</a> · Email: <a href="mailto:${esc(company.email)}">${esc(company.email)}</a></p>`
  const cta = '<p><a href="/book-consultation">Book a free consultation</a> · <a href="/eligibility">Check what you are eligible for</a></p>'

  const pages = [
    {
      path: '/about',
      seo: staticSeo.about,
      body: `<p class="eb">About us</p><h1>About ${esc(company.name)}</h1><p>${esc(staticSeo.about.description)}</p>` +
        `<ul>${stats.map((x) => `<li>${x.value}${esc(x.suffix)} ${esc(x.label.toLowerCase())} (${esc(x.hint.toLowerCase())})</li>`).join('')}</ul>` +
        section('How we work', benefits.map((b) => `<h3>${esc(b.title)}</h3><p>${esc(b.body)}</p>`).join('')) +
        section('What happens when you contact us', `<ol>${steps.map((x) => `<li><strong>${esc(x.title)}.</strong> ${esc(x.body)}</li>`).join('')}</ol>`) +
        `<p><a href="/services">Our services</a> · <a href="/packages">Packages and prices</a> · <a href="/faq">Questions students ask</a></p>${cta}`,
    },
    {
      path: '/services',
      seo: staticSeo.services,
      body: `<p class="eb">Services</p><h1>Scholarship application services</h1><p>${esc(staticSeo.services.description)}</p>` +
        services.map((x) => `<h2>${esc(x.title)}</h2><p>${esc(x.body)}</p>${items(x.points)}`).join('') +
        section('How it works', `<ol>${steps.map((x) => `<li><strong>${esc(x.title)}.</strong> ${esc(x.body)}</li>`).join('')}</ol>`) +
        `<p><a href="/packages">See packages and prices</a></p>${cta}`,
    },
    {
      path: '/packages',
      seo: staticSeo.packages,
      body: `<p class="eb">Packages & pricing</p><h1>Scholarship application packages and prices</h1><p>${esc(staticSeo.packages.description)}</p>` +
        packages.map((p) => `<h2>${esc(p.name)}: ${money(p.price)} ${esc(p.unit)}</h2><p>${esc(p.tagline)} Delivery: ${esc(p.delivery)}.</p>${items(p.features)}`).join('') +
        section('Start small', `<ul>${starterOffers.map((o) => `<li><strong>${esc(o.name)}</strong> (${money(o.price)}, ${esc(o.delivery)}). ${esc(o.body)}</li>`).join('')}</ul>`) +
        section('Add-ons', `<ul>${packageAddons.map((a) => `<li>${esc(a.name)}: ${a.price ? money(a.price) : esc(a.note)}</li>`).join('')}</ul>`) +
        section('How it works', `<ol>${packageSteps.map((x) => `<li><strong>${esc(x.title)}.</strong> ${esc(x.body)}</li>`).join('')}</ol>`) +
        section('Questions about packages', faqHtml(packageFaqs)) +
        `${contact}${cta}`,
    },
    {
      path: '/courses',
      seo: staticSeo.courses,
      body: `<p class="eb">Free courses & certificates</p><h1>Free courses with free certificates</h1><p>${esc(staticSeo.courses.description)} ${courses.length} courses across ${courseFields.length} fields.</p>` +
        courseFields.map((field) => `<h2>${esc(field)}</h2><ul>${courses.filter((c) => c.field === field).map((c) => `<li><a href="${esc(c.url)}" rel="noopener">${esc(c.name)}</a> — ${esc(c.provider)}. ${esc(c.summary ?? '')}</li>`).join('')}</ul>`).join('') +
        '<p><a href="/scholarships">Scholarships</a> · <a href="/internships">Internships</a> · <a href="/blog">Application guides</a></p>',
    },
    {
      path: '/countries',
      seo: staticSeo.countries,
      body: `<p class="eb">Study destinations</p><h1>Where you can study with funding</h1><p>${esc(staticSeo.countries.description)}</p>` +
        countries.map((c) => {
          const hub = studyIn.get(c.name)
          return `<h2>${esc(c.name)}</h2><p>Well-known awards: ${esc(c.note.replace(/ · /g, ', '))}.</p>${para(destinations[c.name] ?? [])}${hub ? `<p><a href="${esc(hub.path)}">${esc(hub.title)}</a> — ${hub.matches.length} open now</p>` : ''}`
        }).join('') +
        section('All host countries with open opportunities', landingLinks(landing, 'study-in')) + cta,
    },
    {
      path: '/blog',
      seo: staticSeo.blog,
      body: `<p class="eb">Insights & guides</p><h1>${esc(company.name)} blog</h1><p>${esc(staticSeo.blog.description)}</p>${postLinks(newest)}${cta}`,
    },
    {
      path: '/faq',
      seo: staticSeo.faq,
      jsonLd: faqJsonLd(faqs),
      body: `<p class="eb">Before you ask</p><h1>Frequently asked questions</h1><p>${esc(staticSeo.faq.description)}</p>${faqHtml(faqs)}<p><a href="/packages">Packages and prices</a> · <a href="/services">Services</a></p>${cta}`,
    },
    {
      path: '/book-consultation',
      seo: staticSeo.bookConsultation,
      body: `<p class="eb">Free consultation</p><h1>Book a free consultation</h1><p>${esc(staticSeo.bookConsultation.description)}</p>` +
        `<ol>${steps.map((x) => `<li><strong>${esc(x.title)}.</strong> ${esc(x.body)}</li>`).join('')}</ol>${contact}` +
        '<p><a href="/services">Services</a> · <a href="/packages">Packages and prices</a> · <a href="/faq">FAQ</a></p>',
    },
    {
      path: '/eligibility',
      seo: staticSeo.eligibility,
      body: `<p class="eb">Eligibility checker</p><h1>Am I eligible? Find scholarships you can apply for</h1><p>${esc(staticSeo.eligibility.description)}</p>` +
        section('By study level', landingLinks(landing, 'level')) +
        section('By type', kindLinks) +
        '<p><a href="/explore">Browse by your nationality or the country you want to study in</a></p>',
    },
    {
      path: '/explore',
      seo: staticSeo.explore,
      body: `<p class="eb">Explore</p><h1>Explore opportunities by country, nationality and level</h1><p>${esc(staticSeo.explore.description)}</p>` +
        section('By study level', landingLinks(landing, 'level')) +
        section('By country you want to study in', landingLinks(landing, 'study-in')) +
        section('By your nationality', landingLinks(landing, 'for')) +
        '<p><a href="/eligibility">Am I eligible?</a></p>',
    },
    ...['privacy', 'terms'].map((key) => ({ path: `/${key}`, seo: { title: legal[key].title, description: legal[key].description }, body: legalBody(legal[key]) })),
  ]
  if (isGiveawayOpen()) {
    const seo = {
      title: 'Free Scholarship Application Support for 5 Students',
      description: `Merit Leaders will guide ${giveaway.places} students through a full scholarship application for free. Open to all nationalities. Entries close ${giveaway.closesShort}.`,
    }
    pages.push({
      path: giveaway.path,
      seo,
      body: `<p class="eb">Giveaway</p><h1>${esc(seo.title)}</h1><p>${esc(seo.description)}</p><p>Winners are drawn on ${esc(giveaway.drawLabel)}. Each entrant can pick up to ${giveaway.maxPicks} open scholarships.</p><p><a href="/scholarships">See open scholarships</a> · <a href="/packages">What a full application includes</a></p>`,
    })
  }
  const home = {
    path: '/',
    seo: staticSeo.home,
    body: `<p class="eb">${esc(company.tagline)}</p><h1>Scholarships and fellowships for international students</h1><p>${esc(staticSeo.home.description)}</p>` +
      (isGiveawayOpen() ? `<p><a href="${esc(giveaway.path)}">Free scholarship application support for ${giveaway.places} students</a> — entries close ${esc(giveaway.closesLabel)}.</p>` : '') +
      section('Browse open opportunities', kindLinks) +
      section('Closing soon', linkList(closing)) +
      section('Find what you can apply for', `${landingLinks(landing, 'level')}<p><a href="/eligibility">Am I eligible?</a> · <a href="/explore">Browse by nationality and host country</a> · <a href="/countries">Study destinations</a> · <a href="/courses">Free courses with certificates</a></p>`) +
      section('How we help', `<ul>${services.map((x) => `<li><strong>${esc(x.title)}.</strong> ${esc(x.body)}</li>`).join('')}</ul><p><a href="/services">All services</a> · <a href="/packages">Packages and prices</a></p>`) +
      section('How it works', `<ol>${steps.map((x) => `<li><strong>${esc(x.title)}.</strong> ${esc(x.body)}</li>`).join('')}</ol>`) +
      section('Latest guides', `${postLinks(newest.slice(0, 6))}<p><a href="/blog">All articles</a></p>`) +
      section('Common questions', `${faqHtml(faqs.slice(0, 4))}<p><a href="/faq">All questions</a> · <a href="/about">About us</a></p>`) +
      cta,
  }
  return { pages, home }
}

/** Search terms for one listing; Bing still reads the keywords tag. */
const listingKeywords = ({ kind, item }) =>
  [
    item.name,
    item.org,
    item.country && `${kinds[kind].plural} in ${item.country}`,
    item.level && `${item.level.toLowerCase()} ${kinds[kind].plural}`,
    item.funding,
    `${kinds[kind].plural} for international students`,
  ]
    .filter(Boolean)
    .join(', ')

const withKeywords = (html, keywords) => html.replace(/(<meta\s+name="keywords"\s+content=")[^"]*(")/, (_, a, b) => a + esc(keywords) + b)

/* ----------------------------------------------------------------- Flyers */

const FONTS = [
  ['SourceSerif4-Bold.ttf', 'Source Serif 4'],
  ['SourceSerif4-Semibold.ttf', 'Source Serif 4'],
  ['SourceSans3-Regular.ttf', 'Source Sans 3'],
  ['SourceSans3-Medium.ttf', 'Source Sans 3'],
  ['SourceSans3-Semibold.ttf', 'Source Sans 3'],
  ['SourceSans3-Bold.ttf', 'Source Sans 3'],
  ['SourceSans3-Black.ttf', 'Source Sans 3'],
]

/**
 * Draws the same flyer visitors download, sized for social posts (1080×1350),
 * as dist/flyers/<kind>/<slug>.jpg for each entry. Returns path → image URL.
 * If the canvas package is missing the feeds simply keep their photos.
 */
async function makeFlyers(root, outDir, entries) {
  const flyers = new Map()
  let napi
  try {
    napi = await import('@napi-rs/canvas')
  } catch {
    console.warn('[build-seo] @napi-rs/canvas is not installed; feeds will use photos instead of flyers')
    return flyers
  }
  const { createCanvas, loadImage, GlobalFonts } = napi
  for (const [file, family] of FONTS) GlobalFonts.registerFromPath(path.join(root, 'build-assets', 'fonts', file), family)

  const fetchImage = async (src) => {
    try {
      if (src.startsWith('/')) return await loadImage(fs.readFileSync(path.join(root, 'public', src)))
      const res = await fetch(src, { signal: AbortSignal.timeout(8000) })
      return res.ok ? await loadImage(Buffer.from(await res.arrayBuffer())) : null
    } catch {
      return null
    }
  }
  const env = { createCanvas, loadImage: fetchImage, emoji: false }

  const one = async ({ kind, path: p, item }) => {
    try {
      const flyer = await drawFlyer(item, { kind, label: kinds[kind].flyerLabel, env, social: true })
      const file = path.join(outDir, 'flyers', kind, `${item.slug}.jpg`)
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(file, await flyer.encode('jpeg', 88))
      flyers.set(p, `${SITE_URL}/flyers/${kind}/${item.slug}.jpg`)
    } catch (err) {
      console.warn(`[build-seo] flyer failed for ${p}: ${err.message}`)
    }
  }
  for (let i = 0; i < entries.length; i += 6) await Promise.all(entries.slice(i, i + 6).map(one))
  return flyers
}

/* --------------------------------------------------------------- IndexNow */

// The key is public by design: search engines read it at /<key>.txt to check
// that submissions for this site really come from it.
const INDEXNOW_KEY = '33b1d5e444a6f90d21f8d57f65eea6ec'
// A changed page stays on the list this long, so that when several updates are
// pushed in a row none is missed if a later deployment goes live first.
const INDEXNOW_KEEP_MS = 2 * 60 * 60 * 1000

/** A page's content as a short hash, ignoring the script and style file names that change with every build. */
const digest = (html) => crypto.createHash('sha256').update(html.replace(/\/assets\/[^"']+/g, '')).digest('hex').slice(0, 16)

/**
 * Writes the key file and dist/indexnow.json: every page's hash, and under
 * `changed` the pages that are new or different from the live site's copy
 * of this file (path → when the change was built). With no live copy to
 * compare against — the first time — every page counts as changed.
 */
async function writeIndexNow(outDir, hashes) {
  fs.writeFileSync(path.join(outDir, `${INDEXNOW_KEY}.txt`), INDEXNOW_KEY)
  let live = null
  try {
    const res = await fetch(`${SITE_URL}/indexnow.json`, { signal: AbortSignal.timeout(10000) })
    const data = res.ok ? await res.json() : null
    if (data?.pages) live = data
  } catch {
    // Not there yet, or unreachable: treated as a first run.
  }
  const now = Date.now()
  const changed = {}
  for (const [route, at] of Object.entries(live?.changed ?? {})) {
    if (hashes.has(route) && now - new Date(at).getTime() < INDEXNOW_KEEP_MS) changed[route] = at
  }
  for (const [route, hash] of hashes) {
    if (live?.pages[route] !== hash) changed[route] = new Date(now).toISOString()
  }
  fs.writeFileSync(path.join(outDir, 'indexnow.json'), JSON.stringify({
    site: SITE_URL,
    host: new URL(SITE_URL).host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    commit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    changed,
    pages: Object.fromEntries(hashes),
  }))
  console.log(`[build-seo] IndexNow: ${Object.keys(changed).length} of ${hashes.size} pages changed${live ? '' : ' (no live copy to compare with)'}`)
}

function writeHtml(outDir, route, html) {
  const file = path.join(outDir, `${route.replace(/^\//, '')}.html`)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, html)
}

export default function buildSeo() {
  let outDir = 'dist'
  let root = '.'
  const chunks = new Map()
  return {
    name: 'merit-build-seo',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const c of Object.values(bundle)) if (c.type === 'chunk') chunks.set(c.fileName, c)
    },
    configResolved(config) {
      root = config.root
      outDir = path.resolve(config.root, config.build.outDir)
    },
    async closeBundle() {
      const entries = allEntries()
      const open = entries.filter((e) => isOpen(e.item))
      const landing = buildLandingPages(open)
        .map((p) => ({ ...p, matches: open.filter(p.test) }))
        .filter((p) => p.matches.length > 0)

      const posts = blogPosts(root)
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap(entries, landing, posts))

      fs.mkdirSync(path.join(outDir, 'feeds'), { recursive: true })
      const posted = (e) => isoDay(e.item.posted) ?? isoDay(e.item.verified) ?? ''
      const newest = [...open].sort((a, b) => posted(b).localeCompare(posted(a))).slice(0, 30)
      const soon = open
        .filter((e) => (new Date(e.item.deadline) - new Date(today())) / 864e5 <= 14)
        .sort((a, b) => a.item.deadline.localeCompare(b.item.deadline))
      const flyers = await makeFlyers(root, outDir, [...new Set([...newest, ...soon])])
      fs.writeFileSync(path.join(outDir, 'feeds', 'new.xml'), rss('Merit Leaders — new opportunities', 'Newly added scholarships, fellowships, grants and internships with fixed deadlines.', newest, flyers))
      fs.writeFileSync(path.join(outDir, 'feeds', 'closing-soon.xml'), rss('Merit Leaders — closing soon', 'Opportunities closing in the next 14 days.', soon, flyers))

      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const hashes = new Map()
      const write = (route, html) => {
        writeHtml(outDir, route, html)
        hashes.set(route, digest(html))
      }
      const detailPreload = preloadTags(chunks, 'ScholarshipDetail')
      for (const e of entries) {
        const guides = posts.filter((p) => p.related.includes(e.path))
        const seo = listingSeo(e.item, kinds[e.kind], { closed: !isOpen(e.item) })
        write(e.path, withKeywords(page(template, {
          title: pageTitle(seo.title),
          description: seo.description,
          url: SITE_URL + e.path,
          image: imageFor(e.item),
          preload: detailPreload,
          noindex: !isOpen(e.item),
          body: detailBody(e, open) + guides.map((g) => `<p>Guide: <a href="${esc(g.to)}">${esc(g.title)}</a></p>`).join(''),
        }), listingKeywords(e)))
      }
      for (const k of Object.values(kinds)) {
        const list = open.filter((e) => e.kind === k.key).sort((a, b) => a.item.deadline.localeCompare(b.item.deadline))
        write(k.path, page(template, {
          title: pageTitle(kindTitle(k, list.length)),
          description: kindDescription(k),
          url: SITE_URL + k.path,
          image: LOGO,
          body: `<p class="eb">${esc(k.eyebrow)}</p><h1>${esc(k.heading.join(' '))}</h1><p>${esc(k.lede)}</p>${linkList(list)}`,
        }))
      }
      for (const p of posts) {
        const head = [
          `<meta property="article:published_time" content="${p.date?.toISOString() ?? ''}" />`,
          ...p.tags.map((t) => `<meta property="article:tag" content="${esc(t)}" />`),
          `<script type="application/ld+json">${JSON.stringify(postJsonLd(p)).replace(/</g, '\\u003c')}</script>`,
        ].join('')
        const html = page(template, {
          title: pageTitle(p.title),
          description: p.excerpt,
          url: p.link,
          image: p.image ?? LOGO,
          preload: preloadTags(chunks, 'BlogPostPage'),
          body: `<p class="eb">Merit Leaders blog</p><h1>${esc(p.title)}</h1>${p.html}`,
        })
          .replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />')
          .replace(/(<meta\s+name="keywords"\s+content=")[^"]*(")/, (_, a, b) => a + esc([...p.keywords, ...p.tags].join(', ')) + b)
          .replace('</head>', () => `${head}</head>`)
        write(p.to, html)
      }
      for (const p of landing) {
        write(p.path, page(template, {
          title: pageTitle(p.title),
          description: landingDescription(p, p.matches.length),
          url: SITE_URL + p.path,
          image: LOGO,
          body: `<nav><a href="/">Home</a> › <a href="/explore">Explore</a></nav><h1>${esc(p.heading.join(' '))}</h1><p>${esc(p.lede)} ${p.matches.length} open now, sorted by the nearest deadline.</p>` +
            (p.type === 'study-in' ? para(destinations[p.label] ?? []) : '') +
            summaryList([...p.matches].sort((a, b) => a.item.deadline.localeCompare(b.item.deadline))) +
            section('Related pages', `<ul>${neighbours(landing, p).map((q) => `<li><a href="${esc(q.path)}">${esc(q.title)}</a></li>`).join('')}</ul>`) +
            '<p><a href="/explore">Browse other countries, nationalities and levels</a> · <a href="/eligibility">Am I eligible?</a> · <a href="/book-consultation">Get expert help applying</a></p>',
        }))
      }

      // Fixed pages, then the home page into index.html. Unknown addresses are also
      // answered with index.html, so they carry the home page's canonical until the app loads.
      const fixed = staticPages({ open, landing, posts })
      const withJsonLd = (html, data) =>
        data ? html.replace('</head>', () => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script></head>`) : html
      for (const p of fixed.pages) {
        write(p.path, withJsonLd(page(template, { title: pageTitle(p.seo.title), description: p.seo.description, url: SITE_URL + p.path, image: LOGO, body: p.body }), p.jsonLd))
      }
      const home = page(template, { title: pageTitle(fixed.home.seo.title), description: fixed.home.seo.description, url: `${SITE_URL}/`, image: LOGO, body: fixed.home.body })
      fs.writeFileSync(path.join(outDir, 'index.html'), home)
      hashes.set('/', digest(home))
      await writeIndexNow(outDir, hashes)
    },
  }
}
