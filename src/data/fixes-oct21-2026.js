/**
 * Direct application pages, removals and corrections from re-checking every
 * listing whose "Apply" button was a web search or a bare homepage
 * (21 Oct 2026). Applied to the built-in listings (updates-oct-2026.js) and
 * to listings saved in the dashboard (hooks/useScholarships.js), so the
 * button always opens the call's own instructions.
 */

import { formatDate } from '../lib/deadline'

/** slug → the page with the call's instructions and application route. */
export const directLinks = {
  '81st-college-photographer-of-the-year': 'https://cpoy.org/rules',
  'a4-residency-art-center-international-residency-fellowship-2028-chengdu': 'https://www.a4artmuseum.com/en/a4-residencyartcenter/residing/latest-recruitment/',
  'abcd-future-environmental-leaders-scholarships': 'https://www.abcd-centre.org/scholarships',
  'acu-edward-boyle-medical-elective-bursaries': 'https://www.acu.ac.uk/funding-opportunities/for-university-staff/university-staff-grants/edward-boyle-medical-electives/',
  'acu-writing-for-the-media-training': 'https://www.acu.ac.uk/funding-opportunities/for-university-staff/grants/writing-for-the-media-training-with-universal-impact-the-conversation/',
  'african-female-artist-mentorship-program': 'https://www.girlchildart.org/art-mentorship-mentees/',
  'african-union-internship': 'https://au.int/en/internships',
  'aithyra-international-phd-programme': 'https://aithyra.at/about/phd-program',
  'amelia-earhart-fellowship-2027': 'https://www.zonta.org/Web/Web/Programs/Education/Amelia_Earhart_Fellowship.aspx',
  'arso-continental-essay-competition': 'https://www.arso-oran.org/ova_dep/continental-essay-competition/',
  'ashoka-fellowship': 'https://www.ashoka.org/en-us/recommend-ashoka-fellow',
  'asian-cultural-council-2027-fellowships-grants': 'https://www.asianculturalcouncil.org/grant-opportunities',
  'atlantic-fellows-for-social-and-economic-equity-lse-2027-28': 'https://afsee.atlanticfellows.lse.ac.uk/en-gb/apply',
  'australian-research-council-grants': 'https://www.arc.gov.au/funding-research/scheme-calendar',
  'bank-of-namibia-undergraduate-bursary': 'https://services.bon.com.na/undergraduate-bursaries/home/general-information',
  'beit-trust-postgraduate-scholarships-2027': 'https://beittrust.org.uk/beit-trust-scholarships/',
  'branco-weiss-fellowship-society-in-science-2027': 'https://brancoweissfellowship.org/who-should-apply/application/',
  'capes-pdse-2027-doctoral-sandwich-abroad': 'https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/bolsas/bolsas-e-auxilios-internacionais/encontre-aqui/paises/multinacional/programa-de-doutorado-sanduiche-no-exterior-pdse',
  'capes-pipd-postdoctoral-fellowship-overseas-round-2': 'https://www.gov.br/capes/pt-br/acesso-a-informacao/acoes-e-programas/bolsas/bolsas-no-pais/programa-institucional-de-pos-doutorado-pipd',
  'catholic-scholarships-in-kenya': 'https://studyat.tangaza.ac.ke/student-life/scholarships/',
  'changemakers-for-youth-programme-2027-cohort-2': 'https://changemakerxchange.org/changemakers-for-youth/',
  'chick-fil-a-community-scholars': 'https://scholarshipamerica.org/scholarship/cfacommunityscholars/',
  'chile-anid-national-doctoral-scholarship-2027-beca-doctorado-nacional': 'https://anid.cl/concursos/beca-de-doctorado-nacional-ano-academico-2027/',
  'cite-internationale-des-arts-residency-paris': 'https://www.artexplora.org/en/the-artists-residencies-programme-presentation',
  'commonwealth-foundation-grants-2026-27': 'https://grants.commonwealthfoundation.com/',
  'commonwealth-secretariat-internship': 'https://thecommonwealth.current-vacancies.com/',
  'conservation-food-health-foundation-grants': 'https://cfhfoundation.grantsmanagement08.com/?page_id=6',
  'copenhagen-business-school-phd-in-auditing': 'https://www.cbs.dk/en/about-cbs/job-and-career/vacant-positions',
  'creative-industries-fund-nl-videotage-design-residency-hong-kong': 'https://www.stimuleringsfonds.nl/en/news/residencies',
  'csc-award-for-outstanding-self-financed-chinese-students-abroad-2026-27': 'https://australia.lxgz.org.cn/australia/tzgg/2026101409374876776/index.html',
  'danish-art-workshops-residency': 'https://svfk.dk/en/residency',
  'dreyfus-program-for-transformative-research': 'https://www.dreyfus.org/program-for-transformative-research-launches/',
  'east-west-center-graduate-degree-fellowship-2027': 'https://www.eastwestcenter.org/apply',
  'eeem-foundation-community-impact-grant-program': 'https://teeem.org/foundation',
  'elks-most-valuable-student-scholarship': 'https://www.elks.org/scholars/scholarships/mvs.cfm',
  'equality-fund-journalism-fellowship': 'https://equalityfund.ca/journalism-fellowship',
  'european-youth-assembly-2027-funded-seats-amsterdam': 'https://thecips.org/eya2027/',
  'eyebeam-nyc-residency-spring-2027-agency': 'https://eyebeam.org/articles/agency-nyc-residency',
  'florence-nightingale-foundation-leadership-scholarships-2027-28': 'https://florence-nightingale-foundation.org.uk/scholarships/',
  'ford-foundation-grants': 'https://www.fordfoundation.org/work/our-grants/',
  'fortis-fellowship-2027': 'https://fortissociety.org/fellowship',
  'full-international-master-on-wine-tourism-innovation': 'https://www.wintour-master.eu/en/apply/emjm-scholarships/',
  'funds-for-women-journalists-iwmf-relief-fund-rainforest-journalism-fund': 'https://www.iwmf.org/programs/emergency-fund/',
  'gates-foundation-grand-challenges': 'https://gcgh.grandchallenges.org/challenges',
  'getfund-local-scholarships-2026-27': 'https://getfund.gov.gh/news/getfund-opens-applications-for-2026-27-undergraduate-and-postgraduate-local-scholarships',
  'giz-internships': 'https://www.giz.de/en/career/jobs/internships',
  'global-eba-fund-medium-size-grants': 'https://globalebafund.org/medium-size-grants/',
  'global-korea-scholarship-2027-undergraduate': 'https://overseas.mofa.go.kr/bd-en/brd/m_2124/view.do?seq=760106',
  'global-youth-impact-summit-2027-funded-seats-paris': 'https://thecgad.org/gyis/',
  'grofin': 'https://www.grofin.com/business-loans/',
  'hansen-leadership-institute': 'https://hansenleadershipinstitute.org/apply-now/',
  'hopper-prize-fall-2026-artist-grants': 'https://hopperprize.org/apply',
  'humanity-ai-open-call': 'https://humanityai.ai/open-call/',
  'humber-scholarships-canada': 'https://humber.ca/international/admissions-financial-aid/scholarships-bursaries',
  'ifra-nigeria-research-grants': 'https://ifra-nigeria.org/opportunities/calls-grants/806-ifra-nigeria-research-grants-2027',
  'ikea-foundation-switzerland-project-and-work-grants': 'https://ikea-stiftung.ch/wp-content/uploads/2025/11/251031-01-Ikea_Stiftung_Schweiz-DE-RICHTLINIEN1_November_2025.pdf',
  'ikea-foundation-switzerland-scholarships': 'https://ikea-stiftung.ch/wp-content/uploads/2025/11/251031-01-Ikea_Stiftung_Schweiz-DE-RICHTLINIEN1_November_2025.pdf',
  'ilo-internship-programme': 'https://www.ilo.org/resource/internship-opportunities',
  'inlaks-asia-art-archive-art-grant': 'https://inlaksfoundation.org/opportunities/grants/aaa-inlaks-art-grant/',
  'inlaks-fellowship-for-social-engagement': 'https://inlaksfoundation.org/opportunities/',
  'inpex-foundation-scholarship-2027': 'https://inpex-s.com/en/scholarship-program/index.php',
  'inter-american-development-bank-internship': 'https://www.iadb.org/en/how-we-can-work-together/students-recent-graduates',
  'international-foundation-for-science-individual-research-grants': 'https://www.foundationifs.org/research/research-grant-guidelines',
  'japan-foundation-institutional-project-support-ips': 'https://ny.jpf.go.jp/grants/grants-for-japanese-studies/ips-grant-program/',
  'japan-foundation-japanese-studies-fellowship-2027-28': 'https://co.jpf.go.jp/pool/user_upload/files/foerderprogramme/2027-28/RJS-FW2027_e.pdf',
  'japan-foundation-u-s-southeast-asia-japan-collaborative-exchange': 'https://ny.jpf.go.jp/japanese-studies/u-s-southeast-asia-japan-collaboration-and-exchange-initiative/',
  'jefferson-scholarship-university-of-virginia': 'https://www.jeffersonscholars.org/scholarships/selection',
  'jf-fellowship-for-arts-and-culture-in-asia-wa2-0-2027': 'https://www.jpf.go.jp/e/program/culture.html',
  'jf-jsa-asean-master-s-fellowship-fy2027': 'https://www.jpf.go.jp/e/program/intel.html',
  'jf-nichibunken-fellowship-2027-28': 'https://lo.jpf.go.jp/funding/programme/jf-nichibunken-fellowship/',
  'kaad-master-and-phd-scholarships-germany': 'https://www.kaad.de/en/stipendien/stipendienprogramm-1',
  'karibu-foundation-grants': 'https://www.karibu.no/our-partners/apply-for-a-grant-asia-latinamerica-middleeast-global/',
  'khoj-support-grants': 'https://khojstudios.org/opportunities/',
  'l-oreal-unesco-for-women-in-science': 'https://www.unesco.org/en/loreal-unesco-national-regional-programmes',
  'landis-gyr-foundation-residency-zug': 'https://www.lg-stiftung.ch/en/apply',
  'manaaki-new-zealand-scholarships': 'https://www.nzscholarships.govt.nz/how-to-apply-for-a-scholarship/',
  'mastercard-foundation-scholars-program-at-asu': 'https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/where-to-apply/arizona-state-university-asu/',
  'maypole-fund-small-grants': 'https://www.maypolefund.org/apply/',
  'mentora-scholars-transformative-leadership-academy': 'https://mentora.institute/mentora-scholars/',
  'mohamed-bin-zayed-species-conservation-fund': 'https://www.speciesconservation.org/blog/grant-application-timelines/',
  'noel-buxton-trust-africa-grants': 'https://noelbuxtontrust.org.uk/africa-5/',
  'nurses-educational-funds-nef-scholarships': 'https://www.n-e-f.org/index.php/apply.html',
  'open-society-foundations-internships': 'https://www.opensocietyfoundations.org/about/jobs-opportunities',
  'p-e-o-international-peace-scholarship-2027-28': 'https://www.peointernational.org/educational-support/international-peace-scholarship-fund/eligibility-and-application-process/',
  'pierre-elliott-trudeau-foundation-doctoral-scholarship': 'https://www.trudeaufoundation.ca/2027-applications/',
  'pulitzer-center-writing-contest': 'https://pulitzercenter.org/builder/lesson/local-letters-global-change-pulitzer-center-writing-contest',
  'queen-elizabeth-commonwealth-scholarships-2027-28-cycle-1': 'https://www.acu.ac.uk/qecs',
  'ron-brown-scholar-program': 'https://ronbrown.org/ron-brown-scholarship/',
  'rotary-global-grant-scholarship-district-5890-houston': 'https://rotaryd5890.org/page/2025-2026-rotary-foundation-global-grant-scholarships',
  'rotary-global-grant-scholarships-districts-5180-5190-sacramento-nevada': 'https://rotary5180.org/sitepage/global-grant-scholarships',
  'roy-g-post-foundation-scholarship': 'https://roygpost.org/applyforscholarship',
  'royal-entomological-society-photography-competitions': 'https://www.insectweek.org/art-and-photography/photography-competition/',
  'scholarships-for-developing-countries-in-italy': 'https://investyourtalentapplication.esteri.it/SitoIYT/EN/how-does-it-work',
  'sixi-air-open-call-2027-nanjing': 'https://siximuseum.com/en/news/8-sixi-air-project-open-call-2027-spring/',
  'sophie-danforth-fund-wild-planet-trust-and-minor-foundation': 'https://www.rwpzoo.org/danforth-conservation-grants/',
  'stipendium-hungaricum-2027-28': 'https://stipendiumhungaricum.hu/apply/',
  'sultan-qaboos-university-scholarship': 'https://www.squ.edu.om/ps/en-us/scholarships',
  'tony-elumelu-foundation-entrepreneurship-programme-2027': 'https://www.tonyelumelufoundation.org/tef-entrepreneurship-programme',
  'toshiba-international-foundation-grants': 'https://www.toshibafoundation.com/apply/grantsapplication.html',
  'turkiye-scholarships-turkiye-burslar-2027': 'https://www.turkiyeburslari.gov.tr/en/page/prospective-students/application-calendar',
  'un-eca-internship': 'https://careers.un.org/jobopening?language=en&data=%7B%22aoe%22%3A%5B%5D%2C%22aoi%22%3A%5B%5D%2C%22el%22%3A%5B%5D%2C%22ct%22%3A%5B%5D%2C%22ds%22%3A%5B%5D%2C%22jn%22%3A%5B%5D%2C%22jf%22%3A%5B%5D%2C%22jc%22%3A%5B%22INT%22%5D%2C%22jle%22%3A%5B%5D%2C%22dept%22%3A%5B%5D%2C%22span%22%3A%5B%5D%7D',
  'un-escap-internship': 'https://careers.un.org/jobopening?language=en&data=%7B%22aoe%22%3A%5B%5D%2C%22aoi%22%3A%5B%5D%2C%22el%22%3A%5B%5D%2C%22ct%22%3A%5B%5D%2C%22ds%22%3A%5B%5D%2C%22jn%22%3A%5B%5D%2C%22jf%22%3A%5B%5D%2C%22jc%22%3A%5B%22INT%22%5D%2C%22jle%22%3A%5B%5D%2C%22dept%22%3A%5B%5D%2C%22span%22%3A%5B%5D%7D',
  'un-habitat-internship-programme': 'https://careers.un.org/jobopening?language=en&data=%7B%22aoe%22%3A%5B%5D%2C%22aoi%22%3A%5B%5D%2C%22el%22%3A%5B%5D%2C%22ct%22%3A%5B%5D%2C%22ds%22%3A%5B%5D%2C%22jn%22%3A%5B%5D%2C%22jf%22%3A%5B%5D%2C%22jc%22%3A%5B%22INT%22%5D%2C%22jle%22%3A%5B%5D%2C%22dept%22%3A%5B%5D%2C%22span%22%3A%5B%5D%7D',
  'un-human-rights-ohchr-internship': 'https://www.ohchr.org/en/work-and-study-opportunities/internships',
  'unctad-internship-programme': 'https://careers.un.org/jobopening?language=en&data=%7B%22aoe%22%3A%5B%5D%2C%22aoi%22%3A%5B%5D%2C%22el%22%3A%5B%5D%2C%22ct%22%3A%5B%5D%2C%22ds%22%3A%5B%5D%2C%22jn%22%3A%5B%5D%2C%22jf%22%3A%5B%5D%2C%22jc%22%3A%5B%22INT%22%5D%2C%22jle%22%3A%5B%5D%2C%22dept%22%3A%5B%5D%2C%22span%22%3A%5B%5D%7D',
  'unep-internship-programme': 'https://careers.un.org/jobopening?language=en&data=%7B%22aoe%22%3A%5B%5D%2C%22aoi%22%3A%5B%5D%2C%22el%22%3A%5B%5D%2C%22ct%22%3A%5B%5D%2C%22ds%22%3A%5B%5D%2C%22jn%22%3A%5B%5D%2C%22jf%22%3A%5B%5D%2C%22jc%22%3A%5B%22INT%22%5D%2C%22jle%22%3A%5B%5D%2C%22dept%22%3A%5B%5D%2C%22span%22%3A%5B%5D%7D',
  'unesco-al-fozan-international-prize': 'https://www.unesco.org/en/articles/third-edition-unesco-al-fozan-international-prize-promotion-young-scientists-science-technology',
  'unesco-internship-programme': 'https://www.unesco.org/en/careers/internships',
  'unido-internship-programme': 'https://www.unido.org/resources-employment/internship',
  'unisa-ma-and-phd-in-public-policy-international-affairs': 'https://www.unisa.ac.za/sites/corporate/default/Apply-for-admission/Master%27s-&-doctoral-degrees/Qualifications/All-qualifications/Master-of-Arts-in-Public-Policy-in-International-Affairs-(90192)',
  'university-of-erfurt-doctoral-scholarships': 'https://www.uni-erfurt.de/en/university/current/news/news-detail/call-for-applications-for-phd-scholarships',
  'university-of-lausanne-master-s-grants': 'https://www.unil.ch/unil/en/home/menuinst/etudier/mobilite-et-echange/etudiantes-et-etudiants-internationaux/etudiantes-internationaux-reguliers/bourse-de-master.html',
  'university-of-macau-doctoral-scholarships': 'https://www.gov.mo/en/news/406057/',
  'university-of-macau-master-s-scholarships': 'https://www.gov.mo/en/news/406057/',
  'unodc-internship-programme': 'https://www.unodc.org/unodc/en/about-unodc/employment-opportunities.html',
  'unops-internship': 'https://jobs.unops.org/Pages/ViewVacancy/InternshipListing.aspx',
  'urgent-action-fund-and-emhrf-urgent-grants': 'https://urgentactionfund.org/wp-content/uploads/2025/04/Urgent-Action-Fund-Opportunity-Application-March-2025-1-1.pdf',
  'us-embassy-self-help-funding-in-kenya': 'https://ke.usembassy.gov/ambassador-special-self-help-fund/',
  'visegrad-scholarship-program-2027': 'https://www.visegradfund.org/apply/mobilities/visegrad-scholarship-program/',
  'wcrf-regular-grant-programme-2026-27': 'https://www.wcrf.org/research-policy/our-grant-programmes/regular-grant-programme/',
  'wenner-gren-dissertation-fieldwork-grant': 'https://wennergren.org/program/dissertation-fieldwork-grant/',
  'wenner-gren-engaged-research-grant': 'https://wennergren.org/program/engaged-research-grant/',
  'wenner-gren-post-phd-research-grant': 'https://wennergren.org/program/post-phd-research-grant/',
  'wenner-gren-wadsworth-african-fellowship-2027': 'https://wennergren.org/program/wadsworth-african-fellowship/',
  'wmo-internship-programme': 'https://wmo.int/jobs/wmo-internships',
  'yenching-academy-scholarship-peking-university': 'https://yenchingacademy.pku.edu.cn/ADMISSIONS.htm',
  'young-leaders-of-the-americas-initiative-ylai-fellowship-2027': 'https://ylai.state.gov/fellowship/',
  'youth-diplomacy-convention-2027-funded-seats-brussels': 'https://ogps.uk/ydc2027/',
}

