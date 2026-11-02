/**
 * Audit of 2 Nov 2026, checked on each funder's own site. Merged in
 * fixes-oct21-2026.js.
 *  - retired: { slug: 'why it was removed (source)' } — duplicates and unconfirmed dates
 *  - fixes:   { slug: { officialUrl, deadline, deadlineNote } } — only the fields that changed
 */
export const retired = {
  'imf-paid-internships': 'Same call as imf-fund-internship-program-2027.',
  'ma-in-european-public-health-scholarships': 'Same call as europubhealth-erasmus-mundus-scholarship-2027-29.',
  'russian-government-scholarship-open-doors-quota': 'The 13 Nov 2026 date could not be confirmed: other sites give 1 Nov for Open Doors and 15 Dec or 15 Jan for the quota, and the listing mixes the two routes. Relist each route once its date is confirmed: https://education-in-russia.com/',
}

export const fixes = {
  'rotary-global-grant-scholarship-district-5890-houston': {
    deadline: '2026-11-21',
    deadlineNote: 'Clubs send candidates’ applications to the District 5890 Global Grant Scholar Committee Chair by 5 pm CST on 21 November 2026; the mandatory interview is on 5 December. Applicants submit to a local Rotary club first, in September–October, so contact your club now.',
  },
  'amazon-research-awards-multilingual-contextual-ai': {
    officialUrl: 'https://www.amazon.science/research-awards/call-for-proposals/multilingual-and-contextual-ai-evaluation-call-for-proposals-fall-2026',
    deadline: '2026-11-11',
    deadlineNote: 'Submissions close at 11:59 pm Pacific Time on 11 November 2026.',
  },
  'tu-delft-justus-louise-van-effen-excellence-scholarship-2027': {
    officialUrl: 'https://www.tudelft.nl/en/education/study-programme-orientation/practical-matters/scholarships',
    amount: 'Full tuition + contribution to living costs',
  },
}
