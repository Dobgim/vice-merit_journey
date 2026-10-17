/**
 * "Can I apply?" — clear yes/no eligibility statements for every listing,
 * shown at the top of the detail page and on the flyer, in this order:
 *   1. Who can apply (international students, home students or both)
 *   2. The degree you must already hold
 *   3. Age limits
 *   4. Nationality / residence
 *   5. Language
 *   6. Work experience
 *   7. Other conditions
 * Ages and limits are stated only where the official rules set them; where
 * they are not fixed, the statement says to confirm in the official call.
 */

/* ------------------------------------------------------------- Statements */

const INTL = 'International students only — local (home) students cannot apply'
const BOTH = 'Both international and home (national) students can apply'
const ALL = 'Open to applicants of every nationality'
const only = (who) => `Only ${who} can apply — others are not eligible`

const NO_AGE = 'No age limit'
const AGE_CALL = 'No fixed age limit is published — confirm in the official call'
const under = (n, when = '') => `You must be under ${n}${when ? ` ${when}` : ''}`
const between = (a, b) => `You must be aged ${a}–${b}`
const atLeast = (n) => `You must be at least ${n} years old`

const BACHELOR = "You must hold a bachelor's degree (or finish it before the programme starts)"
const MASTER = "You must hold a master's degree (or an excellent bachelor's where direct PhD entry is allowed)"
const PHD = 'You must hold a completed PhD'
const SCHOOL = 'You must have completed (or be finishing) secondary school — no university degree is needed'
const ENROLLED = "You must be enrolled in a university degree (often master's level) or have graduated recently"
const NO_DEGREE = 'No university degree is required'
const ORG = 'Organisations apply — no personal degree is required'
const RESEARCHER = 'You must hold a PhD or have equivalent research experience'

/* --------------------------------------------- Defaults from level & type */

function defaultDegree(item, kind) {
  if (kind === 'internships') return ENROLLED
  if (kind !== 'scholarships') return null
  const level = item.level ?? ''
  if (/^Undergraduate$/.test(level)) return SCHOOL
  if (/^Graduate$/.test(level)) return BACHELOR
  if (/^PhD$/.test(level)) return MASTER
  if (/^Postdoctoral$/.test(level)) return PHD
  if (/^Postgraduate$/.test(level)) return "A bachelor's degree for master's study, or a master's degree for PhD study"
  if (/Undergraduate & (post)?graduate/.test(level)) return "Secondary school for a first degree, or a bachelor's degree for postgraduate study"
  return null
}

function defaultLanguage(kind) {
  if (kind === 'scholarships') return 'English (or the teaching language) at the level the university requires — usually IELTS 6.5 or TOEFL iBT 90, unless exempt'
  if (kind === 'internships') return 'Fluent English; another working language of the organisation is an advantage'
  return null
}

/** Ordered [{ label, text }] for one listing. */
export function criteriaFor(item, kind) {
  const c = criteria[item.slug] ?? {}
  return [
    ['Who can apply', c.who],
    ['Degree you need', c.degree ?? defaultDegree(item, kind)],
    ['Age', c.age],
    ['Nationality / residence', c.nationality],
    ['Language', c.language ?? defaultLanguage(kind)],
    ['Work experience', c.experience],
    ['Also required', c.other],
  ]
    .filter(([, text]) => text)
    .map(([label, text]) => ({ label, text }))
}

/* ---------------------------------------------------------------- Shared */

const unIntern = (age) => ({ who: ALL + ' (citizens of UN member states)', age: age ?? AGE_CALL, other: 'You pay your own travel and living costs unless the post offers a stipend, and you need health insurance' })
const ngoIntern = { who: ALL, degree: 'You must be a current student or recent graduate', age: atLeast(18), nationality: 'You need the right to work or volunteer in the country of the post (or apply for remote roles)' }
const techIntern = { who: BOTH, degree: "You must be enrolled in a bachelor's, master's or PhD (usually returning to study after the internship)", age: atLeast(18), nationality: 'You need (or can get) the right to work in the country of the role', other: 'You must pass online coding tests and technical interviews' }
const ngoGrant = (where) => ({ who: where ?? 'Registered organisations from eligible countries — individuals cannot apply alone', degree: ORG, age: 'Not applicable (organisations apply)' })
const research = (who) => ({ who: who ?? ALL + ' (researchers at eligible institutions)', degree: RESEARCHER, age: AGE_CALL })
const contest = (who, age) => ({ who: who ?? ALL, degree: NO_DEGREE, age: age ?? 'Age groups are set in the contest rules' })

/* ------------------------------------------------------------- Listings */

