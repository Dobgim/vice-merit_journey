/**
 * Who can apply and what to prepare, for listings added by the daily runs with
 * only a one-line summary. Each entry is written from the official call
 * (the listing's own link) on the date in its comment.
 *
 * slug → { eligibility: [], documents: [] }. Merged into data/requirements.js;
 * a hand-written entry there wins if both cover the same listing.
 * scripts/missing-requirements.mjs lists the open listings that still need one.
 */

/* ------------------------------------------- Chinese Government Scholarship */

// The documents the China Scholarship Council asks for in every Type B application.
const CSC_FORM = 'Chinese Government Scholarship application form, filled in on campuschina.org, printed and signed'
const CSC_DEGREE = 'Highest degree certificate, notarised (or a certificate of enrolment if you have not graduated yet)'
const CSC_TRANSCRIPTS = 'Academic transcripts, notarised (with a certified Chinese or English translation)'
const CSC_PLAN = 'Study plan (master’s) or research proposal (PhD), in Chinese or English'
const CSC_REFS = 'Two recommendation letters from professors or associate professors'
const CSC_MEDICAL = 'Foreigner Physical Examination Form, completed in Chinese or English (valid for six months)'
const CSC_POLICE = 'Police clearance certificate (non-criminal record), usually issued within the last six months'
const CSC_PASSPORT = 'Passport photo page'
const CSC_LANGUAGE = 'Language certificate: HSK for Chinese-taught programmes, or IELTS/TOEFL (or proof of English-medium study) for English-taught ones'

const CSC_DOCS = [CSC_FORM, CSC_PASSPORT, CSC_DEGREE, CSC_TRANSCRIPTS, CSC_PLAN, CSC_REFS, CSC_LANGUAGE, CSC_MEDICAL, CSC_POLICE]

const AGES = [
  'Master’s: a bachelor’s degree and under 35',
  'PhD: a master’s degree and under 40',
]
const NOT_CHINESE = 'Not a Chinese citizen, and in good health'
const NO_OTHER = 'Not holding any other Chinese government scholarship'
const ONE_SCHOOL = 'Type B: you may apply to only one university in the CSC system'

const cscB = (extra = [], docs = []) => ({
  eligibility: [NOT_CHINESE, ...AGES, NO_OTHER, ONE_SCHOOL, ...extra],
  documents: [...CSC_DOCS, ...docs],
})

