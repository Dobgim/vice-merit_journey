/**
 * The long overview on every detail page, in four parts:
 *   About this {type} · About the host · How it works · Tips for a strong application
 * Well-known programmes use hand-written content (src/data/overviews.js).
 * Everything else is assembled from the listing's own data (summary, value,
 * who can apply, documents, dates), a profile of the host organisation
 * (data/orgs.js), practical background on the destination
 * (data/destinations.js) and clearly-framed general application advice.
 */
import { overviews } from '../data/overviews'
import { orgProfiles } from '../data/orgs'
import { destinationFor } from '../data/destinations'
import { daysLeft, formatDate } from './deadline'

const NOTE = 'This listing comes from public opportunity listings.'

const lowerFirst = (s = '') =>
  /^International (applicants|students)/.test(s) ||
  (/^[A-Z][a-z]/.test(s) && !/^(African|Asian|Commonwealth|International|PhD|SADC|South|West|Namibian|Kenyan|Indian|US|UK|EU|English|French|Spanish|German|Japanese|Korean|Arabic|Chinese|Mandarin|Portuguese|Russian|Catholic|Ghanaian|Kenyan|Nigerian|Cameroonian|Woman|Women)\b/.test(s))
    ? s[0].toLowerCase() + s.slice(1)
    : s

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
  const profile = orgProfiles[item.org]
  if (profile) {
    return [
      ...profile,
      `Before applying, spend time on ${item.org}’s own website: read its mission, the profiles of people it has supported before and any reports on its impact. Committees favour applicants who clearly connect their own goals to the funder’s purpose.`,
    ]
  }
  return [
    `${item.name} is offered by ${item.org}${item.country && item.country !== 'International' ? `, in ${item.country}` : ''}.`,
    `Before applying, read ${item.org}’s own website to understand its mission, the kind of people it has supported before, and the impact it wants to see. Committees favour applicants who clearly connect their goals to the funder’s purpose.`,
  ]
}

const list = (items = []) => {
  const xs = items.map((x) => lowerFirst(x.replace(/\.$/, '')))
  return xs.length > 1 ? `${xs.slice(0, -1).join('; ')}; and ${xs.at(-1)}` : xs[0] ?? ''
}

/** "Who it is for" and "what it offers", from the listing's own requirements and benefits. */
function whoAndWhat(item, config) {
  const out = []
  const elig = (item.eligibility ?? []).filter((e) => !/^(Open to|Level):/.test(e))
  if (elig.length) out.push(`Who it is for: ${list(elig.slice(0, 4))}.`)
  const benefits = (item.benefits ?? []).filter((b) => b && b !== item.amount)
  if (benefits.length) out.push(`What it offers: ${list(benefits.slice(0, 4))}.`)
  else if (item.amount && item.amount !== 'See the official call')
    out.push('The official call sets out exactly what is covered — for example tuition, living costs, travel or research costs — and any conditions attached.')
  if (config.key === 'scholarships' && item.funding === 'Fully Funded')
    out.push('As a fully funded award, it is designed so that money is not what stops a strong candidate from taking up the place.')
  return out.length ? [out.join(' ')] : []
}

/** What to prepare, and a working timeline back from the deadline. */
function preparation(item, config) {
  const docs = item.documents ?? []
  const out = []
  if (docs.length) out.push(`To apply you will typically prepare: ${list(docs)}. Gather official documents early — certified copies, translations and test results can take weeks.`)
  const left = item.deadline ? daysLeft(item.deadline) : null
  if (left !== null && left > 0) {
    out.push(
      left > 56
        ? `With about ${Math.round(left / 7)} weeks until the deadline (${formatDate(item.deadline)}), a sensible plan is: confirm your eligibility and ask your referees now, draft your essays over the next month, and submit at least a week early.`
        : left > 14
          ? `About ${Math.round(left / 7)} weeks remain until the deadline (${formatDate(item.deadline)}). Start now: confirm you are eligible, ask your referees this week, and plan to submit at least a few days early.`
          : `The deadline is close (${formatDate(item.deadline)}, ${left} day${left === 1 ? '' : 's'} away). Contact your referees today, focus on the required documents first, and submit a few days early in case the portal is busy.`
    )
  } else if (!item.deadline) {
    out.push(`There is no single deadline for this ${config.singular}, but strong applications take time: build your documents now so you can apply as soon as a suitable call or vacancy opens.`)
  }
  return out
}

const SELECTION = {
  scholarships: 'Selection committees usually look for three things: academic excellence (grades, awards, research), a clear and realistic study plan that fits the programme, and evidence of leadership or impact — including how the scholarship will help you contribute to your community or country afterwards.',
  fellowships: 'Fellowship panels look for a record of achievement in your field, a clear idea of what you will do during the fellowship, and evidence that you will use the experience to create wider impact.',
  grants: 'Grant reviewers look for a clear problem, a credible plan, a team able to deliver, value for money and measurable results — and how the work will continue after the grant ends.',
  internships: 'Recruiters look for relevant studies, practical skills (languages, data, writing, research), motivation for the organisation’s mission, and evidence that you work well in a diverse, international team.',
  competitions: 'Judges look for originality, a strong response to the theme, technical quality and clear communication — and, above all, an entry that follows every rule.',
}

const DEST_VERB = { scholarships: 'Studying in', fellowships: 'Life in', internships: 'Life in' }

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
    'Have someone you trust read your essays for clarity, grammar and whether they answer the question.',
    'Keep copies of everything you submit and note any reference numbers or interview dates.',
  ],
  fellowships: [
    'Lead with impact: what you have already achieved, in numbers and outcomes where you can.',
    'Make your proposal specific and realistic for the time the fellowship lasts.',
    'Choose referees who know your work closely and can speak to your leadership.',
    'Explain why this fellowship, now — and what you will do differently because of it.',
  ],
  grants: [
    'Describe the problem and the people affected before describing your solution.',
    'Keep the budget realistic and explain every line.',
    'Show how you will measure success and what happens after the grant ends.',
    'Follow the funder’s template and word limits exactly, and attach every required document.',
  ],
  internships: [
    'Tailor your CV and cover letter to the specific team and posting.',
    'Highlight relevant skills — languages, data, writing, research — with concrete examples.',
    'Apply early: some postings close as soon as enough strong candidates apply.',
    'Keep your profile on the careers portal complete and up to date — it is often what recruiters read first.',
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
  const dest = DEST_VERB[kind] ? destinationFor(item.country) : null
  const sections = [
    { heading: `About this ${config.singular}`, paragraphs: [...(curated?.about ?? aboutFromData(item, config)), ...whoAndWhat(item, config)] },
    { heading: item.org ? `About ${item.org}` : 'About the host', paragraphs: curated?.host ?? hostFromData(item, config) },
    ...(dest ? [{ heading: `${DEST_VERB[kind]} ${dest.name}`, paragraphs: dest.paragraphs }] : []),
    { heading: 'How it works', paragraphs: [...(curated?.how ?? HOW[kind] ?? HOW.scholarships), ...preparation(item, config)] },
    { heading: 'What the selectors look for', paragraphs: [SELECTION[kind] ?? SELECTION.scholarships] },
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