export const criteria = {
  /* Scholarships — hand-written listings */
  'chevening-scholarship': { who: INTL + ' (UK citizens are not eligible)', age: NO_AGE, nationality: 'Citizen of a Chevening-eligible country; you must return home for at least 2 years after the award', experience: 'At least 2 years (about 2,800 hours) of work experience', other: 'Apply to three eligible UK master’s courses and hold an unconditional offer by the summer deadline' },
  'daad-epos-scholarship': { who: INTL + ' (from developing countries)', age: 'No fixed age limit, but your last degree must be no more than 6 years old', nationality: 'Citizen of a country on the DAAD development-country list', experience: 'At least 2 years of relevant work experience after your degree' },
  'vanier-canada-graduate-scholarship': { who: BOTH + ' (Canadians, permanent residents and foreign nationals)', age: NO_AGE, other: 'You must be nominated by a Canadian university and have completed no more than 20 months of your PhD' },
  'erasmus-mundus-joint-masters': { who: ALL + ' (scholarships go mainly to non-European students)', age: NO_AGE, other: 'You cannot have held an Erasmus Mundus master’s scholarship before' },
  'lester-b-pearson-scholarship': { who: INTL + ' (Canadians and permanent residents are not eligible)', age: 'Final year of secondary school, or graduated no earlier than June of the previous year', other: 'Your school must nominate you (one nominee per school)' },
  'australia-awards-scholarship': { who: INTL + ' (from participating countries)', age: atLeast(18), nationality: 'Citizen of and living in a participating country; not an Australian citizen or permanent resident', other: 'You must return home for at least 2 years after the award' },
  'holland-scholarship': { who: only('students from outside the European Economic Area (EEA)'), age: AGE_CALL, other: 'You must not have studied at a Dutch institution before' },
  'mext-japanese-government-scholarship': { who: INTL + ' (Japanese nationals are not eligible)', degree: BACHELOR + ' (for the research-student track)', age: under(35, 'on 1 April of the start year'), nationality: 'Citizen of a country with diplomatic relations with Japan', language: 'English or Japanese; you must be willing to learn Japanese' },
  'swiss-government-excellence-scholarship': { who: INTL + ' (from 180+ eligible countries)', degree: "You must hold a master's degree (for PhD or research) or a PhD (for postdoc) by the start date", age: 'You must be born after the cut-off date published for your country (usually under about 35)', other: 'A Swiss professor must support your research project' },
  'princeton-fung-global-fellows': { who: ALL + ', but you must be based outside the United States', degree: 'You must hold a PhD completed after 1 September 2017', age: NO_AGE, experience: 'You must hold a faculty or research post outside the US (PhD students and postdocs are not eligible)' },
  'university-of-tennessee-international-volunteer-scholarship': { who: INTL + ' (not graduating from a US high school)', age: 'Incoming first-year students — no separate age limit', other: 'Apply for admission by 1 April; award depends on GPA and test scores' },

  /* Scholarships — first import */
  'daad-scholarships-selected-programmes': { who: INTL + ' (mainly from developing countries)', age: 'No fixed age limit, but your last degree should be no more than 6 years old', experience: 'Usually at least 2 years of work experience' },
  'paie-scholars-programme': { who: only('researchers from Africa and Asia'), age: AGE_CALL },
  'bank-of-namibia-undergraduate-bursary': { who: only('Namibian citizens (some awards include SADC citizens)'), age: AGE_CALL, nationality: 'Namibian citizen' },
  'abcd-future-environmental-leaders-scholarships': { who: INTL, degree: 'You must be enrolled in a PhD', age: AGE_CALL },
  'inpex-foundation-scholarship-2027': { who: only('citizens of the countries listed in the INPEX call'), age: AGE_CALL },
  'aci-foundation-fellowships-and-scholarships': { who: BOTH, degree: 'You must be a full-time university student in a concrete-related field', age: NO_AGE },
  'brand-south-africa-play-your-part-bursary': { who: only('South African citizens'), degree: NO_DEGREE, age: between(18, 30) },
  'commonwealth-master-s-scholarships': { who: INTL + ' (UK citizens are not eligible)', degree: "You must hold at least an upper second-class (2:1) bachelor's degree, or a 2:2 plus a relevant postgraduate qualification", age: NO_AGE, nationality: 'Citizen of (or refugee in) an eligible low- or middle-income Commonwealth country and living there', other: 'You must be unable to afford UK study without this scholarship' },
  'schlumberger-faculty-for-the-future': { who: only('women from developing and emerging economies'), age: AGE_CALL, other: 'You must be admitted to a STEM PhD or postdoc abroad and plan to return home' },
  'russian-government-scholarship-open-doors-quota': { who: INTL + ' (Russian citizens are not eligible)', degree: "The previous degree for your level: school certificate for a bachelor's, bachelor's for a master's, master's for a PhD", age: NO_AGE, language: 'Russian, or an English-taught programme; a funded Russian-language year is available' },
  'ubc-international-scholars-program-2027': { who: INTL + ' (Canadians and permanent residents are not eligible)', age: 'Finishing secondary school (first-year entry only)' },
  'edinburgh-x-mastercard-foundation-online-learning-scholars': { who: only('citizens of Sub-Saharan African countries living in Africa'), age: AGE_CALL, other: 'You must show financial need' },
  'hong-kong-phd-fellowship-scheme': { who: ALL + ' (international and Hong Kong students)', age: NO_AGE },
  'cgs-china-link-short-term-research-exchange-sysu': { who: INTL, degree: 'You must be a student or staff member at a CSC partner university', age: AGE_CALL },
  'university-of-toronto-international-scholarships': { who: INTL, age: 'Finishing secondary school (first-year entry only)' },
  'full-international-master-on-wine-tourism-innovation': { who: ALL, age: NO_AGE },
  'ma-in-european-public-health-scholarships': { who: ALL, age: NO_AGE },
  'margaret-mcnamara-educational-grants-usa-canada': { who: only('women from eligible developing countries'), degree: 'You must be enrolled at an accredited university in the USA or Canada', age: atLeast(25), other: 'You must plan to return home to improve the lives of women and children' },
  'washington-college-of-law-human-rights-essay-award': { who: ALL, degree: 'You must hold a first law degree', age: NO_AGE, language: 'Essay in English, Spanish or French' },
  'gates-cambridge-scholarship': { who: INTL + ' (UK citizens are not eligible)', degree: "A bachelor's (for MPhil/MSc) or a master's (for PhD), meeting Cambridge entry requirements", age: NO_AGE },
  'fulbright-foreign-student-program': { who: INTL + ' (US citizens and permanent residents are not eligible)', age: 'Set by your country’s Fulbright commission', nationality: 'Citizen of a participating country — apply through the commission or US embassy in your country' },
  'global-korea-scholarship-2027-undergraduate': { who: INTL + ' (Korean citizens, and children of Korean citizens, cannot apply)', age: under(25, 'on 1 March 2027'), other: 'Your secondary-school grades must average at least 80% (or top 20% of your class)' },
  'daad-in-country-and-in-region-scholarships': { who: only('students from eligible developing countries studying in their own country or region'), age: 'No fixed age limit, but your last degree should be recent (see the call)' },
  'kaad-master-and-phd-scholarships-germany': { who: only('students from developing countries in Africa, Asia, the Middle East and Latin America'), age: AGE_CALL, other: 'You need a reference from your church or a KAAD partner' },
  'humber-scholarships-canada': { who: INTL, age: NO_AGE },
  'macquarie-university-africa-scholarships': { who: only('citizens of African countries'), age: NO_AGE },
  'eni-oxford-mba-scholarships': { who: only('citizens of eligible African countries'), age: NO_AGE, experience: 'Professional experience as required for the Oxford MBA', other: 'You must be admitted to the Oxford MBA and plan to return to Africa' },
  'master-scholarships-in-africa-kenya-ethiopia-ghana-zimbabwe': { who: only('African students'), age: AGE_CALL },
  'master-scholarships-in-agricultural-food-and-environmental-policy-analysis': { who: only('African students'), age: AGE_CALL },
  'llm-scholarships-in-the-usa-for-african-women': { who: only('African women lawyers'), degree: 'You must hold a law degree and be qualified to practise', age: AGE_CALL, experience: 'Several years of experience in women’s rights or human rights work' },
  'columbia-university-scholarships-for-displaced-students': { who: only('refugees and displaced students'), degree: 'Secondary school for undergraduate study, or a degree for graduate study', age: NO_AGE },
  'us-community-college-scholarships': { who: INTL, age: NO_AGE },
  'catholic-scholarships-in-kenya': { who: only('Kenyan citizens'), age: AGE_CALL, other: 'You must show financial need' },
  'church-development-service-scholarships': { who: only('students from developing countries'), age: AGE_CALL, experience: 'At least 2 years of work experience in development', other: 'You must be recommended by a partner church or organisation' },
  'scholarships-for-developing-countries-in-italy': { who: only('citizens of the countries listed in the call'), age: AGE_CALL, language: 'English at B2 level or higher' },
  'ruforum-graduate-teaching-assistantships': { who: only('African graduates in agriculture'), degree: BACHELOR + " (or a master's for PhD places)", age: AGE_CALL },

  /* Scholarships — Global Opportunities list */
  'commonwealth-phd-scholarships-2027-28': { who: INTL + ' (UK citizens are not eligible)', degree: "You must hold a 2:1 bachelor's degree and usually a relevant master's", age: NO_AGE, nationality: 'Citizen of (or refugee in) an eligible least-developed or fragile Commonwealth country and living there' },
  'commonwealth-shared-scholarships-2027': { who: INTL + ' (UK citizens are not eligible)', degree: "You must hold at least an upper second-class (2:1) bachelor's degree", age: NO_AGE, nationality: 'Citizen of (or refugee in) an eligible low- or middle-income Commonwealth country and living there', other: 'You must not have studied for a year or more in a high-income country before' },
  'university-of-manchester-global-futures-scholarships': { who: INTL + ' (overseas fee-paying students only)', age: NO_AGE },
  'university-of-manchester-equity-merit-scholarships': { who: INTL + ' (from eligible developing countries)', age: NO_AGE, other: 'You must show financial need and plan to return home' },
  'imperial-college-president-s-phd-scholarships': { who: BOTH, degree: "You must hold a first-class bachelor's degree or equivalent (or an outstanding master's)", age: NO_AGE },
  'wales-graduate-school-for-the-social-sciences-esrc-studentships': { who: BOTH + ' (only a limited share of places go to international students)', age: NO_AGE },
  'white-rose-dtp-studentships': { who: BOTH + ' (only a limited share of places go to international students)', age: NO_AGE },
  'loughborough-university-sanctuary-phd-scholarships': { who: only('refugees, asylum seekers, people with humanitarian protection and scholars at risk'), age: NO_AGE },
  'university-of-huddersfield-computer-science-phd-scholarships': { who: BOTH, age: NO_AGE },
  'mastercard-foundation-scholars-program-at-cambridge': { who: only('citizens of Sub-Saharan African countries'), age: AGE_CALL, other: 'You must show financial need and a commitment to giving back to Africa' },
  'university-of-edinburgh-mastercard-foundation-scholars-program': { who: only('citizens of Sub-Saharan African countries'), age: AGE_CALL, other: 'You must show financial need and a commitment to giving back to Africa' },
  'university-of-lausanne-master-s-grants': { who: INTL + " (your bachelor's must be from a foreign university)", age: AGE_CALL },
  'eth-zurich-excellence-scholarship-opportunity-programme': { who: BOTH, degree: "You must hold a bachelor's degree in the top 10% of your class", age: NO_AGE },
  'epfl-excellence-fellowships': { who: BOTH, degree: "You must hold an excellent bachelor's degree (top of your class)", age: NO_AGE },
  'fmi-international-phd-program': { who: ALL, age: NO_AGE },
  'friedrich-naumann-foundation-scholarships': { who: INTL + ' (studying at a German university)', age: AGE_CALL, language: 'Usually German, depending on your programme' },
  'university-of-bremen-daad-marine-biology-scholarship': { who: INTL + ' (from developing countries)', age: AGE_CALL, experience: 'Usually 2 years of related work experience' },
  'imprs-is-phd-positions': { who: ALL, age: NO_AGE },
  'university-of-erfurt-doctoral-scholarships': { who: BOTH, age: NO_AGE },
  'heinrich-boll-foundation-scholarships': { who: INTL + ' (studying at a German university)', age: AGE_CALL, other: 'You must be socially or politically engaged in line with the foundation’s values' },
  'aithyra-international-phd-programme': { who: ALL, age: NO_AGE },
  'yenching-academy-scholarship-peking-university': { who: BOTH + ' (Chinese and international students)', degree: "You must complete a bachelor's degree (any field) before September 2027", age: AGE_CALL },
  'university-of-macau-doctoral-scholarships': { who: BOTH, age: NO_AGE },
  'university-of-macau-master-s-scholarships': { who: BOTH, age: NO_AGE },
  'sultan-qaboos-university-scholarship': { who: BOTH, age: AGE_CALL },
  'ntu-singapore-research-scholarship': { who: BOTH, age: NO_AGE },
  'taiwanicdf-higher-education-scholarship': { who: only('citizens of TaiwanICDF partner countries'), age: AGE_CALL },
  'getfund-local-scholarships-2026-27': { who: only('Ghanaian citizens'), degree: 'You must be admitted to an accredited tertiary institution in Ghana (diploma to PhD)', age: NO_AGE, other: 'You must show financial need' },
  'unisa-ma-and-phd-in-public-policy-international-affairs': { who: only('African students'), age: NO_AGE },
  'kaust-scholarship': { who: ALL + ' (Saudi and international students)', age: NO_AGE },
  'doha-institute-for-graduate-studies-scholarship': { who: BOTH, age: AGE_CALL, language: 'Arabic for most programmes (some are taught in English)' },
  'mbzuai-scholarship': { who: ALL + ' (Emirati and international students)', age: NO_AGE },
  'umea-university-doctoral-positions': { who: ALL, degree: "You must hold a master's degree (or 4 years of higher education, 1 at master's level)", age: NO_AGE },
  'copenhagen-business-school-phd-in-auditing': { who: ALL, age: NO_AGE },
  'university-college-cork-ai-phd-studentships': { who: BOTH, age: NO_AGE },
  'university-of-galway-robotics-ai-phd': { who: BOTH, age: NO_AGE },
  'erasmus-mundus-master-in-public-policy-mundus-mapp': { who: ALL, age: NO_AGE, language: 'English at C1 level' },
  'pierre-elliott-trudeau-foundation-doctoral-scholarship': { who: BOTH + ' (you must study at a Canadian university)', age: NO_AGE, other: 'Your university must nominate you' },
  'university-of-guelph-vaccarino-president-s-scholarship': { who: INTL, age: 'Entering first year of university' },
  'jefferson-scholarship-university-of-virginia': { who: BOTH + ' (US and international students at participating schools)', age: 'Final year of secondary school', other: 'Your school must nominate you' },
  'university-of-cincinnati-cincinnatus-scholarship': { who: BOTH, age: 'Incoming first-year students' },
  'mastercard-foundation-scholars-program-at-asu': { who: only('citizens of Sub-Saharan African countries'), age: AGE_CALL, other: 'You must show financial need' },
  'elks-most-valuable-student-scholarship': { who: only('US citizens'), age: 'Final year of high school' },
  'chick-fil-a-community-scholars': { who: only('students in the United States'), age: AGE_CALL },
  'college-board-bigfuture-scholarships': { who: only('US high-school students'), age: 'High-school students (class of 2027 or 2028)', language: '' },
  'brazil-pec-pg-sandwich-phd-scholarship': { who: INTL + ' (Brazilians and residents of Brazil cannot apply)', degree: 'You must be enrolled in a PhD in your home country', age: AGE_CALL, nationality: 'Citizen of a country with an education agreement with Brazil', language: 'Portuguese or the language of your host group' },
  'university-of-melbourne-graduate-research-scholarships': { who: BOTH, age: NO_AGE },
  'adelaide-university-research-scholarships': { who: BOTH, age: NO_AGE },
  'university-of-tasmania-priority-phd-scholarships': { who: BOTH, age: NO_AGE },
  'manaaki-new-zealand-scholarships': { who: INTL + ' (from eligible developing countries)', age: atLeast(18), experience: 'Usually 2 years of work experience for postgraduate awards', other: 'You must return home for at least 2 years after study' },
  'iaea-marie-sk-odowska-curie-fellowship-programme': { who: only('women from IAEA member states'), age: NO_AGE },
  'unesco-china-great-wall-fellowship': { who: INTL + ' (from developing countries)', age: AGE_CALL },
  'islamic-development-bank-merit-scholarship': { who: only('citizens of IsDB member countries (and Muslim communities in other countries)'), age: 'Age limits are set in each call' },
  'aga-khan-foundation-international-scholarship-programme': { who: only('students from the countries where the programme operates'), age: AGE_CALL, other: 'You must show financial need; half the award is a loan' },

  /* Grants */
  'tony-elumelu-foundation-entrepreneurship-programme-2027': { who: only('citizens and legal residents of African countries'), degree: NO_DEGREE, age: atLeast(18), other: 'Your business (or idea) must be based in Africa' },
  'africa-prize-for-engineering-innovation': { who: only('citizens or residents of Sub-Saharan African countries'), degree: 'No degree required — an engineering innovation is', age: AGE_CALL },
  'national-geographic-explorer-grants': { who: ALL, degree: NO_DEGREE, age: atLeast(18) },
  'rufford-small-grants': { who: ALL + ' (projects mainly in developing countries)', degree: NO_DEGREE, age: NO_AGE, experience: 'Early in your conservation career' },
  'pollination-project-seed-grants': { who: ALL, degree: NO_DEGREE, age: atLeast(18) },
  'disability-empowerment-fund-eastern-cape': ngoGrant(only('organisations in the Eastern Cape, South Africa')),
  'lisa-jardine-grant-scheme': research(),
  'brain-awareness-week-grants': ngoGrant(),
  'agnes-intra-africa-mobility-grants': { ...research(only('junior researchers at African institutions')), degree: 'You must be a PhD student or early-career researcher' },
  'aasm-foundation-strategic-research-grant-program': research('Mainly researchers at US institutions'),
  'ifra-nigeria-research-grants': { ...research(ALL + ' (research on Nigeria or West Africa)'), degree: "You must be a master's or PhD student, or an early-career researcher" },
  'whitley-award': { who: only('conservation leaders from the Global South'), degree: NO_DEGREE, age: NO_AGE, experience: 'Several years of proven conservation results' },
  'hinrich-foundation-trade-research-grants': research(),
  'energy-efficient-and-climate-friendly-cooling-solutions-in-ghana': ngoGrant(only('companies and organisations working in Ghana')),
  'neurology-international-travel-award': { who: INTL + ' (from eligible countries)', degree: 'You must be a neurology trainee or professional', age: AGE_CALL },
  'eeem-foundation-community-impact-grant-program': ngoGrant(ALL + ' (community organisations)'),
  'uneca-continental-call-for-african-ai-innovations': { who: only('African innovators, start-ups and organisations'), degree: NO_DEGREE, age: AGE_CALL },
  'make-thesis-grants': { who: ALL, degree: 'You must be an animation student working on a thesis film', age: NO_AGE },
  'optimizing-enzyme-innovation-for-industrial-plant-based-processing': research(ALL + ' (researchers and companies)'),
  'yrv-global-teachers-grants': { who: ALL, degree: 'You must be a practising teacher', age: NO_AGE },
  'research-seed-money-grants-open-call': research(),
  'un-youth-townhall-funding': { who: ALL, degree: NO_DEGREE, age: between(18, 35) },
  'ai-and-the-workforce-faculty-research-grants': { ...research(), degree: 'You must be a university faculty member' },
  'us-embassy-self-help-funding-in-kenya': ngoGrant(only('community groups in Kenya')),
  'maypole-fund-small-grants': { who: only('women (individuals)'), degree: NO_DEGREE, age: NO_AGE },
  'trisong-grants': { who: ALL, degree: NO_DEGREE, age: NO_AGE },
  'disability-rights-fund': ngoGrant(only('organisations led by persons with disabilities in eligible countries')),
  'international-foundation-for-science-individual-research-grants': { who: only('early-career scientists in eligible developing countries'), degree: "You must hold at least a master's degree", age: 'PhD holders must be under the age limit set in the call', nationality: 'Citizen of and working in an eligible developing country' },
  'grants-in-aid-of-research-giar': { who: ALL, degree: 'You must be an undergraduate or graduate student in science or engineering', age: NO_AGE },
  'bes-student-training-and-travel-grants': { who: ALL, degree: 'You must be a student in ecology (and a BES member)', age: NO_AGE },
  'spencer-foundation-conference-grants': research(),
  'wwf-professional-development-grants': { who: only('citizens of eligible countries working in conservation'), degree: 'Set by the course you will attend', age: AGE_CALL, experience: 'At least 2 years of conservation work experience' },
  'mohamed-bin-zayed-species-conservation-fund': { who: ALL + ' (individuals and organisations)', degree: NO_DEGREE, age: NO_AGE },
  'john-templeton-foundation-grants': research(),
  'africa-young-entrepreneur-support': { who: only('young African entrepreneurs'), degree: NO_DEGREE, age: AGE_CALL },
  'grofin': { who: only('small and growing businesses in Africa and the Middle East'), degree: NO_DEGREE, age: 'Not applicable (businesses apply)' },
  'african-women-development-fund': ngoGrant(only('women-led organisations in Africa')),
  'fonds-suez': ngoGrant(),
  'funds-for-women-journalists-iwmf-relief-fund-rainforest-journalism-fund': { who: ALL + ' (journalists; IWMF funds are for women journalists)', degree: NO_DEGREE, age: atLeast(18) },
  'national-endowment-for-democracy': ngoGrant(only('non-governmental organisations outside the United States')),
  'coca-cola-foundation-grants': ngoGrant(),
  'draper-richards-kaplan-foundation': { who: ALL, degree: NO_DEGREE, age: NO_AGE, other: 'An early-stage social enterprise with a full-time founder' },
  'abilis-foundation': ngoGrant(only('organisations run by persons with disabilities in eligible countries')),
  'civicus-solidarity-fund': ngoGrant(),
  'africa-digital-rights-fund': ngoGrant(only('African organisations')),
  'roddenberry-foundation-catalyst-fund': { who: ALL + ' (individuals and organisations)', degree: NO_DEGREE, age: atLeast(18) },
  'karibu-foundation-grants': ngoGrant(only('organisations in the Global South')),
  'wallace-global-fund': ngoGrant(),
  'german-embassy-funding-for-ngos': ngoGrant(only('local NGOs in the embassy’s country')),
  'wphf-short-term-women-grants': ngoGrant(only('women-led and women’s rights organisations in crisis or conflict countries')),
  'urgent-action-fund-and-emhrf-urgent-grants': { who: ALL + ' (women and human-rights defenders at risk)', degree: NO_DEGREE, age: NO_AGE },
  'sophie-danforth-fund-wild-planet-trust-and-minor-foundation': { who: ALL + ' (individuals and organisations)', degree: NO_DEGREE, age: NO_AGE },
  'warc-travel-grants-art-moves-africa-and-africa-india-mobility-fund': { who: only('African researchers and artists'), degree: NO_DEGREE, age: AGE_CALL },
  'searca-travel-grants': { who: only('researchers and graduate students in Southeast Asia'), degree: 'You must be a researcher or graduate student', age: AGE_CALL },
  'khoj-support-grants': { who: only('artists based in India'), degree: NO_DEGREE, age: AGE_CALL },
  'noel-buxton-trust-africa-grants': ngoGrant(only('small organisations working in eligible African countries')),
  'toshiba-international-foundation-grants': ngoGrant(ALL + ' (non-profit organisations)'),
  'amazon-research-awards-multilingual-contextual-ai': { ...research(ALL + ' (university faculty and research non-profits)'), degree: 'You must be a faculty member or researcher at a university or non-profit' },
  'conservation-food-health-foundation-grants': ngoGrant(only('organisations based in developing countries in Africa, Asia, Latin America, the Caribbean and the Middle East')),
  'global-eba-fund-medium-size-grants': ngoGrant(ALL + ' (NGOs, government bodies and research institutions)'),
  'humanity-ai-open-call': ngoGrant(only('US-based non-profits and community organisations')),
  'icgeb-research-grants': research(only('scientists in ICGEB member states')),
  'twas-research-grants': { ...research(only('scientists in developing countries')), degree: 'You must hold a PhD', age: AGE_CALL },
  'gates-foundation-grand-challenges': research(ALL + ' (each challenge sets its own rules)'),
  'wellcome-research-funding': research(),
  'nih-r01-research-grants': research('Mainly researchers at US institutions (some calls accept foreign institutions)'),
  'nsf-research-grants': research(only('researchers at US institutions')),
  'ukri-research-grants': research('Researchers at UK organisations; international co-investigators can join many calls'),
  'australian-research-council-grants': research(only('researchers at Australian institutions')),
  'canada-tri-agency-research-grants-sshrc-nserc-cihr': research(only('researchers at Canadian institutions')),
  'idrc-research-funding': research('Researchers and organisations in the Global South'),
  'eu-development-horizon-europe-grants': { ...ngoGrant(ALL + ' (organisations, usually in a consortium)'), degree: 'Organisations apply' },
  'uk-international-development-funding': ngoGrant(),
  'ford-foundation-grants': ngoGrant(),
  'open-society-foundations-grants': { who: ALL + ' (organisations, and individuals for some calls)', degree: NO_DEGREE, age: AGE_CALL },
  'rotary-foundation-global-grants': ngoGrant('Projects sponsored by Rotary clubs — contact a local club'),
  'un-trust-fund-to-end-violence-against-women': ngoGrant(),
  'un-democracy-fund-grants': ngoGrant(),
  'cartier-women-s-initiative': { who: only('women founders of impact businesses'), degree: NO_DEGREE, age: atLeast(18), other: 'Your business must already be operating and you must work on it full-time' },
  'explorers-club-student-grants': { who: ALL, degree: 'You must be a student, postdoc or early-career researcher', age: NO_AGE },
  'elsevier-foundation-grants': ngoGrant(),
  'l-oreal-unesco-for-women-in-science': { who: only('women scientists'), degree: 'You must be a PhD student or postdoctoral researcher (by programme)', age: 'Age limits are set by each national programme' },
  'unesco-international-fund-for-cultural-diversity': ngoGrant(only('organisations in developing countries that are party to the 2005 UNESCO Convention')),
  'gsma-innovation-fund': ngoGrant(only('start-ups and organisations in low- and middle-income countries')),
  'global-innovation-fund': ngoGrant(ALL + ' (social enterprises, NGOs, researchers and governments)'),

  /* Internships */
  'imf-fund-internship-program-2027': { who: ALL + ' (citizens of IMF member countries)', degree: "You must be enrolled in a PhD (within 1–2 years of finishing) and return to study afterwards", age: under(32, 'when the internship starts') },
  'eu-blue-book-traineeship-october-2027': { who: BOTH + ' (EU and non-EU nationals)', degree: 'You must hold a university degree (a full 3-year cycle) by the deadline', age: NO_AGE, language: 'Very good English, French or German (EU nationals also need a second EU language)', other: 'You must not have worked or trained in an EU institution for more than 6 weeks' },
  'world-bank-treasury-summer-internship-2027': { who: ALL + ' (citizens of World Bank member countries)', age: AGE_CALL },
  'united-nations-internship-programme': unIntern(),
  'unicef-internship-programme': unIntern(atLeast(18)),
  'imf-paid-internships': { who: ALL + ' (citizens of IMF member countries)', degree: "You must be enrolled in a master's or PhD in economics or a related field", age: AGE_CALL },
  'un-world-food-programme-internships': unIntern(),
  'opec-fund-for-international-development-internship': { who: only('citizens of OPEC Fund member and partner countries'), age: AGE_CALL },
  'paid-voluntary-service-in-germany': { who: ALL, degree: NO_DEGREE, age: 'Any age after finishing compulsory schooling', language: 'Basic German is usually needed' },
  'teach-for-india-youth-fellowships': { who: 'Mainly Indian citizens and people with the right to work in India', degree: "You must hold a bachelor's degree (or be in your final year)", age: AGE_CALL },
  'oist-research-internship': { who: ALL, degree: "You must be an undergraduate or master's student", age: NO_AGE, language: 'English — no IELTS or TOEFL needed' },
  'who-internship-ethics-team-foresight-leadership-ethics': { ...unIntern(atLeast(20)), degree: 'You must be enrolled in a degree, or have graduated within the last 6 months' },
  'who-internship-programme': { ...unIntern(atLeast(20)), degree: 'You must be enrolled in a degree, or have graduated within the last 6 months' },
  'undp-washington-representation-office-internship': unIntern(),
  'unhcr-internship-programme': unIntern(),
  'unesco-internship-programme': unIntern(),
  'unfpa-internship-programme': unIntern(),
  'un-women-internship-programme': unIntern(),
  'fao-internship-programme': unIntern(between(21, 30)),
  'ifad-internship-programme': { ...unIntern(), who: only('citizens of IFAD member states') },
  'ilo-internship-programme': unIntern(),
  'unido-internship-programme': unIntern(),
  'unep-internship-programme': { ...unIntern(), degree: "You must be in a master's or higher, in the final year of a bachelor's, or have graduated within the past year" },
  'un-habitat-internship-programme': { ...unIntern(), degree: "You must be in a master's or higher, in the final year of a bachelor's, or have graduated within the past year" },
  'unodc-internship-programme': { ...unIntern(), degree: "You must be in a master's or higher, in the final year of a bachelor's, or have graduated within the past year" },
  'unctad-internship-programme': { ...unIntern(), degree: "You must be in a master's or higher, in the final year of a bachelor's, or have graduated within the past year" },
  'un-human-rights-ohchr-internship': { ...unIntern(), degree: "You must be in a master's or higher, in the final year of a bachelor's, or have graduated within the past year" },
  'unops-internship': unIntern(),
  'un-escap-internship': { ...unIntern(), degree: "You must be in a master's or higher, in the final year of a bachelor's, or have graduated within the past year" },
  'un-eca-internship': { ...unIntern(), degree: "You must be in a master's or higher, in the final year of a bachelor's, or have graduated within the past year" },
  'iaea-internship-programme': { ...unIntern(), who: only('citizens of IAEA member states') },
  'icao-internship-programme': unIntern(),
  'imo-internship-programme': unIntern(),
  'itu-internship-programme': { ...unIntern(), who: only('citizens of ITU member states') },
  'wipo-internship-programme': unIntern(),
  'wmo-internship-programme': unIntern(),
  'world-bank-group-internship-program': { who: ALL + ' (citizens of World Bank member countries)', degree: "You must be enrolled full-time in a master's or PhD and return to study afterwards", age: NO_AGE },
  'asian-development-bank-internship-program': { who: only('citizens of ADB member countries'), degree: "You must be enrolled in a master's or PhD", age: NO_AGE },
  'african-development-bank-internship': { who: only('citizens of AfDB member countries'), degree: "You must be enrolled in (or have recently finished) a master's degree", age: under(30) },
  'inter-american-development-bank-internship': { who: only('citizens of IDB member countries'), degree: "You must be enrolled in a master's or PhD", age: AGE_CALL, language: 'Fluent English or Spanish' },
  'google-step-software-engineering-internships': { ...techIntern, degree: "You must be enrolled in a bachelor's degree (STEP: first or second year) or later study for SWE roles" },
  'microsoft-software-engineering-internships': techIntern,
  'meta-software-engineering-product-internships': techIntern,
  'amazon-internships': techIntern,
  'council-of-europe-traineeship': { who: only('citizens of Council of Europe member states'), degree: 'You must hold a university degree (at least 3 years of study)', age: NO_AGE, language: 'Very good English or French' },
  'african-union-internship': { who: only('citizens of African Union member states'), degree: "You must be enrolled in, or have recently finished, a bachelor's or master's", age: AGE_CALL, language: 'Fluent in an AU working language (English, French, Arabic or Portuguese)' },
  'asean-secretariat-internship': { who: only('citizens of ASEAN member states'), age: AGE_CALL },
  'commonwealth-secretariat-internship': { who: only('citizens of Commonwealth countries'), degree: 'You must be a postgraduate student or recent graduate', age: AGE_CALL },
  'gates-foundation-internships': { ...ngoIntern, nationality: 'You need the right to work in the country of the role' },
  'open-society-foundations-internships': ngoIntern,
  'ford-foundation-internships': ngoIntern,
  'rockefeller-foundation-internships': ngoIntern,
  'giz-internships': { who: BOTH, degree: 'You must be enrolled at a university (most are compulsory internships during studies)', age: AGE_CALL, language: 'German for posts in Germany; English or French for many country offices' },
  'jica-internships': { who: BOTH, degree: "You must be a master's or PhD student", age: AGE_CALL, language: 'Japanese or English, depending on the post' },
  'koica-internships': ngoIntern,
  'mercy-corps-internships': ngoIntern,
  'oxfam-internships': ngoIntern,
  'save-the-children-internships': ngoIntern,
  'plan-international-internships': ngoIntern,
  'care-international-internships': ngoIntern,
  'msf-doctors-without-borders-internships': ngoIntern,
  'red-cross-red-crescent-ifrc-internships': ngoIntern,

  /* Fellowships */
  'yali-mandela-washington-fellowship': { who: only('citizens of Sub-Saharan African countries living in Africa'), degree: NO_DEGREE, age: between(25, 35), language: 'Fluent English', other: 'You cannot be a US citizen or permanent resident' },
  'yali-west-africa-emerging-leaders-program-for-business': { who: only('young people from West Africa'), degree: NO_DEGREE, age: between(18, 35) },
  'adina-talve-goodman-fellowship': { who: ALL, degree: NO_DEGREE, age: NO_AGE, other: 'You must not have published a book yet, and live with a chronic illness or disability' },
  'smithsonian-institution-fellowship-program': { who: ALL, degree: 'You must be a PhD student, or hold a PhD', age: NO_AGE },
  'ias-school-of-social-science-membership': { who: ALL, degree: 'You must hold a PhD at the time of application', age: NO_AGE },
  'princeton-in-africa-nexus-fellowships': { who: 'Recent graduates of US (and some African) universities', degree: "You must hold a recent bachelor's degree", age: AGE_CALL },
  'un-global-compact-business-and-human-rights-accelerator': { who: 'Companies that participate in the UN Global Compact', degree: ORG, age: 'Not applicable (companies apply)' },
  'twas-research-professors-in-least-developed-countries': { who: ALL + ' (senior scientists invited by a host in a least-developed country)', degree: 'You must hold a PhD', age: AGE_CALL },
  'uongozi-institute-emerging-leaders-programme': { who: only('mid-level executives in Africa'), degree: NO_DEGREE, age: AGE_CALL, experience: 'Several years of management experience' },
  'onx-seeds-program': { who: ALL, degree: NO_DEGREE, age: AGE_CALL },
  'nasa-hubble-fellowship-program': { who: ALL, degree: 'You must hold a PhD (recent, or completed before the start)', age: NO_AGE },
  'african-female-artist-mentorship-program': { who: only('African women artists'), degree: NO_DEGREE, age: AGE_CALL },
  'nvidia-graduate-fellowship': { who: ALL, degree: 'You must be a PhD student', age: NO_AGE, other: 'Your professor must nominate you' },
  'equality-fund-journalism-fellowship': { who: ALL, degree: NO_DEGREE, age: AGE_CALL },
  'dalai-lama-fellowship-programme': { who: ALL, degree: 'You must be a student or young professional', age: AGE_CALL },
  'itu-gender-champions-programme': { who: only('young women'), degree: NO_DEGREE, age: AGE_CALL },
  'berenson-fellowship-program': { who: ALL, degree: 'You must hold a PhD (usually within the past 10 years)', age: NO_AGE },
  'fellowship-in-the-digital-humanities': { who: ALL, degree: 'You must hold a PhD', age: NO_AGE },
  'mo-ibrahim-foundation-leadership-fellowships': { who: only('African nationals'), degree: "You must hold a master's degree", age: 'Under the age limit published in the call', experience: '7–10 years of professional experience', language: 'Fluent English (French or Portuguese is an asset)' },
  'yale-maurice-r-greenberg-world-fellows': { who: INTL + ' (people from outside the US)', degree: NO_DEGREE, age: AGE_CALL, experience: 'Usually 10+ years of professional experience', language: 'Strong English' },
  'imf-economist-program': { who: ALL + ' (citizens of IMF member countries)', degree: 'You must hold (or be finishing) a PhD in economics', age: AGE_CALL },
  'mopga-visiting-fellowship-program': { who: INTL + ' (researchers based outside France)', degree: 'You must be a PhD student or recent PhD', age: AGE_CALL },
  'open-call-for-emerging-african-storytellers': { who: only('African storytellers'), degree: NO_DEGREE, age: atLeast(18) },
  'neville-shulman-challenge-award': { who: ALL, degree: NO_DEGREE, age: atLeast(18) },
  'kleinhans-fellowship-for-community-forestry-research': { who: only('researchers working in Latin America'), degree: "You must be a master's or PhD student", age: AGE_CALL },
  'japan-africa-youth-program': { who: only('young African professionals'), degree: NO_DEGREE, age: AGE_CALL },
  'commonwealth-professional-fellowships': { who: INTL + ' (from eligible Commonwealth countries)', degree: NO_DEGREE, age: NO_AGE, experience: 'Mid-career — several years in your field', other: 'A UK host organisation must nominate you' },
  'chevening-fellowships': { who: INTL + ' (from eligible countries)', degree: "A bachelor's degree is usually required", age: NO_AGE, experience: 'Usually 7–10+ years of professional experience', other: 'You must return home for at least 2 years afterwards' },
  'rotary-peace-fellowship': { who: ALL, degree: "You must hold a bachelor's degree", age: NO_AGE, experience: "At least 3 years of related work (master's) or 5 years (certificate)", language: 'Proficient English' },
  'atlantic-fellows': { who: ALL, degree: NO_DEGREE, age: AGE_CALL, other: 'Each of the seven programmes sets its own rules' },
  'echoing-green-fellowship': { who: ALL, degree: NO_DEGREE, age: NO_AGE, other: 'You must lead an early-stage social enterprise full-time' },
  'acumen-fellowship': { who: 'Residents of the regional programme’s country', degree: NO_DEGREE, age: AGE_CALL, experience: 'Several years of work experience' },
  'ashoka-fellowship': { who: ALL, degree: NO_DEGREE, age: NO_AGE, other: 'Usually by nomination (self-nomination is accepted)' },
  'reuters-institute-journalist-fellowship-oxford': { who: ALL, degree: NO_DEGREE, age: NO_AGE, experience: 'Usually at least 5 years as a working journalist' },
  'knight-foundation-fellowships': { who: ALL, degree: NO_DEGREE, age: AGE_CALL },
  'mandela-rhodes-scholarship': { who: only('citizens of African countries'), degree: "You must hold a bachelor's degree and be admitted to postgraduate study in South Africa", age: between(19, 29) },
  'african-leadership-centre-peace-security-fellowship': { who: only('young Africans'), degree: "You must hold (or be finishing) a master's degree", age: AGE_CALL },
  'insa-visiting-scientist-fellowship': { who: INTL + ' (scientists from outside India)', degree: 'You must hold a PhD', age: AGE_CALL },
  'humboldt-research-fellowship': { who: INTL + ' (researchers from outside Germany)', degree: 'Postdocs: PhD within the last 4 years · Experienced researchers: PhD within the last 12 years', age: NO_AGE, other: 'A host researcher in Germany must support you' },
  'wellcome-early-career-awards': { who: ALL + ' (with a host in an eligible country)', degree: 'You must hold a PhD (or equivalent)', age: NO_AGE },
  'msca-postdoctoral-fellowships': { who: ALL, degree: 'You must hold a PhD with no more than 8 years of post-PhD experience', age: NO_AGE, other: 'You cannot have lived or worked in the host country for more than 12 months in the past 3 years' },
  'nih-ruth-l-kirschstein-fellowships-f-series': { who: 'Mostly US citizens and permanent residents', degree: 'You must be a PhD student or postdoc with a US sponsor', age: NO_AGE },
  'global-health-corps-fellowship': { who: ALL, degree: "You must hold a bachelor's degree", age: AGE_CALL },
  'one-young-world-scholarships': { who: ALL, degree: NO_DEGREE, age: between(18, 30) },
  'global-good-fund-fellowship': { who: ALL, degree: NO_DEGREE, age: AGE_CALL },
  'eisenhower-fellowships': { who: ALL, degree: NO_DEGREE, age: AGE_CALL, experience: 'Mid-career leader with a strong record', other: 'You are nominated through your country’s Eisenhower network' },
  'hansen-leadership-institute': { who: BOTH + ' (US and international students)', degree: 'You must be a university student or recent graduate', age: between(20, 25) },

  /* Competitions */
  'traderoots-africa-x-international-chamber-of-commerce': contest(only('African small and medium businesses'), 'Not applicable (businesses apply)'),
  'international-compost-awareness-week-poster-and-bookmark-contests': contest(),
  'royal-entomological-society-photography-competitions': contest(),
  'pulitzer-center-writing-contest': contest(ALL + ' (K–12 students)', 'You must be a K–12 school student'),
  'aacr-june-l-biedler-prize-for-cancer-journalism': contest(ALL + ' (journalists)', NO_AGE),
  'unesco-al-fozan-international-prize': { ...contest(ALL + ' (by government or institutional nomination)', under(40)), degree: 'You must be an established young scientist (usually PhD holder)' },
  'sci-innovation-award': contest(),
  '81st-college-photographer-of-the-year': contest(ALL + ' (college and university students)', NO_AGE),
  'kohli-foundation-sociology-on-stage': contest('Arts and cultural institutions', 'Not applicable (institutions apply)'),
  'international-kids-owl-art-contest': contest(ALL + ' (children)', 'Children within the age groups in the rules'),
  'planet-forward-storyfest-awards': contest(ALL + ' (college and university students)', NO_AGE),
  'biopage-storytelling-writing-contest': contest(),
  'international-schools-essay-competition-and-debate': contest(ALL + ' (secondary-school students)', 'Age bands are set in the rules'),
  'arso-continental-essay-competition': contest(only('African students'), 'Categories by school or university level'),
}