export const autoRequirements = {
  // Checked 19 Nov 2026 against each university's 2027 notice.
  'chinese-government-scholarship-csc-type-b-at-shanghai-jiao-tong-university-2027': cscB(
    ['Applying through SJTU (Type B) or through a Chinese embassy (Type A), not both'],
    ['SJTU online programme application']
  ),
  'chinese-government-scholarship-csc-type-b-at-zhejiang-university-2027': cscB(
    [],
    ['Zhejiang University online application (agency number 10335 in the CSC system)']
  ),
  'chinese-government-scholarship-youth-of-excellence-scheme-of-china-at-zhejiang-university-2027': {
    eligibility: [NOT_CHINESE, 'A bachelor’s degree', 'Applying for one of the three English-taught master’s programmes: China Studies, Chinese Economy, or Energy and Power Engineering', NO_OTHER],
    documents: [CSC_PASSPORT, CSC_DEGREE, CSC_TRANSCRIPTS, 'Study plan and personal statement', CSC_REFS, 'English proficiency (IELTS/TOEFL or proof of English-medium study)', CSC_MEDICAL, CSC_POLICE, 'Zhejiang University online application'],
  },
  'cas-anso-scholarship-2027-master-s-and-phd-at-ucas-ustc-and-cas-institutes': {
    eligibility: [
      'Not a Chinese citizen, with a valid passport',
      'Master’s: born on or after 1 January 1997',
      'PhD: born on or after 1 January 1992',
      'A high level of English; Chinese-taught programmes need HSK 5 (180+)',
      'Not currently studying in China at the level you apply for',
      'Apply to UCAS or USTC, not both, in the same year',
    ],
    documents: [
      'Online application at UCAS or USTC, choosing “CAS-ANSO Scholarship”',
      CSC_PASSPORT,
      CSC_DEGREE,
      CSC_TRANSCRIPTS,
      'Research proposal / study plan',
      'Recommendation letters submitted online by your referees before 28 February 2027',
      'English test result (or HSK 5 for Chinese-taught programmes)',
      CSC_MEDICAL,
      CSC_POLICE,
    ],
  },
  'chinese-government-scholarship-at-tsinghua-university-2027-type-a-and-type-b': {
    eligibility: [NOT_CHINESE, ...AGES, 'Pre-admitted and recommended by a Tsinghua school or department before the scholarship is considered', NO_OTHER],
    documents: ['Tsinghua graduate online application (round one closes 15 December 2026)', ...CSC_DOCS],
  },
  'chinese-government-scholarship-high-level-postgraduate-program-csc-type-b-at-tongji-university-2027': cscB(
    [],
    ['Supervisor acceptance letter (applications without one are not reviewed)', 'Tongji online application and the RMB 600 application fee']
  ),
  'chinese-government-scholarship-high-level-graduate-program-csc-type-b-at-zhejiang-university-of-technology-2027': cscB(
    ['Chinese-taught programmes: HSK 5 with 180 or more'],
    ['ZJUT online application (by 10 January 2027)']
  ),
  'chinese-government-scholarship-csc-type-b-at-beijing-institute-of-technology-2027': cscB(
    [],
    ['BIT online application (agency number 10007 in the CSC system)']
  ),
  'chinese-government-scholarship-csc-type-b-at-harbin-institute-of-technology-2027': cscB(
    ['Not applying for an HIT scholarship at the same time'],
    ['HIT online application']
  ),
  'chinese-government-scholarship-high-level-postgraduate-program-csc-type-b-at-zhejiang-normal-university-2027': cscB(
    [],
    ['ZJNU admission portal application, after passing the first review (agency number 10345)']
  ),
  'chinese-government-scholarship-high-level-postgraduate-program-csc-type-b-at-east-china-normal-university-2027': cscB(
    [],
    ['ECNU online application and the RMB 800 application fee', 'Health certificate issued within the last six months']
  ),
  'chinese-government-scholarship-silk-road-program-csc-type-b-at-east-china-normal-university-2027': cscB(
    ['A national of a Belt and Road partner country'],
    ['ECNU online application and the RMB 800 application fee', 'Health certificate issued within the last six months']
  ),
  'chinese-government-scholarship-high-level-postgraduate-program-csc-type-b-at-china-university-of-geosciences-wuhan-2027': cscB(
    ['A GPA of 3.5/4.0 (85%) or above'],
    ['Only the CSC online application (agency number 10491); no separate CUG application and no fee']
  ),
  'chinese-government-scholarship-high-level-postgraduate-program-csc-type-b-at-china-agricultural-university-2027': cscB(
    [],
    ['CAU online application']
  ),
  'chinese-government-scholarship-bilateral-program-csc-type-a-at-xi-an-jiaotong-university-2027-pre-admission-letter': {
    eligibility: [NOT_CHINESE, ...AGES, 'Applying for the Chinese Government Scholarship through the Chinese embassy or scholarship office in your country (Type A)', NO_OTHER],
    documents: ['XJTU pre-admission letter request (by 28 February 2027)', ...CSC_DOCS, 'Your embassy or scholarship office may ask for extra documents and set its own deadline'],
  },
  // From Fudan's 2027 notices (sent to us on 19 Nov 2026).
  'chinese-government-scholarship-university-program-csc-type-b-at-fudan-university-2027': {
    eligibility: [NOT_CHINESE, 'Master’s: under 35', 'PhD: under 40', NO_OTHER, ONE_SCHOOL],
    documents: [
      'CSC application form from campuschina.org (Type B, agency number 10246), printed and signed',
      'Fudan programme application at istudent.fudan.edu.cn, with “Self-support” as the fund source and “Chinese Government Scholarship” ticked',
      'Foreigner Physical Examination Form, in Chinese or English (valid for six months); applicants living in China can send their residence permit instead',
      'The documents your programme asks for (degree, transcripts, study plan, recommendation letters)',
    ],
  },
  'shanghai-government-scholarship-at-fudan-university-2027': {
    eligibility: [NOT_CHINESE, ...AGES, NO_OTHER],
    documents: [
      'Shanghai Government Scholarship application form (from Fudan’s International Students Office website), printed, filled in and signed',
      'Fudan programme application at istudent.fudan.edu.cn, with “Self-support” as the fund source and “Shanghai Government Scholarship” ticked',
      'Foreigner Physical Examination Form, in Chinese or English (valid for six months); applicants living in China can send their residence permit instead',
      'The documents your programme asks for (degree, transcripts, study plan, recommendation letters)',
    ],
  },
  // From Chang'an University's notice of 9 Nov 2026.
  'chinese-government-scholarship-university-program-csc-type-b-at-chang-an-university-2027': {
    eligibility: [
      NOT_CHINESE,
      'Bachelor’s: a high school diploma and under 25, plus a CSCA score by 31 May 2027',
      ...AGES,
      'An average grade of 80 or above (78 with strong research or published papers)',
      'English-taught: TOEFL iBT 80, IELTS 6.0 or Duolingo 100 (exempt with proof of English-medium study)',
      'Chinese-taught: HSK 4 (bachelor’s) or HSK 5 (master’s and PhD) with 180 or more',
      'Second batch (March 2027) only for Communication and Transportation, Computer Science, Mechanical, Civil and Vehicle Engineering',
    ],
    documents: [
      'CSC application form (uploaded in the university system)',
      'Highest diploma, original and notarised translation (or a certificate of enrolment)',
      'Transcripts, original and notarised translation',
      'Motivation letter of at least 500 words (in Chinese for Chinese-taught programmes, English for English-taught)',
      'Research proposal for master’s and PhD (introduction, research questions, literature review, methodology, expected results, references)',
      'Two recommendation letters from professors or associate professors',
      'Conditional Acceptance Letter (2027 version) from your future Chang’an supervisor, for master’s and PhD',
      'HSK or English test results',
      CSC_MEDICAL,
      CSC_POLICE,
      'Certificates of academic achievements and activities (optional but strongly advised)',
      'Online application at is.chd.edu.cn and the RMB 600 application fee',
    ],
  },
}
