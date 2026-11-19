/**
 * The Chinese Government Scholarship section (/chinese-government-scholarship):
 * which scholarship listings belong to it, how they are grouped, and the
 * explanations shown on the page and in its pre-rendered HTML (build-seo.js).
 */

export const CHINA_PATH = '/chinese-government-scholarship'

export const chinaSeo = {
  title: 'Chinese Government Scholarship (CSC) 2027: Type A and B',
  description:
    'Every open Chinese Government Scholarship (CSC) call we track: Type B university programmes, Type A embassy route and CAS-ANSO, with deadlines and how to apply.',
}

const text = (item) => `${item.name ?? ''} ${(item.tags ?? []).join(' ')}`

/** A scholarship funded by the Chinese government or Chinese Academy of Sciences, open to international students. */
export function isChinaGov(item) {
  if (!/^china/i.test(item.country ?? '')) return false
  const t = text(item)
  if (/self-financed chinese students/i.test(t)) return false
  return /chinese government|\bcsc\b|\bcgs\b|cas-anso|\banso\b|great wall|china link/i.test(t) || LOCAL.test(item.name ?? '')
}

// City and provincial government scholarships (Shanghai, Beijing, Jiangsu Jasmine…).
const LOCAL = /(shanghai|beijing|jiangsu|zhejiang|guangdong|hubei|tianjin|chongqing|sichuan|shaanxi|xi.an|nanjing|hunan|henan|yunnan|guangxi|liaoning|jilin|shandong|fujian|anhui)\b[^,(]*?\b(municipal |provincial )?government scholarship|jasmine jiangsu/i

/**
 * 'B' (apply through the university), 'A' (through the Chinese embassy) or
 * 'special' (CAS-ANSO, Youth of Excellence, Great Wall, China Link).
 */
export function cscType(item) {
  const t = item.name ?? ''
  if (!/chinese government|\bcsc\b/i.test(t) && LOCAL.test(t)) return 'local'
  if (/anso|great wall|youth of excellence|china link/i.test(t)) return 'special'
  if (/type b|university program|high[- ]level|silk road/i.test(t)) return 'B'
  if (/type a\b|bilateral/i.test(t)) return 'A'
  return 'B'
}

/** The three groups, in the order the page shows them. */
export const CSC_GROUPS = [
  {
    key: 'B',
    title: 'Type B: apply through the university',
    short: 'Type B',
    body: 'The Chinese University Program. You apply directly to one Chinese university, which recommends you to the China Scholarship Council. Each university sets its own deadline, usually between December and April, and you may choose only one university.',
  },
  {
    key: 'A',
    title: 'Type A: apply through the Chinese embassy',
    short: 'Type A',
    body: 'The Bilateral Program. You apply through the Chinese embassy or the government office that handles scholarships in your country, which sets the deadline (usually between January and April). Many universities give a pre-admission letter that strengthens a Type A application.',
  },
  {
    key: 'special',
    title: 'Special programmes',
    short: 'Special programmes',
    body: 'Other awards funded by the Chinese government or the Chinese Academy of Sciences, each with its own call: the CAS-ANSO Scholarship, the Youth of Excellence Scheme of China, the Great Wall Fellowship and China Link.',
  },
  {
    key: 'local',
    title: 'City and provincial government scholarships',
    short: 'City and provincial',
    body: 'Scholarships paid by a Chinese city or province, such as the Shanghai Government Scholarship or Jiangsu’s Jasmine Scholarship. You apply through the university, often with the same cover as the Chinese Government Scholarship, and you can usually only hold one of the two.',
  },
]

export const CSC_COVER =
  'A full Chinese Government Scholarship normally covers tuition, a free university dormitory or a housing subsidy, comprehensive medical insurance and a monthly stipend of RMB 3,000 for a master’s or RMB 3,500 for a PhD (RMB 2,500 for a bachelor’s).'

export const CSC_STEPS = [
  'Choose the university and programme, and check that you meet the age limit: usually under 25 for a bachelor’s, under 35 for a master’s and under 40 for a PhD.',
  'Register on the Chinese Government Scholarship system (campuschina.org). Pick the programme type (Type A or Type B) and, for Type B, the university’s agency number.',
  'Apply on the university’s own admission system as well, and upload the scholarship application form you downloaded from the CSC system.',
  'Upload your documents: passport, notarised degree and transcripts, study or research plan, two recommendation letters, the Foreigner Physical Examination Form, a police clearance certificate and a language certificate. Many universities also want a supervisor’s acceptance letter.',
]

export const CSC_TIPS = [
  'Deadlines are in Beijing time (GMT+8). Apply in the first round when a university has two, as places go to early applicants.',
  'Some universities charge an application fee (RMB 400–800); others charge nothing. Merit Leaders never asks for money to “guarantee” a scholarship, and nobody can.',
  'Bachelor’s applicants now need a China Scholastic Competency Assessment (CSCA) score at many universities, so book a test date early.',
]
