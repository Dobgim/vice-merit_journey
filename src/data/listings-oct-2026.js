/**
 * Opportunities from “Global Scholarships, Fellowships, Grants & Internships
 * (Oct 2026 – 2027)”, open on 12 Oct 2026. Details come from public listings
 * (Advance Africa, Global South Opportunities, GreatYop) and university or
 * embassy notices — not yet checked against each official site, which the
 * detail pages say. Where no official link is known, `officialUrl` is a web
 * search and `officialSearch` is true, so the button reads “Find the official call”.
 */
import { slugify } from '../lib/deadline'

const AS_OF = '2026-10-12'
const SOURCE = 'public listings (Advance Africa, Global South Opportunities, GreatYop) and university or embassy notices'
const ROLLING = 'Rolling — applications are accepted all year. Funders can pause a call, so check before applying.'

const search = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`
const sentence = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s)
const lower = (s) => (s && /^[A-Z][a-z]/.test(s) && !/^(African|Asian|Commonwealth|South|West|Namibian|Kenyan|Nigerian|Indian|International|Scholars|PhD|SADC|Global|US|UK|EU)/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s)

// Only treat the coverage text as a value/benefit when it actually describes money or support.
const isFunding = (s = '') => /fund|tuition|stipend|grant|bursary|scholarship|award|allowance|waiver|housing|insurance|\$|€|£/i.test(s)

function make(kind, o) {
  const deadline = o.deadline ?? null
  const coverage = o.coverage
  const who = o.who
  const summary =
    o.summary ?? `${sentence(coverage ?? o.focus)}${who ? ` — open to ${lower(who)}` : ''}.`.replace(/\.\.$/, '.')

  return {
    slug: slugify(o.name),
    name: o.name,
    org: o.org ?? '',
    country: o.country ?? 'International',
    flag: o.flag ?? '🌐',
    level: o.level,
    funding: o.funding ?? (/fully funded|full tuition|full\b/i.test(coverage ?? '') ? 'Fully Funded' : kind === 'scholarships' ? 'Funding varies' : o.fundingType),
    category: o.category,
    amount: o.amount ?? (isFunding(coverage) ? coverage : 'See the official call'),
    deadline,
    deadlineNote: o.note ?? (deadline ? undefined : ROLLING),
    verified: AS_OF,
    source: SOURCE,
    nationalities: who,
    fields: o.focus,
    officialUrl: o.url ?? search(`${o.name} ${o.searchHint ?? 'official call apply'}`),
    officialSearch: !o.url,
    summary,
    tags: o.tags ?? [],
    overview: [
      summary,
      ...(o.note && deadline ? [o.note] : []),
      'This listing comes from public opportunity listings. Read the official call for the full rules, amounts and documents before you apply.',
    ],
    eligibility: [who && `Open to: ${who}`, o.level && `Level: ${o.level}`].filter(Boolean),
    benefits: isFunding(coverage) ? [sentence(coverage)] : [],
    documents: [],
    howToApply: [
      'Open the official call and read the eligibility rules and required documents.',
      'Check that you meet every requirement — nationality, level, field and age limits.',
      'Prepare your documents and any essays or proposals the call asks for.',
      deadline ? 'Submit before the deadline, allowing time for referees and uploads.' : 'Submit whenever you are ready — but check the call is still accepting applications.',
    ],
    timeline: [
      ...(o.dates ?? []),
      ...(deadline ? [{ date: deadline, label: 'Application deadline' }] : []),
    ].map((t) => ({ ...t, date: /^\d{4}-\d{2}-\d{2}$/.test(t.date) ? fmt(t.date) : t.date })),
    faqs: [],
  }
}

function fmt(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/* ------------------------------------------------------------ Scholarships */

const S = (o) => make('scholarships', o)

export const newScholarships = [
  S({ name: 'DAAD Scholarships (selected programmes)', org: 'DAAD', country: 'Germany', flag: '🇩🇪', level: 'Graduate', coverage: "Master's and PhD, fully funded", who: 'Graduates from developing countries and others', deadline: '2026-10-15', note: 'Deadlines vary by programme — check each call.', url: 'https://www.daad.de/en/', tags: ["Master's", 'PhD'] }),
  S({ name: 'PAIE Scholars Programme', level: 'PhD', coverage: 'Programme for PhD researchers in AI evaluation', who: 'PhD researchers from Africa and Asia', deadline: '2026-10-16', tags: ['AI', 'Research'] }),
  S({ name: 'Bank of Namibia Undergraduate Bursary', org: 'Bank of Namibia', country: 'Namibia', flag: '🇳🇦', level: 'Undergraduate', coverage: 'Undergraduate bursary', who: 'Namibian and SADC students', deadline: '2026-10-30', tags: ['Bursary', 'SADC'] }),
  S({ name: 'ABCD Future Environmental Leaders Scholarships', country: 'Germany', flag: '🇩🇪', level: 'PhD', coverage: 'PhD research stay in Germany', who: 'International applicants', deadline: '2026-10-31', tags: ['Environment', 'Research stay'] }),
  S({ name: 'INPEX Foundation Scholarship 2027', org: 'INPEX Scholarship Foundation', country: 'Japan', flag: '🇯🇵', level: 'Graduate', funding: 'Fully Funded', coverage: "Master's in Japan: tuition, travel, monthly stipend and settling allowance", amount: 'Tuition + stipend + travel', who: 'International applicants', deadline: '2026-10-31', tags: ["Master's", 'Japan'] }),
  S({ name: 'ACI Foundation Fellowships and Scholarships', org: 'ACI Foundation', country: 'United States', flag: '🇺🇸', level: 'Graduate', coverage: 'Graduate study awards', who: 'International applicants', deadline: '2026-11-01', url: 'https://www.acifoundation.org/', tags: ['Engineering'] }),
  S({ name: 'Brand South Africa Play Your Part Bursary', org: 'Brand South Africa', country: 'South Africa', flag: '🇿🇦', level: 'Undergraduate', coverage: 'Study bursary', who: 'South Africans', deadline: '2026-11-03', tags: ['Bursary'] }),
  S({ name: "Commonwealth Master's Scholarships", org: 'Commonwealth Scholarship Commission in the UK', country: 'United Kingdom', flag: '🇬🇧', level: 'Graduate', funding: 'Fully Funded', coverage: "Fully funded master's in the UK", amount: 'Fully funded', who: 'Citizens of eligible Commonwealth countries', deadline: '2026-11-06', note: 'Some nominating bodies set earlier dates — check yours.', url: 'https://cscuk.fcdo.gov.uk/', tags: ["Master's", 'UK'] }),
  S({ name: 'Schlumberger Faculty for the Future', org: 'SLB Foundation', level: 'PhD', coverage: 'PhD and post-doctoral study support', who: 'Applicants from developing countries', deadline: '2026-11-07', url: 'https://www.facultyforthefuture.net/', tags: ['STEM', 'PhD'] }),
  S({ name: 'Russian Government Scholarship (Open Doors / quota)', org: 'Government of Russia', country: 'Russia', flag: '🇷🇺', level: "Bachelor's to postdoc", funding: 'Fully Funded', coverage: "Fully funded study from bachelor's to postdoc", amount: 'Fully funded', who: 'International applicants', deadline: '2026-11-13', url: 'https://education-in-russia.com/', tags: ['All levels'] }),
  S({ name: 'UBC International Scholars Program 2027', org: 'University of British Columbia', country: 'Canada', flag: '🇨🇦', level: 'Undergraduate', coverage: 'Significant undergraduate funding in Canada', amount: 'Significant funding', who: 'International students entering university from secondary school', deadline: '2026-11-15', note: 'Opened 5 Oct 2026; admission documents are due 31 Jan 2027.', dates: [{ date: '2026-10-05', label: 'Applications opened' }, { date: '2027-01-31', label: 'Admission documents due' }], url: 'https://you.ubc.ca/', tags: ['First degree'] }),
  S({ name: 'Edinburgh x Mastercard Foundation Online Learning Scholars', org: 'University of Edinburgh & Mastercard Foundation', country: 'United Kingdom (online)', flag: '🇬🇧', level: 'Graduate', funding: 'Fully Funded', coverage: 'Fully funded online study', amount: 'Fully funded', who: 'African applicants', deadline: '2026-11-21', tags: ['Online', 'Africa'] }),
  S({ name: 'Hong Kong PhD Fellowship Scheme', org: 'Research Grants Council of Hong Kong', country: 'Hong Kong', flag: '🇭🇰', level: 'PhD', funding: 'Fully Funded', coverage: 'Fully funded PhD in Hong Kong', amount: 'Fully funded', who: 'All nationalities, all fields', deadline: '2026-12-01', note: 'Listed on 18 Sep 2026.', url: 'https://cerg1.ugc.edu.hk/hkpfs/', tags: ['PhD', 'All fields'] }),
  S({ name: 'CGS China Link Short-term Research Exchange (SYSU)', org: 'Sun Yat-sen University', country: 'China', flag: '🇨🇳', level: 'Postgraduate', funding: 'Fully Funded', coverage: '1 to 12 months in China with tuition waiver, housing, insurance and a stipend', amount: 'Tuition waiver + housing + stipend', who: 'Students and faculty at CSC partner universities', deadline: '2026-12-01', note: 'Posted 12 Mar 2026; for spring or summer 2027 study.', tags: ['Short-term', 'Research'] }),
  S({ name: 'University of Toronto International Scholarships', org: 'University of Toronto', country: 'Canada', flag: '🇨🇦', level: 'Undergraduate', coverage: 'Fully funded undergraduate scholarships (per listing)', who: 'International applicants', deadline: '2026-12-15', tags: ['First degree'] }),
  S({ name: 'Full International Master on Wine Tourism Innovation', country: 'Europe (multi-country)', flag: '🇪🇺', level: 'Graduate', funding: 'Fully Funded', coverage: "Full master's scholarship", amount: 'Full scholarship', who: 'International applicants', deadline: '2026-12-17', tags: ["Master's", 'Tourism'] }),
  S({ name: 'MA in European Public Health Scholarships', country: 'Europe', flag: '🇪🇺', level: 'Graduate', coverage: "Master's scholarships in European public health", who: 'International applicants', deadline: '2027-01-08', tags: ["Master's", 'Health'] }),
  S({ name: 'Margaret McNamara Educational Grants (USA/Canada)', org: 'Margaret McNamara Education Grants', country: 'United States & Canada', flag: '🇺🇸', level: 'Graduate', coverage: 'Study grants for women', who: 'African women (per listing)', deadline: '2027-01-15', note: 'The South Africa and Latin America rounds have already closed.', url: 'https://www.mmeg.org/', tags: ['Women'] }),
  S({ name: 'Washington College of Law Human Rights Essay Award', org: 'American University Washington College of Law', country: 'United States', flag: '🇺🇸', level: 'Graduate', funding: 'Fully Funded', coverage: 'Full tuition, awarded through an essay competition', amount: 'Full tuition', who: 'International applicants', deadline: '2027-02-03', tags: ['Law', 'Essay'] }),

  // Open, exact date to confirm on the official site
  S({ name: 'Gates Cambridge Scholarship', org: 'Gates Cambridge Trust', country: 'United Kingdom', flag: '🇬🇧', level: 'Postgraduate', funding: 'Fully Funded', coverage: 'Full-cost postgraduate study at the University of Cambridge', amount: 'Full cost of study', who: 'Applicants from outside the UK', note: 'The non-US round closes in December 2026 per listings — confirm the exact date on the official site.', url: 'https://www.gatescambridge.org/', tags: ['Cambridge'] }),
  S({ name: 'Fulbright Foreign Student Program', org: 'U.S. Department of State', country: 'United States', flag: '🇺🇸', level: 'Graduate', funding: 'Fully Funded', coverage: 'Graduate study and research in the United States', amount: 'Funded by country', who: 'Citizens of participating countries', note: 'Deadlines are set by each country (mostly Aug–Oct 2026); some have already closed.', url: 'https://foreign.fulbrightonline.org/', tags: ['USA'] }),
  S({ name: 'Global Korea Scholarship 2027 (undergraduate)', org: 'NIIED', country: 'South Korea', flag: '🇰🇷', level: 'Undergraduate', funding: 'Fully Funded', coverage: 'Undergraduate study in Korea', amount: 'Fully funded', who: 'International applicants', note: 'Listed as open — check the NIIED notice for the exact date.', url: 'https://www.studyinkorea.go.kr/', tags: ['Korea'] }),

  // Rolling — applications accepted all year
  S({ name: 'DAAD In-Country and In-Region Scholarships', org: 'DAAD', country: 'Africa and other regions', flag: '🌍', level: 'Graduate', coverage: 'Study in your home country or region', who: 'Students in eligible developing countries', url: 'https://www.daad.de/en/', tags: ['In-region'] }),
  S({ name: 'KAAD Master and PhD Scholarships (Germany)', org: 'KAAD', country: 'Germany', flag: '🇩🇪', level: 'Postgraduate', coverage: "Master's and PhD scholarships in Germany", who: 'Students from developing countries', url: 'https://www.kaad.de/', tags: ["Master's", 'PhD'] }),
  S({ name: 'Humber Scholarships (Canada)', org: 'Humber Polytechnic', country: 'Canada', flag: '🇨🇦', level: 'Undergraduate', coverage: 'Scholarships for international students', who: 'International students', url: 'https://humber.ca/', tags: ['College'] }),
  S({ name: 'Macquarie University Africa Scholarships', org: 'Macquarie University', country: 'Australia', flag: '🇦🇺', level: 'Undergraduate & postgraduate', coverage: 'Undergraduate and postgraduate scholarships', who: 'African students', url: 'https://www.mq.edu.au/', tags: ['Africa'] }),
  S({ name: 'Eni-Oxford MBA Scholarships', org: 'Saïd Business School, University of Oxford', country: 'United Kingdom', flag: '🇬🇧', level: 'Graduate', coverage: 'MBA scholarships at Oxford', who: 'African applicants', tags: ['MBA'] }),
  S({ name: 'Master Scholarships in Africa (Kenya, Ethiopia, Ghana, Zimbabwe)', country: 'Africa', flag: '🌍', level: 'Graduate', coverage: "Master's scholarships at African universities", who: 'African students', tags: ["Master's"] }),
  S({ name: 'Master Scholarships in Agricultural, Food and Environmental Policy Analysis', country: 'Africa', flag: '🌍', level: 'Graduate', coverage: "Postgraduate scholarships in policy analysis", who: 'Postgraduate students', tags: ['Agriculture', 'Policy'] }),
  S({ name: 'LLM Scholarships in the USA for African Women', country: 'United States', flag: '🇺🇸', level: 'Graduate', coverage: 'LLM study in the USA', who: 'African women', tags: ['Law', 'Women'] }),
  S({ name: 'Columbia University Scholarships for Displaced Students', org: 'Columbia University', country: 'United States', flag: '🇺🇸', level: 'Undergraduate & graduate', coverage: 'Scholarships for displaced students', who: 'Displaced students and refugees', tags: ['Refugees'] }),
  S({ name: 'US Community College Scholarships', country: 'United States', flag: '🇺🇸', level: 'Undergraduate', coverage: 'Community college scholarships', who: 'International students', tags: ['College'] }),
  S({ name: 'Catholic Scholarships in Kenya', country: 'Kenya', flag: '🇰🇪', level: 'Undergraduate', coverage: 'Study scholarships', who: 'Kenyan students', tags: ['Kenya'] }),
  S({ name: 'Church Development Service Scholarships', org: 'Brot für die Welt', country: 'Germany', flag: '🇩🇪', level: 'Postgraduate', coverage: 'Study scholarships', who: 'Students from developing countries', tags: ['Development'] }),
  S({ name: 'Scholarships for Developing Countries in Italy', country: 'Italy', flag: '🇮🇹', level: 'Graduate', coverage: 'Study scholarships in Italy', who: 'Students from developing countries', tags: ['Italy'] }),
  S({ name: 'RUFORUM Graduate Teaching Assistantships', org: 'RUFORUM', country: 'Africa', flag: '🌍', level: 'Graduate', coverage: 'Graduate teaching assistantships in agriculture', who: 'African graduates in agriculture', url: 'https://www.ruforum.org/', tags: ['Agriculture'] }),
]

/* ------------------------------------------------------------ Fellowships */

const F = (o) => make('fellowships', { fundingType: 'Fellowship', ...o })

export const fellowships = [
  F({ name: 'YALI Mandela Washington Fellowship', org: 'U.S. Department of State', country: 'United States', flag: '🇺🇸', level: 'Young African leaders', funding: 'Fully Funded', category: 'Leadership', focus: 'Leadership programme in the US', coverage: 'Fully funded leadership programme in the US', amount: 'Fully funded', who: 'Young African leaders', deadline: '2026-10-13', tags: ['Africa', 'Leadership'] }),
  F({ name: 'YALI West Africa Emerging Leaders Program for Business', org: 'YALI Regional Leadership Center', country: 'West Africa', flag: '🌍', level: 'Business leaders', funding: 'Fully Funded', category: 'Leadership', focus: 'Business leadership', coverage: 'Fully funded business leadership programme', amount: 'Fully funded', who: 'Applicants from West Africa', deadline: '2026-10-13', tags: ['Business'] }),
  F({ name: 'Adina Talve-Goodman Fellowship', org: 'One Story', country: 'United States', flag: '🇺🇸', level: 'Early-career writers', category: 'Arts & media', focus: 'Fiction writing', who: 'Early-career writers', deadline: '2026-10-13', tags: ['Writing'] }),
  F({ name: 'Smithsonian Institution Fellowship Program', org: 'Smithsonian Institution', country: 'United States', flag: '🇺🇸', level: 'Researchers', category: 'Research', focus: 'Research', who: 'International applicants', deadline: '2026-10-15', tags: ['Research'] }),
  F({ name: 'IAS School of Social Science Membership', org: 'Institute for Advanced Study', country: 'United States', flag: '🇺🇸', level: 'Scholars', category: 'Research', focus: 'Research residency', who: 'Scholars', deadline: '2026-10-15', url: 'https://www.ias.edu/', tags: ['Residency'] }),
  F({ name: 'Princeton in Africa Nexus Fellowships', org: 'Princeton in Africa', country: 'Africa', flag: '🌍', level: 'Early career', category: 'Career', focus: 'Work placements in Africa', who: 'Early-career applicants', deadline: '2026-10-18', url: 'https://www.princetoninafrica.org/', tags: ['Work placement'] }),
  F({ name: 'UN Global Compact Business and Human Rights Accelerator', org: 'UN Global Compact', level: 'Companies', category: 'Career', focus: 'Accelerator programme', who: 'Companies', deadline: '2026-10-22', url: 'https://unglobalcompact.org/', tags: ['Business', 'Human rights'] }),
  F({ name: 'TWAS Research Professors in Least Developed Countries', org: 'TWAS', level: 'Scientists', funding: 'Fully Funded', category: 'Research', focus: 'Research', coverage: 'Fully funded research positions', amount: 'Fully funded', who: 'Scientists in least developed countries', deadline: '2026-10-23', url: 'https://twas.org/', tags: ['Science'] }),
  F({ name: 'Uongozi Institute Emerging Leaders Programme', org: 'Uongozi Institute', country: 'Tanzania', flag: '🇹🇿', level: 'Mid-level executives', category: 'Leadership', focus: 'Executive leadership', who: 'Mid-level executives in Africa', deadline: '2026-10-23', tags: ['Executive'] }),
  F({ name: 'ONX Seeds Program', org: 'ONX Studio', country: 'United States', flag: '🇺🇸', level: 'Creators', category: 'Arts & media', focus: 'New media creators', who: 'New media creators', deadline: '2026-10-26', tags: ['Media'] }),
  F({ name: 'NASA Hubble Fellowship Program', org: 'NASA / Space Telescope Science Institute', country: 'United States', flag: '🇺🇸', level: 'Postdocs', category: 'Research', focus: 'Postdoctoral astrophysics', who: 'Postdoctoral researchers', deadline: '2026-10-28', url: 'https://www.stsci.edu/', tags: ['Astrophysics'] }),
  F({ name: 'African Female Artist Mentorship Program', country: 'Africa', flag: '🌍', level: 'Artists', category: 'Arts & media', focus: 'Mentorship', who: 'African women artists', deadline: '2026-10-30', tags: ['Women', 'Art'] }),
  F({ name: 'NVIDIA Graduate Fellowship', org: 'NVIDIA', country: 'Worldwide', level: 'PhD students', category: 'Research', focus: 'PhD research', who: 'PhD students worldwide', deadline: '2026-10-30', tags: ['AI', 'Computing'] }),
  F({ name: 'Equality Fund Journalism Fellowship', org: 'Equality Fund', level: 'Journalists', category: 'Arts & media', focus: 'Journalism', who: 'Journalists worldwide', deadline: '2026-11-08', tags: ['Journalism'] }),
  F({ name: 'Dalai Lama Fellowship Programme', level: 'Changemakers', category: 'Leadership', focus: 'Leadership', who: 'Emerging changemakers', deadline: '2026-11-11', tags: ['Ethics', 'Leadership'] }),
  F({ name: 'ITU Gender Champions Programme', org: 'International Telecommunication Union', level: 'Young women', category: 'Leadership', focus: 'Digital inclusion', who: 'Young women', deadline: '2026-11-15', tags: ['Digital', 'Women'] }),
  F({ name: 'Berenson Fellowship Program', org: 'Villa I Tatti, Harvard University', country: 'Italy', flag: '🇮🇹', level: 'Scholars', category: 'Research', focus: 'Research', who: 'Scholars from all nations', deadline: '2026-11-16', tags: ['Humanities'] }),
  F({ name: 'Fellowship in the Digital Humanities', level: 'Scholars', category: 'Research', focus: 'Research', who: 'Scholars', deadline: '2026-11-16', tags: ['Digital humanities'] }),
  F({ name: 'Mo Ibrahim Foundation Leadership Fellowships', org: 'Mo Ibrahim Foundation', country: 'Africa', flag: '🌍', level: 'Emerging leaders', funding: 'Fully Funded', category: 'Leadership', focus: 'Governance', coverage: 'Fully funded governance fellowship', amount: 'Fully funded', who: 'African applicants', deadline: '2026-11-20', url: 'https://mo.ibrahim.foundation/', tags: ['Governance'] }),
  F({ name: 'Yale Maurice R. Greenberg World Fellows', org: 'Yale University', country: 'United States', flag: '🇺🇸', level: 'Mid-career leaders', funding: 'Fully Funded', category: 'Leadership', focus: 'Mid-career leadership', coverage: 'Fully funded mid-career leadership fellowship', amount: 'Fully funded', who: 'Emerging global leaders', deadline: '2026-12-02', url: 'https://worldfellows.yale.edu/', tags: ['Yale'] }),
  F({ name: 'IMF Economist Program', org: 'International Monetary Fund', country: 'United States (Washington, DC)', flag: '🇺🇸', level: 'Recent PhD graduates', category: 'Career', focus: 'Economics career entry', who: 'Recent PhD graduates', deadline: '2026-12-04', url: 'https://www.imf.org/en/About/Recruitment', tags: ['Economics'] }),
  F({ name: 'MOPGA Visiting Fellowship Program', country: 'France', flag: '🇫🇷', level: 'Early-career researchers', category: 'Research', focus: 'Research visit', who: 'Early-career researchers', deadline: '2026-12-15', tags: ['Climate', 'Research'] }),
  F({ name: 'Open Call for Emerging African Storytellers', country: 'Africa', flag: '🌍', level: 'Storytellers', category: 'Arts & media', focus: 'Storytelling', who: 'African storytellers', deadline: '2026-12-30', tags: ['Storytelling'] }),
  F({ name: 'Neville Shulman Challenge Award', org: 'Royal Geographical Society', country: 'United Kingdom', flag: '🇬🇧', level: 'Individuals and groups', category: 'Research', focus: 'Award for individuals and groups', who: 'Open to all', deadline: '2027-01-08', url: 'https://www.rgs.org/', tags: ['Exploration'] }),
  F({ name: 'Kleinhans Fellowship for Community Forestry Research', level: 'Researchers', category: 'Research', focus: 'Community forestry research', who: 'Researchers', deadline: '2027-02-28', note: 'The source listing has a typo in the date — confirm it on the official site.', tags: ['Forestry'] }),
  F({ name: 'Japan-Africa Youth Program', country: 'Japan', flag: '🇯🇵', level: 'Youth', category: 'Leadership', focus: 'Youth exchange', who: 'Young people', deadline: '2027-04-18', tags: ['Exchange'] }),
]

/* ------------------------------------------------------------------ Grants */

const G = (o) => make('grants', { fundingType: 'Grant', ...o })

export const newGrants = [
  G({ name: 'Disability Empowerment Fund, Eastern Cape', country: 'South Africa', flag: '🇿🇦', level: 'Disability projects', category: 'Disability & inclusion', focus: 'Disability projects', who: 'Projects in the Eastern Cape', deadline: '2026-10-12', tags: ['Disability'] }),
  G({ name: 'Lisa Jardine Grant Scheme', org: 'The Royal Society', country: 'United Kingdom', flag: '🇬🇧', level: 'Early-career scholars', category: 'Research', focus: 'Early-career scholars', who: 'Early-career scholars', deadline: '2026-10-14', url: 'https://royalsociety.org/', tags: ['History of science'] }),
  G({ name: 'Brain Awareness Week Grants', level: 'Outreach organisers', category: 'Research', focus: 'Neuroscience outreach', who: 'Neuroscience outreach organisers', deadline: '2026-10-15', tags: ['Neuroscience'] }),
  G({ name: 'AGNES Intra-Africa Mobility Grants', org: 'AGNES', country: 'Africa', flag: '🌍', level: 'Junior researchers', category: 'Travel & mobility', focus: 'Research mobility', who: 'Junior researchers in Africa', deadline: '2026-10-16', tags: ['Mobility'] }),
  G({ name: 'AASM Foundation Strategic Research Grant Program', org: 'AASM Foundation', country: 'United States', flag: '🇺🇸', level: 'Researchers', category: 'Research', focus: 'Sleep medicine research', who: 'Sleep medicine researchers', deadline: '2026-10-19', tags: ['Medicine'] }),
  G({ name: 'IFRA-Nigeria Research Grants', org: 'IFRA-Nigeria', country: 'Nigeria', flag: '🇳🇬', level: 'Researchers', category: 'Research', focus: 'Research in Nigeria', who: 'Researchers working on Nigeria', deadline: '2026-10-30', tags: ['Nigeria'] }),
  G({ name: 'French Institute for Research in Africa Grants', org: 'IFRA', country: 'Africa', flag: '🌍', level: "Master's, doctoral and postdoctoral", category: 'Research', focus: "Master's, doctoral and postdoctoral research", who: "Master's, doctoral and postdoctoral researchers", deadline: '2026-10-30', tags: ['Research'] }),
  G({ name: 'Whitley Award', org: 'Whitley Fund for Nature', country: 'United Kingdom', flag: '🇬🇧', level: 'Conservation leaders', category: 'Conservation', focus: 'Wildlife and biodiversity conservation', who: 'Conservation leaders', deadline: '2026-10-30', url: 'https://whitleyaward.org/', tags: ['Wildlife'] }),
  G({ name: 'Hinrich Foundation Trade Research Grants', org: 'Hinrich Foundation', level: 'Researchers', category: 'Research', focus: 'Trade research', who: 'Trade researchers', deadline: '2026-10-31', tags: ['Trade'] }),
  G({ name: 'Energy Efficient and Climate Friendly Cooling Solutions in Ghana', country: 'Ghana', flag: '🇬🇭', level: 'Innovators', category: 'Innovation', focus: 'Climate and energy', who: 'Cooling-solution innovators in Ghana', deadline: '2026-10-31', tags: ['Climate', 'Energy'] }),
  G({ name: 'Neurology International Travel Award', level: 'Neurology professionals', category: 'Travel & mobility', focus: 'Travel to neurology meetings', who: 'Neurology professionals', deadline: '2026-10-31', tags: ['Travel'] }),
  G({ name: 'EEEM Foundation Community Impact Grant Program', org: 'EEEM Foundation', level: 'Community projects', category: 'Community', focus: 'Community projects', who: 'Community projects', deadline: '2026-11-01', tags: ['Community'] }),
  G({ name: 'UNECA Continental Call for African AI Innovations', org: 'UN Economic Commission for Africa', country: 'Africa', flag: '🌍', level: 'Innovators', category: 'Innovation', focus: 'AI innovation in Africa', who: 'African AI innovators', deadline: '2026-11-05', url: 'https://www.uneca.org/', tags: ['AI'] }),
  G({ name: 'MAKE Thesis Grants', level: 'Students', category: 'Education', focus: 'Animation students', who: 'Animation students', deadline: '2026-11-06', tags: ['Animation'] }),
  G({ name: 'Optimizing Enzyme Innovation for Industrial Plant-Based Processing', level: 'Researchers', category: 'Innovation', focus: 'Biotech', who: 'Biotech researchers and companies', deadline: '2026-11-07', tags: ['Biotech'] }),
  G({ name: 'YRV Global Teachers Grants', level: 'Teachers', category: 'Education', focus: 'Teachers', who: 'Teachers', deadline: '2026-11-15', tags: ['Teaching'] }),
  G({ name: 'Research Seed Money Grants (open call)', level: 'Researchers', category: 'Research', focus: 'Seed funding for research', who: 'Researchers', deadline: '2026-11-18', tags: ['Seed money'] }),
  G({ name: 'UN Youth Townhall Funding', level: 'Young people', category: 'Community', focus: 'Youth participation', who: 'Young participants', deadline: '2026-12-10', tags: ['Youth'] }),
  G({ name: 'AI and the Workforce Faculty Research Grants', level: 'Faculty', category: 'Research', focus: 'Faculty research', who: 'University faculty', deadline: '2026-12-15', tags: ['AI'] }),
  G({ name: 'US Embassy Self Help Funding in Kenya', org: 'U.S. Embassy Nairobi', country: 'Kenya', flag: '🇰🇪', level: 'Community groups', category: 'Community', focus: 'Community projects', coverage: '30+ small grants for community projects', amount: '30+ small grants', who: 'Community groups in Kenya', deadline: '2026-12-31', url: 'https://ke.usembassy.gov/', tags: ['Kenya'] }),
  G({ name: 'Maypole Fund Small Grants', org: 'Maypole Fund', level: 'Individual women', category: 'Women', focus: 'Small grants for individual women', who: 'Individual women', deadline: '2027-01-31', note: 'There is a second round on 30 June.', tags: ['Women'] }),
  G({ name: 'Trisong Grants', level: 'Individuals and organisations', category: 'Community', focus: 'Grants for individuals and organisations', who: 'Individuals and organisations', deadline: '2027-03-31', note: 'There is a second round on 30 September.', tags: ['Small grants'] }),
  G({ name: 'Disability Rights Fund', org: 'Disability Rights Fund', level: "Disabled persons' organisations", category: 'Disability & inclusion', focus: "Grants for disabled persons' organisations", who: "Disabled persons' organisations", deadline: '2027-03-31', note: 'There is a second round on 31 August.', url: 'https://disabilityrightsfund.org/', tags: ['Disability rights'] }),

  // Rolling — applications accepted all year
  G({ name: 'International Foundation for Science Individual Research Grants', org: 'International Foundation for Science', level: 'Researchers', category: 'Research', focus: 'Research grants up to USD 12,000', amount: 'Up to US$12,000', who: 'Researchers in developing countries', tags: ['Research'] }),
  G({ name: 'Grants-in-Aid of Research (GIAR)', org: 'Sigma Xi', country: 'United States', flag: '🇺🇸', level: 'Students', category: 'Research', focus: 'Student research grants', who: 'Undergraduate and graduate students worldwide', url: 'https://www.sigmaxi.org/', tags: ['Students'] }),
  G({ name: 'BES Student Training and Travel Grants', org: 'British Ecological Society', country: 'United Kingdom', flag: '🇬🇧', level: 'Students', category: 'Travel & mobility', focus: 'Training and travel', who: 'Students in developing countries', tags: ['Ecology'] }),
  G({ name: 'Spencer Foundation Conference Grants', org: 'Spencer Foundation', country: 'United States', flag: '🇺🇸', level: 'Researchers', category: 'Education', focus: 'Conference grants', who: 'Education researchers', url: 'https://www.spencer.org/', tags: ['Education research'] }),
  G({ name: 'WWF Professional Development Grants', org: 'WWF', level: 'Conservationists', category: 'Conservation', focus: 'Training and conferences', who: 'Conservation professionals', tags: ['Training'] }),
  G({ name: 'Mohamed bin Zayed Species Conservation Fund', org: 'Mohamed bin Zayed Species Conservation Fund', level: 'Conservationists', category: 'Conservation', focus: 'Species conservation', who: 'Species conservationists', note: 'Three funding rounds a year.', url: 'https://www.speciesconservation.org/', tags: ['Species'] }),
  G({ name: 'John Templeton Foundation Grants', org: 'John Templeton Foundation', country: 'United States', flag: '🇺🇸', level: 'Researchers', category: 'Research', focus: 'Research', who: 'Researchers', url: 'https://www.templeton.org/', tags: ['Research'] }),
  G({ name: 'Africa Young Entrepreneur Support', country: 'Africa', flag: '🌍', level: 'Start-ups', category: 'Entrepreneurship', focus: 'Support for young start-ups', who: 'Young start-ups in Africa', tags: ['Start-ups'] }),
  G({ name: 'GroFin', org: 'GroFin', country: 'Africa', flag: '🌍', level: 'Small businesses', category: 'Entrepreneurship', focus: 'Small and growing businesses', who: 'Small and growing businesses in Africa', url: 'https://www.grofin.com/', tags: ['SMEs'] }),
  G({ name: 'African Women Development Fund', org: 'AWDF', country: 'Africa', flag: '🌍', level: 'Women-led organisations', category: 'Women', focus: 'Women’s rights and development', who: 'Women in Africa and the Middle East', tags: ['Women'] }),
  G({ name: 'Fonds SUEZ', org: 'Fonds SUEZ', level: 'Organisations', category: 'Community', focus: 'Living conditions in developing countries', who: 'Projects in developing countries', tags: ['Water', 'Sanitation'] }),
  G({ name: 'Funds for Women Journalists (IWMF Relief Fund, Rainforest Journalism Fund)', level: 'Journalists', category: 'Women', focus: 'Journalism', who: 'Journalists', tags: ['Journalism'] }),
  G({ name: 'National Endowment for Democracy', org: 'National Endowment for Democracy', country: 'United States', flag: '🇺🇸', level: 'NGOs', category: 'Civil society & rights', focus: 'Democracy and civil society', who: 'NGOs and civil society', url: 'https://www.ned.org/', tags: ['Democracy'] }),
  G({ name: 'Coca-Cola Foundation Grants', org: 'The Coca-Cola Foundation', level: 'Non-profits', category: 'Community', focus: 'Health, education, environment', who: 'Non-profit organisations', tags: ['Health', 'Education'] }),
  G({ name: 'Draper Richards Kaplan Foundation', org: 'Draper Richards Kaplan Foundation', level: 'Entrepreneurs and NGOs', category: 'Entrepreneurship', focus: 'Early-stage social enterprises', who: 'Entrepreneurs and NGOs', url: 'https://www.drkfoundation.org/', tags: ['Social enterprise'] }),
  G({ name: 'Abilis Foundation', org: 'Abilis Foundation', level: 'Persons with disabilities', category: 'Disability & inclusion', focus: 'Projects by persons with disabilities', who: 'Persons with disabilities', tags: ['Disability'] }),
  G({ name: 'CIVICUS Solidarity Fund', org: 'CIVICUS', level: 'Civil society', category: 'Civil society & rights', focus: 'Civil society', who: 'Civil society groups', url: 'https://www.civicus.org/', tags: ['Civil society'] }),
  G({ name: 'Africa Digital Rights Fund', country: 'Africa', flag: '🌍', level: 'Organisations', category: 'Civil society & rights', focus: 'Digital rights', who: 'Digital rights organisations in Africa', tags: ['Digital rights'] }),
  G({ name: 'Roddenberry Foundation Catalyst Fund', org: 'Roddenberry Foundation', level: 'Changemakers', category: 'Community', focus: 'Social change', who: 'Social change initiatives', tags: ['Social change'] }),
  G({ name: 'Karibu Foundation Grants', org: 'Karibu Foundation', level: 'Organisations', category: 'Civil society & rights', focus: 'Global South', who: 'Organisations in the Global South', tags: ['Global South'] }),
  G({ name: 'Wallace Global Fund', org: 'Wallace Global Fund', level: 'Organisations', category: 'Civil society & rights', focus: 'Environment and human rights', who: 'Environment and human rights organisations', url: 'https://wgf.org/', tags: ['Environment', 'Human rights'] }),
  G({ name: 'German Embassy Funding for NGOs', level: 'NGOs', category: 'Community', focus: 'Small projects by NGOs', who: 'NGOs', note: 'Rolling — applications go through your local German embassy.', tags: ['NGOs'] }),
  G({ name: 'WPHF Short-Term Women Grants', org: "Women's Peace and Humanitarian Fund", level: 'Women-led organisations', category: 'Women', focus: 'Women-led peacebuilding', who: 'Women-led organisations', tags: ['Peacebuilding'] }),
  G({ name: 'Urgent Action Fund and EMHRF Urgent Grants', level: 'Activists', category: 'Civil society & rights', focus: 'Rapid response', who: 'Activists and human rights defenders', tags: ['Rapid response'] }),
  G({ name: 'Sophie Danforth Fund, Wild Planet Trust and Minor Foundation', level: 'Conservationists', category: 'Conservation', focus: 'Conservation', who: 'Conservation projects', tags: ['Conservation'] }),
  G({ name: 'WARC Travel Grants, Art Moves Africa and Africa-India Mobility Fund', level: 'Researchers and artists', category: 'Travel & mobility', focus: 'Travel grants', who: 'African researchers and artists', tags: ['Travel'] }),
  G({ name: 'SEARCA Travel Grants', org: 'SEARCA', level: 'Researchers', category: 'Travel & mobility', focus: 'Travel grants', who: 'Researchers in Southeast Asia', tags: ['Asia'] }),
  G({ name: 'Khoj Support Grants', org: 'Khoj International Artists’ Association', country: 'India', flag: '🇮🇳', level: 'Artists', category: 'Community', focus: 'Early-career artists', who: 'Early-career artists in India', tags: ['Art'] }),
  G({ name: 'Noel Buxton Trust Africa Grants', org: 'Noel Buxton Trust', country: 'Africa', flag: '🌍', level: 'Organisations', category: 'Community', focus: 'Projects in Africa', who: 'Organisations working in Africa', tags: ['Africa'] }),
]

/* ------------------------------------------------------------- Internships */

const I = (o) => make('internships', o)

export const newInternships = [
  I({ name: 'IMF Paid Internships', org: 'International Monetary Fund', country: 'United States (Washington, DC)', flag: '🇺🇸', level: 'Students', fundingType: 'Paid', category: 'Economics & finance', focus: 'Economics and finance', who: 'Students in economics and finance', deadline: '2026-11-14', url: 'https://www.imf.org/en/About/Recruitment', tags: ['Paid'] }),
  I({ name: 'UN World Food Programme Internships', org: 'World Food Programme', country: 'WFP offices worldwide', flag: '🇺🇳', level: 'Students & recent graduates', fundingType: 'Varies', category: 'International organisations', focus: 'Food security', who: 'Students and recent graduates', url: 'https://www.wfp.org/careers', tags: ['Rolling'] }),
  I({ name: 'OPEC Fund for International Development Internship', org: 'OPEC Fund for International Development', country: 'Austria (Vienna)', flag: '🇦🇹', level: 'Students & recent graduates', fundingType: 'Varies', category: 'Economics & finance', focus: 'Development finance', who: 'Students and recent graduates', url: 'https://opecfund.org/', tags: ['Rolling'] }),
  I({ name: 'Paid Voluntary Service in Germany', org: 'Bundesfreiwilligendienst', country: 'Germany', flag: '🇩🇪', level: 'Any age', fundingType: 'Paid', category: 'Volunteering & teaching', focus: 'Paid voluntary service', who: 'Worldwide applicants of any age', url: 'https://www.bundesfreiwilligendienst.de/', tags: ['Volunteering'] }),
  I({ name: 'Teach for India Youth Fellowships', org: 'Teach For India', country: 'India', flag: '🇮🇳', level: 'Young graduates', fundingType: 'Fellowship', category: 'Volunteering & teaching', focus: 'Education in India', who: 'Young graduates', url: 'https://www.teachforindia.org/', tags: ['Teaching'] }),
]

/* ------------------------------------------------------------ Competitions */

const C = (o) => make('competitions', { fundingType: 'Award', ...o })

export const competitions = [
  C({ name: 'TradeRoots Africa x International Chamber of Commerce', org: 'International Chamber of Commerce', country: 'Africa', flag: '🌍', level: 'African SMEs', category: 'Business', focus: 'Export programme for African SMEs', who: 'African small and medium businesses', deadline: '2026-10-15', tags: ['Export'] }),
  C({ name: 'International Compost Awareness Week Poster and Bookmark Contests', level: 'Students and artists', category: 'Photography & art', focus: 'Poster and bookmark contests', who: 'Open entry', deadline: '2026-10-22', tags: ['Art'] }),
  C({ name: 'Royal Entomological Society Photography Competitions', org: 'Royal Entomological Society', country: 'United Kingdom', flag: '🇬🇧', level: 'Photographers', category: 'Photography & art', focus: 'Photography', who: 'Photographers', deadline: '2026-10-31', url: 'https://www.royensoc.co.uk/', tags: ['Photography'] }),
  C({ name: 'Pulitzer Center Writing Contest', org: 'Pulitzer Center', country: 'United States', flag: '🇺🇸', level: 'K-12 students', category: 'Writing & essays', focus: 'Writing', who: 'K-12 students worldwide', deadline: '2026-11-01', url: 'https://pulitzercenter.org/', tags: ['Students'] }),
  C({ name: 'AACR June L. Biedler Prize for Cancer Journalism', org: 'American Association for Cancer Research', country: 'United States', flag: '🇺🇸', level: 'Journalists', category: 'Writing & essays', focus: 'Journalism prize', who: 'Journalists', deadline: '2026-11-30', url: 'https://www.aacr.org/', tags: ['Journalism'] }),
  C({ name: 'UNESCO-Al Fozan International Prize', org: 'UNESCO', level: 'Young scientists', category: 'Science & innovation', focus: 'Young scientists in STEM', who: 'Young scientists in STEM', deadline: '2026-11-30', tags: ['STEM'] }),
  C({ name: 'SCI Innovation Award', org: 'SCI', level: 'Innovators', category: 'Science & innovation', focus: 'Innovation award', who: 'Innovators', deadline: '2026-12-04', tags: ['Innovation'] }),
  C({ name: '81st College Photographer of the Year', org: 'College Photographer of the Year', country: 'United States', flag: '🇺🇸', level: 'College students', category: 'Photography & art', focus: 'Photography', who: 'College photography students', deadline: '2026-12-25', url: 'https://www.cpoy.org/', tags: ['Photography'] }),
  C({ name: 'Kohli Foundation Sociology on Stage', org: 'Kohli Foundation', level: 'Institutions', category: 'Photography & art', focus: 'Arts and cultural institutions', who: 'Arts and cultural institutions', deadline: '2027-01-01', tags: ['Theatre'] }),
  C({ name: "International Kids' Owl Art Contest", level: 'Children', category: 'Photography & art', focus: 'Art contest', who: 'Children', deadline: '2027-01-15', tags: ['Kids'] }),
  C({ name: 'Planet Forward Storyfest Awards', org: 'Planet Forward', country: 'United States', flag: '🇺🇸', level: 'Students', category: 'Writing & essays', focus: 'Storytelling', who: 'Student storytellers', deadline: '2027-01-15', url: 'https://planetforward.org/', tags: ['Environment'] }),
  C({ name: 'Biopage Storytelling Writing Contest', level: 'Writers', category: 'Writing & essays', focus: 'Writing', who: 'Writers', deadline: '2027-01-31', tags: ['Writing'] }),
  C({ name: 'International Schools Essay Competition and Debate', level: 'Students', category: 'Writing & essays', focus: 'Essay and debate', who: 'Students worldwide', deadline: '2027-03-01', tags: ['Essay', 'Debate'] }),
  C({ name: 'ARSO Continental Essay Competition', org: 'African Organisation for Standardisation', country: 'Africa', flag: '🌍', level: 'Students', category: 'Writing & essays', focus: 'Essay', who: 'African students', deadline: '2027-04-23', tags: ['Essay'] }),
]
