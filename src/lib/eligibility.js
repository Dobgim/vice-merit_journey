/**
 * Who can apply to what. Shared by the "Am I eligible?" matcher, the landing
 * pages (by nationality, host country and level) and the build step that
 * pre-renders those pages — so it must stay plain JavaScript (no React).
 *
 * Matching reads each listing's "who can apply" text. It is a helpful first
 * filter, not a guarantee: pages tell visitors to confirm on the official call.
 */
import { slugify } from './deadline'

/* ------------------------------------------------------------- Countries */

// [name, demonym, region, commonwealth member, developing/LMIC]
const RAW = [
  // Africa
  ['Algeria', 'Algerian', 'Africa', 0, 1], ['Angola', 'Angolan', 'Africa', 0, 1], ['Benin', 'Beninese', 'Africa', 0, 1],
  ['Botswana', 'Motswana', 'Africa', 1, 1], ['Burkina Faso', 'Burkinabe', 'Africa', 0, 1], ['Burundi', 'Burundian', 'Africa', 0, 1],
  ['Cameroon', 'Cameroonian', 'Africa', 1, 1], ['Cape Verde', 'Cape Verdean', 'Africa', 0, 1], ['Central African Republic', 'Central African', 'Africa', 0, 1],
  ['Chad', 'Chadian', 'Africa', 0, 1], ['Comoros', 'Comorian', 'Africa', 0, 1], ['Congo (DRC)', 'Congolese', 'Africa', 0, 1],
  ['Congo (Republic)', 'Congolese', 'Africa', 0, 1], ["Côte d'Ivoire", 'Ivorian', 'Africa', 0, 1], ['Djibouti', 'Djiboutian', 'Africa', 0, 1],
  ['Egypt', 'Egyptian', 'Africa', 0, 1], ['Equatorial Guinea', 'Equatoguinean', 'Africa', 0, 1], ['Eritrea', 'Eritrean', 'Africa', 0, 1],
  ['Eswatini', 'Swazi', 'Africa', 1, 1], ['Ethiopia', 'Ethiopian', 'Africa', 0, 1], ['Gabon', 'Gabonese', 'Africa', 1, 1],
  ['Gambia', 'Gambian', 'Africa', 1, 1], ['Ghana', 'Ghanaian', 'Africa', 1, 1], ['Guinea', 'Guinean', 'Africa', 0, 1],
  ['Guinea-Bissau', 'Bissau-Guinean', 'Africa', 0, 1], ['Kenya', 'Kenyan', 'Africa', 1, 1], ['Lesotho', 'Basotho', 'Africa', 1, 1],
  ['Liberia', 'Liberian', 'Africa', 0, 1], ['Libya', 'Libyan', 'Africa', 0, 1], ['Madagascar', 'Malagasy', 'Africa', 0, 1],
  ['Malawi', 'Malawian', 'Africa', 1, 1], ['Mali', 'Malian', 'Africa', 0, 1], ['Mauritania', 'Mauritanian', 'Africa', 0, 1],
  ['Mauritius', 'Mauritian', 'Africa', 1, 1], ['Morocco', 'Moroccan', 'Africa', 0, 1], ['Mozambique', 'Mozambican', 'Africa', 1, 1],
  ['Namibia', 'Namibian', 'Africa', 1, 1], ['Niger', 'Nigerien', 'Africa', 0, 1], ['Nigeria', 'Nigerian', 'Africa', 1, 1],
  ['Rwanda', 'Rwandan', 'Africa', 1, 1], ['São Tomé and Príncipe', 'Santomean', 'Africa', 0, 1], ['Senegal', 'Senegalese', 'Africa', 0, 1],
  ['Seychelles', 'Seychellois', 'Africa', 1, 1], ['Sierra Leone', 'Sierra Leonean', 'Africa', 1, 1], ['Somalia', 'Somali', 'Africa', 0, 1],
  ['South Africa', 'South African', 'Africa', 1, 1], ['South Sudan', 'South Sudanese', 'Africa', 0, 1], ['Sudan', 'Sudanese', 'Africa', 0, 1],
  ['Tanzania', 'Tanzanian', 'Africa', 1, 1], ['Togo', 'Togolese', 'Africa', 1, 1], ['Tunisia', 'Tunisian', 'Africa', 0, 1],
  ['Uganda', 'Ugandan', 'Africa', 1, 1], ['Zambia', 'Zambian', 'Africa', 1, 1], ['Zimbabwe', 'Zimbabwean', 'Africa', 0, 1],
  // Asia & Middle East
  ['Afghanistan', 'Afghan', 'Asia', 0, 1], ['Bangladesh', 'Bangladeshi', 'Asia', 1, 1], ['Cambodia', 'Cambodian', 'Asia', 0, 1],
  ['China', 'Chinese', 'Asia', 0, 1], ['India', 'Indian', 'Asia', 1, 1], ['Indonesia', 'Indonesian', 'Asia', 0, 1],
  ['Iran', 'Iranian', 'Middle East', 0, 1], ['Iraq', 'Iraqi', 'Middle East', 0, 1], ['Japan', 'Japanese', 'Asia', 0, 0],
  ['Jordan', 'Jordanian', 'Middle East', 0, 1], ['Lebanon', 'Lebanese', 'Middle East', 0, 1], ['Malaysia', 'Malaysian', 'Asia', 1, 1],
  ['Myanmar', 'Myanmar', 'Asia', 0, 1], ['Nepal', 'Nepali', 'Asia', 0, 1], ['Pakistan', 'Pakistani', 'Asia', 1, 1],
  ['Palestine', 'Palestinian', 'Middle East', 0, 1], ['Philippines', 'Filipino', 'Asia', 0, 1], ['Saudi Arabia', 'Saudi', 'Middle East', 0, 0],
  ['South Korea', 'Korean', 'Asia', 0, 0], ['Sri Lanka', 'Sri Lankan', 'Asia', 1, 1], ['Syria', 'Syrian', 'Middle East', 0, 1],
  ['Thailand', 'Thai', 'Asia', 0, 1], ['Türkiye', 'Turkish', 'Middle East', 0, 1], ['Vietnam', 'Vietnamese', 'Asia', 0, 1],
  ['Yemen', 'Yemeni', 'Middle East', 0, 1],
  // Americas
  ['Argentina', 'Argentine', 'Latin America', 0, 1], ['Brazil', 'Brazilian', 'Latin America', 0, 1], ['Canada', 'Canadian', 'North America', 1, 0],
  ['Chile', 'Chilean', 'Latin America', 0, 1], ['Colombia', 'Colombian', 'Latin America', 0, 1], ['Haiti', 'Haitian', 'Latin America', 0, 1],
  ['Jamaica', 'Jamaican', 'Latin America', 1, 1], ['Mexico', 'Mexican', 'Latin America', 0, 1], ['Peru', 'Peruvian', 'Latin America', 0, 1],
  ['United States', 'American', 'North America', 0, 0],
  // Europe & Oceania
  ['France', 'French', 'Europe', 0, 0], ['Germany', 'German', 'Europe', 0, 0], ['Ukraine', 'Ukrainian', 'Europe', 0, 1],
  ['United Kingdom', 'British', 'Europe', 1, 0], ['Australia', 'Australian', 'Oceania', 1, 0], ['Papua New Guinea', 'Papua New Guinean', 'Oceania', 1, 1],
]

