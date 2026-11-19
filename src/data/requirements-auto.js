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

  // Checked 2026-11-19 against each call’s official page.
  'ucl-laws-global-centre-for-democratic-constitutionalism-phd-studentships-2027-28': {
    eligibility: [
      'You need at least an upper second-class UK bachelor’s degree and a master’s degree (or an overseas degree of the same standard) in Law or a relevant subject',
      'Applicants with equivalent research or professional experience may also be considered',
      'If English is not your first language, you need IELTS 7.5 overall with at least 7 in each part (or the PTE equivalent)',
      'You apply for the UCL Laws MPhil/PhD and say in your application that you want the Centre’s studentship',
      'You should have a research project idea and have contacted a suitable supervisor before applying',
    ],
    documents: [
      'Online UCL Laws MPhil/PhD application, marking your interest in the Centre’s studentship',
      'Academic transcript in English, in electronic form',
      'Proof of English language level',
      'Research proposal',
      'Two academic references, sent in by your referees',
      'Personal statement (not compulsory, but strongly recommended)',
    ],
  },
  'un-dpoa-mid-term-review-journalism-fellowship-2027-doha': {
    eligibility: [
      'You must be a national of one of the 44 Least Developed Countries',
      'You must be at least 18 years old',
      'You must be a working journalist whose work is regularly published or broadcast by a recognised outlet',
      'You need at least two years of professional journalism experience',
      'You must show an interest in sustainable development, especially the priorities of the Doha Programme of Action',
      'You must be able to travel to Doha for the whole review (25–27 March 2027)',
    ],
    documents: [
      'Online application through the fellowship portal (no fee)',
      'Short biography, maximum 300 words',
      'Two published work samples, at least one on development issues',
      'Reporting proposal, maximum 400 words',
    ],
  },
  'mozilla-human-scale-ai-incubator-call-2026': {
    eligibility: [
      'Your team must be able to receive Mozilla Foundation grant funds, through a US 501(c)(3) route if needed',
      'You do not have to be a nonprofit, but your project must have a charitable purpose',
      'AI must be a core part of your solution',
      'You must already have working technology that people can use, not just an idea or wireframe',
      'The project must be mainly technical and your team must be able to carry out the work',
      'Your submission must be in English',
    ],
    documents: [
      'Initial Project Proposal, submitted through the “Apply to the Incubator” link on the Mozilla Foundation site',
      'Full application, only if you are shortlisted and invited after the first stage',
    ],
  },
  'eni-award-2027-young-talents-from-africa-prize': {
    eligibility: [
      'You must be a citizen of an African country listed in the UN World Population Prospects 2024',
      'You must be under 40 during 2027 (born in or after 1986)',
      'You must hold a bachelor’s degree and a master’s degree or equivalent',
      'You must be enrolled in the first or second year of a PhD at an institution in a listed African country',
      'Your research must relate to energy and the environment, with benefit for Africa',
      'Your PhD supervisor or programme director must act as your guarantor and write a presentation letter',
    ],
    documents: [
      'Application form (research summary and how you would use the prize)',
      'CV form with your publications, and your master’s thesis',
      'Motivation letter',
      'PhD project description of about two pages',
      'Presentation letter from your PhD supervisor or programme director (guarantor)',
      'Budget of no more than €25,000',
      'Copy of your master’s certificate',
      'Letter from your institution confirming your PhD enrolment',
      'Short video of under 3 minutes (recommended, not required)',
      'Signed “Summary of the Candidature Proposal”, returned by email before the deadline',
    ],
  },
  'eni-award-2027-main-prizes-energy-transition-energy-frontiers-advanced-environmental-solutions': {
    eligibility: [
      'You must be the corresponding author of at least one publication',
      'Your results must be from the last ten years before the Official Announcement',
      'You need at least three reference letters (maximum five), written in English',
      'Two main authors can apply together as a double candidature',
      'You can apply up to three times',
      'You apply through a personal account on the Eni Award platform, which you request from eniaward@feem.it',
    ],
    documents: [
      'Application form',
      'CV form',
      'One to five peer-reviewed publications in PDF',
      'Three to five reference letters in English',
      'Up to three patents (optional)',
      'Graphical abstract (optional)',
      'Signed “Summary of the Candidature Proposal”, returned by the deadline',
    ],
  },
  'rotary-global-grant-scholarship-district-5890-houston': {
    eligibility: [
      'You must study at graduate level in a country other than your own, for at least one academic year',
      'You must start in the 2027–28 Rotary year and have already chosen your university',
      'Your field of study must fit one of Rotary’s Seven Areas of Focus',
      'You cannot be a Rotarian, a Rotary employee or a close relative of one',
      'You must attend the district interview in Houston on 5 December 2026',
      'If total costs are $30,000 or less, you must do a service project abroad and present it at the interview',
    ],
    documents: [
      'District 5890 scholarship application with all supplementary sheets, sent through a District 5890 club',
      'Detailed budget of your expected costs, including other funding sources',
      'Plan for your service project abroad (if total costs are $30,000 or less)',
      'Separate Rotary Foundation Global Grant application on rotary.org, filed with your sponsoring club once you are endorsed',
    ],
  },
  'aerc-industrial-policy-and-growth-in-africa-research-grants': {
    eligibility: [
      'The lead applicant and every co-applicant must hold a PhD in economics or a closely related field',
      'The PhD must have been awarded in 2016 or later',
      'You must already hold the data you need, or have confirmed access to it',
      'Your proposal must address one of the seven listed themes',
      'Teams are preferred to single authors; teams pairing African and international institutions are welcome',
      'Each study must aim for publication in a CABS-AJG 2 (or equivalent) journal and produce a policy brief',
    ],
    documents: [
      'Research proposal of no more than 2,000 words, in English or French',
      'Short section of descriptive statistics showing your data are suitable',
      'CVs of all applicants',
      'Budget table (up to USD 10,000; primary data collection and field travel are not funded)',
      'References',
    ],
  },
  'a-s-hornby-educational-trust-scholarship-med-tesol-exeter-2027-28': {
    eligibility: [
      'You must live and work in a country on the OECD DAC list of low, lower-middle or upper-middle income countries',
      'You need at least three years of full-time TESOL teaching or related experience after your first degree',
      'You need a UK upper second-class honours degree or above (or equivalent), or a relevant postgraduate degree',
      'You must not already hold a doctorate in TESOL, applied linguistics, English or a related area, or a UK master’s in those fields',
      'You must meet Exeter’s MEd TESOL entry requirements',
      'The award is for the MEd only, not the PGCert or PGDip',
    ],
    documents: [
      'Hornby Scholarship application form on the University of Exeter award page',
      'Two-part cover letter: one initiative you have led, and how being a Hornby Scholar would help your future impact',
      'MEd TESOL programme application, only if you are shortlisted',
    ],
  },
  'crg-international-phd-programme-2027': {
    eligibility: [
      'Open to all nationalities',
      'You need a bachelor’s and a master’s in biomedical sciences (at least 300 ECTS), or an equivalent degree that allows a PhD in Spain',
      'You can apply if you will finish your degree by September 2027',
      'You need an excellent academic record, research experience and good English',
      'You cannot apply if you were invited to interview in a previous CRG call, are doing your master’s at the CRG, or worked at the CRG for more than 3 months before the deadline',
      'You can choose a maximum of two CRG labs',
    ],
    documents: [
      'Online application (email applications are not accepted)',
      'Academic transcripts (translated into Catalan, Spanish or English if needed)',
      'Details of scholarships, prizes and awards, research experience and scientific interests',
      'Two reference letters, requested automatically from the referees you name',
    ],
  },
  'govai-uk-summer-fellowship-2027-research-track': {
    eligibility: [
      'Open to applicants from anywhere in the world who want to contribute to GovAI’s mission',
      'There are no strict degree requirements; strong applicants usually have graduate study, research or policy experience',
      'You must be able to be in London from 7 June to 27 August 2027',
      'You will go through a written application, a short abstract reasoning test, a paid work test in January and an interview with reference checks in February',
    ],
    documents: [
      'Written application on the GovAI website',
      'Short automated abstract reasoning test (about 20 minutes), if selected',
      'Paid remote work test in January, if selected',
      'Contact details for references, checked at the final stage',
    ],
  },
}
