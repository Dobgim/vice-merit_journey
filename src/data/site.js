/**
 * Single source of truth for all site copy and placeholder data.
 * Swap any array here for a Supabase query without touching components.
 */

export const company = {
  name: 'Merit Ledger',
  tagline: 'Scholarship Consultancy',
  email: 'advisors@meritledger.com',
  phone: '+1 (202) 555-0148',
  whatsapp: '12025550148', // digits only, used to build wa.me links
  address: '1200 Kingsway Avenue, Suite 410, Toronto, ON',
  hours: 'Mon – Sat · 9:00 – 18:00 (GMT)',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/company/meritledger', icon: 'linkedin' },
    { label: 'Instagram', href: 'https://instagram.com/meritledger', icon: 'instagram' },
    { label: 'X', href: 'https://x.com/meritledger', icon: 'x' },
    { label: 'YouTube', href: 'https://youtube.com/@meritledger', icon: 'youtube' },
  ],
}

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Scholarships', to: '/scholarships' },
  { label: 'Countries', to: '/countries' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export const stats = [
  { value: 2400, suffix: '+', label: 'Students advised', hint: 'Since 2016' },
  { value: 68, suffix: 'M', prefix: '$', label: 'Funding secured', hint: 'Awarded to our students' },
  { value: 92, suffix: '%', label: 'Shortlist rate', hint: 'On advisor-reviewed applications' },
  { value: 34, suffix: '', label: 'Countries covered', hint: 'Across 6 continents' },
]

export const trustLogos = [
  'University of Toronto',
  'Erasmus Mundus',
  'Chevening',
  'DAAD',
  'Australia Awards',
  'Fulbright',
  'Commonwealth',
  'MEXT Japan',
]

export const benefits = [
  {
    icon: 'target',
    title: 'Matched, not guessed',
    body:
      'We profile your grades, budget, field and timeline, then shortlist only the awards where you are genuinely competitive — no spray-and-pray applications.',
  },
  {
    icon: 'users',
    title: 'Advisors who have won',
    body:
      'Every consultant on our team has personally secured or assessed funded awards. You get insider judgement, not recycled internet advice.',
  },
  {
    icon: 'layers',
    title: 'Support at every level',
    body:
      'Undergraduate, master’s, PhD and post-doctoral routes are handled by specialists who know how each committee actually reads a file.',
  },
  {
    icon: 'shield',
    title: 'Transparent and ethical',
    body:
      'We never write your story for you and never guarantee outcomes. We sharpen your case, keep your voice, and tell you the honest odds.',
  },
  {
    icon: 'clock',
    title: 'Deadline command centre',
    body:
      'A shared timeline tracks every document, referee and submission window so nothing slips through in your busiest semester.',
  },
  {
    icon: 'globe',
    title: 'Global, local nuance',
    body:
      'From Chevening panels to DAAD forms and Canadian study permits, we tailor each file to the country and its committee culture.',
  },
]

export const services = [
  {
    icon: 'search',
    title: 'Scholarship Search & Matching',
    body:
      'A curated shortlist of 12–20 awards ranked by your real chance of winning, with eligibility notes and effort estimates.',
    points: ['Personalised eligibility audit', 'Ranked opportunity list', 'Quarterly refresh'],
  },
  {
    icon: 'file',
    title: 'Application Support',
    body:
      'Line-by-line guidance across every form, essay and supporting document until your file is submission-ready.',
    points: ['Form-by-form walkthrough', 'Document checklist', 'Two full review rounds'],
  },
  {
    icon: 'building',
    title: 'Admission Guidance',
    body:
      'Programme selection, entry requirements and supervisor outreach for research degrees — aligned to your funding plan.',
    points: ['University shortlisting', 'Supervisor email drafts', 'Offer strategy'],
  },
  {
    icon: 'pen',
    title: 'SOP & Personal Statement',
    body:
      'We help you find the through-line in your story and structure it into a statement that a tired reviewer remembers.',
    points: ['Narrative strategy session', 'Structural edit', 'Language polish'],
  },
  {
    icon: 'doc',
    title: 'CV & Resume Editing',
    body:
      'An academic CV rebuilt to committee conventions — achievements quantified, formatting clean, nothing padded.',
    points: ['Academic formatting', 'Impact-led bullets', 'ATS-safe export'],
  },
  {
    icon: 'passport',
    title: 'Visa Guidance',
    body:
      'Study-permit documentation, financial evidence and interview prep for the UK, Canada, US, Schengen and Australia.',
    points: ['Document pack review', 'Funds evidence check', 'Mock visa interview'],
  },
  {
    icon: 'mic',
    title: 'Interview Preparation',
    body:
      'Panel simulations with real scholarship questions, recorded feedback and a clear plan for your weakest answers.',
    points: ['Two mock panels', 'Recorded feedback', 'Answer frameworks'],
  },
]

export const categories = [
  {
    title: 'Undergraduate',
    filter: 'Undergraduate',
    body: 'First-degree awards, merit entrance scholarships and need-based bursaries for school leavers.',
    count: '480+ awards',
    icon: 'cap',
    accent: 'from-navy-600 to-navy-900',
  },
  {
    title: 'Graduate',
    filter: 'Graduate',
    body: 'Master’s funding, assistantships and departmental tuition waivers across taught and research routes.',
    count: '620+ awards',
    icon: 'book',
    accent: 'from-navy-500 to-navy-800',
  },
  {
    title: 'Postgraduate & PhD',
    filter: 'Postgraduate & PhD',
    body: 'Doctoral fellowships, research grants and stipend-backed positions with named supervisors.',
    count: '310+ awards',
    icon: 'flask',
    accent: 'from-navy-700 to-navy-950',
  },
  {
    title: 'International Students',
    filter: 'All',
    body: 'Awards explicitly open to non-citizens, including full-tuition and living-cost packages.',
    count: '900+ awards',
    icon: 'globe',
    accent: 'from-navy-600 to-navy-950',
  },
  {
    title: 'Fully Funded',
    filter: 'Fully Funded',
    body: 'Tuition, stipend, travel and insurance covered — the awards worth building a year around.',
    count: '240+ awards',
    icon: 'star',
    accent: 'from-gold-600 to-navy-900',
  },
  {
    title: 'Partially Funded',
    filter: 'Partially Funded',
    body: 'Tuition discounts and living-cost top-ups that make a self-funded plan realistic.',
    count: '540+ awards',
    icon: 'half',
    accent: 'from-navy-500 to-navy-900',
  },
]

export const steps = [
  {
    n: '01',
    title: 'Contact us',
    body:
      'Book a free 20-minute consultation. We review your transcripts, goals and budget, then tell you honestly where you stand.',
    detail: ['Free discovery call', 'Profile audit', 'Realistic odds, in writing'],
  },
  {
    n: '02',
    title: 'Get matched',
    body:
      'Within five working days you receive a ranked shortlist of awards and programmes, each with deadlines and effort estimates.',
    detail: ['Ranked shortlist', 'Deadline calendar', 'Document checklist'],
  },
  {
    n: '03',
    title: 'Apply with support',
    body:
      'Your advisor works through every essay, form and interview with you until submission — and stays on for the outcome.',
    detail: ['Two review rounds', 'Mock interviews', 'Post-decision strategy'],
  },
]

export { scholarships } from './scholarships'

export const countries = [
  { name: 'United Kingdom', flag: '🇬🇧', awards: '210+ awards', note: 'Chevening · Commonwealth · GREAT' },
  { name: 'Canada', flag: '🇨🇦', awards: '180+ awards', note: 'Vanier · Pearson · Provincial' },
  { name: 'Germany', flag: '🇩🇪', awards: '160+ awards', note: 'DAAD · Heinrich Böll · Konrad' },
  { name: 'United States', flag: '🇺🇸', awards: '240+ awards', note: 'Fulbright · Knight-Hennessy' },
  { name: 'Australia', flag: '🇦🇺', awards: '120+ awards', note: 'Australia Awards · RTP' },
  { name: 'Netherlands', flag: '🇳🇱', awards: '90+ awards', note: 'Holland · Orange Knowledge' },
  { name: 'Japan', flag: '🇯🇵', awards: '70+ awards', note: 'MEXT · JASSO · ADB' },
  { name: 'Sweden', flag: '🇸🇪', awards: '60+ awards', note: 'SI Global · Lund Global' },
  { name: 'Switzerland', flag: '🇨🇭', awards: '45+ awards', note: 'Excellence · ETH Zürich' },
  { name: 'France', flag: '🇫🇷', awards: '85+ awards', note: 'Eiffel · Émile Boutmy' },
  { name: 'Ireland', flag: '🇮🇪', awards: '40+ awards', note: 'Government of Ireland · Walsh' },
  { name: 'United Arab Emirates', flag: '🇦🇪', awards: '35+ awards', note: 'Khalifa · MBZUAI' },
]

export const testimonials = [
  {
    quote:
      'I had been rejected twice before Merit Ledger. My advisor rebuilt my statement around the one story I kept leaving out — the community lab I ran at home. Chevening called eight weeks later.',
    name: 'Amara Okonkwo',
    role: 'MSc Public Policy · LSE',
    award: 'Chevening Scholar 2025',
    rating: 5,
    initials: 'AO',
  },
  {
    quote:
      'What I valued most was the honesty. They told me two of my six targets were unrealistic and why. That saved me a semester of wasted effort — and I won one of the four that remained.',
    name: 'Rafael Duarte',
    role: 'PhD Materials Science · ETH Zürich',
    award: 'Swiss Excellence 2025',
    rating: 5,
    initials: 'RD',
  },
  {
    quote:
      'The mock interviews were harder than the real panel. By the time I sat in front of the committee I had already answered every difficult question twice.',
    name: 'Nadia Rahman',
    role: 'MA Development Studies · Sussex',
    award: 'Commonwealth Scholar 2024',
    rating: 5,
    initials: 'NR',
  },
  {
    quote:
      'As a first-generation student, I did not know a funded master’s was even possible. My advisor walked me through every form, including the visa file. I start in Toronto this autumn.',
    name: 'Kwame Mensah',
    role: 'MEng Civil Engineering · U of T',
    award: 'Pearson Scholar 2025',
    rating: 5,
    initials: 'KM',
  },
  {
    quote:
      'The deadline tracker alone was worth it. Three applications, three different reference formats, one calendar. Nothing slipped.',
    name: 'Ji-woo Park',
    role: 'MSc Data Science · TU Delft',
    award: 'Holland Scholarship 2025',
    rating: 5,
    initials: 'JP',
  },
  {
    quote:
      'They edited my CV without stripping my voice out of it. Committees could still tell a person wrote it — that mattered more than I expected.',
    name: 'Fatima Al-Sayed',
    role: 'MPhil Economics · Cambridge',
    award: 'Gates Cambridge 2024',
    rating: 5,
    initials: 'FA',
  },
]

export const faqs = [
  {
    q: 'Do you guarantee that I will win a scholarship?',
    a: 'No, and you should be cautious of any consultancy that does. Selection committees make the final call. What we guarantee is a competitive, well-matched, deadline-safe application — and an honest assessment of your chances before you invest time in it.',
  },
  {
    q: 'When should I start working with an advisor?',
    a: 'Ideally 9–12 months before your intended intake. Major awards close 8–11 months ahead of the academic year, and strong essays need several revision rounds. That said, we run an expedited track for students who find us with 8–10 weeks left.',
  },
  {
    q: 'Can you help if my grades are average?',
    a: 'Yes. Grades are one input among several. Work experience, community impact, research potential and a clearly argued statement often carry equal weight — and many awards specifically prioritise need, leadership or development impact over raw GPA.',
  },
  {
    q: 'Do you write my personal statement for me?',
    a: 'We never write it for you. We run a narrative strategy session, help you structure the argument, and edit for clarity and impact. The story, the voice and the evidence stay yours — committees notice ghostwriting, and several awards disqualify for it.',
  },
  {
    q: 'How much do your services cost?',
    a: 'The discovery call is free. After that we offer a matching-only package, a full end-to-end application package, and à-la-carte services such as SOP review or interview prep. Pricing is quoted after the consultation, once we know the scope, and we offer needs-based reductions.',
  },
  {
    q: 'Which countries do you cover?',
    a: 'We actively advise on 34 destinations, with deepest coverage in the UK, Canada, Germany, the US, Australia, the Netherlands, Japan and the Nordics. If your target is outside our core list we will tell you before you commit.',
  },
  {
    q: 'Do you help with visas and study permits?',
    a: 'Yes. We support document preparation, financial evidence and interview practice for major study destinations. We are education consultants, not licensed immigration lawyers, and we refer you to a regulated adviser when a case calls for one.',
  },
  {
    q: 'What if I miss a deadline?',
    a: 'That is what the shared deadline tracker exists to prevent. Your advisor sets internal milestones ahead of every official date. If an award does close, we pivot immediately to the next-best match in the same cycle rather than waiting a year.',
  },
]

export const studyLevels = [
  'Undergraduate',
  'Graduate / Masters',
  'Postgraduate / PhD',
  'Postdoctoral',
  'Not sure yet',
]

export const countryOptions = [
  'United Kingdom',
  'Canada',
  'United States',
  'Germany',
  'Australia',
  'Netherlands',
  'Japan',
  'Sweden',
  'Switzerland',
  'France',
  'Ireland',
  'Other / Undecided',
]
