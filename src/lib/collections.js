/**
 * Topic pages built from the open listings: scholarships you can get without
 * IELTS, fully funded scholarships for Africans, and the 2027 scholarship
 * statistics report. Shared by the pages (src/pages/CollectionPage.jsx,
 * src/pages/StatsPage.jsx) and their pre-rendered HTML (build-seo.js).
 */
import { isOpenTo, LEVELS, matchesLevel, hostCountries } from './eligibility.js'

/** Everything a listing says about who can apply and how. */
export const listingText = (item) =>
  [item.who, item.nationalities, item.summary, item.note, item.deadlineNote, item.amount, ...(item.eligibility ?? []), ...(item.documents ?? [])]
    .filter(Boolean)
    .join(' ')

// The listing names a way to prove English without IELTS: a waiver, an
// English-medium degree (MOI letter), or another test such as Duolingo.
const ENGLISH_WAIVER =
  /\b(english|ielts|toefl|language) (language )?(test|requirement|proficiency|certificate|score)s? (is |are |can be |may be |will be )?(waived|exempted)|\bexempt(ed|ion)? (from|of) (the )?(english|ielts|toefl|language)|\b(waiver|exemption) (of|from|for) (the )?(english|ielts|toefl|language)/i
const ENGLISH_DEGREE =
  /medium of instruction|\bmoi\b|english[- ]medium (study|studies|education|degree|instruction|university|institution)|(degree|studies|study|education)( was)? (taught|completed) (entirely |fully )?in english/i
const NO_TEST = /without (an? )?(ielts|english (language )?test)|no (ielts|english (language )?test) (is )?(needed|required)|ielts (is )?not (required|needed)/i
const NO_IELTS = new RegExp([ENGLISH_WAIVER, ENGLISH_DEGREE, NO_TEST, /duolingo/i].map((r) => r.source).join('|'), 'i')

/** How the listing lets you show English without IELTS, for the page's short label. */
export function englishRoute(item) {
  const t = listingText(item)
  const routes = []
  if (NO_TEST.test(t)) routes.push('No IELTS required')
  if (ENGLISH_DEGREE.test(t)) routes.push('English-taught degree / MOI letter')
  if (/duolingo/i.test(t)) routes.push('Duolingo accepted')
  if (ENGLISH_WAIVER.test(t) && !routes.length) routes.push('English test waiver')
  return routes
}

const AFRICA = { name: 'Africa', demonym: 'African', region: 'Africa', commonwealth: false, developing: true }
const AFRICA_ONLY = /\bafrica\b|\bafrican\b|sub-saharan|ecowas|sadc|mastercard foundation/i

export const COLLECTIONS = {
  'no-ielts': {
    path: '/scholarships-without-ielts-2027',
    seo: {
      title: 'Scholarships Without IELTS 2027 (Open Now)',
      description:
        'Open 2027 scholarships that accept an English-taught degree (MOI letter), Duolingo or a waiver instead of IELTS, checked on each funder’s own site.',
    },
    eyebrow: 'No IELTS needed',
    title: 'Scholarships without IELTS',
    accent: '2027.',
    lede: 'Open scholarships whose official requirements let you prove English without IELTS: with a medium-of-instruction (MOI) letter from an English-taught degree, the cheaper Duolingo English Test, or a waiver.',
    tips: [
      'An MOI letter is a short letter from your university (or school, for bachelor’s applicants) confirming that your studies were taught in English. Ask your registrar for it early, on official letterhead and signed.',
      'Many countries count as English-speaking for these rules (for example Nigeria, Ghana, Kenya, Liberia, Uganda and Cameroon’s anglophone system), but each university decides. Check the listing’s official page.',
      'The Duolingo English Test is taken online at home and costs much less than IELTS. Results arrive in about two days.',
      'Some universities waive IELTS but still ask for an interview in English. Prepare for it.',
    ],
    test: (item) => NO_IELTS.test(listingText(item)),
  },
  africa: {
    path: '/fully-funded-scholarships-for-africans-2027',
    seo: {
      title: 'Fully Funded Scholarships for Africans 2027',
      description:
        'Every open fully funded scholarship African students can apply for in 2027: Africa-only awards first, then those open to all nationalities. Official links.',
    },
    eyebrow: 'For African students',
    title: 'Fully funded scholarships',
    accent: 'for Africans 2027.',
    lede: 'Every open fully funded scholarship that African students can apply for. Awards reserved for Africans come first, then fully funded awards open to students from every country, including Africa.',
    tips: [
      'Start with the Africa-only awards: fewer people compete for them.',
      'Most fully funded awards ask for strong grades, a clear study plan and two references. Prepare these before the call opens.',
      'Get your transcripts and certificates certified and, if needed, translated early: it often takes longest.',
      'Each listing links to the funder’s own page. Always check the country list there before you apply.',
    ],
    test: (item) => item.funding === 'Fully Funded' && isOpenTo(item, AFRICA),
    groups: [
      { key: 'only', title: 'Reserved for African students', test: (item) => AFRICA_ONLY.test(`${item.name} ${listingText(item)}`) },
      { key: 'open', title: 'Open to Africans and all nationalities', test: () => true },
    ],
  },
}

export const STATS_PATH = '/scholarship-statistics-2027'

export const statsSeo = {
  title: 'Scholarship Statistics 2027: Funding, Deadlines, Top Countries',
  description:
    'How many 2027 scholarships are fully funded, which countries and levels offer the most, and when deadlines fall: figures from every open call we track, updated daily.',
}

const pct = (n, total) => (total ? Math.round((n / total) * 100) : 0)
const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

/** Figures for the statistics page from the open scholarships (and the counts of other types). */
export function scholarshipStats(scholarships, otherCounts = {}) {
  const total = scholarships.length
  const full = scholarships.filter((s) => s.funding === 'Fully Funded').length
  const partial = scholarships.filter((s) => s.funding === 'Partially Funded').length

  const levels = LEVELS.filter((l) => ['undergraduate', 'masters', 'phd'].includes(l.slug)).map((l) => {
    const list = scholarships.filter((s) => matchesLevel(s, l))
    return { label: l.label, count: list.length, full: list.filter((s) => s.funding === 'Fully Funded').length }
  })

  const countries = new Map()
  for (const s of scholarships) for (const c of hostCountries(s)) countries.set(c, (countries.get(c) ?? 0) + 1)
  const topCountries = [...countries.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 10).map(([name, count]) => ({ name, count }))

  const months = new Map()
  for (const s of scholarships) {
    const key = String(s.deadline ?? '').slice(0, 7)
    if (/^\d{4}-\d{2}$/.test(key)) months.set(key, (months.get(key) ?? 0) + 1)
  }
  const byMonth = [...months.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([key, count]) => ({ label: MONTH.format(new Date(`${key}-15T12:00:00Z`)), count }))
  const busiest = [...byMonth].sort((a, b) => b.count - a.count)[0]

  const noIelts = scholarships.filter(COLLECTIONS['no-ielts'].test).length

  return {
    total,
    full,
    partial,
    fullPct: pct(full, total),
    levels,
    topCountries,
    countryCount: countries.size,
    byMonth,
    busiest,
    noIelts,
    noIeltsPct: pct(noIelts, total),
    otherCounts,
  }
}
