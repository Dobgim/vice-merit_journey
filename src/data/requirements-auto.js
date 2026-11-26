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
  'tarbell-fellowship-2027-28-ai-journalism': {
    eligibility: [
      'You must be at least 18 years old by the start date, 7 June 2027',
      'You should have the right to work in the countries of the partner newsrooms (US, UK and Hong Kong); visa sponsorship is possible but uncommon',
      'You do not need a university degree',
      'Applicants with at least seven years of relevant AI or journalism experience and a record of excellence are considered for the Senior Fellowship',
      'The writing in your application must be your own; AI-generated writing samples are disqualified',
    ],
    documents: [
      'Online application form (takes 1–3 hours)',
      'CV',
      'Short written answers',
      'One to three writing samples, at least one in prose (not a script)',
      'Work test of 3–5 hours, if you pass the first stage (late December to early January)',
      'Interviews with Tarbell and possible placement newsrooms (January to March 2027)',
    ],
  },
  'kingston-university-international-merit-based-scholarship-january-2027-entry': {
    eligibility: [
      'You must already have an offer for an undergraduate or taught postgraduate course at Kingston University',
      'You must be an international student',
      'You cannot be currently enrolled on a Kingston degree or foundation course',
      'Awards are based on why you want to study at Kingston and your ability to be a champion for the university',
    ],
    documents: [
      'Online scholarship application form',
      'Your Kingston offer email, uploaded',
      'Personal statement of 300 words: why you want to study at Kingston, how you will use what you learn, and why you would be a good champion for the university',
    ],
  },
  'acu-edward-boyle-medical-elective-bursaries': {
    eligibility: [
      'You must be a UK citizen',
      'You must be studying medicine at a UK member university of the Association of Commonwealth Universities (ACU)',
      'Your elective must take place in a low or middle-income Commonwealth country',
      'Your elective must run between 1 March 2027 and 31 January 2028',
      'Six grants of up to £1,000 each are available',
    ],
    documents: [
      'Online application form, reached through a MyACU account (register first if you do not have one)',
      'Letter of support from your current university',
      'Letter from the host institution abroad',
    ],
  },
  'acu-writing-for-the-media-training': {
    eligibility: [
      'You must be a PhD candidate or hold a PhD',
      'You must be an early career academic at an ACU member university, within seven years of starting your research or teaching career (career breaks do not count)',
      'There are 20 places, with only one per ACU member university',
      'You must be able to join group sessions in early to mid 2027, then one-to-one sessions, over about six months',
    ],
    documents: [
      'Online application form, reached through a MyACU account (register first if you do not have one)',
      'Media pitch of 250–350 words, written during the course (not part of the application)',
    ],
  },
  'beihang-university-chinese-government-scholarship-high-level-postgraduate-program-2027': {
    eligibility: [
      'You must not be a Chinese citizen, and you must be in good health',
      'For a master’s you need a bachelor’s degree and must be under 35',
      'For a doctorate you need a master’s degree and must be under 40',
      'Chinese-taught programmes need HSK level 5 or above; English-taught programmes need English test scores',
      'Applicants from QS or ARWU top-500 universities are especially welcome',
      'Your passport must be valid beyond September 2027',
    ],
    documents: [
      'Scholarship application form',
      'Passport information page',
      'Highest diploma, notarised',
      'Transcripts',
      'Language certificates (HSK or English)',
      'Acceptance letter from a Beihang supervisor',
      'Study plan of more than 1,000 characters',
      'Two recommendation letters from professors or associate professors',
      'Foreigner physical examination form',
      'Non-criminal record certificate',
      'Integrity commitment letter',
      'Resume',
    ],
  },
  'chile-anid-national-doctoral-scholarship-2027-beca-doctorado-nacional': {
    eligibility: [
      'You need a bachelor’s degree (licenciatura) or professional title, or the equivalent if earned abroad',
      'You must be applying to, admitted to, or already studying in an accredited doctoral programme at a Chilean university by the closing date',
      'You must show academic excellence: an undergraduate average of 5.0 or higher (scale 1 to 7), or a place in the top 30% of your graduating class',
    ],
    documents: [
      'Proof of your bachelor’s degree or professional title',
      'Proof of academic excellence (grades average or class ranking), as listed in the official rules',
      'Proof of your doctoral application: a letter from the programme or the ANID-format form',
      'Certificate from the Chilean Treasury (Tesorería General de la República), valid up to 30 days, showing you have no overdue CAE debt, before signing the agreement if you are selected',
    ],
  },
  'robotx-phd-fellowship-2027-eth-zurich': {
    eligibility: [
      'You need a master’s degree finished by August 2027 in mechanical or electrical engineering, computer science, robotics, bioengineering, materials science or a close field',
      'You need an excellent record in both your bachelor’s and master’s degrees',
      'You need strong programming skills',
      'You must apply through the online portal; emails and postal applications are not considered',
    ],
    documents: [
      'One merged PDF (ideally under 10 MB), in this order:',
      'Cover letter: your research motivation and the groups you want to join',
      'CV, listing any publications or preprints',
      'Bachelor’s and master’s transcripts in English, with the local grading scale',
      'Contact details for three references',
      'One publication, thesis or project report',
    ],
  },
  'cardiff-university-red-dragon-scholarship-january-2027-entry-round-2': {
    eligibility: [
      'You must live in Mainland China or Türkiye and be an international fee-paying student',
      'You must hold an offer for a full-time, campus-based taught master’s course starting January 2027',
      'You must accept your offer and submit the scholarship form by the round deadline',
      'You must meet all conditions of your offer, including English language, by 11 December 2026',
      'You cannot receive other external scholarships, bursaries, funding or discounts',
    ],
    documents: [
      'Scholarship application form (a link is emailed to eligible offer holders; about 10 minutes)',
      'Your Cardiff application number',
      'Your current or most recent institution',
      'Your average CGPA and percentile mark',
    ],
  },
  'mpiib-international-summer-internship-isi-2027': {
    eligibility: [
      'You must be enrolled at a university for the whole internship (1 September to 30 November 2027)',
      'If you have no bachelor’s degree yet, you need at least 4 semesters (2 years) of study',
      'The internship must be voluntary; you cannot need it for course credit',
      'You need a relevant background, a strong academic record and good English',
      'The programme is aimed at students whose access to education is limited by personal, financial, regional or social issues; students from low- and middle-income countries are strongly encouraged',
    ],
    documents: [
      'CV, maximum two pages',
      'Motivation letter on the institute’s template: study background, past projects, motivation for up to two ISI projects, and factors limiting your access to higher education',
      'Reference letter from a professor or postdoc',
      'Transcripts of all undergraduate and graduate records (unofficial copies are fine; current semester not needed)',
      'Diploma, if you already have a bachelor’s degree',
      'Application through the online portal',
    ],
  },
  'dean-of-southampton-business-school-mba-global-talent-award-round-1': {
    eligibility: [
      'You must be a permanent resident of an eligible country and a self-funded student',
      'You need an offer (conditional or unconditional) for the full-time, on-campus MBA, and must exceed the course entry requirements',
      'You must pass an interview that assesses business excellence',
      'It is not open to PGCert, PGDip, distance learning, partner-institution or CPD students',
      'Up to 11 awards of £17,000 to £25,000 are given, in three rounds',
    ],
    documents: [
      'Application to study the MBA at Southampton',
      'Online scholarship application form',
      'Supporting statement of up to 500 words: why you chose the course, how it links to your experience and goals, and how your goals help build a more sustainable and inclusive world',
    ],
  },
  'university-of-bath-ursa-phd-studentships-in-engineering-design-october-2027-entry': {
    eligibility: [
      'You need at least an upper second-class (2:1) UK honours degree, or the international equivalent, in a subject suited to your project; some projects need a first or a master’s',
      'Open to home and international students',
      'International applicants must meet visa rules, including ATAS clearance where required',
      'You must be based at the University of Bath in person from the start (except during placements)',
      'Funding lasts up to three and a half years',
    ],
    documents: [
      'Online doctoral application, choosing “University of Bath URSA” under “Funding your studies”',
      'Doctoral Student Statement Form, submitted with your online application',
      'Your own research proposal, only if you are not applying to an advertised project',
    ],
  },
  'strathclyde-business-school-international-masters-scholarships-january-2027': {
    eligibility: [
      'You must be self-funded (no other scholarship or employer sponsorship) and have international fee status',
      'You must hold an offer for a full-time MSc at Strathclyde Business School starting January 2027',
      'Eligible subjects: accounting and finance, business, data analytics, management, management science and marketing',
      'Online and blended learning programmes are not eligible',
      'You can receive only one University of Strathclyde scholarship per academic year',
    ],
    documents: [
      'No separate scholarship form: the award (£7,000 to £9,000) is made automatically once you hold an offer',
      'Accept your offer and pay the deposit by 30 November 2026',
    ],
  },
  'eth-zurich-excellence-scholarship-opportunity-programme-esop-2027': {
    eligibility: [
      'You must be in the top 10% of your bachelor’s degree programme (grade A), shown by self-assessment',
      'You must apply for an ETH Master’s programme starting in autumn semester 2027',
      'You cannot already be an ETH Master’s student or hold a master’s degree',
      'You must apply in the first application window (1–30 November 2026)',
    ],
    documents: [
      'Online application through ETH eApply',
      'The standard ETH Master’s admission documents',
      'Pre-proposal for your master’s thesis, written by you',
      'Two recommendation letters from professors (one professor and one non-professor letter is accepted if you work in industry)',
    ],
  },
  'daad-scholarship-for-trophee-tropical-hydrogeology-and-environmental-engineering-2027-28': {
    eligibility: [
      'You need a B.Sc. certificate with above-average results, not older than 6 years',
      'You must not have completed a master’s degree yet',
      'You need at least 2 years of professional experience, mainly in the water field and preferably outside a university',
      'You need proof of English: IELTS or TOEFL (institutional TOEFL is not accepted), or proof of English as the language of instruction',
    ],
    documents: [
      'DAAD application form, signed by hand and currently dated',
      'DAAD checklist, signed by hand and currently dated',
      'All documents listed on the DAAD checklist',
      'Proof of English (IELTS, TOEFL or medium of instruction)',
      'Everything sent by email as one PDF file, in the order of the DAAD checklist',
    ],
  },
  'berea-college-international-student-admission-fall-2027-no-tuition-college': {
    eligibility: [
      'You must meet the university entrance requirements of your home country and have strong secondary school results',
      'You cannot have earned a bachelor’s degree before',
      'You must send one English test score: TOEFL (68 internet-based), IELTS (6 overall, 5 in each part), Duolingo (95), ACT (19) or SAT (980); there are no exceptions',
      'Test scores should not be more than two years old',
      'There is no minimum GPA, but admission is competitive',
      'New international students start only in the fall term',
    ],
    documents: [
      'Online application',
      'Official copy of your secondary school records',
      'Personal essay',
      'One teacher recommendation',
      'Financial resource recommendation',
      'Official English test scores (TOEFL, IELTS, Duolingo, ACT or SAT)',
      'International Financial Questionnaire',
      'Passport photo page and medical history form (after admission, before the I-20 is issued)',
    ],
  },
  'german-missions-micro-projects-scheme-2027-south-africa-lesotho-eswatini': {
    eligibility: [
      'You must be a registered civic organisation (community-based, non-governmental, non-profit or faith-based) in South Africa, Lesotho or Eswatini',
      'The project must be one you cannot fund yourself, and no other government or partner funding should be available',
      'You must contribute money or labour yourself (self-help)',
      'Up to EUR 25,000 can be approved per project',
      'The project must be finished within the calendar year of the grant agreement',
      'Vehicles, private business start-ups, admin and project management costs, travel, stipends and running costs are not funded',
      'Priority areas: just energy transition, local economic development, women’s rights and anti-discrimination; Mpumalanga and Limpopo get extra consideration',
    ],
    documents: [
      'Application form signed by two project leads',
      'Three independent quotations for each item',
      'Financial statements',
      'Tax clearance',
      'Proof of non-profit registration',
      'Valid Form 30 for each person in contact with children (if the project involves children)',
      'Everything emailed to microprojects@pret.diplo.de with the subject “MPF 2027: name of your organisation” (applicants in the Northern, Eastern and Western Cape email ez-s@kaps.diplo.de)',
    ],
  },
  'samaritan-s-purse-summer-2027-global-internship': {
    eligibility: [
      'You need a personal, active Christian faith and a consistent witness for Christ',
      'You need a bachelor’s degree from a four-year college or university, or a trade-related technical degree; you can apply if you are still finishing one',
      'You need fluent English and strong organisation, communication and networking skills',
      'You must agree with the Samaritan’s Purse Statement of Faith',
      'The internship runs 24 May to 6 August 2027, full-time and in person',
    ],
    documents: [
      'Online application on the Samaritan’s Purse careers site',
      'Resume',
      'Cover letter',
    ],
  },
  'daad-rise-weltweit-2027-summer-research-internships-abroad': {
    eligibility: [
      'You must be a student enrolled at a German university or university of applied sciences, from the 2nd semester on (the programme is for bachelor’s students and is not open to graduates)',
      'You must stay enrolled until the internship ends',
      'Fields: biology, chemistry, physics, earth sciences, engineering, medicine, pharmacy, applied mathematics, applied computer science or related subjects',
      'Non-German students may qualify under certain conditions',
      'You can apply to up to three projects',
      'You need English at about B2 level',
    ],
    documents: [
      'CV',
      'Motivation letter for each project, maximum 2 pages',
      'Transcript of records',
      'List of relevant courses',
      'Language certificate (DAAD, Cambridge, IELTS, TELC, TOEFL or TOEIC; a school certificate does not count)',
      'Reference from a lecturer in your field (can arrive until 15 December)',
      'Everything in English, as PDF files, uploaded in the online portal',
    ],
  },
  'max-planck-institute-for-the-study-of-societies-internship-2027': {
    eligibility: [
      'You must study economics or social sciences',
      'You must be in at least the 5th semester of a bachelor’s or in any semester of a master’s',
      'You must be enrolled at a university during the internship',
      'You need a strong interest in social science research and very good grades',
      'You cannot join the projects of directors, emeriti or visiting researchers',
      'Voluntary internships last up to 12 weeks, with an allowance of EUR 450 per month',
    ],
    documents: [
      'Motivation letter, stating how long you want to stay and which current MPIfG projects interest you',
      'CV',
      'Copies of transcripts and certificates',
      'Current proof of enrolment',
      'Excerpt of up to 10 pages from a relevant seminar paper',
      'Everything uploaded online as one PDF (no post or email)',
    ],
  },

  // Checked 2026-11-20 against each call’s official page.
  'sabanc-university-engineering-and-natural-sciences-graduate-programmes-spring-2027-term': {
    eligibility: [
      'You apply for a thesis master’s or a PhD programme at Sabancı University’s Faculty of Engineering and Natural Sciences',
      'You must finish your previous degree by 29 January 2027',
      'Thesis master’s applicants need an entrance exam score: ALES, GRE or GAT',
      'PhD applicants need entrance exam scores (for example ALES numerical 80 or GRE quantitative 160 if you hold a bachelor’s degree)',
      'You need proof of English: for example TOEFL iBT 80 or PTE 69 for a thesis master’s (Sabancı graduates within two years may be exempt)',
    ],
    documents: [
      'Online application (applications sent by email are not evaluated)',
      'CV',
      'Passport-sized photo, uploaded online',
      'Statement of purpose (reasons for applying, career goals and expectations) for thesis programmes',
      'Two faculty recommenders, whose emails you enter online (letters you upload yourself are not valid)',
      'Official transcripts (required for PhD)',
      'Entrance exam score (ALES, GRE or GAT)',
      'English language certificate',
    ],
  },
  'summer-epfl-research-fellowships-2027': {
    eligibility: [
      'You are enrolled in a BSc, BTech, MSc, MTech or equivalent programme',
      'Your field is computer science, computer engineering, telecommunications or electrical engineering',
      'You are at least in the 2nd year of a bachelor’s',
      'PhD students are not eligible',
      'You must still be enrolled in a bachelor’s or master’s programme at the time of the fellowship',
    ],
    documents: [
      'Online registration where you choose up to three research domains',
      'CV (PDF)',
      'Transcripts of all your university studies (PDF). A printout from your university website is accepted if official ones are not ready',
      'Letter of motivation, ideally one page and no more than two (PDF)',
      'For transcripts not in English: the originals plus an English translation',
    ],
  },
  'east-west-center-graduate-degree-fellowship-2027': {
    eligibility: [
      'You are a citizen or permanent resident of the United States, or a citizen of a country in Asia or the Pacific (including Russia)',
      'You hold a 4-year bachelor’s degree or equivalent from a recognised institution',
      'You normally need a GPA of at least 3.0 out of 4.0 (or equivalent) over your last four semesters and any later study',
      'You must be admitted to a University of Hawai‘i graduate degree programme',
      'If English is not your first language, you need a TOEFL of 79, Duolingo of 95 or IELTS of 6.5',
    ],
    documents: [
      'East-West Center fellowship application form with cover letter, résumé and essays (long-range goals, biography, civic engagement, readiness for an intercultural environment)',
      'Copy of your University of Hawai‘i application acknowledgement, if you apply to UH at the same time',
      'Passport biodata page (international applicants)',
      'Three reference letters: two on academic ability and goals, one on community service or civic engagement',
      'Official transcripts from every institution you attended, in sealed envelopes from the issuing school',
      'English test scores, if required',
    ],
  },
  'ikea-foundation-switzerland-scholarships': {
    eligibility: [
      'You must not have finished your 28th year when you apply',
      'You already hold a bachelor’s degree or equivalent, and have some practical experience',
      'You live in Switzerland or have a clear link to it (for example your basic training was in Switzerland)',
      'Foreign nationals can apply only after finishing a full bachelor’s degree in Switzerland (at least three years there)',
      'For a semester abroad in a master’s, you must be enrolled at a Swiss university',
      'You apply at least four months before the programme starts, and the programme must be abroad in design, architecture or crafts',
    ],
    documents: [
      'Covering letter or letter of motivation',
      'Completed application form (online)',
      'One PDF of at most 20 pages: study description, portfolio, budget, CV, diplomas or certificates, and work references',
      'Budget with tuition, living and travel costs, the amount you ask for, and other foundations you also apply to',
    ],
  },
  'ron-brown-scholar-program': {
    eligibility: [
      'You are Black or African American',
      'You are a U.S. citizen or permanent resident',
      'You are a current high school senior (current college students cannot apply)',
      'The programme looks for academic excellence, leadership potential and community service, and considers financial need',
    ],
    documents: [
      'Online application',
      'Three essays of about 500 words each (two answer set questions, the third is on any topic)',
      'Two recommendation letters: at least one from a high school counsellor, teacher or principal, the other not from a family member',
      'High school transcript',
      'Parents’ tax returns and income details (verification is needed for semifinalists)',
      'SAT or ACT scores are not required',
    ],
  },
  'leiden-university-excellence-scholarship-lexs-2027': {
    eligibility: [
      'You hold a passport from outside the EEA or EFTA (UK passports count) and cannot get Dutch student finance',
      'You apply to a Leiden master’s programme (not a non-advanced LLM or MSc at Leiden Law School, and not one starting in February)',
      'You are among the top 10% of graduates of your previous programme (proof of ranking is not required)',
      'Your earlier study is relevant to the master’s you apply for',
      'You do not already hold a Leiden master’s degree',
    ],
    documents: [
      'Motivation letter in PDF, maximum 500 words, explaining why you should get the award',
      'Uploaded in the scholarship section of your online Leiden application (you cannot change it afterwards)',
      'A separate letter for each programme you apply to',
    ],
  },
  'tu-delft-justus-louise-van-effen-excellence-scholarship-2027': {
    eligibility: [
      'You are an international student (conditionally) admitted to a regular two-year TU Delft MSc programme',
      'You are among the top 10% of graduates of your previous programme (proof of ranking is not required)',
      'You are no older than 35 on 1 September of your first year at TU Delft',
      'Current TU Delft students and applicants with a Dutch bachelor’s degree are excluded',
      'To keep the scholarship in year two you must pass at least 48 of 60 ECTS in year one',
    ],
    documents: [
      'Complete MSc application at TU Delft',
      'Scholarship Application Form (maximum 2 A4 pages, with short essay answers)',
      'Reference letter(s) (the pages disagree on one or two, so check the current page)',
      'English test certificate, if required',
      'Everything submitted together before the scholarship deadline of 1 December 2026',
    ],
  },
  'ernst-mach-grant-worldwide-2027-28': {
    eligibility: [
      'You are a PhD student, a recent graduate (finished after 30 September 2025 at a non-Austrian university) or a postdoc at a university outside Austria',
      'You are no older than 35 when your research stay starts',
      'You are not a current student at an Austrian university',
      'You do not live permanently in Austria and did not mainly study in Austria',
      'An Austrian professor agrees to supervise you, and the project can be done in English',
    ],
    documents: [
      'Online application with every section filled in (the research proposal is written there, not uploaded separately)',
      'Written confirmation of supervision from an Austrian professor, on the OeAD template',
      'Recommendation letters on letterhead, dated, signed and stamped, no more than six months old',
      'Valid biometric passport (an ID card is accepted only for EU citizens)',
      'Documents not in English: a copy of the original plus a translation',
    ],
  },
  'hku-presidential-phd-scholar-programme-2027-28': {
    eligibility: [
      'You apply for a full-time PhD at the University of Hong Kong (every full-time PhD applicant is considered, no separate application)',
      'You hold at least an honours bachelor’s degree, plus any extra requirement of your programme',
      'Main-round applications run from 1 September to 1 December 2026',
      'HKU encourages you to also apply to the Hong Kong PhD Fellowship Scheme, through a separate online form on the RGC system by 1 December 2026',
    ],
    documents: [
      'Online PhD application to HKU',
      'Identity document: Hong Kong or Mainland ID, or passport photo page',
      'Transcripts and certificates, uploaded online (certified copies may be asked for later)',
      'Your CGPA or average mark, entered in the form',
      'Research proposal or statement of research interest',
      'Abstract of your master’s thesis and a sample research paper of up to 15 pages in English',
      'Proof of language ability is optional, or a written statement of your language ability',
    ],
  },
  'wageningen-university-scholarship-programme-and-africa-scholarship-programme-2027-28': {
    eligibility: [
      'Africa Scholarship Programme: you are a citizen of an African country',
      'You submit a complete application for an MSc programme at Wageningen by 1 December 2026',
      'You have a high GPA of 80% or more, or a First Class Honours bachelor’s degree or equivalent',
      'You must be unconditionally admitted and meet the English requirement before 1 December 2026',
      'Preference goes to students without a master’s degree. Current WUR students, pre-master’s, online MSc and double-degree students cannot apply',
    ],
    documents: [
      'Complete online MSc application with all supporting files',
      'English test result, uploaded before 1 December 2026',
      'Bachelor’s diploma, uploaded before 1 December 2026',
      'After admission: your qualifying diploma and final transcript',
      'Certified translation of your diploma if it is not in English, Dutch or German',
    ],
  },
  'rockefeller-university-phd-programme-2027': {
    eligibility: [
      'You hold a bachelor’s or master’s degree in arts or sciences, an MD, or an equivalent foreign qualification',
      'You show strong achievement in the biological, chemical, mathematical or physical sciences',
      'GRE and TOEFL scores are not requested',
    ],
    documents: [
      'Online application',
      'Statement of purpose in three parts: most meaningful research experience (750 words), scientific interests and matching faculty (250 words), how your background would enrich the community (250 words)',
      'Official transcripts from every institution attended (non-encrypted PDFs)',
      'Recommendations from three or four research sponsors',
      'CV or résumé',
      'Application fee of $50',
    ],
  },
  'neurasmus-erasmus-mundus-joint-master-in-neuroscience-2027-29-scholarship-round': {
    eligibility: [
      'You hold a bachelor’s degree (or equivalent) in natural sciences or a related field',
      'You understand the basics of biology, chemistry and mathematics',
      'English proof: IELTS 6.5 with no part below 6, or TOEFL iBT 93 (exempt if you studied in Canada, the USA, the UK, Ireland, New Zealand, South Africa or Australia)',
      'Applications are ranked on grades, motivation, references and English; scholarship candidates are interviewed in late January or early February',
    ],
    documents: [
      'Online application on the Neurasmus platform',
      'CV',
      'Motivation letter',
      'Academic transcripts',
      'Two recommendation letters from professors or professionals who know your work',
      'Proof of English (unless exempt)',
      'Original or certified copies of documents at final registration',
    ],
  },
  'king-s-business-school-doctoral-research-studentships-2027-28-round-1': {
    eligibility: [
      'You apply for the full-time PhD at King’s Business School (home, EU and international students can apply)',
      'You hold, or are finishing, a master’s with Merit or higher, and a 2:1 bachelor’s in a relevant subject (or overseas equivalent)',
      'A supervisor must be willing to supervise you, and you should say in the interview that you want the studentship',
      'You must live in the UK during your studies (short fieldwork trips abroad are fine)',
      'Round 1 closes 1 December 2026 at 17:00; round 2 closes 1 June 2027',
    ],
    documents: [
      'Application through King’s Apply',
      'Research proposal of 1,500 words',
      'Name of your preferred supervisor',
      'Personal statement of 500 words',
      'One recent academic reference',
      'Sample of written work, usually your master’s dissertation',
      'Degree transcripts with module marks',
      'English test certificate, unless exempt',
      'Details of how you will fund your studies',
    ],
  },
  'university-of-pennsylvania-biomedical-graduate-studies-phd-2027-incl-epidemiology': {
    eligibility: [
      'You hold, or will hold by the time you start, a bachelor’s degree',
      'Applicants with an MD, PhD or other professional degree can apply but get no BGS funding',
      'You choose one graduate group within Biomedical Graduate Studies',
      'GRE scores are not required or accepted',
      'If English is not your first language, you need TOEFL, IELTS or Duolingo (no minimum score), unless your degree is from a US or approved English-taught institution',
    ],
    documents: [
      'Online application, submitted by 1 December at 11:59 PM ET',
      'Personal statement of about 500 words',
      'Research statement of about 1,000 words',
      'Community statement of 150 to 200 words',
      'Résumé or CV (without GPA or Latin honours)',
      'Three letters of recommendation, at least one from a research mentor',
      'Transcripts from all institutions attended',
      'English test score, if required',
    ],
  },
  'university-of-michigan-seas-phd-in-environment-and-sustainability-fall-2027': {
    eligibility: [
      'You apply to the PhD at the School for Environment and Sustainability for Fall 2027 (deadline 1 December 2026)',
      'There is no minimum GPA and no required coursework, but your background must fit your topic and methods',
      'A master’s degree is not required, though most admitted students have one',
      'GRE scores are not required or accepted',
      'Non-native English speakers need TOEFL or IELTS unless they qualify for a Rackham exemption',
      'SEAS strongly recommends contacting faculty before you apply',
    ],
    documents: [
      'Online application through Rackham Graduate School',
      'Statement of purpose of about 1,000 words',
      'Personal statement (optional)',
      'CV',
      'Transcripts for each degree finished or in progress',
      'Three letters of recommendation',
      'Writing sample of about 30 pages that you wrote yourself',
      'English test scores, if required',
      'Application fee (reduced to $50 for international applicants; none for domestic)',
    ],
  },
  'university-of-notre-dame-phd-in-sustainable-development-fall-2027': {
    eligibility: [
      'You apply for the PhD in Sustainable Development for a Fall 2027 start (deadline 1 December 2026)',
      'You show a strong academic base in relevant fields',
      'You show commitment to global challenges in sustainable development',
      'Non-native English speakers need TOEFL, IELTS or Duolingo scores',
      'The programme is fully funded for five years',
    ],
    documents: [
      'Online application through the Notre Dame Graduate School portal',
      'Statement of purpose',
      'Academic transcripts',
      'GRE scores (listed on the page; check with the programme whether they are waived)',
      'TOEFL, IELTS or Duolingo scores, if English is not your first language',
      'Writing sample',
      'Three letters of recommendation',
    ],
  },
  'imperial-college-london-computing-phd-studentships-april-october-2027-entry': {
    eligibility: [
      'You normally hold a First Class or Distinction master’s degree (or equivalent) in computer science, mathematics or a related field',
      'A bachelor’s alone is not normally enough, but you can apply to do an MSc in the Department first',
      'Your bachelor’s is also assessed, normally at 2:1 UK equivalent or above',
      'You meet Imperial’s Standard English language requirement',
      'You choose the “Computing Research” degree when you apply',
    ],
    documents: [
      'Online application (no application fee)',
      'Full transcripts for your bachelor’s and master’s degrees with subject results',
      'CV, with web links to any publications',
      'At least two reference letters about your suitability for research',
      'Personal statement of 1 to 2 pages',
      'Research statement of 3 to 4 pages',
      'Proposed research topic and supervisor (listing 3 to 4 supervisors is recommended)',
      'Statements must be written by you without generative AI tools',
    ],
  },
  'ikea-foundation-switzerland-project-and-work-grants': {
    eligibility: [
      'You are no older than 35 when you apply',
      'You apply within seven years of finishing your bachelor’s degree',
      'You live in Switzerland or can show a close link to the country',
      'The project must be in architecture, design, or arts and crafts',
      'Work already started or finished is not considered; apply at least four months before it starts',
      'Not funded: bachelor projects, doctoral research, fashion collections and interior fit-outs',
    ],
    documents: [
      'Covering letter or letter of motivation',
      'Completed application form with project description, a reference person and your Swiss link',
      'One PDF of at most 20 pages: project description, portfolio, budget, CV, reports or diplomas, and work references',
      'Full project budget, showing the amount you ask for and any other foundations you applied to',
    ],
  },
  'iea-research-policy-grant-for-early-career-researchers-2027': {
    eligibility: [
      'You are a current PhD candidate (with a supervisor’s support), or you earned your first doctorate in the last five years',
      'Doctorate holders need at least one published paper that uses data from IEA’s large-scale studies (TIMSS, PIRLS, ICCS, ICILS)',
      'You can do quantitative secondary analysis of IEA data',
      'Your project uses data from several EU countries and is relevant to EU policy',
      'You can show English proficiency. All nationalities may apply',
    ],
    documents: [
      'Online application on IEA’s Grants Platform (stage one closes 1 December 2026, 23:59 CET)',
      'Structured abstract of up to 500 words',
      'CV with your publication record',
      'Proof of your degree or doctoral enrolment',
      'Supervisor letter, if you are a PhD candidate',
      'Evidence of English proficiency',
    ],
  },
  'climate-intervention-environmental-impact-fund-cieif-2026-grants': {
    eligibility: [
      'You study the environmental impact of a proposed climate intervention field test (no basic research or implementation funding)',
      'The technology is ready for field testing and could scale to a global level',
      'Not covered: stratospheric solar radiation management, carbon capture and storage, direct air capture, and adaptation, clean energy or emissions reduction projects',
      'Nonprofits, including universities, get top priority. Businesses can apply. Individuals and student projects are not funded',
      'You commit to publishing the results',
    ],
    documents: [
      'Proposal of at most 20 single-spaced pages in English (no standard form)',
      'Contact details and short biographies of all personnel, and a description of the applying organisation with its website',
      'Full description of the field test, earlier research, siting and expected technical, environmental, economic, social and health challenges',
      'The government permits or approvals needed',
      'List of your earlier publications on feasibility and scale-up',
      'At least two independent consulting firms able to support the impact analysis',
      'Plan and rough budget for the $75,000 grant',
      'All other funding sources for the work',
      'Description of any insurance that may cover the field test',
      'Confirmation that you will publish the results',
    ],
  },
  'turtle-conservation-fund-grants-december-2026-round': {
    eligibility: [
      'Your project is about tortoises or freshwater turtles (not marine turtles)',
      'Priority goes to Critically Endangered and Endangered species; Data Deficient and Not Evaluated species can also apply',
      'Organisations and individuals can apply',
      'Grants are up to US $5,000; requests of $3,000 or less are encouraged for pilot surveys and new conservationists from developing countries',
      'Overhead costs are not funded, and you must get all permits before work starts',
    ],
    documents: [
      'Proposal on the TCF Proposal Template, about 15 pages without literature cited, 12-point type, in English',
      'CV of each applicant, at most 5 pages each',
      'Total file size under 5 MB',
      'Declaration that you will obtain all required permits',
    ],
  },
  'japan-foundation-japanese-studies-fellowship-2027-28': {
    eligibility: [
      'Your research is in the humanities or social sciences and relates to Japan (natural sciences, medicine and engineering are excluded)',
      'You are a doctoral candidate who finished or will finish coursework (4 to 12 month stay), or a researcher with a PhD or equivalent experience',
      'You are a citizen or permanent resident of a country with diplomatic relations with Japan, and live there',
      'You have a host in Japan arranged by the deadline, and arrive between 20 June 2027 and 20 March 2028',
      'Master’s and undergraduate students are excluded; Southeast Asia–based applicants use the JF-JSA-ASEAN programme',
      'Priority goes to applicants under 35 and those who can research in Japanese',
      'Past Japan Foundation fellows must wait three years (one year after a short stay)',
    ],
    documents: [
      'Application form, applicant information form and project information form',
      'Project abstract of 200 words or less',
      'Two reference forms from two people who are not your advisor in Japan',
      'Letter of affiliation form completed by your advisor or research associate in Japan',
      'Japanese-language ability assessment form (doctoral candidates only)',
      'CV and list of research achievements (optional)',
      'Submitted through the online portal by 1 December 2026 (a separate site for US applicants)',
    ],
  },
  'brookings-echidna-global-scholars-program-2027': {
    eligibility: [
      'You are a mid-career leader committed to better learning and life outcomes for girls, young women and gender non-conforming people in the Global South',
      'You have strong ties to a Global South country and intend to return there',
      'You hold a master’s degree or higher, in education, development, public policy, economics or a related social science or humanities field',
      'You have at least 10 years of experience in research, academia, nonprofits, community groups or government',
      'You are proficient in English',
    ],
    documents: [
      'Cover letter',
      'CV',
      'Questionnaire',
      'Research project proposal of 3 to 5 pages aimed at improving outcomes for girls, young women and gender non-conforming people',
    ],
  },
  'knight-wallace-fellowship-2027-28-international-applicants': {
    eligibility: [
      'You have at least five years of experience in journalism',
      'You work now for a news organisation or as an independent journalist',
      'International applicants use the international portal (applications in the U.S. portal are not considered)',
      'You write all your own submissions, without AI help',
      'Finalists are interviewed in January and February',
    ],
    documents: [
      'Résumé',
      'Project summary of 60 words or less',
      'Personal statement of up to 1,500 words',
      'Three work samples from the past three years',
      'Phase two, only for semifinalists: references and more work samples if asked',
    ],
  },
  // Checked 2026-11-21 against each call’s official page.
  "university-of-westminster-international-postgraduate-excellence-award-january-2027": {
    eligibility: [
      "You pay overseas (international) fees",
      "You hold an offer for a full-time master’s starting in January 2027",
      "You have at least a UK 2:1 degree or the equivalent",
      "The award is based mainly on academic excellence",
      "Professional courses, doctorates, online courses and PG Certificates or Diplomas are not covered",
      "You cannot also get another fee discount, such as the International Early Acceptance Award",
    ],
    documents: [
      "Online scholarship application (use “Apply now” on the scholarship page)",
      "Your offer of a place on the master’s course",
    ],
  },
  "dia-al-azzawi-prize-for-public-art-2026-cycle": {
    eligibility: [
      "The project is a public artwork, such as a mural, sculpture, monument, installation, public space or graffiti",
      "It was completed between 1 January 2019 and 31 December 2025",
      "It is based in one of the Arab countries the prize lists",
      "It can be one artwork or a group of works shown as one public art project",
      "Gallery or indoor shows do not count unless they are part of a wider public space project",
      "Individuals and teams from art, architecture, design, urbanism and landscape can apply",
    ],
    documents: [
      "Completed submission form (download it from the prize page)",
    ],
  },
  "start-up-energy-transition-set-award-2027": {
    eligibility: [
      "Your company was founded in August 2016 or later",
      "The company is registered, or in the process of registering",
      "Your solution is past the idea stage and shows at least a proof of concept",
      "You have a client or a partner, or a working prototype (hardware is usually at TRL 4 or above)",
      "You apply to only one award category",
      "Everything is in English",
    ],
    documents: [
      "The full online application form (partly filled forms are rejected)",
      "Evidence of a client or partner, or of a working prototype",
    ],
  },
  "university-of-calgary-international-entrance-scholarships-fall-2027-high-school-prestige-awards": {
    eligibility: [
      "You are an international student starting first year of an undergraduate degree in fall 2027",
      "You meet the university’s English language requirement",
      "The Prestige Awards list a minimum 90% admission average on transcripts received by the deadline",
      "The $20,000 award can be renewed if you keep a GPA of 2.60 or more over at least 24 units a year",
    ],
    documents: [
      "Application for admission to the University of Calgary (opens 1 October)",
      "Prestige Award application in your Student Centre, including essay-style questions",
      "High school transcripts received by the deadline",
    ],
  },
  "harvard-environmental-fellows-program-2027": {
    eligibility: [
      "You hold a PhD or similar terminal degree received between May 2023 and August 2027",
      "You must have filed your dissertation before starting in September 2027",
      "Your degree can be from any university in the world, and international applicants are welcome",
      "You need a Harvard faculty member as your host",
      "Your project must be clearly different from your PhD work and your host’s current research",
      "You must live in the Cambridge area during the fellowship",
    ],
    documents: [
      "Research proposal of about five pages",
      "Letter from your Harvard faculty host",
      "Three recommendation letters (host and recommendation letters are due 11 December 2026)",
      "Online application, due 1 December 2026",
    ],
  },
  "nieman-fellowship-2027-28-international-applicants": {
    eligibility: [
      "You are not a U.S. citizen (international applicants have a 1 December deadline)",
      "You have at least five years of full-time experience as a working journalist, freelancers included",
      "Student work does not count, and public relations or non-media jobs are not eligible",
      "You read, write and speak English fluently",
      "There is no age limit and no degree is needed",
    ],
    documents: [
      "Online application",
      "Personal statement essay",
      "Study proposal essay",
      "Professional profile and study proposal summary",
      "Work samples",
      "Three confidential recommendation letters",
    ],
  },
  "simons-institute-research-fellowships-fall-2027-diffusion-generative-modeling": {
    eligibility: [
      "You are an early-career researcher whose PhD was awarded no more than five years before the 2027–28 academic year",
      "Current postdocs and junior faculty can apply",
      "PhD students can apply only if they will finish their PhD before the programme starts",
      "The fellowship is for the Fall 2027 programme on diffusion and generative modelling",
    ],
    documents: [
      "One PDF with a cover letter, a CV with a full publication list, and a research statement",
      "Names of three recommenders (the system emails them to send letters)",
    ],
  },
  "belfer-center-energy-climate-and-technology-policy-fellowship-2027-28": {
    eligibility: [
      "You are a predoctoral candidate, a recent PhD, a visiting scholar or a junior faculty researcher",
      "Your work relates to energy, climate and technology policy",
      "Postdoctoral fellows commit to a full-time appointment",
      "The appointment lasts one academic year",
    ],
    documents: [
      "CV or résumé",
      "Research statement of 3 to 5 pages (question, link to policy, planned outputs, project plan)",
      "Writing sample under 50 pages, written only by you in English",
      "Contact details for three recommenders, with letters due 15 December",
      "State whether you want full or partial funding and list other funding sources",
    ],
  },
  "belfer-center-geopolitics-of-energy-fellowship-2027-28": {
    eligibility: [
      "You are a predoctoral candidate or a recent PhD",
      "Your work relates to the geopolitics of energy",
      "The fellowship runs for the 2027–28 academic year",
    ],
    documents: [
      "CV or résumé",
      "Research statement of 3 to 5 pages",
      "Writing sample under 50 pages, written only by you in English",
      "Contact details for three recommenders",
      "Transcript (only for predoctoral applicants)",
    ],
  },
  "shorenstein-postdoctoral-fellowship-on-contemporary-asia-2027-28-stanford-aparc": {
    eligibility: [
      "You have a recent PhD awarded no more than three years before the fellowship starts",
      "Your dissertation must be approved for conferral by 30 June 2027, with degree proof by 31 August 2027",
      "Your research is on political, economic or social change in Asia-Pacific, or international relations in the region",
      "The fellowship is one academic year starting in fall 2027, and two places are offered",
    ],
    documents: [
      "Completed online application form",
      "CV (PDF)",
      "Research statement of up to five double-spaced pages, with the planned research and a publishable product (PDF)",
      "Letters of recommendation, to arrive by the deadline",
    ],
  },
  "neukom-postdoctoral-fellowship-2027-dartmouth": {
    eligibility: [
      "You have a PhD (any subject), a DMA or an MFA, expected by 1 September 2027",
      "Your research strongly involves computation",
      "You show interest in working across subjects",
      "Current Dartmouth postdocs and fellows can apply",
      "The fellowship lasts two years, with a possible third",
    ],
    documents: [
      "CV and publications list",
      "Research statement of up to two pages",
      "Description of the Dartmouth departments and faculty you want to work with",
      "Three referee letters, sent through the links your referees receive",
      "Optional: a writing sample, a teaching statement and a cover letter",
    ],
  },
  "asia-health-policy-postdoctoral-fellowship-2027-28-stanford-aparc": {
    eligibility: [
      "You are no more than three years past your PhD, or six years past your MD, at the start date",
      "Your degree must be approved for conferral by 30 June 2027",
      "You live at Stanford for the full appointment (at least 10 months)",
      "Your research is on health policy in Asia",
    ],
    documents: [
      "Cover letter (PDF)",
      "CV (PDF)",
      "Research statement of up to five double-spaced pages, with the planned research and a publishable product (PDF)",
      "Two letters of recommendation, sent to the programme contact",
    ],
  },
  "bogliasco-fellowship-fall-2027-session": {
    eligibility: [
      "You work in a creative or scholarly field, such as archaeology, literature, music or visual arts",
      "You show strong achievement for your career stage",
      "You are not enrolled in a degree programme when you apply",
      "You speak conversational English",
      "Past fellows must wait five years before applying again",
    ],
    documents: [
      "Online application only (mail and email are not accepted)",
      "Short CV of up to three pages",
      "One-page project description in English",
      "Three work samples, usually from the last five years",
      "Two reference letters uploaded by your referees (a third is optional)",
      "Application fee of $30, or $45 after the early deadline",
    ],
  },
  "imperial-college-business-school-phd-scholarship-september-2027-entry": {
    eligibility: [
      "UK applicants need at least an upper second class degree and a master’s with Merit or Distinction",
      "Strong GMAT or GRE scores (the 90th percentile or higher is considered strong)",
      "English language level of IELTS 7.0 overall with 6.5 in each part, or equal",
      "An interview is part of the selection",
    ],
    documents: [
      "Current CV",
      "Statement of purpose, one to two A4 pages",
      "Full degree transcripts",
      "Contact details for two academic referees, and their references",
      "GMAT or GRE score (applications without one are incomplete)",
      "Evidence of English proficiency",
      "All documents must arrive by midnight UK time on 2 December 2026",
    ],
  },
  "oxford-ubs-centre-for-applied-ai-dphil-scholarships-2027": {
    eligibility: [
      "You meet the entry requirements for your chosen Oxford doctoral degree",
      "Business School projects need a strong background in finance, economics, management, operations research or quantitative social science",
      "Computer Science and Engineering projects need a strong computing or maths background",
      "You show a commitment to research in applied artificial intelligence",
      "You start in October 2027",
    ],
    documents: [
      "Application for the DPhil through the University of Oxford online portal",
      "The reference code for your research pathway, quoted in the application",
    ],
  },
  "john-s-knight-journalism-fellowships-at-stanford-2027-28-international": {
    eligibility: [
      "You have at least five years of professional experience (student work and internships do not count)",
      "You are a journalist, a news organisation strategy or operations worker, or work for a group supporting journalists",
      "Freelancers need more than half of their work in journalism",
      "You are not seeking a degree, and you are not in public relations, government or full-time academia",
      "Citizens of countries where the U.S. has paused J visas cannot receive an offer",
      "Materials are in English",
    ],
    documents: [
      "Online application form with essays (path to journalism, a proud accomplishment, leadership, what you want to learn from others)",
      "Résumé",
      "One work example (an English summary if it is in another language)",
      "Contact details for three professional references",
    ],
  },
  "stanford-cisac-fellowships-2027-28": {
    eligibility: [
      "You are currently in a PhD programme, or a postdoc or junior researcher",
      "Pre-doctoral applicants outside their final year are rarely accepted",
      "Non-U.S. citizens can apply, and a visa is available",
      "Applicants with no funding request are reviewed together with those who ask for funding",
      "Mid- or late-career professionals should email the programme first",
      "All materials are in English",
    ],
    documents: [
      "Completed online application form",
      "Résumé or CV",
      "Graduate school transcript (unofficial is fine; for pre- and postdoctoral applicants)",
      "Research project description of up to 1,500 words",
      "Research abstract of up to 200 words",
      "Writing sample of up to 50 pages",
      "Letters of recommendation, uploaded or emailed to the programme",
    ],
  },
  "lse-mphil-phd-law-2027-28-lse-phd-studentships": {
    eligibility: [
      "You hold an LLM or another master’s with an average mark of 70% (distinction or first class), or equal",
      "You can apply while finishing a master’s, but those without final grades by the end of July are not eligible unless they already hold another master’s at the required grade",
      "You name three possible supervisors from LSE permanent faculty, at least two from the Law School",
    ],
    documents: [
      "Transcripts for existing and pending qualifications",
      "Statement of academic purpose",
      "References",
      "CV",
      "Outline research proposal of up to 1,500 words",
      "Sample of written work",
    ],
  },
  "lse-mres-phd-political-science-2027-28-lse-phd-studentships": {
    eligibility: [
      "You have an undergraduate degree at 65 or above plus a taught master’s in political science or a close subject, or equal",
      "English at LSE’s Higher level, unless your first language is English or your last degree was fully in English",
      "GRE or GMAT scores are not required",
      "The deadline of 3 December 2026 also counts for funding",
    ],
    documents: [
      "Transcripts for each qualification, including pending ones",
      "Statement of academic purpose",
      "CV",
      "Outline research proposal of about 2,000 words including bibliography",
      "Sample of written work (a degree essay of 3,000 to 5,000 words, or an extract)",
      "Two references",
      "Evidence of English if needed",
    ],
  },
  "lse-mres-phd-international-development-2027-28-lse-phd-studentships": {
    eligibility: [
      "You hold, or are working towards, a taught master’s with 65 or above overall and in the dissertation, or equal",
      "You can apply while your master’s marks are pending",
      "English at LSE’s Higher level",
      "GMAT or GRE is highly recommended but not required",
      "Applications without a research proposal are not considered",
    ],
    documents: [
      "Academic record and transcripts",
      "Statement of academic purpose",
      "References",
      "CV",
      "GRE or GMAT score (recommended)",
      "Outline research proposal of 1,500 to 2,000 words, with a title, a short summary and names of proposed supervisors",
      "Sample of written work",
    ],
  },
  "kyoto-university-international-undergraduate-program-kyoto-iup-october-2027-enrolment": {
    eligibility: [
      "You are not a Japanese citizen, and you will have “Student” status when you enrol",
      "You will have finished 12 years of schooling by 30 September 2027, or hold an IB, Abitur, French Baccalaureate, A Levels or European Baccalaureate",
      "You will be at least 18 by 1 April 2028",
      "You do not need to know Japanese when you apply",
      "You show English with TOEFL iBT or IELTS (at the minimum scores in the guidelines), or Form C",
      "Applicants using the “recognised equivalent” route send screening documents in English between 1 July and 19 October 2026",
    ],
    documents: [
      "Application Forms A to D",
      "Form B, the evaluation, from a school staff member or a third party",
      "Official transcripts for all of secondary school, and university transcripts if you attended",
      "TOEFL iBT or IELTS result, or Form C",
      "Certified English translations of any other-language documents",
      "Online application, open 2 November to 3 December 2026 (5 p.m. Japan time)",
    ],
  },
  "wildlife-photographer-of-the-year-2027": {
    eligibility: [
      "Adult competition: you are 18 or older on the closing date, 3 December 2026",
      "The Young competition is for entrants 17 or younger on the closing date",
      "Photos show wild, non-captive animals, plants, fungi, landscapes or habitats",
      "AI-generated images, baiting or luring are not allowed",
      "Photos must have been taken in the last five years",
      "People who organise or judge the competition, and museum or sponsor staff, cannot enter",
      "The rules published are for the 2026 round, so check the 2027 rules",
    ],
    documents: [
      "Online account on the competition website",
      "Up to 25 photos as JPEG files, 1920 pixels on the longest side, Adobe RGB",
      "Entry fee of £35 for adults (free for 26 and under, and for photographers from listed countries)",
      "Original or RAW files, if you are shortlisted",
    ],
  },
  "cardiff-business-school-125th-anniversary-scholarship-january-2027-entry": {
    eligibility: [
      "You are an international (overseas fee) student",
      "You start an eligible MSc at Cardiff Business School in January 2027",
      "The award is £10,000",
      "You are considered automatically, with a deadline of 4 December 2026",
    ],
    documents: [
      "Your application to the eligible MSc course (no separate scholarship form is described)",
    ],
  },
  "university-of-manchester-africa-futures-doctoral-scholar-awards-2027": {
    eligibility: [
      "You are an international-fee student whose home is in an African country, where you mainly lived in the last five years",
      "Your PhD is supervised by staff in the Faculty of Science and Engineering",
      "You meet the usual PhD entry requirements (a 2:1 degree, or a 2:1 plus a relevant master’s at merit)",
      "You meet the English requirement, for example IELTS 6.5 overall",
      "You need a supervisor who will nominate you",
      "Projects that tackle development goals relevant to Africa are preferred",
    ],
    documents: [
      "PhD application by 4 December 2026, saying in the funding section that you want the Africa Futures Scholarship",
      "Your own research proposal, or a choice of an advertised project",
      "Short verbal presentation at the interview (by Zoom, week of 22 February 2027) if you are nominated",
    ],
  },

  // Checked 2026-11-22 against each call’s official page.

  "idcore-engd-in-offshore-renewable-energy-2027-entry-overseas-places": {
    eligibility: [
      "You hold a UK first class honours degree or an international equivalent",
      "A UK 2:1 plus an MSc with distinction, with substantial relevant work experience, may also be considered",
      "If you are not a national of a majority English-speaking country, your degree must be no more than five years old on the 1st of the month the programme starts",
      "Your degree was taught and assessed in English, or you meet the English requirement another approved way",
      "You can study full time for four years from September 2027 (joint degree of Edinburgh, Exeter, Strathclyde and Swansea)",
    ],
    documents: [
      "Online application through the University of Edinburgh Degree Finder (no application fee)",
      "Degree certificates and transcripts, with English translations if needed",
      "A one-page cover letter explaining why you want to join (leave the personal statement field blank)",
      "CV",
      "Two references, ideally one academic and one from an employer, signed, dated within 12 months and on letterhead",
    ],
  },

  "inlaks-asia-art-archive-art-grant": {
    eligibility: [
      "You are an Indian citizen living in India",
      "You were born between 1 January 1990 and 1 January 2000",
      "Collectives can apply if every member is an Indian citizen under 35",
      "You have never received an Inlaks grant, award or residency",
      "Your proposal can extend a project you already work on; you do not have to hand in finished work at the end",
    ],
    documents: [
      "Everything in one PDF or ZIP file of up to 25MB",
      "Two-page CV",
      "Artist statement of up to 500 words",
      "Project proposal of up to 1,500 words with a description, timeline, budget and the archives or people you want to access",
      "Portfolio of three to five recent projects (audio and video can be linked from YouTube or Vimeo)",
    ],
  },

  "berlin-mathematical-school-phase-i-master-s-scholarship-2027": {
    eligibility: [
      "You finish a bachelor’s degree by summer 2027 (Phase I leads to a master’s degree)",
      "Your studies are in mathematics or a closely related subject",
      "You can show English language skills",
      "You start in October 2027 at one of the three Berlin universities",
    ],
    documents: [
      "Online application (no paper copies)",
      "Personal statement (motivation letter)",
      "CV",
      "All your university transcripts and degrees, including the back page if it shows the grading scale",
      "Official English or German translations of any document in another language",
      "Proof of English",
      "Two recommendation letters, which your referees upload themselves after BMS emails them",
    ],
  },

  "max-planck-schools-phd-programmes-2027-cognition-matter-to-life-photonics-biomedical-ai": {
    eligibility: [
      "Cognition: a bachelor’s or master’s degree in a related area such as neuroscience, psychology or AI",
      "Matter to Life: a bachelor’s in natural science or engineering (or a master’s); at least half your credits in natural sciences or maths, and a grade of 1.7 or better on the German scale or top 5% of your class",
      "Photonics: a master’s with substantial physics, engineering or related coursework (a preliminary transcript is accepted if you have not finished)",
      "Biomedical AI: a master’s, or one finished before the start, in computer science, maths, statistics, engineering, physics or a related field (life scientists need strong computing skills)",
      "Proof of English",
    ],
    documents: [
      "Online application on the website of the school you choose",
      "Degree certificates and official transcripts",
      "CV (up to two pages for Cognition)",
      "Motivation letter (one page for Cognition, up to 500 words for Photonics, the portal template for Matter to Life)",
      "Contact details of two referees (not needed for Matter to Life, which accepts no reference letters)",
      "Passport or ID copy (Cognition and Biomedical AI)",
      "Proof of English",
    ],
  },

  "tfmasa-erasmus-mundus-joint-master-2027-29-transfers-fluids-materials-in-aeronautical-and-space-applications": {
    eligibility: [
      "You hold, or will hold before the programme starts, a bachelor’s degree (180 ECTS or equivalent) in mechanics, physics or a closely related field",
      "You have strong transcripts (the programme is highly selective)",
      "You can show English, for example IELTS Academic 6.5 with no band below 6, or TOEFL iBT 93",
      "The English test must be no more than three years old",
    ],
    documents: [
      "Online application on the TFMASA eMundus platform, filled in in English",
      "Europass CV",
      "One-page motivation letter",
      "Recent reference letters on official letterhead",
      "Transcripts and diplomas with English translations (an official translation is not needed yet)",
      "Proof of English",
      "Files must be PDF or JPG and no bigger than 5 MB each; you cannot edit after you submit",
    ],
  },

  "international-trans-fund-11th-grant-cycle-seed-and-thrive-grants": {
    eligibility: [
      "Your group is trans-led: trans people hold the key decision-making roles and make up at least 75% of staff, board or decision-makers",
      "Groups under 75% must show how trans people lead decisions on budget and strategy",
      "Your annual budget is under USD 100,000",
      "You apply as a group, not as an individual",
      "Your work improves the lives and rights of trans people and supports the wider movement",
      "SEED grants (USD 10,000 to 25,000) are for groups that never had ITF funding; THRIVE grants (USD 25,000 to 50,000) are for past SEED grantees",
      "You can apply for only one grant type in this cycle",
    ],
    documents: [
      "Organisation profile and online application in ITF’s grants portal",
      "Written application or a video (English, French, Russian, Spanish or Simplified Chinese)",
      "Last year’s total spending and your current operating budget in USD",
      "List of outside funders from the past two years",
      "Two references who know your work",
      "Registration is asked about but is not required",
    ],
  },

  "jf-nichibunken-fellowship-2027-28": {
    eligibility: [
      "You hold a PhD received within six years of 1 April 2027",
      "Your research is in the humanities or social sciences and looks at Japanese culture in an international, interdisciplinary way",
      "You are a citizen or permanent resident of a country that has diplomatic relations with Japan, and you live there",
      "You have arranged a host researcher in Japan by the deadline",
      "You are not using the fellowship for political or religious purposes or mainly to study Japanese",
      "You have no other grant covering travel and stay in Japan at the same time",
      "Your stay is between 6 and 24 months, starting between September 2027 and March 2028",
    ],
    documents: [
      "Application form, applicant information and project information, including an abstract of 200 words or less",
      "CV and list of research achievements (optional)",
      "Two reference forms from two different people",
      "Letter of affiliation from your host researcher in Japan",
      "Submitted online by 1 December 2026, 1 p.m. Japan time",
    ],
  },

  "stanford-next-asia-policy-lab-postdoctoral-fellowships-2027-29": {
    eligibility: [
      "You will have received your PhD within three years of the fellowship start date",
      "Your dissertation is approved by 30 June 2027",
      "You send proof that your degree was conferred by 31 August 2027",
      "You choose one of the four research tracks",
      "The appointment is two years, and may be extended",
    ],
    documents: [
      "Online application form",
      "Letter of request (PDF) describing your research and experience, including plans for single-author and co-authored publications",
      "CV of no more than two pages, with your list of publications",
    ],
  },

  "ectrims-postdoctoral-research-fellowship-2027": {
    eligibility: [
      "You hold, or are a candidate for, an MD, PhD, ScD or equivalent, finished before the fellowship starts",
      "You are a scientist or physician working on multiple sclerosis research",
      "Any nationality can apply, but you must train in a European laboratory or clinic",
      "You have not worked at the host institution or under the proposed mentor before",
      "Fewer than about five years of postdoctoral experience is advised, and most successful applicants are under 40",
    ],
    documents: [
      "Online application on the ECTRIMS system by 1 December 2026, 23:59 CET",
      "CV and bibliography on ECTRIMS’ biographical sketch form",
      "Career plans statement (one page)",
      "Research project description of up to six pages",
      "Abstract of 250 words",
      "Proof of the language of the training site, such as a language certificate",
      "Letter of endorsement and a CV from your proposed mentor",
      "Support letter from the host department chair and the signed ECTRIMS payment rules form",
      "Three reference letters, one from the proposed mentor",
    ],
  },

  "european-prize-for-women-innovators-2027": {
    eligibility: [
      "You are a woman and apply as a person, not as a company",
      "You founded or co-founded a company or organisation registered in an EU country, an overseas territory or a Horizon Europe associated country",
      "The company was registered at least a year before the call year",
      "You have not already won an EU or Euratom prize for the same activities",
      "Rising Innovators category: you are under 35 at the start of the call year (the other categories have no age limit)",
      "You can enter only one category",
    ],
    documents: [
      "Online application on the EU Funding & Tenders Portal, submitted by 1 December 2026, 17:00 CET",
      "One application for the category you qualify for (Women Innovators, Rising Innovators or EIT Women Leadership)",
    ],
  },

  "newberry-library-short-term-fellowships-2027-28": {
    eligibility: [
      "You hold a PhD at any career stage, or you are a PhD candidate with all-but-dissertation status",
      "Curators, librarians and independent scholars can also apply",
      "Your project needs specific Newberry collection items",
      "Some awards have extra conditions, such as Midwest Modern Language Association membership or a Renaissance Studies consortium institution",
      "Chicago-area applicants should explain why they need a fellowship to use the collections",
    ],
    documents: [
      "Online application through SlideRoom",
      "Project abstract and project description (up to 1,500 words on the general page)",
      "List of the collection items you plan to use, up to 300 words",
      "Short selected bibliography of secondary sources",
      "CV",
      "One letter of recommendation, in English",
    ],
  },

  "ism-international-student-case-competition-2027": {
    eligibility: [
      "You are a full-time student in supply chain management, business, finance or a related field",
      "Your team has up to four members; undergraduates and graduates can mix",
      "You are not a teaching assistant or faculty member at the university",
      "Your team has a faculty advisor, who can guide you but cannot help write the case solution",
      "Each university can send up to two teams",
      "Your team can attend and register for ISM World 2027 on 16 to 18 May 2027",
    ],
    documents: [
      "Team interest form submitted by 4 December 2026",
      "Name of your faculty advisor",
    ],
  },

  "acumen-southeast-asia-fellowship-2027": {
    eligibility: [
      "You are a social entrepreneur or senior decision-maker working on poverty",
      "You have at least five years of work experience",
      "You live in Southeast Asia (exceptions if you have a clear link to the region)",
      "You are over 18; there is no maximum age and no degree needed",
      "You work on this full time (part time only in exceptional cases)",
      "You speak English and have a reliable internet connection",
      "You have never joined an Acumen Fellows programme",
      "Only one person from the same organisation can move forward",
    ],
    documents: [
      "Online application form with essay questions (it cannot be saved, so write your answers offline first)",
    ],
  },

  "leeds-sustainability-case-competition-2027-university-of-colorado-boulder": {
    eligibility: [
      "Every team member is currently enrolled in a graduate programme",
      "At least one team member is studying for a graduate business degree",
      "Your team has three to five members",
      "Your team name does not use your school’s name, city, state or mascot",
      "You may use free-tier ChatGPT only, and must say how you used AI",
    ],
    documents: [
      "Team registration by 6 December 2026",
      "Registration code if your team is from CU Boulder or the Leeds School (email lscc@colorado.edu)",
    ],
  },

  "mrc-laboratory-of-molecular-biology-international-phd-programme-2027": {
    eligibility: [
      "You hold, or are about to finish, a relevant degree",
      "If English is not your first language, you have a recent IELTS-equivalent score of at least 7.0 overall, 7.0 in speaking, listening and writing, and 6.5 in reading",
      "You can start the four-year full-time PhD in October 2027",
    ],
    documents: [
      "Online application through the University of Cambridge Applicant Portal",
      "Two academic references, preferably one from senior staff at your latest university and one from a senior scientist who supervised your lab work (a third reference if you want Gates funding)",
      "Proof of English if needed",
      "Degree transcripts and certificates",
    ],
  },

  "cambridge-trust-international-scholarships-2027-28-phd": {
    eligibility: [
      "You are applying for a PhD and are from outside the UK and Ireland",
      "Awards are made on merit: research potential, exam results and references (money circumstances do not count)",
      "Your department must rank you highly",
      "It can be held in any subject and at any college, except premium-rate courses",
    ],
    documents: [
      "Application for admission to Cambridge, submitted by the course’s funding deadline",
      "Tick this scholarship in the funding section of the application",
    ],
  },

  "cambridge-biosciences-dtp-bbsrc-phd-studentships-2027-entry": {
    eligibility: [
      "You hold, or expect to get, a high upper second class (high 2:1) degree or international equivalent",
      "You apply for a project advertised on the programme website and can choose up to two",
      "You start in October 2027",
    ],
    documents: [
      "Online application through the University of Cambridge Applicant Portal by 8 December 2026 (do not email documents)",
      "Statement on your interest in the topic and project, any talks with the supervisor, and relevant experience",
      "Short written answers on your motivation, problem-solving, independence, knowledge of your field, understanding of research and technical skills",
      "Two academic or professional references",
      "Transcripts and CV",
    ],
  },

  "crossculture-programme-ccp-fellowships-2027": {
    eligibility: [
      "You are at least 23 years old",
      "You have at least two years of proven work or volunteering in a civil society organisation in your home country",
      "You speak and write English well",
      "You are not a student",
      "You do not receive another fellowship or funding in the same year",
      "Your work fits one of the topics: policy and society, media and culture, human rights and peace, or sustainable development and climate justice (2027 key topic: democratic resilience)",
    ],
    documents: [
      "Online application on the CCP portal between 19 October and 8 December 2026 (it cannot be saved, so have everything ready)",
      "CV in English with education, work, volunteering and skills",
      "Recommendation letter from your supervisor at your home organisation, on ifa’s template",
      "Recent photo (optional)",
      "You must fill in the form yourself, without AI",
    ],
  },

  "maastricht-university-nl-high-potential-scholarship-2027": {
    eligibility: [
      "You are not from the EU, EEA, Switzerland or Suriname, and have no dual nationality from an EU/EEA country or Switzerland",
      "You applied to a taking-part full-time master’s at Maastricht for 2027-28 with a complete file before 10 December 2026",
      "Your latest transcript shows a GPA of 7.5 out of 10 or higher",
      "You are not older than 35 on 1 September 2027",
      "You have never been in a Dutch degree programme (exchange is fine)",
      "You send only one scholarship application",
    ],
    documents: [
      "Application for the master’s through Studielink",
      "Online scholarship form (log in with your UM account)",
      "CV of up to two A4 pages",
      "Motivation letter on the programme’s template",
      "Official transcript showing your latest GPA, plus a document explaining your grading system",
      "Personal statement on your financial need",
      "Reference letter from a professor, lecturer or employer, dated February 2026 or later, which you upload yourself",
      "Contact details of your referee",
    ],
  },

  "um-social-justice-scholarship-globalisation-and-law-maastricht-2027-28": {
    eligibility: [
      "You are not from the EU, EEA, Switzerland or Suriname, and have no dual nationality from one of them",
      "You applied to the full-time master’s Globalisation and Law with a complete file before 10 December 2026",
      "You have a proven record of supporting the rule of law or human rights in class and outside it",
      "You are not older than 35 on 1 September 2027",
      "You have a GPA of 7.5 out of 10 or higher",
      "Students without a master’s degree yet are preferred",
    ],
    documents: [
      "Application for the master’s through Studielink",
      "Online scholarship form (log in with your UM account; you can submit only once)",
      "CV of up to two A4 pages",
      "Motivation letter on the template, about what you have already done for human rights",
      "Official transcript showing your latest GPA, plus a document explaining your grading system",
      "Personal statement on your financial need",
    ],
  },

  "sabanc-graduate-business-school-phd-in-management-spring-2027-term": {
    eligibility: [
      "You hold a bachelor’s or master’s degree in management, economics, social sciences, natural sciences or engineering",
      "With a bachelor’s only, you need at least 3.00 out of 4.00",
      "A master’s must be a thesis master’s",
      "You have a GMAT (minimum 600) or another accepted test score",
      "You have proof of English, such as TOEFL iBT 88 or higher",
    ],
    documents: [
      "Online application form (email applications are not read)",
      "Official transcript with all courses and grades, plus a grade conversion table if needed",
      "Two recommendation letters, which your referees upload themselves",
      "GMAT or other test score report",
      "English proficiency certificate",
      "Statement of purpose in English, up to two pages",
      "CV",
      "Passport-size photo",
      "Online affidavit",
    ],
  },

  "university-of-manchester-international-partnership-phd-studentships-2027-28-biology-medicine-and-health": {
    eligibility: [
      "You hold, or are about to get, at least a UK upper second class honours degree or international equivalent in a relevant subject",
      "UK and international applicants can apply, but international awards go only to exceptional candidates",
      "You meet the English language requirement",
      "You can apply for up to two projects, each as a separate application",
    ],
    documents: [
      "Online application for each project (incomplete applications are not processed)",
      "Supporting statement written for each project",
      "Degree certificates and transcripts",
      "References",
      "English test certificate if needed",
      "CV (a research statement is not needed)",
    ],
  },

  "tarbell-institutional-grants-for-ai-journalism-december-2026-round": {
    eligibility: [
      "You are a media outlet or distribution platform, nonprofit or for-profit, anywhere in the world",
      "You can accept grant money",
      "There is no minimum newsroom size",
      "Individual reporters should use Tarbell’s separate reporting grants instead",
      "You keep full editorial control",
    ],
    documents: [
      "Description of the activities you want funded and your preferred grant length",
      "Proposed budget",
      "Details of any existing funding for the project",
      "Overview of your team and their roles",
      "Your current or expected audience and reach, with examples of planned work",
    ],
  },

  "2027-wfeo-hackathon-on-sustainable-transport-engineering": {
    eligibility: [
      "You are an engineering student or a young engineer under 30",
      "Teams have three to five members and are led by a student or young engineer under 30",
      "People under 18 can join with a parent or guardian’s consent",
      "Registration is free",
    ],
    documents: [
      "Free individual registration",
      "Five-minute video of your solution (English subtitles if not in English)",
      "Team photo",
      "Written description in English",
      "Submission by 12 December 2026, 23:59 UTC",
    ],
  },

  "chen-institute-science-prize-for-ai-accelerated-research-2026": {
    eligibility: [
      "You are an early-career scientist in an AI-related field",
      "You hold an MD, PhD or MD/PhD earned within the last 10 years (extensions for parental or medical leave must be flagged)",
      "You enter as one individual, and the essay is about your own contribution",
      "Past winners and runners-up of any Science Prize must wait five years",
      "You may not use AI tools to write or edit the essay or its figures without permission from Science",
    ],
    documents: [
      "Entry form on the prize’s online system",
      "Essay of 1,000 words on an advance in empirical science that used an AI technique (one figure or table and up to 15 references)",
      "One-page recommendation letter from a postdoc adviser, supervisor or senior colleague",
      "CV listing awards, honours and experience, with full citations of related papers",
      "Up to two recent papers, at least one peer reviewed and published in the past three calendar years (a preprint can be the second)",
    ],
  },

  "wgsss-esrc-doctoral-training-partnership-general-studentships-2027-28-wales": {
    eligibility: [
      "You normally hold a first or upper second class degree in a relevant subject, or equal qualifications or experience",
      "Home and international applicants can apply",
      "You are not more than one year into a PhD by 1 October",
      "You propose your own PhD project",
      "You send only one project proposal and one WGSSS application, to one university",
    ],
    documents: [
      "WGSSS studentship application form, through the advert of your chosen university",
      "CV of up to two pages",
      "Two academic or professional references that talk about your research strengths",
      "Degree certificates and transcripts, with translations if needed",
      "Proof of English if needed",
      "ESRC equality and diversity monitoring form",
    ],
  },

  "lpi-summer-intern-program-in-planetary-science-2027": {
    eligibility: [
      "You are an undergraduate with at least 50 semester hours of credit",
      "You are enrolled in a bachelor’s degree in the semester before the programme",
      "US citizens and foreign nationals can apply, except citizens of countries on the US State Department’s designated list",
      "Physical or natural science, engineering, computer science or maths majors are preferred",
      "You can be in Houston from 7 June to 13 August 2027",
    ],
    documents: [
      "Online application form (no paper applications) by 14 December 2026, 11:59 p.m. US Central Time",
      "Three research areas you are interested in, ranked",
      "CV as a PDF",
      "Official transcript, sent by your registrar if electronic",
      "Two or three letters of recommendation sent through the online system",
      "English test score, or an English reference letter from a professor if you have none",
    ],
  },

  "p-e-o-international-peace-scholarship-2027-28": {
    eligibility: [
      "You are a woman from outside the US and Canada",
      "You are not a citizen or permanent resident of the US or Canada",
      "You are qualified for full-time graduate study at an accredited US or Canadian school and have a full year of coursework left",
      "You plan to return home to use your education for peace",
      "Online-only study, research or internships without coursework do not count",
      "PhD students who are only writing a dissertation cannot apply as first-time applicants",
    ],
    documents: [
      "Eligibility form, accepted from 15 September to 15 December 2026",
      "Full application after eligibility is confirmed (due 1 February or 15 March 2027, depending on your enrolment)",
      "Budget of expected costs and all other funding",
      "Two recommendations, at least one from a professor if you are already enrolled (no relatives or fellow students)",
      "Proof of admission",
      "Signed promise to return home",
      "Transcript if you have one",
    ],
  },

  "ens-psl-international-selection-2027": {
    eligibility: [
      "You are under 26 on the day applications open (Arts and Humanities: not past your 26th birthday on 1 December)",
      "You have never applied to the International Selection before",
      "You have done at least one year of university study abroad and will have two years by enrolment (third-year students can apply)",
      "You have spent no more than about 10 months in France in the competition year and the year before",
    ],
    documents: [
      "One merged PDF named “Family Name-Given Name.pdf”, uploaded online (no email or post)",
      "High school diploma and university transcripts in French or English (Spanish, Italian or Portuguese also accepted)",
      "CV",
      "Motivation letter of one to three pages (French for humanities; French or English for sciences)",
      "Arts and Humanities only: research project of up to three pages and a bibliography of about 10 books",
      "Two to four recommendation letters, requested through the OnePSL30 platform",
    ],
  },

