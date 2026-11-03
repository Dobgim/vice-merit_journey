/**
 * Titles and descriptions for search results, shared by the app (Seo.jsx)
 * and the pre-rendered pages (build-seo.js) so Google sees the same text
 * before and after the app loads. Plain functions, no React.
 */
import { company } from '../data/site.js'

// Google shows roughly 60–70 characters; past that the brand is dropped
// rather than cutting off the words people searched for.
const TITLE_MAX = 70
const DESCRIPTION_MAX = 160

const shortDate = (iso) =>
  /^\d{4}-\d{2}-\d{2}/.test(iso ?? '')
    ? new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    : null

/** "<title> — Merit Leaders" when it fits, otherwise the title alone. */
export function pageTitle(title) {
  if (!title) return `${company.name} — Scholarships & Fellowships for International Students`
  const full = `${title} — ${company.name}`
  return full.length <= TITLE_MAX ? full : title
}

/** The first of `options` that fits the description length, else the first cut at a word. */
function fitDescription(options) {
  const fit = options.find((o) => o.length <= DESCRIPTION_MAX)
  if (fit) return fit
  const cut = options[options.length - 1].slice(0, DESCRIPTION_MAX - 1)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/**
 * Search title and description for one listing, e.g.
 * "Chevening Scholarship: Fully Funded, Deadline 6 Oct 2026".
 */
export function listingSeo(item, config, { closed = false } = {}) {
  if (closed) {
    return {
      title: `${item.name} (closed)`,
      description: `Applications for ${item.name} have closed. See open ${config.plural} instead.`,
    }
  }
  const date = shortDate(item.deadline)
  const funded = /fully funded/i.test(item.funding ?? '') && !/fully funded/i.test(item.name) ? 'Fully Funded' : null
  const titles = [
    [funded, date && `Deadline ${date}`].filter(Boolean).join(', '),
    date ? `Deadline ${date}` : '',
    funded ?? '',
  ]
    .filter(Boolean)
    .map((extra) => `${item.name}: ${extra}`)
  const title = titles.find((t) => t.length <= TITLE_MAX) ?? item.name

  const summary = (item.summary ?? '').trim().replace(/([^.!?])$/, '$1.')
  const apply = date ? `Apply by ${date}.` : ''
  const description = fitDescription([
    `${summary} ${apply} Who can apply, documents and how to apply.`,
    `${summary} ${apply}`,
    summary,
  ].map((d) => d.replace(/\s+/g, ' ').trim()))
  return { title, description }
}

const KIND_TITLES = {
  scholarships: 'Scholarships for International Students',
  fellowships: 'Fellowships for International Applicants',
  grants: 'Grants for Entrepreneurs, Researchers and Nonprofits',
  internships: 'Paid Internships at the UN, World Bank and More',
  competitions: 'International Competitions and Awards',
}

/** Title for a listing page, with the number open right now. */
export function kindTitle(config, count) {
  const base = KIND_TITLES[config.key] ?? config.title
  return count ? `${base}: ${count} Open Now` : base
}