/**
 * No official, currently open call could be found (closed with no new round,
 * discontinued, or no official page at all) — taken off the site.
 */
export const retiredSlugs = new Set([
  'africa-young-entrepreneur-support', // no call since 2020
  'african-leadership-centre-peace-security-fellowship', // 2026/27 call closed May 2026
  'art-quarter-budapest-aqb-international-artist-in-residence', // fee-based (EUR 950/month), official deadline passed
  'atlantic-fellows', // umbrella entry; open call listed separately as AFSEE
  'basque-biodesign-center-residency', // fee-based (~EUR 900/month), not funded
  'biopage-storytelling-writing-contest', // no edition since 2020
  'cnpq-pibpg-institutional-postgraduate-scholarships-call-07-2026', // institutional call, closed 5 Aug 2026
  'coca-cola-foundation-grants', // invitation only, no open call
  'columbia-university-scholarships-for-displaced-students', // Columbia says not currently accepting applications
  'disability-empowerment-fund-eastern-cape', // closed 12 Oct, no official page
  'disability-rights-fund', // 2026 round closed Aug 2026, no 2027 call
  'eisenhower-fellowships', // 2027 window closed May 2026
  'elsevier-foundation-grants', // not accepting applications
  'energy-efficient-and-climate-friendly-cooling-solutions-in-ghana', // no official call page found
  'fonds-suez', // no current call
  'german-embassy-funding-for-ngos', // varies by embassy, no single official call
  'global-health-corps-fellowship', // 2026-27 round closed, no 2027 call
  'insa-visiting-scientist-fellowship', // only for Indian scientists; 2026 round closed
  'japan-africa-youth-program', // 2026 round closed 8 Sep, no 2027 call
  'king-abdullah-scholarship-2027', // no official 2027 call found
  'knight-foundation-fellowships', // umbrella entry with no single call
  'loughborough-university-sanctuary-phd-scholarships', // 2026/27 call closed 22 Jun 2026
  'magnolia-art-house-residency', // no official open call found
  'master-scholarships-in-africa-kenya-ethiopia-ghana-zimbabwe', // vague, no single official call
  'optimizing-enzyme-innovation-for-industrial-plant-based-processing', // no official call page found
  'paid-voluntary-service-in-germany', // no central application, sponsor-based
  'research-seed-money-grants-open-call', // vague, no official call
  'rotary-global-grant-scholarship-rotary-central-cayman-district-7020', // no official page found
  'ruforum-graduate-teaching-assistantships', // no current open call
  'spencer-foundation-conference-grants', // programme discontinued Jan 2023
  'un-trust-fund-to-end-violence-against-women', // 2025 call closed, no new call
  'un-youth-townhall-funding', // closed 7 Sep, no official page
  'unicef-audience-market-insights-internship-private-fundraising-partnerships', // listing could only be found for 2025 (closed)
  'unicef-investigations-section-digital-forensics-internship', // listing could only be found for 2025 (closed)
  'university-of-galway-robotics-ai-phd', // no official call page found
  'wenner-gren-fellowship-in-anthropology-black-experiences', // 2026 call not found
  'wenner-gren-hunt-postdoctoral-fellowship', // replaced by Hunt Fellowship in Public Writing; letter-of-interest deadline 15 Oct passed
  'yrv-global-teachers-grants', // no official page found
  // Edinburgh Mastercard Foundation 2027/28: invitation only — applicants had to attend a
  // mandatory info session (15–24 Sep 2026); the declaration stage closed in October.
  'edinburgh-x-mastercard-foundation-online-learning-scholars',
  'university-of-edinburgh-mastercard-foundation-scholars-program',
])

