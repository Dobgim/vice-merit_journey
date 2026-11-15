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
// Shorter than this and search engines tend to write their own snippet.
const DESCRIPTION_MIN = 110

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

/** A long name cut to fit a search title: brackets go first, then whole words. */
function shortName(name) {
  if (name.length <= TITLE_MAX) return name
  const plain = name.replace(/\s*\([^)]*\)/g, '').trim()
  if (plain.length <= TITLE_MAX) return plain
  const cut = plain.slice(0, TITLE_MAX - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,:;–—-]+$/, '')}…`
}

/** Adds the `extras` sentences that fit until the description is long enough. */
function padDescription(text, extras) {
  let out = text
  for (const extra of extras.filter(Boolean)) {
    if (out.length >= DESCRIPTION_MIN) break
    if (out.length + 1 + extra.length <= DESCRIPTION_MAX) out = `${out} ${extra}`
  }
  return out
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
  const title = titles.find((t) => t.length <= TITLE_MAX) ?? shortName(item.name)

  const summary = (item.summary ?? '').trim().replace(/([^.!?])$/, '$1.')
  const apply = date ? `Apply by ${date}.` : ''
  const fitted = fitDescription([
    `${summary} ${apply} Who can apply, documents and how to apply.`,
    `${summary} ${apply}`,
    summary,
  ].map((d) => d.replace(/\s+/g, ' ').trim()))
  const description = padDescription(fitted, [
    item.org && `Offered by ${item.org}${item.country ? ` (${item.country})` : ''}.`,
    item.level && `Level: ${item.level}.`,
    item.funding && `Funding: ${item.funding}.`,
    `See open ${config.plural} on ${company.name}.`,
  ])
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

/** Search descriptions for the five listing pages (110–160 characters). */
const KIND_DESCRIPTIONS = {
  scholarships: 'Fully and partially funded scholarships for undergraduate, master’s, PhD and postdoctoral applicants, with eligibility, documents and live deadlines.',
  fellowships: 'Leadership, research, journalism and creative fellowships, many fully funded. Open any one for who can apply, the deadline and how to apply.',
  grants: 'Grants for entrepreneurs, researchers, innovators and community leaders: seed capital, research funding and prizes, with eligibility and how to apply.',
  internships: 'Paid and stipend-supported internships at the UN, IMF, World Bank, European Commission and more, with requirements, pay, deadlines and how to apply.',
  competitions: 'Essay, writing, photography, science and business competitions with prizes and recognition. Open any one for who can enter and the deadline.',
}
export const kindDescription = (config) => KIND_DESCRIPTIONS[config.key] ?? config.lede

/** Search description for a landing page (/for, /study-in, /level), with the number open now. */
export function landingDescription(page, count) {
  const full = `${page.lede} ${count} open now.`
  if (full.length > DESCRIPTION_MAX) {
    return fitDescription([
      `${page.title}: ${count} open scholarships, fellowships, grants and internships with fixed deadlines and official links.`,
      `${page.title}: ${count} open opportunities with fixed deadlines and official links.`,
    ])
  }
  return padDescription(full, ['See who can apply, each deadline and the official link.', 'See deadlines and official links.'])
}

/**
 * Title and description of each fixed page, shared by the page itself
 * (<Seo {...staticSeo.about} />) and its pre-rendered copy (build-seo.js).
 */
export const staticSeo = {
  home: {
    title: 'Scholarships & Fellowships for International Students',
    description: 'Merit Leaders matches students at every level with scholarships they are genuinely competitive for, then supports every step of the application.',
  },
  about: {
    title: 'About Us',
    description: 'Merit Leaders is an independent scholarship consultancy. Meet the advisors, the method and the standards behind 200+ students advised since 2025.',
  },
  services: {
    title: 'Services',
    description: 'Scholarship search, application support, admission guidance, SOP and personal statement help, CV editing, visa guidance and interview preparation.',
  },
  packages: {
    title: 'Packages & Pricing',
    description: 'Let us write your full scholarship application. Essay, complete application and premium multi-application packages with clear prices in USD and FCFA.',
  },
  courses: {
    title: 'Free Courses with Free Certificates',
    description: 'Free courses with free certificates, from technology and health to law, farming and languages. The learning, assessment and proof are all free.',
  },
  countries: {
    title: 'Study Destinations',
    description: 'Scholarship and admission guidance for the UK, USA, Canada, Germany, Australia, the Netherlands and more: funding, visa routes and intake timelines.',
  },
  blog: {
    title: 'Blog',
    description: 'Guides from Merit Leaders advisors on finding scholarships, writing strong applications and preparing for interviews and visas.',
  },
  faq: {
    title: 'Frequently Asked Questions',
    description: 'How Merit Leaders works: fees, timelines, eligibility, ethics, success rates and what happens after you book a consultation.',
  },
  bookConsultation: {
    title: 'Book a Consultation',
    description: 'Book a free 20-minute discovery call with a Merit Leaders advisor, or reach us on WhatsApp and email. No upfront fee, no obligation.',
  },
  eligibility: {
    title: 'Am I eligible? Find scholarships you can apply for',
    description: 'Enter your nationality and study level to see the open scholarships, fellowships, grants and internships you can apply for, with deadlines and links.',
  },
  explore: {
    title: 'Explore opportunities by country, nationality and level',
    description: 'Browse open scholarships, fellowships, grants and internships by your nationality, the country you want to study in, or your study level.',
  },
}
