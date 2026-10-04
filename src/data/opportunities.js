/**
 * The three opportunity types the site lists. Each one shares the listing
 * (sections/Scholarships.jsx) and detail page (pages/ScholarshipDetail.jsx);
 * everything that differs — copy, filters, fact labels — lives here.
 */
import { scholarships } from './scholarships'
import { grants } from './grants'
import { internships } from './internships'

const SCHOLARSHIP_FILTERS = [
  { label: 'All', test: () => true },
  { label: 'Undergraduate', test: (i) => i.level === 'Undergraduate' },
  { label: 'Graduate', test: (i) => i.level === 'Graduate' },
  { label: 'Postgraduate & PhD', test: (i) => i.level === 'Postgraduate' || i.level === 'PhD' },
  { label: 'Postdoctoral', test: (i) => i.level === 'Postdoctoral' },
  { label: 'Fully Funded', test: (i) => i.funding === 'Fully Funded' },
  { label: 'Partially Funded', test: (i) => i.funding === 'Partially Funded' },
]

/** Filter pills built from each item's `category`. */
const byCategory = (items) => [
  { label: 'All', test: () => true },
  ...[...new Set(items.map((i) => i.category))].map((c) => ({ label: c, test: (i) => i.category === c })),
]

export const kinds = {
  scholarships: {
    key: 'scholarships',
    path: '/scholarships',
    singular: 'scholarship',
    plural: 'scholarships',
    title: 'Scholarships',
    items: scholarships,
    filters: SCHOLARSHIP_FILTERS,
    eyebrow: 'Scholarship database',
    heading: ['Open awards worth', 'building a year around'],
    lede: 'Search by name, country or subject, then open any award for eligibility, benefits, required documents and a step-by-step application guide.',
    flyerLabel: 'Scholarship',
    labels: { level: 'Study level', funding: 'Funding type', amount: 'Award value' },
  },
  grants: {
    key: 'grants',
    path: '/grants',
    singular: 'grant',
    plural: 'grants',
    title: 'Grants',
    items: grants,
    filters: byCategory(grants),
    eyebrow: 'Grants & funding',
    heading: ['Grants that fund your', 'idea, research or business'],
    lede: 'Seed capital, research funding and innovation prizes for entrepreneurs, researchers and changemakers. Open any grant for eligibility, benefits and how to apply.',
    flyerLabel: 'Grant',
    labels: { level: 'Who it’s for', funding: 'Grant type', amount: 'Grant value' },
  },
  internships: {
    key: 'internships',
    path: '/internships',
    singular: 'internship',
    plural: 'internships',
    title: 'Internships',
    items: internships,
    filters: byCategory(internships),
    eyebrow: 'Internships',
    heading: ['Internships that launch an', 'international career'],
    lede: 'Paid and stipend-supported internships at international organisations, governments and global institutions. Open any one for requirements and a step-by-step guide.',
    flyerLabel: 'Internship',
    labels: { level: 'Candidate level', funding: 'Pay', amount: 'Pay / stipend' },
  },
}