export const COUNTRIES = RAW.map(([name, demonym, region, commonwealth, developing]) => ({
  name,
  demonym,
  region,
  commonwealth: Boolean(commonwealth),
  developing: Boolean(developing),
  slug: slugify(name),
}))

export const countryBySlug = (slug) => COUNTRIES.find((c) => c.slug === slug)

const REGION_WORDS = {
  Africa: ['africa', 'african', 'sadc', 'ecowas', 'sub-saharan'],
  Asia: ['asia', 'asian', 'asean', 'southeast asia', 'south asia'],
  'Middle East': ['middle east', 'mena', 'arab', 'north africa'],
  'Latin America': ['latin america', 'caribbean', 'americas'],
  'North America': ['americas'],
  Europe: ['europe', 'european', 'eea', 'eu '],
  Oceania: ['pacific', 'oceania'],
}

// Signals that a call is open widely (any nationality).
const OPEN_WORDS = ['international', 'any nationality', 'all nationalities', 'of any nationality', 'worldwide', 'open to all', 'all countries', 'everyone', 'anyone', 'global']
// Signals that a call is limited to one place even if it also says "international".
const RESTRICT_WORDS = ['citizens only', 'citizen only', ' only', 'indigenes', 'residents of', 'resident in', 'living in', 'based in', 'must be a citizen']

const text = (item) =>
  ` ${[item.nationalities, ...(item.eligibility ?? []), item.summary].filter(Boolean).join(' ')} `.toLowerCase()

/**
 * true — the listing is open to people from this country, as far as its
 * "who can apply" text says. Matching is generous on purpose; visitors are
 * always told to confirm on the official page.
 */
