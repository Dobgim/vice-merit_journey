/**
 * Vite build plugin for search engines and social media. After the app is
 * built it writes, from the same data the site renders:
 *
 *  - dist/sitemap.xml — every page, opportunity and landing page;
 *  - dist/feeds/new.xml and dist/feeds/closing-soon.xml — RSS feeds that
 *    Make.com reads to post to Facebook, Instagram and LinkedIn: each item's
 *    description is the ready-to-post caption (lib/caption.js) and its
 *    enclosure the opportunity's flyer, drawn as dist/flyers/<kind>/<slug>.jpg;
 *  - a pre-rendered HTML file per opportunity, listing page and landing page
 *    (dist/scholarships/<slug>.html …) with its own title, description,
 *    canonical URL, social preview tags and readable content. Vercel serves
 *    these directly (cleanUrls), so Google and link previews see real content
 *    at once; the React app then takes over as usual.
 */
import fs from 'node:fs'
import path from 'node:path'
import { kinds } from './src/data/opportunities.js'
import { SITE_URL } from './src/data/site.js'
import { photos } from './src/data/photos.js'
import { buildLandingPages } from './src/lib/eligibility.js'
import { socialCaption } from './src/lib/caption.js'
import { drawFlyer } from './src/lib/flyerImage.js'
import { parsePost, postJsonLd } from './src/lib/posts.js'
import { kindTitle, listingSeo, pageTitle } from './src/lib/seo.js'
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
  return Object.values(kinds).flatMap((k) =>
    k.items
      .filter((i) => i.slug && !retiredSlugs.has(i.slug))
      .map((i) => withRequirements(withDirectLink(i)))
      .filter((i) => hasFixedDeadline(i) && isOpenYet(i))
      .map((item) => ({ kind: k.key, path: `${k.path}/${item.slug}`, item }))
  )
}
const isOpen = (item) => (isoDay(item.deadline) ?? '') >= today()

/* ---------------------------------------------------------------- Sitemap */

function sitemap(entries, landing, posts) {
  const urls = [
    ...posts.map((p) => ({ loc: p.to, lastmod: p.date?.toISOString().slice(0, 10) ?? today() })),
    ...STATIC_PAGES.map((p) => ({ loc: p, lastmod: today() })),
    // The giveaway page is only listed while entries are open (see src/data/giveaway.js).
    ...(isGiveawayOpen() ? [{ loc: giveaway.path, lastmod: today() }] : []),
    ...entries.map((e) => ({ loc: e.path, lastmod: isoDay(e.item.posted) ?? isoDay(e.item.verified) ?? today() })),
    ...landing.map((p) => ({ loc: p.path, lastmod: today() })),
  ]
  const body = urls.map((u) => `  <url><loc>${esc(SITE_URL + u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`).join('\n')
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

function page(template, { title, description, url, image, body, preload = '' }) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(url)}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${esc(image)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace('</head>', `<link rel="canonical" href="${esc(url)}" />${preload}${STYLE}</head>`)
    .replace('<div id="root"></div>', `<div id="root"><main class="pr">${body}</main></div>`)
}

const linkList = (list) =>
  `<ul>${list.map((e) => `<li><a href="${esc(e.path)}">${esc(e.item.name)}</a> — deadline ${prettyDate(e.item.deadline)}</li>`).join('')}</ul>`

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

const withKeywords = (html, keywords) => html.replace(/(<meta\s+name="keywords"\s+content=")[^"]*(")/, `$1${esc(keywords)}$2`)

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
      const detailPreload = preloadTags(chunks, 'ScholarshipDetail')
      for (const e of entries) {
        const guides = posts.filter((p) => p.related.includes(e.path))
        const seo = listingSeo(e.item, kinds[e.kind], { closed: !isOpen(e.item) })
        writeHtml(outDir, e.path, withKeywords(page(template, {
          title: pageTitle(seo.title),
          description: seo.description,
          url: SITE_URL + e.path,
          image: imageFor(e.item),
          preload: detailPreload,
          body: detailBody(e, open) + guides.map((g) => `<p>Guide: <a href="${esc(g.to)}">${esc(g.title)}</a></p>`).join(''),
        }), listingKeywords(e)))
      }
      for (const k of Object.values(kinds)) {
        const list = open.filter((e) => e.kind === k.key).sort((a, b) => a.item.deadline.localeCompare(b.item.deadline))
        writeHtml(outDir, k.path, page(template, {
          title: pageTitle(kindTitle(k, list.length)),
          description: k.lede,
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
          .replace(/(<meta\s+name="keywords"\s+content=")[^"]*(")/, `$1${esc([...p.keywords, ...p.tags].join(', '))}$2`)
          .replace('</head>', `${head}</head>`)
        writeHtml(outDir, p.to, html)
      }
      for (const p of landing) {
        writeHtml(outDir, p.path, page(template, {
          title: pageTitle(p.title),
          description: `${p.lede} ${p.matches.length} open now.`,
          url: SITE_URL + p.path,
          image: LOGO,
          body: `<h1>${esc(p.heading.join(' '))}</h1><p>${esc(p.lede)}</p>${linkList(p.matches)}`,
        }))
      }
    },
  }
}
