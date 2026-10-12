/**
 * Long-form overview content for well-known programmes, keyed by listing slug.
 *   about — what the opportunity is and why it exists
 *   host  — the organisation or university behind it
 *   how   — how the programme and its selection work
 * Listings without an entry get a generated overview built only from their
 * own data (see src/lib/overview.js) — nothing is invented for them.
 */

export const overviews = {
  /* ---------------------------------------------------------- Scholarships */
  'chevening-scholarship': {
    about: [
      'Chevening is the UK Government’s international scholarship programme. It funds outstanding professionals with clear leadership potential to complete a one-year master’s degree at any UK university, in almost any subject.',
      'The programme is not only about academic results. Chevening looks for people who will return home and use what they learn to create change — in government, business, civil society, media or the arts — and who will stay connected to the UK and to each other through the alumni network.',
    ],
    host: [
      'Chevening is funded by the Foreign, Commonwealth and Development Office (FCDO) together with partner organisations, and has been running since 1983. It operates in more than 160 countries and territories through the British embassies and high commissions there.',
      'Its global alumni network includes heads of state, ministers, business leaders and journalists, and scholars join that community from the day they arrive in the UK.',
    ],
    how: [
      'Applicants complete one online application with four essays — on leadership, networking, why they want to study in the UK, and their career plan — and choose three eligible master’s courses. Two references are submitted through the same system.',
      'Applications are screened for eligibility, then read by independent reviewers. Shortlisted candidates are interviewed at their local British embassy or high commission. Successful candidates receive a conditional offer and must secure an unconditional university offer by the summer deadline before the award is confirmed.',
      'Scholars must return to their country of citizenship for at least two years after the award ends.',
    ],
  },

  'daad-epos-scholarship': {
    about: [
      'The Development-Related Postgraduate Courses programme (EPOS) funds professionals from developing and newly industrialised countries to complete a master’s or doctoral degree at a German university, in courses chosen for their relevance to development.',
      'It is designed for people already working in their field. Graduates are expected to take their new skills back to their home countries and institutions.',
    ],
    host: [
      'The DAAD (German Academic Exchange Service) is the world’s largest funding organisation for the international exchange of students and researchers. It is funded largely by the German federal government and runs hundreds of programmes every year.',
    ],
    how: [
      'Unlike most scholarships, you do not apply to DAAD directly. You choose up to three courses from the current EPOS list and apply to each course by its own deadline. The universities select candidates and nominate them to DAAD for funding.',
      'Courses can be taught in English or German. Where German is needed, the scholarship can include an intensive language course in Germany before studies begin.',
    ],
  },

  'vanier-canada-graduate-scholarship': {
    about: [
      'Vanier Canada Graduate Scholarships help Canadian universities attract highly qualified doctoral students from Canada and around the world. Candidates are assessed equally on academic excellence, research potential and leadership.',
    ],
    host: [
      'The programme is named after Major-General Georges P. Vanier, Canada’s first francophone Governor General, and has been delivered by Canada’s three federal research funding agencies — for health research, natural sciences and engineering, and social sciences and humanities.',
    ],
    how: [
      'Students cannot apply directly. A Canadian university nominates you, so the first step is to contact the faculty of graduate studies where you will do your PhD and meet its internal deadline, which is usually several weeks before the national one.',
      'You prepare the research proposal and a personal leadership statement, usually with your prospective supervisor, and arrange referee assessments. Canada’s research funding is being reorganised, so confirm the programme’s current name and status before applying.',
    ],
  },

  'erasmus-mundus-joint-masters': {
    about: [
      'Erasmus Mundus Joint Masters are prestigious, integrated master’s programmes delivered jointly by several universities in different countries. Students study in at least two countries and graduate with a joint or multiple degree.',
      'The best-ranked applicants to each programme receive an EU-funded scholarship that covers participation costs and pays a monthly allowance for the whole programme.',
    ],
    host: [
      'Erasmus Mundus is part of Erasmus+, the European Union’s programme for education, training, youth and sport. It is managed by the European Education and Culture Executive Agency (EACEA), while each programme is run by its own university consortium.',
    ],
    how: [
      'There is no central application. You search the Erasmus Mundus catalogue, choose up to three programmes, and apply to each one directly through its website by its own deadline — most fall between October and February.',
      'Each consortium ranks applicants; top candidates are offered a scholarship and others may be placed on a reserve list and funded later if places open up.',
    ],
  },

  'lester-b-pearson-scholarship': {
    about: [
      'The Lester B. Pearson International Scholarship is the University of Toronto’s most prestigious award for international students. It recognises exceptional academic achievement, creativity and leadership, and covers the full cost of an undergraduate degree for four years.',
    ],
    host: [
      'The University of Toronto is Canada’s largest university and consistently one of the top-ranked universities in the world. The scholarship is named after Lester B. Pearson, former Prime Minister of Canada and winner of the 1957 Nobel Peace Prize.',
    ],
    how: [
      'You must first be nominated by your secondary school, which can usually nominate one student. You then apply for admission to the University of Toronto and complete the Pearson scholarship application, including written responses.',
      'Selection looks at your whole profile: academic results, creativity, community impact and the potential to lead.',
    ],
  },

  'australia-awards-scholarship': {
    about: [
      'Australia Awards Scholarships are long-term development awards that fund full-time undergraduate or postgraduate study at participating Australian universities. They aim to build skills and leadership that help partner countries develop, and to strengthen links with Australia.',
    ],
    host: [
      'The scholarships are funded and managed by the Australian Government’s Department of Foreign Affairs and Trade (DFAT). Priority fields, eligibility and timetables are set country by country.',
    ],
    how: [
      'Applications are made online in OASIS during the annual window. Shortlisted applicants are interviewed and may take an English test. Successful scholars complete an introductory academic programme in Australia before their degree starts.',
      'Scholars must return home for at least two years after finishing, so the skills they gain benefit their own country.',
    ],
  },

  'holland-scholarship': {
    about: [
      'The NL Scholarship (previously the Holland Scholarship) is a one-off grant for international students from outside the European Economic Area who start a bachelor’s or master’s programme in the Netherlands.',
    ],
    host: [
      'It is funded by the Dutch Ministry of Education, Culture and Science together with participating Dutch research universities and universities of applied sciences.',
    ],
    how: [
      'You apply through the Dutch institution you are applying to, not through a central portal. Each university sets its own selection criteria and deadline — usually 1 February or 1 May. The grant is paid in your first year of study.',
    ],
  },

  'mext-japanese-government-scholarship': {
    about: [
      'The Japanese Government (MEXT) Scholarship is one of the most comprehensive government scholarships in the world. It covers tuition, a monthly allowance and travel for international students coming to study in Japan.',
    ],
    host: [
      'It is offered by Japan’s Ministry of Education, Culture, Sports, Science and Technology (MEXT). Candidates are recommended either by a Japanese embassy or consulate in their country, or by a Japanese university.',
    ],
    how: [
      'On the embassy route, you apply to the Japanese embassy in your country, sit written exams and an interview, and then obtain a letter of provisional acceptance from a Japanese university before MEXT makes the final decision.',
      'Many research students begin as non-degree research students and then move into a master’s or doctoral course. Some scholars first study Japanese full-time.',
    ],
  },

  'swiss-government-excellence-scholarship': {
    about: [
      'The Swiss Government Excellence Scholarships give young researchers from abroad the chance to pursue doctoral or postdoctoral research at a Swiss public university, one of the two federal institutes of technology, or a university of applied sciences.',
    ],
    host: [
      'The scholarships are awarded by the Federal Commission for Scholarships for Foreign Students (FCS) on behalf of the Swiss Confederation. Applications go through the Swiss embassy responsible for your country.',
    ],
    how: [
      'You need a Swiss professor who agrees to supervise your project and writes a letter of support. With their input you write a research proposal, then submit the full application to the Swiss embassy by its deadline — which varies by country.',
      'Shortlisted candidates are reviewed by the FCS, and results are usually announced in spring.',
    ],
  },

  'princeton-fung-global-fellows': {
    about: [
      'The Fung Global Fellows Program brings six early-career scholars from outside the United States to Princeton for one academic year to research a shared theme. The 2027–28 theme is “Democracy in Crisis?”.',
    ],
    host: [
      'The programme is run by the Princeton Institute for International and Regional Studies (PIIRS). Princeton University, founded in 1746, is one of the oldest and most highly ranked universities in the United States.',
    ],
    how: [
      'Fellows are salaried Princeton employees, live in or near Princeton, and take part in the programme’s seminars and cohort activities. Applications — cover letter, CV, research proposal, writing sample and referee details — are submitted online through Interfolio.',
    ],
  },

  'university-of-tennessee-international-volunteer-scholarship': {
    about: [
      'UT Knoxville’s international merit scholarships reward strong first-year international students with a renewable award each year, scaled to their ACT or SAT results.',
    ],
    host: [
      'The University of Tennessee, Knoxville is the flagship campus of the University of Tennessee System, founded in 1794. Its students are known as the Volunteers.',
    ],
    how: [
      'There is no separate scholarship form: eligible international first-year applicants are considered automatically when they apply for admission by the stated date. Awards are renewable while you keep the required GPA.',
    ],
  },

  "commonwealth-master-s-scholarships": {
    about: [
      'Commonwealth Master’s Scholarships fund talented people from low- and middle-income Commonwealth countries to take a one-year master’s degree at a UK university, with the aim of building skills for development in their home countries.',
    ],
    host: [
      'The scholarships are awarded by the Commonwealth Scholarship Commission in the UK (CSC), funded by the UK Foreign, Commonwealth and Development Office. Since 1960 the Commonwealth Scholarship and Fellowship Plan has supported tens of thousands of scholars.',
    ],
    how: [
      'Most candidates apply through a national nominating agency in their own country, which sets its own (often earlier) deadline and shortlists applicants for the CSC. You also complete the CSC’s online application.',
      'Selection weighs academic merit, the quality of your study plan and the potential impact of your work on your country’s development.',
    ],
  },

  'gates-cambridge-scholarship': {
    about: [
      'Gates Cambridge Scholarships are full-cost awards for outstanding applicants from outside the UK to study a full-time postgraduate degree at the University of Cambridge.',
      'Scholars are chosen for outstanding intellectual ability, leadership potential and a commitment to improving the lives of others.',
    ],
    host: [
      'The programme was established in 2000 through a donation from the Bill & Melinda Gates Foundation to the University of Cambridge, one of the world’s oldest and most respected universities.',
    ],
    how: [
      'You apply through the University of Cambridge graduate application and select the Gates Cambridge option, writing an additional statement. There are two rounds: an earlier one for US citizens and a later one for everyone else.',
      'Departments first rank applicants academically; shortlisted candidates are then reviewed by the Trust and interviewed.',
    ],
  },

  'fulbright-foreign-student-program': {
    about: [
      'The Fulbright Foreign Student Program brings graduate students, young professionals and artists from abroad to the United States for graduate study and research.',
    ],
    host: [
      'Fulbright is the US Government’s flagship international exchange programme, founded in 1946 on the initiative of Senator J. William Fulbright. It operates in more than 160 countries.',
    ],
    how: [
      'Applications are handled in your own country by the binational Fulbright Commission or the US embassy, which sets its own deadline and requirements. Shortlisted candidates are interviewed locally.',
    ],
  },

  'hong-kong-phd-fellowship-scheme': {
    about: [
      'The Hong Kong PhD Fellowship Scheme attracts the best students from around the world to pursue a PhD at Hong Kong’s universities, in any field. Fellows receive a monthly stipend and a conference and research-related travel allowance.',
    ],
    host: [
      'The scheme is run by the Research Grants Council (RGC) of Hong Kong, which funds academic research at the city’s universities.',
    ],
    how: [
      'You submit an initial application through the RGC’s online portal, then apply for PhD admission at one or more participating Hong Kong universities, mentioning your fellowship reference. Universities shortlist candidates and the RGC makes the final selection.',
    ],
  },

  'global-korea-scholarship-2027-undergraduate': {
    about: [
      'The Global Korea Scholarship (GKS) brings international students to study for degrees at Korean universities, with tuition, a monthly allowance, airfare and usually a year of Korean language training.',
    ],
    host: [
      'GKS is a programme of the Korean government, run by the National Institute for International Education (NIIED) under the Ministry of Education.',
    ],
    how: [
      'There are embassy and university application tracks. Most scholars spend their first year learning Korean before starting their degree.',
    ],
  },

  'russian-government-scholarship-open-doors-quota': {
    about: [
      'The Russian Government Scholarship (quota) lets international students study at Russian universities, from bachelor’s level to doctoral studies, free of tuition.',
    ],
    host: [
      'The quota is set by the Russian government and administered through the official education-in-russia.com portal and Russian cultural centres abroad.',
    ],
    how: [
      'You register on the portal, choose programmes and universities, and upload documents. Selection usually includes a review of your portfolio and sometimes tests. Check what living costs, travel and insurance are covered before you accept.',
    ],
  },

  'ubc-international-scholars-program-2027': {
    about: [
      'The UBC International Scholars Program recognises international students entering university from secondary school who show academic excellence together with strong leadership and community involvement.',
    ],
    host: [
      'The University of British Columbia, with campuses in Vancouver and the Okanagan, is one of Canada’s leading research universities.',
    ],
    how: [
      'Awards are based on your UBC application and a separate scholarship application. Some awards consider financial need. Apply for admission and the scholarship by the deadline, then submit your admission documents by the later document date.',
    ],
  },

  'edinburgh-x-mastercard-foundation-online-learning-scholars': {
    about: [
      'This programme offers fully funded online postgraduate study at the University of Edinburgh for talented African students, so they can earn an Edinburgh qualification without leaving home.',
    ],
    host: [
      'The University of Edinburgh, founded in 1583, is one of the world’s top universities. The scholarships are part of the Mastercard Foundation Scholars Program, which supports young Africans to lead change in their communities.',
    ],
    how: [
      'Applicants apply for one of the eligible online programmes and complete the scholarship application, which looks at academic potential, leadership and commitment to giving back.',
    ],
  },

  'schlumberger-faculty-for-the-future': {
    about: [
      'Faculty for the Future fellowships support women from developing and emerging economies to pursue PhD or post-doctoral study in science, technology, engineering and mathematics at leading universities abroad.',
    ],
    host: [
      'The programme was launched in 2004 by the Schlumberger (SLB) Foundation. Fellows are expected to return to their home countries to strengthen teaching and research there.',
    ],
    how: [
      'You need an admission or registration at a host university, then submit the online application with your research plan and references. Grants can be renewed for later years of study.',
    ],
  },

  'margaret-mcnamara-educational-grants-usa-canada': {
    about: [
      'Margaret McNamara Education Grants support women from developing countries who are studying and who are committed to improving the lives of women and children in their communities.',
    ],
    host: [
      'The programme was founded in memory of Margaret McNamara, who championed education and literacy. It runs separate rounds for students in the USA and Canada, South Africa and Latin America.',
    ],
    how: [
      'Applicants must already be enrolled at an eligible university. The application includes essays about your goals and how your work will benefit women and children.',
    ],
  },

  'kaad-master-and-phd-scholarships-germany': {
    about: [
      'KAAD scholarships support graduates from Africa, Asia, Latin America, the Middle East and Eastern Europe to take a master’s or doctorate in Germany.',
    ],
    host: [
      'KAAD (the Catholic Academic Exchange Service) is the scholarship agency of the Catholic Church in Germany, based in Bonn. It works with partner committees in applicants’ home countries.',
    ],
    how: [
      'Applications usually go through the KAAD partner committee in your country. Selection looks at academic quality, your plans to contribute to your home country and your social or church engagement.',
    ],
  },

  'daad-scholarships-selected-programmes': {
    about: [
      'DAAD funds thousands of international students and researchers each year through programmes ranging from master’s scholarships to doctoral research grants in Germany.',
    ],
    host: [
      'The DAAD (German Academic Exchange Service) is the world’s largest funding organisation for the international exchange of students and researchers.',
    ],
    how: [
      'Each DAAD programme has its own call, eligibility rules and deadline. Use the DAAD scholarship database to filter by your country, level and field, then follow that call’s instructions.',
    ],
  },

  /* ----------------------------------------------------------- Fellowships */
  'yali-mandela-washington-fellowship': {
    about: [
      'The Mandela Washington Fellowship is the flagship programme of the Young African Leaders Initiative (YALI). It brings young African leaders to the United States for an intensive academic and leadership institute at a US university, followed by a summit.',
    ],
    host: [
      'YALI was launched in 2014 by the US Government to invest in the next generation of African leaders. The fellowship is funded by the US Department of State.',
    ],
    how: [
      'Applicants describe their leadership experience and plans in an online application. Semi-finalists are interviewed at the US embassy. Fellows join tracks in business, civic engagement or public management.',
    ],
  },
  'mo-ibrahim-foundation-leadership-fellowships': {
    about: [
      'The Ibrahim Leadership Fellowships prepare exceptional young Africans for senior leadership through a 12-month placement in the executive office of a leading multilateral institution working on Africa’s development.',
    ],
    host: [
      'The Mo Ibrahim Foundation was established in 2006 by Mo Ibrahim, the Sudanese-British entrepreneur, to promote good governance and leadership in Africa.',
    ],
    how: [
      'Candidates apply online with references; shortlisted applicants are interviewed. Fellows receive a stipend and work directly with senior leaders throughout the year.',
    ],
  },
  'yale-maurice-r-greenberg-world-fellows': {
    about: [
      'Yale World Fellows is a fully funded leadership programme that brings a small, international cohort of accomplished mid-career leaders to Yale University for a semester of study, reflection and exchange.',
    ],
    host: [
      'The programme was founded in 2002 and is part of the Jackson School of Global Affairs at Yale University.',
    ],
    how: [
      'Fellows design their own learning plan, attend seminars and Yale courses, and take part in leadership development activities. Selection looks for a strong record of impact and the potential to rise further.',
    ],
  },
  'nasa-hubble-fellowship-program': {
    about: [
      'The NASA Hubble Fellowship Program supports outstanding postdoctoral scientists in astrophysics for up to three years of independent research at a US host institution of their choice.',
    ],
    host: [
      'The programme is administered by the Space Telescope Science Institute (STScI) on behalf of NASA. Fellows are named in three sub-categories — Einstein, Hubble and Sagan — according to their research area.',
    ],
    how: [
      'Applicants submit a research proposal, CV and letters of reference. Fellows choose their host institution after being selected.',
    ],
  },
  'imf-economist-program': {
    about: [
      'The IMF Economist Program is the main entry route for recent PhD economists into the International Monetary Fund. It combines rotations across IMF departments with training, leading to a regular staff position.',
    ],
    host: [
      'The International Monetary Fund works to promote global monetary cooperation and financial stability. It has 190 member countries and is based in Washington, DC.',
    ],
    how: [
      'Applicants submit an online application with research and references. Shortlisted candidates are interviewed, often at major economics job-market meetings or virtually.',
    ],
  },

  /* ---------------------------------------------------------------- Grants */
  'tony-elumelu-foundation-entrepreneurship-programme-2027': {
    about: [
      'The TEF Entrepreneurship Programme trains, mentors and funds young African entrepreneurs, giving selected participants non-returnable seed capital of up to US$5,000 after they complete business training.',
    ],
    host: [
      'The Tony Elumelu Foundation was founded in 2010 by Nigerian economist and businessman Tony Elumelu. In 2015 it committed US$100 million to empower African entrepreneurs over ten years.',
    ],
    how: [
      'You apply on the TEFConnect portal with your business idea. Selected entrepreneurs take a structured online training course and must complete it to receive seed capital. Alumni join a large pan-African network.',
    ],
  },
  'africa-prize-for-engineering-innovation': {
    about: [
      'The Africa Prize for Engineering Innovation is Africa’s biggest prize dedicated to engineering innovation. It supports African innovators who develop scalable engineering solutions to local challenges.',
    ],
    host: [
      'The prize was founded in 2014 by the UK’s Royal Academy of Engineering and has supported more than 165 businesses from 22 countries.',
    ],
    how: [
      'Applications go through two stages. Shortlisted innovators join an eight-month accelerator with mentoring and training before finalists pitch for the prize money.',
    ],
  },
  'national-geographic-explorer-grants': {
    about: [
      'National Geographic grants fund individuals working on bold projects in science, conservation, education, technology and storytelling. Level I grants are for people new to the National Geographic network.',
    ],
    host: [
      'The National Geographic Society is a global non-profit founded in 1888 to explore and protect our world.',
    ],
    how: [
      'Applicants submit a project proposal with budget and timeline in one of the funding rounds. Projects are judged on the idea, the applicant’s capacity to deliver and the potential impact.',
    ],
  },
  'pollination-project-seed-grants': {
    about: [
      'The Pollination Project gives small seed grants to individuals starting grassroots projects that make their communities kinder, healthier and more just. No formal organisation is required.',
    ],
    host: [
      'The Pollination Project is a US-based foundation founded in 2013 that awards seed grants every day of the year to changemakers around the world.',
    ],
    how: [
      'You submit a short online application describing your project, the people it helps and how you will use the grant. Applications are reviewed on a rolling basis.',
    ],
  },
  'whitley-award': {
    about: [
      'Whitley Awards recognise and fund outstanding grassroots conservation leaders, mainly in the Global South, whose work protects wildlife and habitats with local communities.',
    ],
    host: [
      'The Whitley Fund for Nature is a UK charity founded in 1993. Its patron is HRH The Princess Royal, who presents the awards at a ceremony in London.',
    ],
    how: [
      'Applicants submit a project application with references. Shortlisted candidates are interviewed, and winners receive project funding and training in communications and leadership.',
    ],
  },

  /* ----------------------------------------------------------- Internships */
  'imf-fund-internship-program-2027': {
    about: [
      'The Fund Internship Program (FIP) gives PhD students a full-time, paid summer at IMF headquarters working on research or policy projects with IMF economists.',
    ],
    host: [
      'The International Monetary Fund promotes global monetary cooperation and financial stability and has 190 member countries.',
    ],
    how: [
      'Applicants submit an online application with CV and research details. Shortlisted candidates are interviewed; interns present their work at the end of the summer.',
    ],
  },
  'eu-blue-book-traineeship-october-2027': {
    about: [
      'The Blue Book traineeship is the European Commission’s official paid traineeship. Trainees spend five months in a Commission department or agency working on real policy files.',
    ],
    host: [
      'The European Commission is the executive body of the European Union, based mainly in Brussels and Luxembourg.',
    ],
    how: [
      'You apply online. Pre-selected candidates enter the “Virtual Blue Book”, from which Commission departments choose their trainees. There are two sessions each year, starting in March and October.',
    ],
  },
  'unicef-internship-programme': {
    about: [
      'UNICEF internships give students and recent graduates practical experience supporting programmes for children, with a monthly stipend.',
    ],
    host: [
      'UNICEF, the United Nations Children’s Fund, was created in 1946 and works in more than 190 countries and territories to protect children’s rights and well-being.',
    ],
    how: [
      'Internships are advertised throughout the year on UNICEF’s careers site. Each posting has its own deadline and requirements.',
    ],
  },
  'un-world-food-programme-internships': {
    about: [
      'WFP internships let students and recent graduates contribute to the fight against hunger in country offices, regional bureaux and headquarters.',
    ],
    host: [
      'The World Food Programme is the world’s largest humanitarian organisation fighting hunger and was awarded the Nobel Peace Prize in 2020.',
    ],
    how: ['Internships are posted on WFP’s careers site on a rolling basis, each with its own requirements.'],
  },
  'teach-for-india-youth-fellowships': {
    about: [
      'The Teach For India Fellowship places graduates and young professionals as full-time teachers in low-income schools for two years, building leaders committed to educational equity.',
    ],
    host: ['Teach For India was founded in 2008 by Shaheen Mistri and is part of the global Teach For All network.'],
    how: ['Applicants complete an online application, an assessment and interviews. Fellows receive training before and during their placement.'],
  },
  'paid-voluntary-service-in-germany': {
    about: [
      'Germany’s Federal Volunteer Service (Bundesfreiwilligendienst) lets people of any age volunteer full-time in social, ecological, cultural or sports organisations for usually 6 to 24 months, with a monthly allowance.',
    ],
    host: ['The service is run by the German federal government through approved host organisations across the country.'],
    how: [
      'You apply directly to a host organisation. Applicants from outside the EU also need a visa, which the host organisation can usually help with.',
    ],
  },
}
