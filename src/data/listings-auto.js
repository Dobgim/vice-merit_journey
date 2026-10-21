/**
 * Opportunities added by the daily update routine. Each row is a call that
 * was open on the day it was added, with a fixed closing date and a link to
 * the funder's own instructions page (checked when added). Rows use the same
 * shape as listings-global-2026.js; `added` records the day it was listed.
 */
import { build } from './listings-global-2026'

const SOURCE = 'Daily update — checked against the funder’s own page on the day it was added'

/* ------------------------------------------------------------ Scholarships */

const scholarshipRows = [
]

/* ------------------------------------------------------------- Fellowships */

const fellowshipRows = [
]

/* ------------------------------------------------------------------ Grants */

const grantRows = [
]

/* ------------------------------------------------------------- Internships */

const internshipRows = [
]

/* ------------------------------------------------------------ Competitions */

const competitionRows = [
]

const rows = (kind, list) => list.map(({ added, ...o }) => build(kind, { verified: added, ...o }, SOURCE))
export const autoScholarships = rows('scholarships', scholarshipRows)
export const autoFellowships = rows('fellowships', fellowshipRows)
export const autoGrants = rows('grants', grantRows)
export const autoInternships = rows('internships', internshipRows)
export const autoCompetitions = rows('competitions', competitionRows)
