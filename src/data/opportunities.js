/**
 * The three opportunity types the site lists. Each one shares the listing
 * (sections/Scholarships.jsx) and detail page (pages/ScholarshipDetail.jsx);
 * everything that differs — copy, filters, fact labels — lives here.
 */
import { scholarships } from './scholarships'
import { grants } from './grants'
import { internships } from './internships'
import { competitions as rawCompetitions, fellowships as rawFellowships, newGrants, newInternships, newScholarships } from './listings-oct-2026'
import { globalFellowships, globalGrants, globalInternships, globalScholarships } from './listings-global-2026'
import { verifiedFellowships, verifiedGrants, verifiedInternships, verifiedScholarships } from './listings-verified-oct17-2026'
import { applyUpdates } from './updates-oct-2026'

const allScholarships = applyUpdates([...scholarships, ...newScholarships, ...globalScholarships, ...verifiedScholarships])
const allGrants = applyUpdates([...grants, ...newGrants, ...globalGrants, ...verifiedGrants])
const allInternships = applyUpdates([...internships, ...newInternships, ...globalInternships, ...verifiedInternships])
const fellowships = applyUpdates([...rawFellowships, ...globalFellowships, ...verifiedFellowships])
const competitions = applyUpdates(rawCompetitions)

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
    items: allScholarships,
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
    items: allGrants,
    filters: byCategory(allGrants),
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
    items: allInternships,
    filters: byCategory(allInternships),
    eyebrow: 'Internships',
    heading: ['Internships that launch an', 'international career'],
    lede: 'Paid and stipend-supported internships at international organisations, governments and global institutions. Open any one for requirements and a step-by-step guide.',
    flyerLabel: 'Internship',
    labels: { level: 'Candidate level', funding: 'Pay', amount: 'Pay / stipend' },
  },
  fellowships: {
    key: 'fellowships',
    path: '/fellowships',
    singular: 'fellowship',
    plural: 'fellowships',
    title: 'Fellowships',
    items: fellowships,
    filters: byCategory(fellowships),
    eyebrow: 'Fellowships',
    heading: ['Fellowships for leaders,', 'researchers and creators'],
    lede: 'Leadership, research, journalism and creative fellowships — many fully funded. Open any one for who can apply, the deadline and how to apply.',
    flyerLabel: 'Fellowship',
    labels: { level: 'Who it’s for', funding: 'Funding', amount: 'Value' },
  },
  competitions: {
    key: 'competitions',
    path: '/competitions',
    singular: 'competition',
    plural: 'competitions',
    title: 'Competitions & Awards',
    items: competitions,
    filters: byCategory(competitions),
    eyebrow: 'Competitions & awards',
    heading: ['Competitions and prizes', 'worth entering'],
    lede: 'Essay, writing, photography, science and business competitions with prizes and recognition. Open any one for who can enter and the deadline.',
    flyerLabel: 'Competition',
    labels: { level: 'Who can enter', funding: 'Type', amount: 'Prize' },
  },
}
