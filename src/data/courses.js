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

  { name: 'Introduction to Clinical Research', provider: 'Global Health Training Centre', field: 'Health & Medicine', level: 'Beginner', time: 'About 45 minutes', certificate: 'Certificate', earn: 'Score 80% or more on the final quiz.', summary: 'Why and how clinical research is done, research ethics and the five main study designs.', url: 'https://globalhealthtrainingcentre.tghn.org/introduction-clinical-research/' },
  { name: 'Research Ethics Online Training', provider: 'Global Health Training Centre', field: 'Health & Medicine', level: 'Intermediate', time: '10 modules, 15–30 minutes each', certificate: 'Certificate', earn: 'Score 80% or more on the quiz. Adapted from a WHO course, but not accredited by WHO.', summary: 'The ethical principles behind research with people, for researchers and review committees.', url: 'https://globalhealthtrainingcentre.tghn.org/research-ethics-online-training-v2/' },
  { name: 'Introduction to the Principles and Practice of Clinical Research', provider: 'US National Institutes of Health', field: 'Health & Medicine', level: 'Intermediate', time: 'About 40 recorded lectures', certificate: 'Certificate', earn: 'Register by 25 June 2027 and score 80% or more on the final exam by 22 July 2027. Carries no academic or CME credit.', summary: 'NIH’s yearly course on designing, running and reporting clinical research.', url: 'https://ocreco.od.nih.gov/courses/ippcr.html' },
  { name: 'Mental health virtual courses', provider: 'Pan American Health Organization', field: 'Health & Medicine', level: 'Any level', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the course to receive a certificate of participation.', summary: 'Courses including Humanitarian mhGAP, suicide prevention and psychological first aid.', url: 'https://www.paho.org/en/mental-health-virtual-courses' },
  { name: 'Gender and HIV', provider: 'International AIDS Society', field: 'Health & Medicine', level: 'Intermediate', time: 'About 3 hours', certificate: 'Certificate', earn: 'Complete all the modules and the feedback survey. A free account is needed.', summary: 'How gender shapes HIV risk, prevention and care.', url: 'https://plus.iasociety.org/all-courses/gender-and-hiv' },

  /* Public health */
  { name: 'Virtual Campus self-learning courses', provider: 'Pan American Health Organization', field: 'Public Health', level: 'Any level', time: 'Varies by course', certificate: 'Certificate', earn: 'Usually pass the final exam and complete a short survey. PAHO never charges for certificates. A few courses are limited to certain countries.', summary: 'Open-access public health courses from the WHO regional office for the Americas, in several languages.', url: 'https://campus.paho.org/en/courses/self-learning' },
  { name: 'Global health courses', provider: 'Global Health Learning Center', field: 'Public Health', level: 'Any level', time: 'Varies by course', certificate: 'Certificate', earn: 'Finish the course requirements and pass the final exam. A free account is needed.', summary: 'More than 90 courses on topics such as child survival, infectious disease and health systems.', url: 'https://globalhealthlearning.org/' },
  { name: 'Mpox Course', provider: 'Global Health Learning Center', field: 'Public Health', level: 'Intermediate', time: 'Five short modules', certificate: 'Certificate', earn: 'Complete the modules and quizzes and pass the final exam.', summary: 'Prevent, diagnose and respond to mpox, for health professionals.', url: 'https://globalhealthlearning.org/mpox/' },
  { name: 'Public Health Leadership', provider: 'NextGenU, on Global Health Learning Center', field: 'Public Health', level: 'Intermediate', time: 'Self-paced', certificate: 'Certificate', earn: 'Pass the course tests. You need a bachelor’s degree to register, and it carries no academic credit unless your own institution approves it.', summary: 'Leading people and programmes in public health.', url: 'https://globalhealthlearning.org/courses/public-health-leadership/' },
  { name: 'Safe and Sustainable Health-Care Waste Management', provider: 'WHO Academy', field: 'Public Health', level: 'Intermediate', time: 'Up to 2 hours', certificate: 'Certificate', earn: 'Complete the six modules and final assessment to receive a confirmation of participation.', summary: 'Manage health-care waste safely, from WHO’s 2026 course.', url: 'https://whoacademy.org/coursewares/course-v1:WHOAcademy-Hosted+H0160EN+2026_Q2?source=edX' },
  { name: 'CDC TRAIN free course catalogue', provider: 'US Centers for Disease Control and Prevention', field: 'Public Health', level: 'Any level', time: 'Varies by course', certificate: 'Certificate', earn: 'Create a free account, then check each course page: requirements differ, and not every course gives a certificate or credit.', summary: 'About 10,000 courses, including thousands by CDC experts, on topics such as emergency response and infectious disease.', url: 'https://www.train.org/cdctrain/search?max_list_price=0&type=course' },
  { name: 'Watch Me! Celebrating Milestones and Sharing Concerns', provider: 'US Centers for Disease Control and Prevention', field: 'Public Health', level: 'Beginner', time: 'Four modules', certificate: 'Certificate', earn: 'Complete all four modules and print the certificate. For continuing education, pass the CDC TRAIN posttest (WB5027) by 1 August 2029.', summary: 'Track child development milestones and raise concerns early, for people who work with young children.', url: 'https://www.cdc.gov/watch-me-training/index.html' },
  { name: 'Epidemiology', provider: 'NextGenU', field: 'Public Health', level: 'Intermediate', time: 'Eight modules', certificate: 'Certificate', earn: 'Complete the modules, final exam and course evaluation. Intended for students of health sciences or public health.', summary: 'A university-level introduction to epidemiology, developed in partnership with the US CDC.', url: 'https://courses.nextgenu.org/course/info.php?id=234' },
  { name: 'DHIS2 Online Academy', provider: 'University of Oslo (DHIS2)', field: 'Public Health', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Enrol and complete a course to earn its free certificate.', summary: 'Learn DHIS2, the health information software used to capture and analyse health data, starting with the fundamentals.', url: 'https://academy.dhis2.org/' },
  { name: 'Epi Info Training', provider: 'Tennessee Department of Health', field: 'Public Health', level: 'Beginner', time: 'Five lessons', certificate: 'Certificate', earn: 'Complete the lessons and knowledge checks, then print the certificate. CDC says it is phasing out support for Epi Info.', summary: 'Use CDC’s free Epi Info software to work through a Salmonella outbreak investigation.', url: 'https://www.tn.gov/health/cedep/cedep-emergency-preparedness/biosurveillance/epi-info-training.html' },
  { name: 'Esri GIS MOOCs', provider: 'Esri', field: 'Public Health', level: 'Any level', time: 'Fixed course dates', certificate: 'Certificate', earn: 'Finish the course while it runs. Next registration: Going Places with Spatial Analysis, 27 January to 10 February 2027.', summary: 'Learn ArcGIS mapping and spatial analysis, with software access included. Also useful for infrastructure and environmental work.', url: 'https://www.esri.com/training/mooc/' },

  /* Agriculture */
  { name: 'FAO elearning Academy', provider: 'Food and Agriculture Organization of the UN', field: 'Agriculture & Food', level: 'Any level', time: 'Varies by course', certificate: 'Digital badge', earn: 'Score 75% or more on the final assessment.', summary: 'Courses across 25 areas, including food security, fisheries, soils, forests and farmer field schools.', url: 'https://elearning.fao.org/' },

  /* Environment */
  { ...OPENLEARN, name: 'Nature and environment courses', field: 'Environment & Water', summary: 'Free Open University courses on climate, ecosystems and sustainability.', url: 'https://www.open.edu/openlearn/nature-environment' },
  { name: 'WASH Foundational Course', provider: 'UNICEF Agora', field: 'Environment & Water', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the eight modules, the multiple-choice exam and the course evaluation.', summary: 'The basics of water, sanitation and hygiene programmes. A free Agora account is needed.', url: 'https://agora.unicef.org/course/info.php?id=22088' },

  /* Engineering */
  { name: 'MATLAB Onramp', provider: 'MathWorks', field: 'Engineering', level: 'Beginner', time: 'About 2 hours', certificate: 'Certificate', earn: 'Complete the course. A free MathWorks account is needed.', summary: 'Hands-on basics of MATLAB, widely used in engineering and science.', url: 'https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted' },
  { name: 'Simulink Onramp', provider: 'MathWorks', field: 'Engineering', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the course. A free MathWorks account is needed.', summary: 'Create, edit and simulate models of engineering systems.', url: 'https://matlabacademy.mathworks.com/details/simulink-onramp/simulink' },

  { name: 'Stress Analysis in Solid Mechanics', provider: 'Ansys Innovation Courses', field: 'Engineering', level: 'Intermediate', time: '2–4 hours', certificate: 'Digital badge', earn: 'Complete the course. A free account is needed.', summary: 'Stress and strain in solid structures, using engineering simulation.', url: 'https://innovationspace.ansys.com/product/stress-analysis-in-solid-mechanics/' },
  { name: 'Fluids engineering courses', provider: 'Ansys Innovation Courses', field: 'Engineering', level: 'Intermediate', time: 'Varies by course', certificate: 'Digital badge', earn: 'Complete a course marked free. Check the price of premium courses and learning tracks first.', summary: 'Topics such as compressible flow, shock waves and turbulence.', url: 'https://innovationspace.ansys.com/courses/fluids/' },
  { name: 'Electronics engineering courses', provider: 'Ansys Innovation Courses', field: 'Engineering', level: 'Intermediate', time: 'Varies by course', certificate: 'Digital badge', earn: 'Complete a course marked free. Check the price of premium courses and learning tracks first.', summary: 'Self-paced courses on electronics design and simulation.', url: 'https://innovationspace.ansys.com/courses/electronics/' },
  { name: 'Control Design Onramp with Simulink', provider: 'MathWorks', field: 'Engineering', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the course. A free MathWorks account is needed.', summary: 'Design and tune feedback controllers for engineering systems.', url: 'https://matlabacademy.mathworks.com/details/control-design-onramp-with-simulink/controls' },
  { name: 'Circuit Simulation Onramp', provider: 'MathWorks', field: 'Engineering', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the course. A free MathWorks account is needed.', summary: 'Model and simulate electrical circuits.', url: 'https://matlabacademy.mathworks.com/details/circuit-simulation-onramp/circuits' },
  { name: 'Signal Processing Onramp', provider: 'MathWorks', field: 'Engineering', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the course. A free MathWorks account is needed.', summary: 'Analyse and filter signals with MATLAB.', url: 'https://matlabacademy.mathworks.com/details/signal-processing-onramp/signalprocessing' },

  /* Civil engineering */
  { name: 'AutoCAD, Revit and Civil 3D learning pathways', provider: 'Autodesk', field: 'Civil Engineering', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Pass a skill-builder course. Certification prep courses give no certificate, and the certification exams themselves are separate. A free Autodesk account is needed.', summary: 'From technical drawing in AutoCAD to building models in Revit and site and road design in Civil 3D.', url: 'https://www.autodesk.com/certification' },
  { name: 'Tekla Structures Basic Steel Fundamentals', provider: 'Trimble', field: 'Civil Engineering', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Complete the interactive lessons, modelling assignment and test.', summary: 'Model steel structures, create drawings, and produce details and reports.', url: 'https://learn.trimble.com/learn/learning_plan/view/392/tekla-structures-steel-fundamentals' },
  { name: 'Tekla Campus for students', provider: 'Trimble', field: 'Civil Engineering', level: 'Beginner', time: 'Self-paced', certificate: 'Certificate', earn: 'Enrolled students at accredited institutions activate a free one-year subscription, then pass a Tekla certificate course.', summary: 'Free student access to Tekla structural software, with certificate courses for steel and concrete work.', url: 'https://www.tekla.com/solutions/campus/students' },
  { name: 'Bentley Education courses', provider: 'Bentley Systems', field: 'Civil Engineering', level: 'Beginner', time: 'Varies by course', certificate: 'Certificate', earn: 'Students and educators only. Finish a course with a Bentley Education account and download the certificate.', summary: 'Free courses on MicroStation, OpenRoads road design and STAAD structural analysis.', url: 'https://education.bentley.com/edu-resources/learn/' },
  { name: 'Structural analysis courses', provider: 'Ansys Innovation Courses', field: 'Civil Engineering', level: 'Intermediate', time: '1–6 hours each', certificate: 'Digital badge', earn: 'Complete a course marked free. A free account is needed.', summary: 'Finite element fundamentals, buckling, vibration, material failure and stress calculation.', url: 'https://innovationspace.ansys.com/courses/structures/' },

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
