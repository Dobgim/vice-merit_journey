/**
 * Check of 28 Oct 2026, done while adding the consultancy master list: calls
 * that are listed but do not accept applications yet. Each is hidden until
 * `opensOn`, then shown as newly posted. Merged in fixes-oct21-2026.js.
 */
export const retired = {}

const opensOn = (date, deadlineNote) => ({ opensOn: date, posted: date, deadlineNote })

export const fixes = {
  'stipendium-hungaricum-2027-28': opensOn('2026-11-17', 'Applications are expected to open on 17 November 2026 and close at 14:00 CET on 15 January 2027. You also need a nomination from your country’s Sending Partner.'),
  'turkiye-scholarships-turkiye-burslar-2027': opensOn('2027-01-10', 'Applications open on 10 January 2027 and close on 20 February 2027 (Turkish time).'),
  'swe-golden-gate-section-scholarships': opensOn('2026-12-01', 'Applications open on 1 December 2026.'),
  'wenner-gren-wadsworth-african-fellowship-2027': opensOn('2026-11-01', 'The application portal opens on 1 November 2026. Apply in the first year of your doctorate.'),
  'wenner-gren-engaged-research-grant': opensOn('2027-06-01', 'The application portal opens in June 2027.'),
  'ikea-foundation-switzerland-scholarships': opensOn('2026-11-16', 'Applications open on a new portal in mid-November 2026.'),
  'ikea-foundation-switzerland-project-and-work-grants': opensOn('2026-11-16', 'Applications open on a new portal in mid-November 2026. Apply at least four months before your project starts.'),
  'prosperous-future-grant-programme-2027-round-5': opensOn('2026-11-18', 'Applications open on 18 November 2026 and close at 23:59 on 27 January 2027.'),
}
