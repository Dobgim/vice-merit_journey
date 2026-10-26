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

const LOGO = `${SITE_URL}/merit-leaders-logo.jpg`
const STATIC_PAGES = [
  '/', '/about', '/services', '/packages', '/scholarships', '/fellowships', '/grants', '/internships',
  '/competitions', '/countries', '/blog', '/faq', '/book-consultation', '/eligibility', '/explore', '/privacy', '/terms',
]

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const isoDay = (s) => (/^\d{4}-\d{2}-\d{2}/.test(s ?? '') ? s.slice(0, 10) : null)
const today = () => new Date().toISOString().slice(0, 10)
const prettyDate = (iso) =>
  iso ? new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Rolling'
const imageFor = (item) => photos[item.slug]?.src ?? LOGO

/** All listings as { kind, path, item }. */
function allEntries() {
  return Object.values(kinds).flatMap((k) =>
    k.items.filter((i) => i.slug).map((item) => ({ kind: k.key, path: `${k.path}/${item.slug}`, item }))
  )
}
const isOpen = (item) => (isoDay(item.deadline) ?? '') >= today()

/* ---------------------------------------------------------------- Sitemap */

function sitemap(entries, landing) {
  const urls = [
    ...STATIC_PAGES.map((p) => ({ loc: p, lastmod: today() })),
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
      <pubDate>${new Date(`${isoDay(item.posted) ?? isoDay(item.verified) ?? today()}T07:00:00Z`).toUTCString()}</pubDate>
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

const STYLE = `<style>.pr{max-width:960px;margin:0 auto;padding:7rem 1.25rem 4rem;font-family:'Source Sans 3',system-ui,sans-serif;color:#0f1b3d;line-height:1.65}.pr h1{font-family:'Source Serif 4',Georgia,serif;font-size:2rem;line-height:1.2;margin:.5rem 0 1rem}.pr .eb{color:#835525;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:.8rem}.pr dl{display:grid;grid-template-columns:max-content 1fr;gap:.4rem 1.25rem;margin:1.5rem 0}.pr dt{font-weight:700}.pr ul{padding-left:1.1rem}.pr a{color:#25376c}</style>`

function page(template, { title, description, url, image, body }) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta\s+name="description"\s+content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${esc(url)}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${esc(image)}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(title)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(description)}$2`)
    .replace('</head>', `<link rel="canonical" href="${esc(url)}" />${STYLE}</head>`)
    .replace('<div id="root"></div>', `<div id="root"><main class="pr">${body}</main></div>`)
}

const linkList = (list) =>
  `<ul>${list.map((e) => `<li><a href="${esc(e.path)}">${esc(e.item.name)}</a> — deadline ${prettyDate(e.item.deadline)}</li>`).join('')}</ul>`

function detailBody({ kind, item }) {
  const facts = [
    ['Deadline', prettyDate(item.deadline)],
    ['Value', item.amount],
    ['Who can apply', item.nationalities],
    ['Level', item.level],
    ['Host', [item.org, item.country].filter(Boolean).join(', ')],
  ].filter(([, v]) => v)
  return `<p class="eb">${esc(kinds[kind].singular)}</p><h1>${esc(item.name)}</h1><p>${esc(item.summary ?? '')}</p>
<dl>${facts.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>
${(item.overview ?? []).slice(0, 3).map((p) => `<p>${esc(p)}</p>`).join('')}
<p><a href="${esc(kinds[kind].path)}">More ${esc(kinds[kind].plural)}</a> · <a href="/eligibility">Am I eligible?</a> · <a href="/book-consultation">Get expert help applying</a></p>`
}

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
  return {
    name: 'merit-build-seo',
    apply: 'build',
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

      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap(entries, landing))

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
      for (const e of entries) {
        writeHtml(outDir, e.path, page(template, {
          title: `${e.item.name} — Merit Leaders`,
          description: `${e.item.summary ?? ''} Deadline: ${prettyDate(e.item.deadline)}.`.trim(),
          url: SITE_URL + e.path,
          image: imageFor(e.item),
          body: detailBody(e),
        }))
      }
      for (const k of Object.values(kinds)) {
        const list = open.filter((e) => e.kind === k.key).sort((a, b) => a.item.deadline.localeCompare(b.item.deadline))
        writeHtml(outDir, k.path, page(template, {
          title: `${k.title} — ${list.length} open now — Merit Leaders`,
          description: k.lede,
          url: SITE_URL + k.path,
          image: LOGO,
          body: `<p class="eb">${esc(k.eyebrow)}</p><h1>${esc(k.heading.join(' '))}</h1><p>${esc(k.lede)}</p>${linkList(list)}`,
        }))
      }
      for (const p of landing) {
        writeHtml(outDir, p.path, page(template, {
          title: `${p.title} — Merit Leaders`,
          description: `${p.lede} ${p.matches.length} open now.`,
          url: SITE_URL + p.path,
          image: LOGO,
          body: `<h1>${esc(p.heading.join(' '))}</h1><p>${esc(p.lede)}</p>${linkList(p.matches)}`,
        }))
      }
    },
  }
}
