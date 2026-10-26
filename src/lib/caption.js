/**
 * Social media caption for one opportunity, in Merit Leaders' house format:
 * headline, short intro, key facts, who should apply, documents, link,
 * contacts, sign-off and hashtags. Only the details change from post to post.
 * Used for the RSS feeds that Make.com posts to Facebook, Instagram and LinkedIn.
 */
import { SITE_URL, company } from '../data/site'
import { formatDate } from './deadline'

const MAX = 2150 // Instagram's caption limit is 2,200 characters

const EMOJI = { scholarships: '🎓', fellowships: '🌟', grants: '💡', internships: '💼', competitions: '🏆' }
const NOUN = {
  scholarships: ['SCHOLARSHIP', 'SCHOLARSHIPS'],
  fellowships: ['FELLOWSHIP', 'FELLOWSHIPS'],
  grants: ['GRANT', 'GRANTS'],
  internships: ['INTERNSHIP', 'INTERNSHIPS'],
  competitions: ['COMPETITION', 'COMPETITIONS'],
}
const TAG = {
  scholarships: 'Scholarships',
  fellowships: 'Fellowships',
  grants: 'Grants',
  internships: 'Internships',
  competitions: 'Competitions',
}

const isFullyFunded = (item) => /fully[- ]funded|full funding|full scholarship/i.test(`${item.funding ?? ''} ${item.amount ?? ''}`)

/** A single place name for "IN GERMANY" / "#StudyInGermany"; empty for multi-country or global calls. */
function place(country = '') {
  const first = country.split(/[,(/]| and | & /)[0].trim()
  return /global|worldwide|international|online|multiple|various|remote|africa$|europe$|asia$/i.test(first) ? '' : first
}

const tagWord = (s = '') => s.replace(/[^\p{L}\p{N}]+/gu, '')

function levelTag(level = '') {
  if (/phd|doctor/i.test(level)) return 'PhD'
  if (/master/i.test(level)) return 'Masters'
  if (/undergrad|bachelor/i.test(level)) return 'Undergraduate'
  if (/postdoc/i.test(level)) return 'Postdoc'
  return ''
}

const shorten = (text = '', max) => {
  const s = String(text).trim()
  if (s.length <= max) return s
  const cut = s.slice(0, max)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

/** Lowercase the first letter unless it starts an acronym or name ("CV", "IELTS"). */
const lowerFirst = (s) => (/^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s)

export function socialCaption(kind, item) {
  const [one] = NOUN[kind] ?? NOUN.scholarships
  const where = place(item.country)
  const funded = isFullyFunded(item)
  const lvl = levelTag(item.level)

  const headline = [
    `${item.flag ?? ''}${EMOJI[kind] ?? '🎓'}`,
    [funded && 'FULLY FUNDED', lvl && lvl !== 'Undergraduate' ? lvl.toUpperCase().replace('PHD', 'PhD') : '', `${one} OPPORTUNITY`, where && `IN ${where.toUpperCase()}`]
      .filter(Boolean)
      .join(' ') + '!',
  ].join('')

  const intro = shorten(
    [item.summary, item.overview?.[0]].filter(Boolean).find((t) => t.length > 60) ?? item.summary ?? '',
    320
  )
  const introLine = intro.toLowerCase().includes(String(item.name).toLowerCase().slice(0, 25)) ? intro : `${item.name}: ${intro}`

  const facts = [
    item.level && `📌 Level: ${item.level}`,
    item.amount && `💰 Funding: ${item.amount}`,
    item.deadline && `📅 Deadline: ${formatDate(item.deadline)}`,
    item.country && `📍 ${kind === 'scholarships' ? 'Destination' : 'Location'}: ${item.country}`,
  ].filter(Boolean)

  const who = [
    item.nationalities && `Open to: ${item.nationalities}`,
    item.fields && `Fields: ${item.fields}`,
    ...(item.eligibility ?? []).filter((e) => !/^(Open to|Level):/i.test(e)),
  ]
    .filter(Boolean)
    .slice(0, 3)
    .map((e) => `* ${shorten(e, 160)}`)

  const docs = (item.documents ?? []).filter(Boolean).slice(0, 6).map((d) => lowerFirst(shorten(d, 60)))
  const docsLine = docs.length
    ? `📄 Prepare your ${docs.length > 1 ? `${docs.slice(0, -1).join(', ')} and ${docs.at(-1)}` : docs[0]}, as applicable.`
    : ''

  const hashtags = [
    where && kind === 'scholarships' && `StudyIn${tagWord(where)}`,
    lvl && `${lvl}${kind === 'scholarships' ? 'Scholarship' : TAG[kind].replace(/s$/, '')}`,
    funded && 'FullyFunded',
    TAG[kind],
    'StudyAbroad',
    'MeritLeaders',
  ]
    .filter(Boolean)
    .map((t) => `#${t}`)
    .join(' ')

  const link = `${SITE_URL}/${kind}/${item.slug}`
  const contact = [
    '📲 Want to explore international scholarship opportunities with proper guidance? Contact Merit Leaders Scholarship & Education Consultancy.',
    '',
    `📞 WhatsApp: ${company.whatsappDisplay}`,
    `📧 Email: ${company.email}`,
    `🌐 Website: www.${company.domain}`,
  ].join('\n')
  const signOff = `🚀 Your next academic journey could begin${where ? ` in ${where}` : ' here'}. Explore the opportunity and check your eligibility!`

  const build = (whoLines, docLine, introText) =>
    [
      headline,
      introText,
      facts.join('\n'),
      whoLines.length ? `✅ Who should apply?\n\n${whoLines.join('\n')}` : '',
      docLine,
      `🔗 Full details and application link: ${link}`,
      contact,
      signOff,
      hashtags,
    ]
      .filter(Boolean)
      .join('\n\n')

  // Trim the optional parts until the caption fits Instagram's limit.
  let text = build(who, docsLine, introLine)
  if (text.length > MAX) text = build(who.slice(0, 2), docsLine, introLine)
  if (text.length > MAX) text = build(who.slice(0, 2), '', shorten(introLine, 200))
  return text
}