/** Corrections found on the official pages. */
export const callFixes = {
  'rotary-global-grant-scholarship-district-5890-houston': {
    deadline: '2026-11-08',
    deadlineNote: 'Rotary clubs send their candidate’s application to the District 5890 Global Grant Scholar Committee Chair by 8 November 2026; interviews follow in December. Apply through a Rotary club, not Rotary International.',
  },
  'jf-jsa-asean-master-s-fellowship-fy2027': {
    deadline: '2026-12-01',
    deadlineNote: 'The Japan Foundation lists 1 December 2026, 1 p.m. Japan time, as the online deadline.',
  },
  'capes-pdse-2027-doctoral-sandwich-abroad': {
    deadline: '2026-11-03',
    deadlineNote: 'Registration in the CAPES Sicapes system runs from 1 October to 3 November 2026 (sources also mention 18 November — use the earlier date). Your graduate programme must endorse you first.',
  },
  'japan-foundation-institutional-project-support-ips': {
    nationalities: 'US institutions with Japanese studies programmes',
    eligibility: ['Open to: US institutions with Japanese studies programmes', 'Level: University departments'],
  },
  'japan-foundation-u-s-southeast-asia-japan-collaborative-exchange': {
    amount: 'Up to US$100,000 over up to 3 years',
    nationalities: 'US 501(c)(3) institutions working with Japanese studies partners in Southeast Asia',
    eligibility: ['Open to: US 501(c)(3) institutions working with Japanese studies partners in Southeast Asia', 'Level: Research teams'],
  },
  'dreyfus-program-for-transformative-research': {
    nationalities: 'Chemistry faculty within 15 years of tenure at a US institution (one proposal per institution)',
    eligibility: ['Open to: Chemistry faculty within 15 years of tenure at a US institution (one proposal per institution)', 'Level: Faculty (within 15 years of tenure)'],
  },
  'landis-gyr-foundation-residency-zug': {
    summary: 'A studio flat in Zug plus CHF 3,600 a month for Swiss writers and literary translators (or those living in Switzerland).',
    amount: 'Free studio flat + CHF 3,600 a month',
    fields: 'Literature and literary translation',
    nationalities: 'Swiss writers and literary translators, or those officially resident in Switzerland',
    eligibility: ['Open to: Swiss writers and literary translators, or those officially resident in Switzerland', 'Level: Established professionals'],
    deadlineNote: 'The application window runs from 1 December 2026 to 31 January 2027 on the foundation’s online platform.',
  },
  'cite-internationale-des-arts-residency-paris': {
    deadline: '2026-10-30',
    deadlineNote: 'The open call is the Art Explora × Cité internationale des arts residency programme 2027 (3 or 6 months, with a monthly allowance and production grant), closing on 30 October 2026.',
  },
  'acu-edward-boyle-medical-elective-bursaries': { amount: 'Six grants of up to £1,000' },
  'inlaks-asia-art-archive-art-grant': {
    amount: 'Up to INR 2,00,000',
    nationalities: 'Indian citizens living in India, born between 1990 and 2000',
    eligibility: ['Open to: Indian citizens living in India, born between 1990 and 2000', 'Level: Artists, curators & researchers'],
  },
  'creative-industries-fund-nl-videotage-design-residency-hong-kong': {
    nationalities: 'Designers and makers based in the Kingdom of the Netherlands (no duos or collectives)',
    eligibility: ['Open to: Designers and makers based in the Kingdom of the Netherlands (no duos or collectives)', 'Level: 4+ years of practice'],
  },
  'yenching-academy-scholarship-peking-university': {
    deadline: '2026-11-30',
    deadlineNote: 'Applications close at 9:00 am Beijing time on 30 November 2026.',
  },
  'pierre-elliott-trudeau-foundation-doctoral-scholarship': {
    deadlineNote: 'Only applicants who passed the eligibility screening (due 2 October 2026) can submit the full application by 6 November 2026.',
  },
}

const SEARCH = /google\.[a-z.]+\/search|bing\.com\/search|duckduckgo\.com/i

/** True when a link is a web search or only a site's front page. */
export function isWeakLink(url) {
  if (!url) return true
  if (SEARCH.test(url)) return true
  try {
    return new URL(url).pathname.replace(/\/(en|index\.html?)?\/?$/i, '') === ''
  } catch {
    return true
  }
}

/** Apply direct links and corrections to one listing (built-in or saved). */
export function withDirectLink(item) {
  const fix = callFixes[item.slug]
  const link = directLinks[item.slug]
  let out = fix ? { ...item, ...fix } : item
  // Keep the key dates in step with a corrected deadline.
  if (fix?.deadline && item.timeline) {
    const rest = item.timeline.filter((t) => t.label !== 'Application deadline')
    out.timeline = [...rest, { date: formatDate(fix.deadline), label: 'Application deadline' }]
  }
  // Only replace a web search or a bare homepage, so a link set in the dashboard is kept.
  if (link && (out.officialSearch || isWeakLink(out.officialUrl))) {
    out = { ...out, officialUrl: link, officialSearch: false }
  }
  if (out.officialUrl && SEARCH.test(out.officialUrl)) out = { ...out, officialSearch: true }
  return out
}