export function isOpenTo(item, country) {
  if (!country) return true
  const t = text(item)
  if (t.includes(country.name.toLowerCase()) || t.includes(country.demonym.toLowerCase())) return true
  if ((REGION_WORDS[country.region] ?? []).some((w) => t.includes(w))) return true
  if (country.commonwealth && t.includes('commonwealth')) return true
  if (country.developing && /developing|low[- ]and middle|low[- ]income|lmic|global south|emerging/.test(t)) return true
  // Government programmes with a published country list (Australia Awards, MEXT, Stipendium Hungaricum…):
  // most developing countries are on it, so show them and let the official list decide.
  if (country.developing && /(eligible|participating|partner|sending partner) countr|diplomatic relations|outside the eea|cultural agreements|180\+/.test(t)) return true
  const open = OPEN_WORDS.some((w) => t.includes(w))
  const restricted = RESTRICT_WORDS.some((w) => t.includes(w))
  return open && !restricted
}

/* ----------------------------------------------------------------- Levels */

export const LEVELS = [
  { slug: 'undergraduate', label: "Bachelor's / undergraduate", short: 'Undergraduate', words: ['undergraduate', 'bachelor', 'first degree', 'high school', 'secondary', 'grade 12', 'all levels'] },
  { slug: 'masters', label: "Master's", short: "Master's", words: ['master', 'graduate', 'postgraduate', 'mba', 'llm', 'all levels'] },
  { slug: 'phd', label: 'PhD / doctoral', short: 'PhD', words: ['phd', 'doctoral', 'doctorate', 'postgraduate', 'all levels'] },
  { slug: 'postdoc', label: 'Postdoc & researchers', short: 'Postdoctoral', words: ['postdoc', 'post-doc', 'postdoctoral', 'early-career', 'researcher', 'scientist', 'faculty'] },
  { slug: 'professionals', label: 'Professionals & leaders', short: 'Professionals', words: ['professional', 'leader', 'entrepreneur', 'mid-career', 'founder', 'artist', 'journalist', 'changemaker'] },
]

export const levelBySlug = (slug) => LEVELS.find((l) => l.slug === slug)

export function matchesLevel(item, level) {
  if (!level) return true
  const t = `${item.level ?? ''} ${(item.tags ?? []).join(' ')}`.toLowerCase()
  // "Graduate" alone means a master's, not a PhD.
  if (level.slug === 'phd' && /^graduate$/i.test(item.level ?? '')) return false
  return level.words.some((w) => t.includes(w))
}

/* --------------------------------------------------------- Host countries */

/** "Switzerland (Geneva)" → "Switzerland"; "United States & Canada" → both. */
export function hostCountries(item) {
  return String(item.country ?? '')
    .replace(/\(.*?\)/g, '')
    .split(/,|&|\band\b|\//)
    .map((s) => s.trim())
    .filter((s) => s && !/^(international|online|global|remote|worldwide|europe|africa|asia|commonwealth countries?)$/i.test(s))
}

/* ----------------------------------------------------------- Landing pages */

/**
 * Every landing page the site offers, built from a list of { kind, item }.
 * Host-country pages need at least two open opportunities so thin pages
 * aren't created.
 */
export function buildLandingPages(entries) {
  const pages = []
  for (const c of COUNTRIES) {
    pages.push({
      type: 'for',
      slug: c.slug,
      path: `/for/${c.slug}`,
      label: c.name,
      title: `Scholarships for ${c.demonym} students`,
      heading: ['Scholarships & opportunities for', `${c.demonym} students`],
      lede: `Open scholarships, fellowships, grants and internships that accept applicants from ${c.name}, with fixed deadlines and a direct link to each official call.`,
      test: (e) => isOpenTo(e.item, c),
    })
  }
  const hosts = new Map()
  for (const e of entries) for (const h of hostCountries(e.item)) hosts.set(h, (hosts.get(h) ?? 0) + 1)
  for (const [name, count] of hosts) {
    if (count < 2) continue
    const slug = slugify(name)
    pages.push({
      type: 'study-in',
      slug,
      path: `/study-in/${slug}`,
      label: name,
      title: `Scholarships to study in ${name}`,
      heading: ['Funded opportunities in', name],
      lede: `Scholarships, fellowships, grants and internships hosted in ${name}, open now with fixed deadlines.`,
      test: (e) => hostCountries(e.item).includes(name),
    })
  }
  for (const l of LEVELS) {
    pages.push({
      type: 'level',
      slug: l.slug,
      path: `/level/${l.slug}`,
      label: l.label,
      title: `${l.short} scholarships and funding`,
      heading: [`${l.short}`, 'scholarships & funding'],
      lede: `Open opportunities for ${l.label.toLowerCase()} applicants, sorted by the nearest deadline.`,
      test: (e) => matchesLevel(e.item, l),
    })
  }
  return pages
}
