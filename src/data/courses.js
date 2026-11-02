/**
 * Free courses with free certificates. Unlike opportunities these have no
 * closing date, so they live outside `kinds` and stay listed until a check
 * finds the course or certificate is no longer free.
 *
 * A course belongs here only if the course, the assessment and the proof of
 * completion are all free. Left out for charging for the certificate: Coursera,
 * edX, Alison, Knight Center MOOCs (US$30) and most UN CC:Learn courses. OpenWHO
 * stopped issuing certificates. Update COURSES_CHECKED after re-checking the list.
 */
export const COURSES_CHECKED = '2026-11-02'

const OPENLEARN = {
  provider: 'The Open University (OpenLearn)',
  level: 'Any level',
  time: 'Varies by course',
  certificate: 'Statement of participation',
  earn: 'Enrol, read every page and submit any quizzes. Carries no formal credit.',
}

const SAYLOR = {
  provider: 'Saylor Academy',
  level: 'Beginner',
  certificate: 'Certificate',
  earn: 'Pass the free final exam, usually with 70% or more. Only the optional credit exam has a fee.',
}

const SAYLOR_SUBJECT = { ...SAYLOR, level: 'Any level', time: 'Varies by course' }

export const courses = [
  /* Technology */
  { name: 'Responsive Web Design Certification', provider: 'freeCodeCamp', field: 'Technology & Computing', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Pass the certification projects and the exam.', summary: 'Learn HTML, CSS, accessibility and responsive layouts by building real projects.', url: 'https://www.freecodecamp.org/learn/' },
  { name: 'Intro to Programming', provider: 'Kaggle', field: 'Technology & Computing', level: 'Beginner', time: 'About 5 hours', certificate: 'Certificate', earn: 'Finish the course exercises.', summary: 'A first step into coding with Python, with no experience needed.', url: 'https://www.kaggle.com/learn/intro-to-programming' },
  { name: 'Introduction to Cybersecurity', provider: 'Cisco Networking Academy', field: 'Technology & Computing', level: 'Beginner', time: 'About 6 hours', certificate: 'Digital badge', earn: 'Complete the course.', summary: 'How online threats work and how people and organisations protect themselves.', url: 'https://www.netacad.com/courses/introduction-to-cybersecurity?courseLang=en-US' },
  { name: 'SkillsBuild courses', provider: 'IBM', field: 'Technology & Computing', level: 'Any level', time: 'Varies by course', certificate: 'Digital badge', earn: 'Complete a course that offers a credential.', summary: 'Free learning in AI, cybersecurity, data and cloud computing.', url: 'https://skillsbuild.org/' },

  /* Data and AI */
  { name: 'Elements of AI', provider: 'University of Helsinki', field: 'Data & AI', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Finish the course. The certificate carries no university credit.', summary: 'What artificial intelligence is and what it can do, written for non-experts.', url: 'https://www.elementsofai.com/' },
  { name: 'Intro to Machine Learning', provider: 'Kaggle', field: 'Data & AI', level: 'Beginner', time: 'About 3 hours', certificate: 'Certificate', earn: 'Finish the course exercises.', summary: 'Build your first machine learning models using Python.', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' },
  { ...SAYLOR, name: 'Introduction to Statistics', field: 'Data & AI', time: '15 hours', summary: 'Collect, describe and interpret data, from averages to probability.', url: 'https://learn.saylor.org/course/MA121' },

  /* Business */
  { name: 'Starting a Small Business', provider: 'HP LIFE', field: 'Business & Entrepreneurship', level: 'Beginner', time: 'Up to 1 hour', certificate: 'Certificate', earn: 'Complete the course.', summary: 'Write a business plan and set measures of success for a new venture.', url: 'https://www.life-global.org/course/17-starting-a-small-business' },
  { ...OPENLEARN, name: 'Money and business courses', field: 'Business & Entrepreneurship', summary: 'Free Open University courses on business, management and personal finance.', url: 'https://www.open.edu/openlearn/money-business' },
  { ...SAYLOR_SUBJECT, name: 'Business administration courses', field: 'Business & Entrepreneurship', summary: 'University-style courses covering management, strategy and leadership.', url: 'https://learn.saylor.org/course/index.php?categoryid=6' },

  /* Marketing */
  { name: 'Inbound Marketing Certification', provider: 'HubSpot Academy', field: 'Marketing & Sales', level: 'Beginner', time: 'About 5 hours', certificate: 'Certificate', earn: 'Pass the certification exam. A free account is needed.', summary: 'Attract customers with content, buyer personas, automation and reporting.', url: 'https://academy.hubspot.com/courses/inbound-marketing' },
  { name: 'Google Ads and Analytics certifications', provider: 'Google Skillshop', field: 'Marketing & Sales', level: 'Beginner', time: 'Varies by course', certificate: 'Certificate', earn: 'Pass the assessment. Foundational certifications are free; Google has said professional ones will charge a fee.', summary: 'Self-paced training on Google’s advertising and measurement tools.', url: 'https://skillshop.withgoogle.com/' },

  /* Finance */
  { ...SAYLOR, name: 'Principles of Finance', field: 'Finance & Economics', time: '33 hours', summary: 'How companies manage money and make investment and funding decisions.', url: 'https://learn.saylor.org/course/BUS202' },
  { ...SAYLOR, name: 'Principles of Microeconomics', field: 'Finance & Economics', time: '32 hours', summary: 'How people and businesses make choices, and how markets set prices.', url: 'https://learn.saylor.org/course/ECON101' },

  /* Project management */
  { name: 'KICKOFF', provider: 'Project Management Institute', field: 'Project Management', level: 'Beginner', time: 'About 45 minutes', certificate: 'Digital badge', earn: 'Complete the course.', summary: 'The basics of planning and running a project, from the body behind the PMP.', url: 'https://www.pmi.org/kickoff' },
  { name: 'Project Management Essentials', provider: 'DisasterReady', field: 'Project Management', level: 'Beginner', time: 'About 5 hours', certificate: 'Certificate', earn: 'Complete the courses and pass the exam. A free account is needed.', summary: 'Project skills for development and aid work, in English, French, Spanish and Arabic.', url: 'https://www.disasterready.org/free-certificate-project-management' },

  /* Health */
  { name: 'ICH Good Clinical Practice E6(R3)', provider: 'Global Health Training Centre', field: 'Health & Medicine', level: 'Intermediate', time: 'About 3 hours', certificate: 'Certificate', earn: 'Score 80% or more on the final quiz.', summary: 'The international standard for running clinical trials, across eight modules.', url: 'https://globalhealthtrainingcentre.tghn.org/ich-gcp-r3/' },
  { name: 'Good Clinical Practice', provider: 'US National Institute on Drug Abuse', field: 'Health & Medicine', level: 'Intermediate', time: 'About 6 hours', certificate: 'Certificate', earn: 'Score at least 80% on all quizzes. The certificate expires after three years.', summary: 'Self-paced clinical research training, updated to the current ICH guidance.', url: 'https://gcp.nidatraining.org/' },
  { ...OPENLEARN, name: 'Health, sports and psychology courses', field: 'Health & Medicine', summary: 'Free Open University courses on health care, mental health, psychology and sport.', url: 'https://www.open.edu/openlearn/health-sports-psychology' },

  /* Agriculture */
  { name: 'FAO elearning Academy', provider: 'Food and Agriculture Organization of the UN', field: 'Agriculture & Food', level: 'Any level', time: 'Varies by course', certificate: 'Digital badge', earn: 'Score 75% or more on the final assessment.', summary: 'Courses across 25 areas, including food security, fisheries, soils, forests and farmer field schools.', url: 'https://elearning.fao.org/' },

  /* Environment */
  { ...OPENLEARN, name: 'Nature and environment courses', field: 'Environment & Water', summary: 'Free Open University courses on climate, ecosystems and sustainability.', url: 'https://www.open.edu/openlearn/nature-environment' },
  { name: 'WASH Foundational Course', provider: 'UNICEF Agora', field: 'Environment & Water', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the eight modules, the multiple-choice exam and the course evaluation.', summary: 'The basics of water, sanitation and hygiene programmes. A free Agora account is needed.', url: 'https://agora.unicef.org/course/info.php?id=22088' },

  /* Engineering */
  { name: 'MATLAB Onramp', provider: 'MathWorks', field: 'Engineering', level: 'Beginner', time: 'About 2 hours', certificate: 'Certificate', earn: 'Complete the course. A free MathWorks account is needed.', summary: 'Hands-on basics of MATLAB, widely used in engineering and science.', url: 'https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted' },
  { name: 'Simulink Onramp', provider: 'MathWorks', field: 'Engineering', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the course. A free MathWorks account is needed.', summary: 'Create, edit and simulate models of engineering systems.', url: 'https://matlabacademy.mathworks.com/details/simulink-onramp/simulink' },

  /* Science */
  { ...SAYLOR, name: 'Introduction to Molecular and Cellular Biology', field: 'Science & Maths', time: '36 hours', summary: 'How cells work, from molecules and genetics to energy and growth.', url: 'https://learn.saylor.org/course/BIO101' },
  { ...OPENLEARN, name: 'Science, maths and technology courses', field: 'Science & Maths', summary: 'Free Open University courses across the sciences, maths, engineering and technology.', url: 'https://www.open.edu/openlearn/science-maths-technology' },

  /* Law */
  { name: 'General Course on Intellectual Property (DL-101)', provider: 'World Intellectual Property Organization', field: 'Law & Human Rights', level: 'Beginner', time: 'About 55 hours', certificate: 'Certificate', earn: 'Pass the final multiple-choice exam. The course runs in sessions, so register for the next open one.', summary: 'Copyright, patents, trademarks and other forms of intellectual property.', url: 'https://www.wipo.int/en/web/wipo-academy/programs/ip-elearning/index' },
  { name: 'Human Rights Academy courses', provider: 'Amnesty International', field: 'Law & Human Rights', level: 'Beginner', time: '15 minutes to 15 hours', certificate: 'Certificate', earn: 'Pass with 50% or more. Not every course gives a certificate, so check its details page first.', summary: 'Human rights courses in more than 30 languages.', url: 'https://www.amnesty.org/en/get-involved/online-courses/' },
  { ...OPENLEARN, name: 'Society, politics and law courses', field: 'Law & Human Rights', summary: 'Free Open University courses on law, politics and how society works.', url: 'https://www.open.edu/openlearn/society-politics-law' },

  /* Education */
  { name: 'TeachingEnglish training courses', provider: 'British Council', field: 'Education & Teaching', level: 'Intermediate', time: '9–12 hours each', certificate: 'Certificate', earn: 'Complete all the modules. Each course has its own end date, and many run to 31 March 2027.', summary: 'Teacher development on classroom management, feedback and more. Assumes at least B1 English.', url: 'https://www.teachingenglish.org.uk/professional-development-for-teachers/training-courses' },
  { ...OPENLEARN, name: 'Education and development courses', field: 'Education & Teaching', summary: 'Free Open University courses on teaching, learning and study skills.', url: 'https://www.open.edu/openlearn/education-development' },

  /* Arts */
  { name: 'Graphic Design Essentials', provider: 'Canva Design School', field: 'Arts, Design & History', level: 'Beginner', time: 'About 1 hour', certificate: 'Certificate', earn: 'Pass the end-of-course quiz. Not externally accredited.', summary: 'Core design principles over ten short lessons.', url: 'https://www.canva.com/design-school/courses/graphic-design-essentials/' },
  { ...OPENLEARN, name: 'History and the arts courses', field: 'Arts, Design & History', summary: 'Free Open University courses on history, literature, creative writing and art.', url: 'https://www.open.edu/openlearn/history-the-arts' },
  { ...SAYLOR_SUBJECT, name: 'Arts and humanities courses', field: 'Arts, Design & History', summary: 'University-style courses across the arts and humanities.', url: 'https://learn.saylor.org/course/index.php?categoryid=82' },

  /* Languages */
  { ...OPENLEARN, name: 'Language courses', field: 'Languages', summary: 'Free Open University language courses, including Everyday English.', url: 'https://www.open.edu/openlearn/languages' },
  { ...SAYLOR_SUBJECT, name: 'English as a Second Language courses', field: 'Languages', summary: 'Build reading, writing and speaking skills in English.', url: 'https://learn.saylor.org/course/index.php?categoryid=29' },

  /* Society */
  { name: 'I Know Gender 1-2-3', provider: 'UN Women Training Centre', field: 'Society & Gender', level: 'Beginner', time: 'About 2.5 hours', certificate: 'Certificate', earn: 'Complete the three core modules.', summary: 'Gender concepts, international frameworks and gender equality in practice. English, French or Spanish.', url: 'https://portal.trainingcentre.unwomen.org/product/i-know-gender-1-2-3-gender-concepts-to-get-started-international-frameworks-for-gender-equality-and-promoting-gender-equality-throughout-the-un-system/' },
  { ...SAYLOR_SUBJECT, name: 'Social science courses', field: 'Society & Gender', summary: 'University-style courses in the social sciences.', url: 'https://learn.saylor.org/course/index.php?categoryid=85' },

  /* Humanitarian */
  { name: 'Personal Safety and Security Certificate', provider: 'DisasterReady and Save the Children', field: 'Humanitarian & Development', level: 'Beginner', time: 'Ten short courses', certificate: 'Certificate', earn: 'Pass the 30-question test. A free account is needed.', summary: 'Stay safe when working in humanitarian settings.', url: 'https://www.disasterready.org/certificate-safety-security' },
]

export const courseFields = [...new Set(courses.map((c) => c.field))]
export const courseLevels = ['Beginner', 'Intermediate', 'Any level']
