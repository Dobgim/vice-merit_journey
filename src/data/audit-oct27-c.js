/**
 * Audit of 27 Oct 2026, part C — written by the audit agent after checking each
 * listing on the funder's own site. Merged in fixes-oct21-2026.js.
 *  - retired: { slug: 'why it was removed (source)' } — closed, invitation-only or gone
 *  - fixes:   { slug: { officialUrl, deadline, deadlineNote } } — only the fields that changed
 */
export const retired = {
  'african-female-artist-mentorship-program': 'Girl Child Art Foundation’s page still shows the 2025–26 call (deadline 30 Oct 2025) and no 2026–27 call is published: https://www.girlchildart.org/art-mentorship-mentees/',
  'capes-pipd-postdoctoral-fellowship-overseas-round-2': 'CAPES page lists round 2 registration as 13 Nov–9 Dec 2026, so it is not open yet: https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/bolsas/bolsas-no-pais/programa-institucional-de-pos-doutorado-pipd',
  'landis-gyr-foundation-residency-zug': 'Zug 2028 application period opens only on 1 Dec 2026 (runs to 31 Jan 2027): https://www.lg-stiftung.ch/en/apply',
}

export const fixes = {
  'african-union-internship': { officialUrl: 'https://jobs.au.int/job/Internship-Program/1506-en_US' },
  'equality-fund-journalism-fellowship': { officialUrl: 'https://equalityfund.ca/en/posts/application-journalism-fellowship' },
  'yale-maurice-r-greenberg-world-fellows': { officialUrl: 'https://worldfellows.yale.edu/the-program/application/' },
  'imf-economist-program': { officialUrl: 'https://www.imf.org/en/about/recruitment/working-at-the-imf/economist-program' },
  'open-call-for-emerging-african-storytellers': { officialUrl: 'https://africanofilter.org/what-we-do/community/kekere-storytellers-fund/' },
  'kleinhans-fellowship-for-community-forestry-research': { officialUrl: 'https://www.rainforest-alliance.org/in-the-field/kleinhans-fellowship/' },
  'inlaks-fellowship-for-social-engagement': { officialUrl: 'https://inlaksfoundation.org/opportunities/fellowships/inlaks-shivdasani-fellowship-for-social-engagement/' },
  'acumen-india-fellowship-2027': { officialUrl: 'https://fellowship.acumenacademy.org/india-acumen-fellowship' },
  'acumen-uk-fellowship-2027': { officialUrl: 'https://fellowship.acumenacademy.org/uk' },
  'acumen-southeast-asia-fellowship-2027': { officialUrl: 'https://fellowship.acumenacademy.org/southeast-asia' },
  'aacr-june-l-biedler-prize-for-cancer-journalism': {
    officialUrl: 'https://www.aacr.org/about-the-aacr/newsroom/news-releases/call-for-submissions-2027-aacr-june-l-biedler-prize-for-cancer-journalism/',
    deadline: '2026-12-07',
    deadlineNote: 'AACR’s call for the 2027 prize gives Monday 7 December 2026 as the submission deadline.',
  },
  'international-schools-essay-competition-and-debate': { officialUrl: 'https://trustforsustainableliving.org/take-part/international-schools-essay-competition-and-debate' },
  'sillerman-first-book-prize-for-african-poets-2027': { officialUrl: 'https://africanpoetrybf.brown.edu/2027-sillerman-prize-for-african-poetry-now-open/' },
}
