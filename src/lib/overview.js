/**
 * The long overview on every detail page, in four parts:
 *   About this {type} · About the host · How it works · Tips for a strong application
 * Well-known programmes use hand-written content (src/data/overviews.js).
 * Everything else is assembled only from the listing's own data plus general,
 * clearly-framed application advice — no invented facts about the host.
 */
import { overviews } from '../data/overviews'
import { formatDate } from './deadline'

const NOTE = 'This listing comes from public opportunity listings.'

const lowerFirst = (s = '') => (/^[A-Z][a-z]/.test(s) && !/^(African|Asian|Commonwealth|International|PhD|SADC|South|West|Namibian|Kenyan|Indian|US|UK|EU)\b/.test(s) ? s[0].toLowerCase() + s.slice(1) : s)

function aboutFromData(item, config) {
  const summary = (item.overview ?? [])[0] ?? item.summary ?? ''
  const seen = summary.toLowerCase()
  const has = (text) => text && seen.includes(text.toLowerCase().slice(0, 24))

  const facts = []
  if (item.nationalities && !has(item.nationalities)) facts.push(`It is open to ${lowerFirst(item.nationalities)}.`)
  if (config.key === 'scholarships' && item.level && !/^All levels$/.test(item.level) && !has(item.level)) {
    facts.push(`It is for ${lowerFirst(item.level)} study.`)
  }
  if (item.amount && item.amount !== 'See the official call' && !has(item.amount)) facts.push(`Value: ${lowerFirst(item.amount)}.`)
  if (item.duration) facts.push(`It runs for ${lowerFirst(item.duration)}.`)
  if (item.fields && !has(item.fields) && item.fields !== item.nationalities) facts.push(`Focus: ${lowerFirst(item.fields)}.`)
  facts.push(
    item.deadline
      ? `Applications close on ${formatDate(item.deadline)}${item.deadlineNote ? ` — ${lowerFirst(item.deadlineNote)}` : '.'}`
      : `There is no single closing date. ${item.deadlineNote ?? ''}`.trim()
  )

  // Hand-written listings (the original set) keep all their own paragraphs.
  const own = (item.overview ?? []).slice(1).filter((p) => !p.startsWith(NOTE) && p !== item.deadlineNote)
  return [summary, ...own, facts.join(' ')].filter(Boolean)
}

function hostFromData(item, config) {
  if (!item.org) {
    return [
      `The official call for ${item.name} explains who runs the programme and what they look for. Read it carefully before applying: funders favour applicants whose goals match their own mission, so understanding the organisation behind a ${config.singular} is one of the best ways to stand out.`,
    ]
  }
  return [
    `${item.name} is offered by ${item.org}${item.country && item.country !== 'International' ? `, in ${item.country}` : ''}.`,
    `Before applying, read ${item.org}’s own website to understand its mission, the kind of people it has supported before, and the impact it wants to see. Committees favour applicants who clearly connect their goals to the funder’s purpose.`,
  ]
}

const HOW = {
  scholarships: [
    'Most scholarships like this follow a similar path. You apply through the official call — sometimes together with your university admission — with your transcripts, CV, a motivation or personal statement and reference letters.',
    'Applications are checked for eligibility, then reviewed by a committee. Many programmes shortlist candidates for an interview. Successful applicants receive an award letter setting out exactly what is covered and any conditions, such as keeping a minimum grade.',
  ],
  fellowships: [
    'Fellowship applications usually ask for a CV, a statement about your work and goals, a project or research proposal, and references. Shortlisted candidates are often interviewed.',
    'Fellows typically join a cohort for a fixed period — a residency, a placement or a structured programme — and are expected to share what they learn and stay engaged with the network afterwards.',
  ],
  grants: [
    'Grant applications usually ask you to describe the problem you are tackling, what you will do, who benefits, a budget and a timeline. Some funders use a short first-stage form and invite a fuller proposal later.',
    'If you are funded, you will usually sign a grant agreement and report back on how the money was used and what was achieved.',
  ],
  internships: [
    'Internships are usually advertised as individual postings, each with its own requirements and deadline. You apply online with a CV and cover letter, and shortlisted candidates are interviewed.',
    'Interns work alongside staff on real projects for a fixed period. Check carefully whether the role is paid, offers a stipend or is unpaid, and whether you need a visa.',
  ],
  competitions: [
    'Competitions ask for an entry — an essay, story, photograph, artwork or project — submitted online before the deadline, following the rules on length, format and theme.',
    'Entries are judged by a panel. Winners and finalists are usually announced a few weeks or months after the deadline and may receive cash prizes, publication or invitations to events.',
  ],
}

const TIPS = {
  scholarships: [
    'Start at least two months before the deadline so your referees have time to write strong letters.',
    'Answer the exact question in each essay, with specific examples from your studies, work and community.',
    'Show a clear plan: what you will study, why this programme, and how you will use it afterwards.',
    'Check every eligibility rule — nationality, age, grades, language tests — before investing time.',
  ],
  fellowships: [
    'Lead with impact: what you have already achieved, in numbers and outcomes where you can.',
    'Make your proposal specific and realistic for the time the fellowship lasts.',
    'Choose referees who know your work closely and can speak to your leadership.',
  ],
  grants: [
    'Describe the problem and the people affected before describing your solution.',
    'Keep the budget realistic and explain every line.',
    'Show how you will measure success and what happens after the grant ends.',
  ],
  internships: [
    'Tailor your CV and cover letter to the specific team and posting.',
    'Highlight relevant skills — languages, data, writing, research — with concrete examples.',
    'Apply early: some postings close as soon as enough strong candidates apply.',
  ],
  competitions: [
    'Read the rules twice — entries that break length or format rules are often disqualified.',
    'Answer the theme directly and make your entry personal and original.',
    'Ask someone to proofread before you submit.',
  ],
}

/** [{ heading, paragraphs?, bullets? }] for the Overview section. */
export function buildOverview(item, kind, config) {
  const curated = overviews[item.slug]
  const sections = [
    { heading: `About this ${config.singular}`, paragraphs: curated?.about ?? aboutFromData(item, config) },
    { heading: item.org ? `About ${item.org}` : 'About the host', paragraphs: curated?.host ?? hostFromData(item, config) },
    { heading: 'How it works', paragraphs: curated?.how ?? HOW[kind] ?? HOW.scholarships },
    { heading: 'Tips for a strong application', bullets: TIPS[kind] ?? TIPS.scholarships },
  ]
  // Curated entries: keep the listing's own deadline notes in the first part too.
  if (curated && item.deadline) {
    sections[0].paragraphs = [
      ...sections[0].paragraphs,
      `Applications close on ${formatDate(item.deadline)}${item.deadlineNote ? ` — ${lowerFirst(item.deadlineNote)}` : '.'}`,
    ]
  }
  return sections
}
