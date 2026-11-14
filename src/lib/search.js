/**
 * Search and filters for the listing pages. Listings describe their level and
 * country in free text ("Master’s & PhD", "China (Chengdu)"), so both are read
 * into fixed values here; comparing the raw text left listings out of the
 * filter pills and split one country into several menu entries.
 */
import { hostCountries } from './eligibility'

/**
 * Study levels a listing is for: 'undergraduate', 'graduate' (a master's),
 * 'phd', 'postdoctoral'. "Postgraduate" means a master's or a PhD.
 */
export function levelsOf(item) {
  const t = String(item?.level ?? '').toLowerCase()
  const levels = new Set()
  if (/undergrad|bachelor/.test(t)) levels.add('undergraduate')
  // "graduate" on its own or in "postgraduate", but not the one inside "undergraduate".
  if (/master|(^|[^r])graduate/.test(t)) levels.add('graduate')
  if (/phd|\bdoctor|postgraduate/.test(t)) levels.add('phd')
  if (/postdoc/.test(t)) levels.add('postdoctoral')
  return levels
}

/** Countries for the country menu: "China (Chengdu)" → China; "France & Singapore" → both. */
export function countriesOf(item) {
  const hosts = hostCountries(item)
  if (hosts.length) return hosts
  const raw = String(item?.country ?? '').replace(/\(.*?\)/g, '').trim()
  return raw ? [raw] : []
}

// Search words that name a study level are matched against the listing's
// level only — otherwise "undergraduate" finds every master's that asks for
// an undergraduate degree.
const LEVEL_WORDS = {
  undergraduate: ['undergraduate'],
  undergrad: ['undergraduate'],
  bachelor: ['undergraduate'],
  bachelors: ['undergraduate'],
  graduate: ['graduate'],
  master: ['graduate'],
  masters: ['graduate'],
  msc: ['graduate'],
  postgraduate: ['graduate', 'phd'],
  phd: ['phd'],
  doctoral: ['phd'],
  doctorate: ['phd'],
  postdoc: ['postdoctoral'],
  postdoctoral: ['postdoctoral'],
}

const words = (text) =>
  String(text ?? '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)

// What a listing is: its name, host, level, subject and tags.
const mainWords = (i) => words([i.name, i.org, i.country, i.level, i.fields, i.category, ...(i.tags ?? [])].join(' '))
// Plus who can apply and the summary, which mention many other countries and degrees.
const allWords = (i) => [...mainWords(i), ...words(`${i.nationalities ?? ''} ${i.summary ?? ''}`)]

function matches(item, query, text) {
  const levels = levelsOf(item)
  return query.every((q) => (LEVEL_WORDS[q] ? LEVEL_WORDS[q].some((l) => levels.has(l)) : text.some((w) => w.startsWith(q))))
}

/**
 * Listings matching every word of `q`. A word matches the start of a word in
 * the listing ("chin" finds China; "graduate" does not find "undergraduate").
 * Matches on what the listing is come first; only when there are none does
 * the search fall back to who can apply, so "China" lists scholarships in
 * China rather than every award Chinese students may hold, while "Nigerian"
 * still finds the calls open to Nigerians.
 */
export function searchListings(items, q) {
  const query = words(q)
  if (!query.length) return items
  const main = items.filter((i) => matches(i, query, mainWords(i)))
  return main.length ? main : items.filter((i) => matches(i, query, allWords(i)))
}
