/**
 * The documents most calls of a kind ask for, shown (and labelled as such) on
 * a listing whose own list has not been written yet. The official call's list
 * replaces this as soon as it is added to data/requirements-auto.js.
 */
const PASSPORT = 'Passport or national ID'
const TRANSCRIPTS = 'Academic transcripts and degree certificates (with certified translations if they are not in English)'
const CV = 'CV or résumé'
const MOTIVATION = 'Motivation letter or statement of purpose'
const REFS = 'Two recommendation letters (academic or professional)'
const LANGUAGE = 'English test result (IELTS, TOEFL or similar), unless you studied in English'

const isPhd = (s) => /phd|doctor/i.test(`${s.level ?? ''} ${s.name ?? ''}`)
const isUndergrad = (s) => /undergraduate|bachelor|first degree|high school/i.test(`${s.level ?? ''} ${s.name ?? ''}`) && !/master|phd|postgraduate|graduate/i.test(s.level ?? '')

export function typicalDocuments(s, kind) {
  if (kind === 'scholarships') {
    if (isUndergrad(s)) return [PASSPORT, 'Secondary school certificates and transcripts', 'Personal statement or essay', 'One or two recommendation letters from teachers', LANGUAGE]
    return [PASSPORT, TRANSCRIPTS, CV, MOTIVATION, REFS, LANGUAGE, ...(isPhd(s) ? ['Research proposal'] : [])]
  }
  if (kind === 'fellowships') return [CV, 'Personal statement or project proposal', REFS, PASSPORT, 'Writing or work samples, if the call asks for them']
  if (kind === 'grants') return ['Project proposal with a budget and timeline', 'CVs of the people leading the project', 'Registration documents, if you apply as an organisation', 'Letters of support or partnership, if the call asks for them']
  if (kind === 'internships') return [CV, 'Cover letter', 'Transcripts or proof that you are a student or recent graduate', 'One or two references', PASSPORT]
  return ['Your entry (essay, project, design or work) following the rules', 'Entry form', 'Proof that you are eligible (ID, student card or proof of residence)']
}
