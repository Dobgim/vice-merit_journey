/**
 * Vite build plugin: writes dist/sitemap.xml with every public page and every
 * opportunity's detail page, so Google finds new listings without waiting to
 * crawl them. Listings come from the same data the site renders.
 */
import { kinds } from './src/data/opportunities.js'
import { SITE_URL } from './src/data/site.js'

const STATIC_PAGES = [
  '/', '/about', '/services', '/packages', '/scholarships', '/fellowships', '/grants',
  '/internships', '/competitions', '/countries', '/blog', '/faq', '/book-consultation',
  '/privacy', '/terms',
]

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const isoDay = (s) => (/^\d{4}-\d{2}-\d{2}/.test(s ?? '') ? s.slice(0, 10) : null)

export function buildSitemap(today = new Date().toISOString().slice(0, 10)) {
  const urls = STATIC_PAGES.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: today }))
  for (const kind of Object.values(kinds)) {
    for (const item of kind.items) {
      if (!item.slug) continue
      urls.push({ loc: `${SITE_URL}${kind.path}/${item.slug}`, lastmod: isoDay(item.posted) ?? isoDay(item.verified) ?? today })
    }
  }
  const body = urls
    .map((u) => `  <url><loc>${escapeXml(u.loc)}</loc><lastmod>${u.lastmod}</lastmod></url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
}

export default function sitemap() {
  return {
    name: 'merit-sitemap',
    apply: 'build',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: buildSitemap() })
    },
  }
}