// Checked 2026-11-23 against each call’s official page.
  "wenner-gren-wadsworth-african-fellowship-2027": {
    eligibility: [
      "You are an African citizen and live in an African country when you apply",
      "You belong to a group that is under-represented in anthropology and archaeology",
      "You have a doctoral application pending at a South African university (or you are in your first year of the PhD there)",
      "You are not already past your first year of doctoral training, and you are not applying only for fieldwork or thesis write-up support",
      "You have a host sponsor at the South African university and a home sponsor from the institution where you earned a previous degree",
    ],
    documents: [
      "Online application forms with your applicant profile, due by 15 December",
      "Answers to three plan-of-study questions",
      "Detailed budget",
      "Official transcripts (with an English translation if needed)",
      "Evidence of language competence, if it applies to your project",
      "CV of up to five pages for you, and a CV for your host sponsor, all in English",
      "A letter from your host sponsor and a letter from your home sponsor, emailed directly to the Foundation by the deadline",
    ],
  },
  "hku-society-of-fellows-in-the-humanities-fellowship-2027-28": {
    eligibility: [
      "You have a PhD awarded between 1 January 2025 and 30 June 2027",
      "You are not in a tenure-track post",
      "You did not get your PhD from HKU",
      "You can start between June and August 2027 for a three-year, non-renewable post",
    ],
    documents: [
      "Online application through HKU’s careers site, with all files as PDFs",
      "CV",
      "Cover letter of no more than 300 words",
      "Research proposal of no more than 1,500 words, not counting the bibliography",
      "One writing sample: a dissertation chapter or a published article",
      "Three recommendation letters, sent by your referees to sofhku@hku.hk (you must ask them yourself)",
    ],
  },
  "emmir-erasmus-mundus-migration-and-intercultural-relations-2027-29-edition-14": {
    eligibility: [
      "You have a first degree in a related field such as social sciences, history, cultural studies, education, law, economics, development studies or journalism",
      "You finished your degree by the 20 December 2026 deadline (needed for a scholarship)",
      "Your final grade is at least C+ or equivalent",
      "Your latest degree is not older than five years (explain it in your statement if it is)",
      "You can show knowledge of migration studies, intercultural relations and research methods from modules, papers or exam results",
      "You have English at C1 level, unless an exemption applies (for example a degree from a university in the UK, USA, Canada, Ireland, Australia or New Zealand)",
      "You have not already received an Erasmus Mundus Joint Master scholarship",
    ],
    documents: [
      "Online application with all files as PDFs",
      "Passport copy",
      "CV",
      "Statement of purpose of one to two pages",
      "Diploma and transcript for your first degree and any other relevant degrees",
      "Proof of English level",
      "Any other relevant documents",
      "Official English translations of any document in another language",
    ],
  },
  "lumiere-scholars-essay-award-fall-2026-high-school": {
    eligibility: [
      "You are a student from any country who will be enrolled in high school on 31 December 2026",
      "You submit only one essay, written by you alone, with no outside writing services",
      "Current scholars or alumni of Lumiere programmes can enter, but cannot submit their final Lumiere paper",
      "There is no entry fee",
    ],
    documents: [
      "Free registration on the Lumiere website by 30 November",
      "One essay of up to 2,000 words in English (not counting footnotes and bibliography), on one of the five prompts, with MLA 8th edition citations and no personal anecdotes as evidence",
      "Email address of an academic referee (a school teacher or counsellor) who knows your work",
    ],
  },
  "gbd-fellowship-2027": {
    eligibility: [
      "You have a PhD, MD, DPhil or equivalent, or you will finish one before the September 2027 start",
      "Your degree has a strong quantitative base and you have research experience",
      "You have strong R or Python skills",
      "You are no more than five years past your latest degree and have no more than three years of postdoctoral experience",
      "You can work full time and in person in Seattle, and can get a visa and be there on the first day",
      "You cannot hold another job or be enrolled in another programme during the fellowship",
    ],
    documents: [
      "CV",
      "Four short essays: your research (300 words), your contribution to GBD (200), your production work (200), and why you want this fellowship now (250)",
      "Names and contact details of three references (letters are not needed at this stage)",
    ],
  },
  "utrip-2027-university-of-tokyo-research-internship-program": {
    eligibility: [
      "You study a natural science or a related field in a bachelor’s programme at a university outside Japan",
      "You have finished at least one year of the programme and will go back to your home degree afterwards",
      "You are not in a final year that ends before the programme finishes",
      "You can commit full time to all six consecutive weeks",
      "Third-year students in four-year programmes are given priority, and second-year students are also encouraged to apply",
    ],
    documents: [
      "Online application form, with your first and second choice of host lab",
      "Personal statement of 700 to 1,000 words",
      "Resume or CV of up to 800 words",
      "Scanned transcript (the original is needed only if you are selected)",
      "English test result such as TOEFL, unless English is your first language or you studied in English for the past eight years",
      "One recommendation letter from a professor who knows your science work",
    ],
  },
  "planthealth-erasmus-mundus-joint-master-2027-29-plant-health-in-sustainable-cropping-systems": {
    eligibility: [
      "You have a bachelor’s degree of 180 ECTS in agronomy, agricultural sciences or a related field",
      "Your studies include at least 4 ECTS in plant health or crop protection, or the equivalent",
      "Final-year students can apply, but applicants who already hold the degree are preferred",
      "You have English at B2 level, unless English is your native language or your bachelor’s was taught fully in English",
      "Apply in the first call (1 October to 31 December 2026) to be considered for scholarships",
    ],
    documents: [
      "Online application form, in English",
      "CV (Europass format recommended)",
      "Degree certificates",
      "Transcripts (legalised copies and sworn translations are not needed at this stage)",
      "English certificate, or a letter from your university saying your bachelor’s was taught in English",
      "Two recommendation letters on the official PlantHealth template, signed and stamped by your referee’s institution or company",
      "Declaration on honour",
    ],
  },
  "fine-arts-work-center-writing-fellowship-2027-28": {
    eligibility: [
      "You are a writer who has not published, or been contracted to publish, a full-length book of creative work",
      "You apply in either poetry or fiction, and a separate application is read by that genre’s jury",
      "If you write in both genres, you need two applications, each with its own fee",
    ],
    documents: [
      "Writing sample (poetry or fiction) completed in the last four years, with no name, publications or awards on it",
      "List of your artistic or professional experience, or a résumé",
      "Short questionnaire, including two short-answer questions",
    ],
  },
  "politecnico-di-milano-merit-based-international-scholarships-2027-28": {
    eligibility: [
      "You are an international student applying to the first year of an English-taught Master of Science at Politecnico di Milano",
      "You submit your admission application and pay the application fee between 1 October and 1 December 2026",
      "You also submit the scholarship form by 12:00 noon (Italian time) on 15 December 2026",
      "You send a valid English language certificate by 4 March 2027",
    ],
    documents: [
      "Admission application with the application fee paid",
      "Scholarship application form, through Politecnico di Milano Online Services",
      "University qualification",
      "Academic transcript (with an official translation if it is not in Italian, English, French or Spanish)",
      "Cumulative GPA statement",
      "CV in English or Italian",
      "Portfolio, for architecture, urban planning and design programmes",
      "English language certificate",
    ],
  },

  // Checked 2026-11-24 against each call’s official page.
  'jf-fellowship-for-arts-and-culture-in-asia-wa2-0-2027': {
    eligibility: [
      "You work in arts and culture, for example as an artist, researcher, curator, producer, administrator or educator",
      "You live in, and hold nationality, citizenship or permanent residency in, Japan or an ASEAN country",
      "Your activity must take place outside the country where you live and hold nationality",
      "You speak Japanese or English well and are in good physical and mental health",
      "You have a bank account in your own name that can receive money from Japan",
      "Undergraduate and master’s students are not eligible, and your main aim cannot be language study",
      "You cannot hold another Japan Foundation grant in the same year",
    ],
    documents: [
      "Application form (the Japan Foundation’s PDF form)",
      "CV",
      "Detailed project description, no more than five pages",
      "Acceptance form from one or two host institutions or individuals (a signed letter is also accepted)",
      "Online application through the Japan Foundation portal",
    ],
  },

  'heidelberg-south-asia-institute-and-max-weber-forum-joint-fellowship-summer-2027': {
    eligibility: [
      "You are a young researcher from India, Nepal, Pakistan, Sri Lanka or Bangladesh",
      "You hold a doctorate",
      "You want to start a research collaboration with the South Asia Institute in Heidelberg",
      "The fellowship lasts up to three months and starts between April and June 2027",
    ],
    documents: [
      "Copy of your doctoral certificate",
      "Project description, written on the template given in the call",
      "Details of two referees",
      "Optional letter of reference from a member of the South Asia Institute",
      "Application through the online portal (applications by email are not accepted)",
    ],
  },

  'ucc-futures-scholars-programme-phd-scholarships-2027': {
    eligibility: [
      "Open to all nationalities, with no age limit; you may send only one application",
      "You hold, or expect, a First or Upper Second Class Honours degree, or a master’s degree",
      "You finish any degree still in progress by 30 September 2027",
      "You meet UCC’s English language requirements",
      "You have found a UCC lead supervisor who agrees to support you and submit the application for you",
      "You do not already hold a doctorate or another doctoral scholarship, and you are not permanent staff at a university or research body",
    ],
    documents: [
      "Application submitted for you by your UCC lead supervisor through the Pure system",
      "Official academic transcripts",
      "Proof of English language level, where it applies",
      "If you are selected: supporting documents uploaded through UCC Apply by 1 April 2027",
    ],
  },

  'noha-erasmus-mundus-joint-master-in-international-humanitarian-action-2027-29': {
    eligibility: [
      "You hold a bachelor’s degree (EQF level 6) in a subject relevant to humanitarian action",
      "You finish your degree before the 15 December 2026 deadline",
      "You have the language certificate for the universities you choose: English C1, French C1 or Spanish B2",
      "Native speakers from English-speaking countries, or people whose whole bachelor’s was taught in English, may be exempt from the English test",
      "Some partner universities add their own national admission rules",
    ],
    documents: [
      "Copy of passport",
      "Certified copy of your diploma (or an official letter from your registrar if you have not graduated yet)",
      "Certified copies of academic transcripts",
      "CV in English",
      "Reference letters",
      "Language certificate",
      "Online application on the NOHA apply portal",
    ],
  },

  'uc-merced-phd-in-public-health-fall-2027': {
    eligibility: [
      "You have a bachelor’s degree with a GPA of at least 3.0",
      "You passed an introductory statistics course with a grade of B or better",
      "The GRE is not required",
      "A master’s in public health (or similar), or two or more years of related work, is strongly encouraged but not required",
    ],
    documents: [
      "Official transcripts of your previous study",
      "Three letters of recommendation",
      "Statement of purpose (your research interests, methods, career goals and the faculty whose work fits yours)",
    ],
  },

  'merck-foundation-online-scholarships-for-doctors-in-underserved-specialties-2026-call': {
    eligibility: [
      "You are a doctor from an African or other developing country, based on the UN Human Development Index",
      "You hold a medical degree (usually MBBS or MBChB); some specialties ask for more",
      "You apply for one specialty only",
      "You can show English language level, as the courses are taught in English",
      "You need a stable internet connection",
      "Doctors working in the public sector are preferred",
    ],
    documents: [
      "Online application form",
      "CV",
      "Graduation certificate",
      "Personal statement or letter of interest",
      "Recommendation letter (for African applicants, from the First Lady’s Office or the Ministry of Health)",
      "Proof of income, such as a recent payslip, salary certificate or three-month bank statement",
      "Certified translations of any documents not in English",
    ],
  },

  'eth-zurich-computer-science-student-summer-research-fellowship-2027': {
    eligibility: [
      "You are enrolled in a bachelor’s or master’s programme in computer science or a close field at a university outside ETH Zurich",
      "Students of any nationality can apply",
      "You will have finished two years of study by the start of the fellowship",
      "You graduate in the year after the fellowship or later",
      "You can be in Zurich for the whole of July and August",
      "The programme is in English",
    ],
    documents: [
      "CV in English, preferably Europass format (PDF)",
      "Official transcript from your university, in English, German, French or Italian (PDF)",
      "Motivation letter in English, one page at most (PDF)",
      "Application through the SiROP portal, naming one or two preferred research areas",
    ],
  },

  'university-of-sydney-international-stipend-scholarship-2027-research-periods-3-4': {
    eligibility: [
      "You are an international student when the scholarship is awarded",
      "You are applying to a research degree (PhD or similar) at the University of Sydney",
      "You study full-time; part-time is only allowed in special cases your visa permits",
      "Selection looks at academic merit, research experience, the research environment and supervision",
      "People who already hold an Australian Government or University scholarship at the same level may be ranked lower",
    ],
    documents: [
      "Complete admission application for the research degree through Sydney Courses",
      "Your student ID, which you get after submitting that application",
      "Scholarship application form",
      "Official transcripts and qualifications with the grading scheme, combined into one PDF (with English translations if needed)",
      "Optional evidence of research experience, on the University’s research experience form",
    ],
  },

  'max-planck-weizmann-joint-postdoctoral-program-2027-starts': {
    eligibility: [
      "You start the programme within four years of finishing your PhD or MD",
      "You submit your PhD thesis before you start",
      "Any nationality can apply, and there is no age limit",
      "You do not apply together with your own PhD advisor",
      "You have found researchers at both a Max Planck institute and the Weizmann Institute for a joint project, and both have funds to support you",
    ],
    documents: [
      "Detailed CV with your academic background, research experience and publications",
      "At least three recommendation letters, one from your PhD advisor",
      "Support letters from the researchers at both host institutes (a joint letter is fine)",
      "Research statement, up to two pages",
      "Plan splitting the four years equally between the two institutes",
    ],
  },

  'itlos-internship-programme-july-september-2027': {
    eligibility: [
      "You have completed at least three years of university study and are enrolled in a degree or postgraduate course, or graduated in the last 12 months",
      "You are normally no older than 32",
      "You are a national of a developing country on the OECD list, normally live there, and need help with travel and living costs",
      "You speak English and/or French well",
      "Your field is law of the sea, public international law, international relations, political science, library science, translation, or communications or media",
      "The internship is unpaid",
    ],
    documents: [
      "Online internship application form",
      "CV",
      "One-page covering letter",
      "Writing sample of up to 10 pages",
      "Proof of enrolment, or your transcripts",
      "References",
      "Language certificates",
      "Translations into English or French of documents in other languages",
    ],
  },

  'uncitral-60th-anniversary-global-essay-competition': {
    eligibility: [
      "Researchers from all subjects and career stages can enter",
      "Students must be enrolled in, or have finished, a research-based master’s or PhD programme in law",
      "You need written endorsement from your university or research institution",
      "Joint essays are allowed, with no limit on co-authors",
      "Published and unpublished work are both accepted",
      "Essays may be in any of the six UN languages",
    ],
    documents: [
      "Essay of no more than 10,000 words (including footnotes, not the bibliography)",
      "Abstract of up to 300 words, in English or French",
      "Official communication showing your university or institution endorses your entry",
      "Everything sent by email to uncitral60@un.org with the subject line “Global Essay Competition”",
    ],
  },

  'unesco-internship-priority-africa-and-external-relations-2027': {
    eligibility: [
      "You are at least 20 years old",
      "You are in the last or third-to-last year of a bachelor’s degree, enrolled in a master’s or PhD, or finished one of these within the last 12 months",
      "You write and speak English or French very well",
      "You have good computer and communication skills",
      "The internship is unpaid, and you pay for your own travel, visa and health insurance",
    ],
    documents: [
      "Online application form, completed within one hour",
      "CV",
      "Motivation letter",
    ],
  },

  'european-youth-assembly-2027-funded-seats-amsterdam': {
    eligibility: [
      "Open to all nationalities and regions",
      "You are generally between 17 and 47 years old",
      "Any study field or work background is welcome",
      "Funded seats are given through a competitive, scored selection of leadership, impact and your overall profile",
    ],
    documents: [
      "Online application form (one form covers all participation categories)",
      "Application fee of USD 17.99 (USD 21.21 with service charges and VAT); paying does not guarantee selection",
    ],
  },

  'youth-diplomacy-convention-2027-funded-seats-brussels': {
    eligibility: [
      "International applicants should be aged 17 to 47",
      "No particular field of study is required",
      "First-time applicants are encouraged to apply",
      "Scholarship seats are chosen on leadership potential, motivation and fit with the convention’s themes",
    ],
    documents: [
      "Online scholarship application form on the OGPS website",
      "Motivation statement of 250 to 400 words on why you need financial support",
      "Confirmation and processing fee (listed at £11.99)",
    ],
  },

  'nus-medicine-graduate-studies-award-phd-august-2027-intake': {
    eligibility: [
      "You hold an undergraduate degree with First Class Honours or Highest Distinction, or equivalent",
      "You get an offer to a full-time research programme at NUS Medicine",
      "You are eligible for the Singapore Ministry of Education subsidy",
      "You do not apply for the award separately; the admission committee picks up to 10 top candidates each year",
    ],
    documents: [
      "NUS Medicine graduate research programme application (this is also how you are considered for the award)",
      "Statement of purpose",
      "Letters of recommendation",
      "CV",
    ],
  },

  'sushi-tech-challenge-2027-startup-pitch-contest-tokyo': {
    eligibility: [
      "Your startup has a new technology or business model with room to grow",
      "You already have a product or service",
      "Your business fits the SusHi Tech Tokyo idea of building sustainable cities with high technology",
      "You can pitch in person at the venue on both days of the event",
    ],
    documents: [
      "Online entry form with your company information",
      "Pitch materials (in English)",
      "Pitch video, if you reach the second round",
    ],
  },

  // Checked 2026-11-25 against each call’s official page.
  'faspe-journalism-fellowship-2027': {
    eligibility: [
      "You have some journalism experience",
      "You are in a graduate programme and plan to work as a journalist, or you have finished a degree and work as a journalist",
      "Total professional experience is generally no more than 10 years",
      "Published or broadcast work from a recognised news organisation is preferred",
      "Any nationality can apply, but you must arrange your own visa",
      "You can attend the whole programme, 18 June to 2 July 2027",
    ],
    documents: [
      "Online cover form (contact details, schools attended, recommenders)",
      "Resume or CV",
      "Transcripts from every higher-education institution you spent significant time at",
      "Short essay answers (up to 1,800 words in total, one PDF)",
      "Recommendation letters sent directly by your recommenders",
    ],
  },
  'reagan-fascell-democracy-fellows-program-2027-28': {
    eligibility: [
      "You can work and write in English",
      "Your project is about political, social, economic, legal or cultural aspects of democratic development",
      "You can live in Washington, D.C. for the five-month fellowship",
      "Practitioner track: substantial experience promoting democracy or human rights, usually mid-career; no degree needed",
      "Scholarly track: a doctorate at the time of applying, a record of publications and a detailed research outline",
      "Past Reagan-Fascell fellows cannot apply again",
      "You cannot have been on a J-1 research scholar programme in the 24 months before the fellowship",
    ],
    documents: [
      "Applicant information, entered in the online portal",
      "Project proposal for the practitioner or scholarly track",
      "Letters of recommendation",
      "Resume or CV and a biography of up to 200 words",
      "All materials in English",
    ],
  },
  'harvard-loeb-fellowship-2027-28': {
    eligibility: [
      "You are a mid-career practitioner with at least 8 years of experience in your field",
      "Students cannot apply",
      "No degree is needed, and transcripts are not reviewed",
      "Applicants from outside the US are welcome, but must be able to get a J-1 visa",
    ],
    documents: [
      "Online application",
      "Three letters of recommendation",
      "Resume showing the dates of your work history",
      "Supplementary materials (optional, but recommended)",
    ],
  },
  'the-moth-poetry-prize-2026': {
    eligibility: [
      "You are over 16 when you enter",
      "Anyone in the world can enter",
      "Poems must be in English (translations are accepted with the translator’s permission)",
      "The poem is entirely your own work and has never been published, online or in print, or broadcast",
      "AI-generated work is not allowed",
      "Any length and any subject, but not a collection",
    ],
    documents: [
      "Your poem, with your name not on the same page",
      "Entry fee of €17 per poem",
      "Online entry, or by post with an entry form or cover letter giving your name, contact details and poem title",
    ],
  },
  'underwater-photographer-of-the-year-2027': {
    eligibility: [
      "Photographers of any nationality can enter",
      "Photos in the main categories must be taken underwater (split-level images are allowed)",
      "British categories need photos taken in UK waters and a British national, passport holder or resident",
      "Up & Coming is for photographers who have never won an underwater photography award or been published",
      "AI-generated images are not allowed",
    ],
    documents: [
      "Online registration and image upload",
      "JPG images, 2,000 pixels on the longest side, with camera EXIF data and no watermark",
      "Entry fee of £20, £35 or £45 for 3, 10 or 20 images (free categories allow 5 images each), paid by PayPal",
      "RAW and high-resolution files, only if you are shortlisted",
    ],
  },
  'insead-phd-in-management-2027-fully-funded': {
    eligibility: [
      "You have a bachelor’s degree or equivalent, with or without a master’s",
      "A valid GMAT or GRE score is required and cannot be waived (no minimum score)",
      "Your test score is less than five years old",
      "English test (TOEFL) if English is not your first language, unless your degree was taught entirely in English",
    ],
    documents: [
      "GMAT or GRE score report",
      "CV",
      "Transcripts",
      "Statement of purpose (about 1,500 words)",
      "Three recommendation letters, preferably from professors",
      "Recorded one-way video interview",
      "Application fee of €80",
      "TOEFL score, if required",
    ],
  },
  'gef-small-grants-programme-ethiopia-op8-tranche-2-call-for-proposals': {
    eligibility: [
      "Only not-for-profit groups can apply: locally registered NGOs, CSOs and CBOs",
      "You must show strong capacity to run a small grant project",
      "The project fits a GEF area: biodiversity, land degradation, sustainable forest management, climate change, chemicals and waste, or capacity development",
      "Priority landscapes include the Central Rift Valley and listed districts in Oromia, Sidama and Central Ethiopia",
      "The grant is up to US$75,000 and the project lasts no more than 24 months",
    ],
    documents: [
      "Project proposal on the SGP OP8 project proposal template",
      "Rough budget set against your activities",
      "Copy of the proposal sent to the national coordinator of the GEF Small Grants Programme in Ethiopia",
    ],
  },

  // Checked 2026-11-26 against each call’s official page.
  'edinburgh-cdt-in-machine-learning-systems-phd-studentships-2027-entry': {
    eligibility: [
      "You need at least a UK 2:1 honours degree, or an equivalent from another country, in a relevant subject",
      "A master’s degree is not required to apply",
      "Proof of English: a degree taught in English in a majority English-speaking country, or a test such as IELTS Academic 6.5 overall with at least 6.0 in each part",
      "A test taken within the last 2 years is accepted; without one by the offer stage you only get a conditional funding offer",
      "Some non-UK applicants need ATAS clearance, and UKRI limits international students to 3 in each yearly round",
    ],
    documents: [
      "Research proposal of about 2 to 5 pages (student-led route), or a 1 to 2 page Research Approach document (company-linked route)",
      "Personal statement of no more than 500 words, typed into the online application",
      "Two references, preferably from academics",
      "English language test result, if you need one (can follow by the offer stage)",
    ],
  },

  'sichuan-university-chinese-government-scholarship-2027-type-b-round-1': {
    eligibility: [
      "You must not be a Chinese citizen and must be in good physical and mental health",
      "Master’s applicants must hold a bachelor’s degree and be under 35",
      "PhD applicants must hold a master’s degree and be under 40",
      "Chinese-taught programmes need HSK 4 (science, engineering, medicine, agriculture) or HSK 5 (arts and humanities)",
      "English-taught programmes need TOEFL iBT above 80 or IELTS above 6 if English is not your first language",
      "Apply on both the CSC portal (campuschina.org, agency code 10610) and the Sichuan University portal",
    ],
    documents: [
      "Chinese Government Scholarship application form, in Chinese or English",
      "Passport copy",
      "Highest degree diploma, notarised (or proof of student status if you are still studying)",
      "Academic transcripts from undergraduate level onward",
      "Language certificate: HSK for Chinese-taught programmes, or IELTS/TOEFL for English-taught ones",
      "Study plan of more than 1,000 characters or words",
      "Two recommendation letters from professors or associate professors",
      "Foreigner Physical Examination Form, valid for six months",
      "Police clearance (non-criminal record) certificate, usually issued within six months",
    ],
  },

  'erasmus-mundus-joint-master-in-flood-risk-management-floodrisk-2027-29': {
    eligibility: [
      "You need a first degree equal to a BSc (180 ECTS) with a grade of at least B/B+ (US) or UK upper second class",
      "The degree should be in a related field such as civil or environmental engineering, geosciences or geography, with solid maths and water knowledge",
      "Final-year students can apply if they have at least 120 ECTS and will finish by 15 August",
      "You need an English test result (it can be uploaded later, by 1 February 2027)",
      "You cannot get the scholarship if you already had an Erasmus Mundus joint master scholarship",
      "Scholarship deadline is 3 January 2027 for partner-country applicants and 7 February 2027 for programme-country applicants",
    ],
    documents: [
      "Certified copy of your diploma (or a university statement if you are in your final year)",
      "Certified transcripts showing grades and your average",
      "Two recommendation letters from academic or professional referees, no more than a year old",
      "English test result",
      "Passports of both nationalities (if you have two) in a single PDF",
      "Answers to the five motivation questions in the online form",
    ],
  },

  'groundwatch-erasmus-mundus-joint-master-scholarship-2027-29-groundwater-and-global-change': {
    eligibility: [
      "You need a first degree equal to a BSc (180 ECTS) with a CGPA of at least B/B+ (US) or UK upper second class",
      "Your degree should be in a relevant field such as geology, hydraulic, civil, environmental or agricultural engineering, geosciences, environmental or climate sciences or geography",
      "You need enough maths knowledge",
      "You need a recognised English language test",
      "You cannot get the scholarship if you already had an Erasmus Mundus joint master scholarship",
      "If you have two nationalities, you must choose which one you apply under",
      "Scholarship deadline is 3 January 2027 for partner-country applicants and 7 February 2027 for programme-country applicants",
    ],
    documents: [
      "Certified copies of your diplomas, with a sworn English translation if needed",
      "Certified transcripts with grades and average, and an explanation of the grading system",
      "CV covering work experience and research record, if any",
      "Answers to the five motivation questions, written in your own words",
      "English test result (can be uploaded later, before 1 February 2027)",
      "Passports in a single PDF (both, if you have two nationalities)",
      "Recommendation letters",
    ],
  },

  'faspe-clergy-religious-leaders-fellowship-2027': {
    eligibility: [
      "You must be studying at a graduate level for religious leadership (seminary, divinity school, rabbinical school, Muslim chaplaincy programme or similar) when you apply",
      "Or you already work as a religious leader and got a relevant graduate degree in May 2020 or later",
      "Ordination is not required",
      "All faiths are welcome, and there is no citizenship or residency rule",
      "The fellowship is fully funded; applications close 3 January 2027",
    ],
    documents: [
      "Online cover form on the Submittable portal (contact details, schools, recommender details)",
      "Resume or CV with education, jobs, honours and publications",
      "Transcripts from schools where you spent significant time (unofficial copies are accepted)",
      "Two recommendation letters (due 10 January 2027); early-career applicants may use a supervisor or employer",
      "Answers to the short essay questions",
    ],
  },

  'ilspsd-erasmus-mundus-joint-master-in-international-law-of-security-peace-and-sustainable-development-2027-29': {
    eligibility: [
      "You need a first degree of at least 180 ECTS (or equivalent) that gives access to master’s study in the country it was issued",
      "The LL.M. track needs 60 ECTS in law; the MA track needs 60 ECTS in law, political science, international relations or related subjects",
      "Scholarship applicants must have finished their degree already; unfinished degrees can only be admitted as self-funded",
      "Non-native English speakers need CEFR C1, for example IELTS Academic 7.0 or TOEFL iBT 95, taken within two years",
      "Scholarship deadline is 4 January 2027; self-funded deadline is 31 March 2027",
    ],
    documents: [
      "Diploma and transcript of your first degree (or a transcript plus a university statement that you will finish before 31 August)",
      "Personal statement, ideally under 1,000 words: motivation, research interests and preferred Semester 3 track",
      "Two reference letters dated within two years, at least one academic",
      "Europass CV with a photo",
      "English language test result",
      "French language proof, if you choose the Brussels track",
    ],
  },

  'w-m-tapp-studentships-in-law-llm-cambridge-2027-28': {
    eligibility: [
      "You need a law degree from a UK or overseas university, or must finish it by 1 September of the year you start",
      "You must not already be a member of Gonville and Caius College",
      "You must plan to study Law at Cambridge",
      "The college expects outstanding academic ability, and an award may depend on your final degree result",
      "The studentship is not available for Criminology, and applications for the Master’s in Corporate Law are unlikely to succeed",
      "Colleges first consider applicants who name Caius as their first choice",
    ],
    documents: [
      "Application form from the Tapp studentship webpage",
      "Academic transcript",
      "Two references written for the Tapp studentship",
    ],
  },

  'centa-nerc-phd-studentships-in-environmental-science-2027-entry': {
    eligibility: [
      "You generally need a UK 2:1 at BSc level or a pass at UK MSc level, or an equivalent; each case is judged individually",
      "International students can apply, but only up to 30% of CENTA places go to them",
      "You apply to a specific advertised project; you can apply to only one project per university",
      "Student-designed projects are not accepted for autumn 2027 entry",
      "Apply by 23:59 GMT on 6 January 2027",
    ],
    documents: [
      "CENTA Studentship Application Form 2027, completed without help from the project supervisor (applications without it are rejected)",
      "CV with at least two referees",
      "Application to the host university through its portal, quoting the project reference (for example CENTA 2027-W16)",
      "Extra items some hosts ask for, such as degree certificates and English language proof (see the project advert)",
    ],
  },

  'tu-e-scholarship-for-excellence-2027-28-microchip-innovation': {
    eligibility: [
      "You must apply for a full-time master’s at TU/e starting 1 September 2027 in a selected programme: Applied Physics, Electrical Engineering, Mechanical Engineering or Mathematics & Computer Science",
      "You need a non-Dutch high school diploma or bachelor’s degree",
      "Your latest transcript needs a GPA of at least 7.5 out of 10",
      "You must be able to meet the Dutch entry visa and residence permit rules",
      "You cannot have completed higher education in the Netherlands already (exchange programmes are fine)",
      "Joint Tilburg (JADS) and European Double Degree applicants are not eligible",
      "Complete your application by 1 January 2027, 23:59 CET",
    ],
    documents: [
      "Complete application to your TU/e master’s programme, meeting its admission requirements",
      "Brief motivation letter in the application about your commitment to positive impact and relevant experience",
      "Proof of English proficiency (part of the master’s admission)",
      "Diploma and transcript (official copies are needed for enrolment)",
    ],
  },

  'oxford-pershing-square-graduate-scholarships-2027': {
    eligibility: [
      "You must be admitted to both the Oxford 1+1 MBA programme and the Oxford MBA; waitlisted applicants are not considered",
      "This covers applicants to a partnering master’s programme, to another one-year master’s, or current master’s students who got into the MBA",
      "Applicants admitted to a partnering master’s programme are considered first",
      "Selection looks at commitment to world-scale social challenges, leadership potential, academic results and character",
      "Apply to the 1+1 MBA and your master’s by 6 January 2027",
    ],
    documents: [
      "Full application to the 1+1 MBA and to your chosen master’s",
      "GMAT or GRE score",
      "Scholarship essay of up to 500 words, uploaded in the Funding section of the 1+1 MBA form",
    ],
  },

  'mastercard-foundation-afox-scholarship-oxford-mba-2027-28': {
    eligibility: [
      "You must be a citizen of an African country and ordinarily live in Africa",
      "You must not already have a master’s degree",
      "You must show a commitment to Africa’s development",
      "There is no separate scholarship application: apply to the Oxford MBA and you are considered automatically",
      "Apply by the January (Stage 4) deadline to be considered for Oxford scholarships",
      "You need an undergraduate degree and at least two years of work experience for the MBA",
    ],
    documents: [
      "Oxford MBA online application form",
      "Written supporting statement",
      "GMAT or GRE score",
      "Online assessment",
      "Undergraduate degree record",
    ],
  },

}
