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
}
