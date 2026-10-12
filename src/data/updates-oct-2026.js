/**
 * Corrections found while researching each programme's official application
 * page (12 Oct 2026). Applied on top of the listings in opportunities.js, so
 * every change is visible in one place. `applyLinks` (generated after each
 * link was checked in a browser) points "Apply" buttons and flyer QR codes at
 * the programme's own application page instead of a homepage or web search.
 */
import { applyLinks } from './applyLinks'
import { formatDate } from '../lib/deadline'

export const corrections = {
  // Official page: a bursary to attend the One Young World Summit; closed 16 Sep.
  'brand-south-africa-play-your-part-bursary': {
    org: 'Brand South Africa & One Young World',
    level: 'Young leaders (18–30)',
    amount: 'Summit bursary (travel and accommodation as required)',
    summary: 'A bursary for young South Africans to attend the One Young World Summit 2026 in Cape Town (3–6 Nov 2026).',
    deadline: '2026-09-16',
    deadlineNote: 'The official One Young World page lists 16 September 2026 as the deadline (the source list said 3 November).',
  },
  'aasm-foundation-strategic-research-grant-program': {
    deadlineNote: 'Letter-of-intent deadline for the next cycle, per listings. The 2026 cycle has closed — check the AASM Foundation site for the current dates.',
  },
  // Same call as IFRA-Nigeria (the French Institute for Research in Africa, Nigeria office).
  'french-institute-for-research-in-africa-grants': {
    org: 'IFRA-Nigeria',
    deadlineNote: 'This is the IFRA-Nigeria research grant call (IFRA is the French Institute for Research in Africa).',
  },
  // The source list misspelled the organisation as “EEEM”.
  'eeem-foundation-community-impact-grant-program': {
    name: 'TEEEM Foundation Community Impact Grant Program',
    org: 'TEEEM Foundation',
    amount: 'US$5,000 – $30,000',
    summary: 'Grants of US$5,000–30,000 for nonprofits and NGOs running community projects.',
    logoDomain: 'teeem.org',
  },
  'uneca-continental-call-for-african-ai-innovations': {
    deadline: '2026-10-02',
    deadlineNote: 'Listings give 2 October 2026 as the deadline; selected solutions are showcased in Accra on 2–5 November 2026.',
  },
  'un-youth-townhall-funding': {
    deadline: '2026-09-07',
    deadlineNote: 'Funding applications closed on 7 September 2026. The Townhall itself takes place in Heidelberg, Germany, on 8–10 December 2026.',
  },
  'un-global-compact-business-and-human-rights-accelerator': {
    deadline: '2026-11-30',
    deadlineNote: 'Applications for the 2026/2027 cohort close on 30 November 2026; space is limited.',
  },
  'opec-fund-for-international-development-internship': {
    deadline: '2026-04-12',
    deadlineNote: 'The 2026 Internship Program closed on 12 April 2026. The next call is usually published early in the year.',
  },
  'kohli-foundation-sociology-on-stage': {
    deadline: null,
    deadlineNote: 'The official call accepts applications on an ongoing basis until the annual budget is used up.',
  },
  'japan-africa-youth-program': {
    deadlineNote: 'We could only confirm the 2026 round (for African animation professionals, run by JICE), which closed on 8 September 2026. The 18 April 2027 date from the source list could not be confirmed.',
  },
  'onx-seeds-program': { org: 'Onassis Foundation', country: 'Greece', flag: '🇬🇷', logoDomain: 'onassis.org' },
  'african-female-artist-mentorship-program': { org: 'Girl Child Art Foundation' },
  'open-call-for-emerging-african-storytellers': {
    org: 'Africa No Filter',
    deadlineNote: 'This is Africa No Filter’s Kekere Storytellers Fund (grants of US$500–3,000).',
    logoDomain: 'africanofilter.org',
  },
  'catholic-scholarships-in-kenya': {
    org: 'Catholic Scholarship Programme (Tangaza University College)',
    deadlineNote: 'The programme announces its application window each year in February or March.',
  },
  'scholarships-for-developing-countries-in-italy': {
    name: 'Invest Your Talent in Italy Scholarships',
    org: 'Italian Ministry of Foreign Affairs',
    deadlineNote: 'Applications usually open in January–February on the official portal; eligible countries change each year.',
    logoDomain: 'esteri.it',
  },
  'trisong-grants': { org: 'Khyentse Foundation', logoDomain: 'khyentsefoundation.org' },
  'optimizing-enzyme-innovation-for-industrial-plant-based-processing': { org: 'Roquette' },
  'disability-empowerment-fund-eastern-cape': { org: 'Disability Economic Empowerment Trust (DEET)' },
  'biopage-storytelling-writing-contest': {
    deadlineNote: 'We could not find an official 2027 edition — the last confirmed Biopage contest ran in 2020. Treat this listing with caution.',
  },
  'africa-young-entrepreneur-support': {
    deadlineNote: 'No call newer than 2020 could be found. Check that the programme is still running before applying.',
  },
  'twas-research-professors-in-least-developed-countries': {
    deadlineNote: 'TWAS’s programme page lists a 4 December deadline; some listings give 23 October. Confirm on the official page.',
  },
  'lisa-jardine-grant-scheme': {
    deadlineNote: 'Past rounds opened in January and closed in March — confirm the current round on the Royal Society page.',
  },
  'princeton-fung-global-fellows': { logoDomain: 'princeton.edu' },
  'uongozi-institute-emerging-leaders-programme': { logoDomain: 'uongozi.or.tz' },
  'columbia-university-scholarships-for-displaced-students': { logoDomain: 'columbia.edu' },
  'yali-mandela-washington-fellowship': { logoDomain: 'state.gov' },
  'adina-talve-goodman-fellowship': { logoDomain: 'one-story.com' },
}

// Removed: the same call already appears as IFRA-Nigeria Research Grants.
export const removed = new Set(['french-institute-for-research-in-africa-grants'])

/** Apply corrections and verified application links to a list of listings. */
export function applyUpdates(items) {
  return items
    .filter((i) => !removed.has(i.slug))
    .map((i) => {
      const fix = corrections[i.slug]
      const link = applyLinks[i.slug]
      let out = fix ? { ...i, ...fix } : i
      // Keep the overview and key dates consistent with a corrected summary/deadline.
      if (fix?.summary && i.overview?.[0] === i.summary) out.overview = [fix.summary, ...i.overview.slice(1)]
      if (fix && 'deadline' in fix) {
        const rest = (i.timeline ?? []).filter((t) => t.label !== 'Application deadline')
        out.timeline = fix.deadline ? [...rest, { date: formatDate(fix.deadline), label: 'Application deadline' }] : rest
      }
      if (link) out = { ...out, officialUrl: link, officialSearch: false }
      return out
    })
}
