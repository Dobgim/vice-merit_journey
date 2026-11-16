/**
 * Link review of 16 Nov 2026: listings whose official link had moved, checked
 * on each funder's own site. Merged in fixes-oct21-2026.js.
 *  - retired: { slug: 'why it was removed (source)' }
 *  - fixes:   { slug: { officialUrl, amount } } — only the fields that changed
 */
export const retired = {
  'mercedes-benz-south-africa-bursary-programme-2027':
    'Closed 12 Nov 2026 and the job posting (MER00049EO) has been taken down: its address now shows Mercedes-Benz’s “no longer available” page.',
}

export const fixes = {
  // The LMB moved to mrclmb.ac.uk; its banner still gives 8 December 2026 for 2027 entry.
  'mrc-laboratory-of-molecular-biology-international-phd-programme-2027': {
    officialUrl: 'https://mrclmb.ac.uk/careers-and-people/phd-students/how-to-apply/',
  },
  // The page is now called "single-image"; it still gives 5 January 2027, 16:00 GMT.
  'sony-world-photography-awards-2027-single-image-and-youth-competitions': {
    officialUrl: 'https://www.worldphoto.org/sony-world-photography-awards/single-image',
  },
  // Polimi folded the scholarship pages into one. The 2027-28 call (PDF linked there)
  // confirms noon on 15 December 2026 and gives the Gold amount as well.
  'politecnico-di-milano-merit-based-international-scholarships-2027-28': {
    officialUrl: 'https://www.polimi.it/en/prospective-students/how-much-does-it-cost/scholarships',
    amount: 'Tuition waiver; Gold awards add €8,000 and Platinum awards €10,000',
  },
  // The awards page now redirects to the home page; the call itself (29 Oct 2026)
  // confirms entries are accepted up to 31 January 2027.
  'pan-african-re-insurance-journalism-awards-2027-12th-edition': {
    officialUrl: 'https://www.continental-re.com/entries-open-for-the-12th-pan-african-reinsurance-journalism-awards/?lang=eng',
  },
}
