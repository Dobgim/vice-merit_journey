/**
 * Audit of 27 Oct 2026, part A — written by the audit agent after checking each
 * listing on the funder's own site. Merged in fixes-oct21-2026.js.
 *  - retired: { slug: 'why it was removed (source)' } — closed, invitation-only or gone
 *  - fixes:   { slug: { officialUrl, deadline, deadlineNote } } — only the fields that changed
 */
export const retired = {
  'vanier-canada-graduate-scholarship': 'Programme discontinued; the official site says it is no longer accepting applications and points to the new Canada Graduate Research Scholarship – Doctoral (https://vanier.gc.ca/en/home-accueil.html)',
  'lester-b-pearson-scholarship': 'Needs a school nomination, and the nomination deadline was 9 Oct 2026 (admission deadline 16 Oct); no longer open to new applicants (https://future.utoronto.ca/pearson-scholarships)',
  'australia-awards-scholarship': '2027 intake closed 30 Apr 2026; the next round is not open (https://www.dfat.gov.au/people-to-people/australia-awards/australia-awards-scholarships-opening-and-closing-dates)',
  'mext-japanese-government-scholarship': 'Embassy-recommendation route for 2027 is past its application stage (documents go to embassies Apr–May, first screening May–July 2026); next call not yet open (https://www.studyinjapan.go.jp/en/smap-stopj-applications-research.html)',
  'commonwealth-shared-scholarships-2027': 'Applications for 2027/28 open only on 10 Nov 2026 (close 8 Dec 2026), so not open yet (https://cscuk.fcdo.gov.uk/scholarships/commonwealth-shared-scholarships-applications/)',
  'taiwanicdf-higher-education-scholarship': 'The 2027 application window opens only on 1 Dec 2026 (closes 15 Mar 2027), so not open yet (https://www.icdf.org.tw/wSite/np?ctNode=31566&CtUnit=368&BaseDSD=7&mp=2)',
  'pierre-elliott-trudeau-foundation-doctoral-scholarship': 'Two-step process: eligibility screening was due 2 Oct 2026 and only confirmed applicants can open the full application, so closed to new applicants (https://www.trudeaufoundation.ca/2027-applications/)',
  'capes-pdse-2027-doctoral-sandwich-abroad': 'Open only to candidates already approved in their institution’s internal selection (ended 16 Oct 2026); CAPES registration for those candidates runs 20 Oct–18 Nov 2026 (https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/bolsas/bolsas-e-auxilios-internacionais/encontre-aqui/paises/multinacional/programa-de-doutorado-sanduiche-no-exterior-pdse)',
}

export const fixes = {
  'princeton-fung-global-fellows': {
    officialUrl: 'https://funggfp.princeton.edu/applications',
  },
  'abcd-future-environmental-leaders-scholarships': {
    officialUrl: 'https://www.abcd-centre.org/fel.html',
  },
  'schlumberger-faculty-for-the-future': {
    officialUrl: 'https://www.facultyforthefuture.net/apply-now/',
  },
  'ubc-international-scholars-program-2027': {
    officialUrl: 'https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/',
  },
  'ma-in-european-public-health-scholarships': {
    officialUrl: 'https://www.europubhealth.org/application-procedure/',
  },
  'imperial-college-president-s-phd-scholarships': {
    officialUrl: 'https://www.imperial.ac.uk/study/fees-and-funding/postgraduate-doctoral/grants-scholarships/presidents-phd/',
  },
  'wales-graduate-school-for-the-social-sciences-esrc-studentships': {
    officialUrl: 'https://wgsss.ac.uk/student-led-general-competition/',
    deadline: '2026-12-11',
    deadlineNote: 'The WGSSS page gives 14 December 2026 in the text but 11 December 2026 (11:55pm) for the advert; the earlier date is used, and universities may set earlier internal deadlines.',
  },
  'epfl-excellence-fellowships': {
    officialUrl: 'https://www.epfl.ch/education/master/master-excellence-fellowships/how-to-apply/',
  },
  'fmi-international-phd-program': {
    officialUrl: 'https://www.fmi.ch/education-careers/programs/',
  },
  'university-of-macau-master-s-scholarships': {
    officialUrl: 'https://gao.um.edu.mo/international-admission/scholarship-assistantship-academic-prizes/admission-scholarship/',
  },
  'kaust-scholarship': {
    officialUrl: 'https://admissions.kaust.edu.sa/how-to-apply/admission-timelines',
  },
  'doha-institute-for-graduate-studies-scholarship': {
    officialUrl: 'https://www.dohainstitute.edu.qa/en/admissions-office/pages/apply.aspx',
  },
  'mbzuai-scholarship': {
    officialUrl: 'https://mbzuai.ac.ae/admissions/graduate-masters-admissions',
  },
  'umea-university-doctoral-positions': {
    officialUrl: 'https://www.umu.se/en/work-with-us/open-positions/phd-students-in-statistics_965375/',
  },
  'erasmus-mundus-master-in-public-policy-mundus-mapp': {
    officialUrl: 'https://www.mundusmapp.org/how-to-apply/',
  },
  'university-of-guelph-vaccarino-president-s-scholarship': {
    officialUrl: 'https://www.uoguelph.ca/registrar/finances-fees/vaccarino',
  },
  'university-of-cincinnati-cincinnatus-scholarship': {
    officialUrl: 'https://www.admissions.uc.edu/tuition-aid/scholarships/cincinnatus.html',
  },
  'chick-fil-a-community-scholars': {
    officialUrl: 'https://www.chick-fil-a.com/community-scholars',
  },
  'college-board-bigfuture-scholarships': {
    officialUrl: 'https://bigfuture.collegeboard.org/pay-for-college/bigfuture-scholarships-2027',
  },
  'iaea-marie-sk-odowska-curie-fellowship-programme': {
    officialUrl: 'https://www.iaea.org/services/key-programmes/iaea-marie-sklodowska-curie-fellowship-programme/information-for-applicants',
  },
  'east-west-center-graduate-degree-fellowship-2027': {
    officialUrl: 'https://www.eastwestcenter.org/apply/east-west-center-graduate-degree-fellowship-apply-now',
  },
}
