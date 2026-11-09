import { useMemo, useState } from 'react'
import Icon from '../components/ui/Icon'
import * as api from './api'
import { Btn, Empty, ErrorNote, PageTitle, downloadCsv, fmtDateTime, useFlash, useLoad } from './ui'
import { giveaway } from '../data/giveaway'

/*
 * Free application giveaway entries, ranked. Entries are consultation
 * requests whose message starts with "[Free application]" (see
 * submitGiveawayEntry). "Follows us" and "Commented" can't be checked
 * automatically, so the admin ticks them; the ticks are kept in the
 * request's notes as #follows and #commented.
 */

const TAG = '[Free application]'
const CORE_DOCS = [
  'Valid passport',
  'Transcripts and certificates',
  'English test result or medium-of-instruction letter',
  'CV',
  '2 referees who have agreed',
]

/** "Key: value" lines after the tag, as an object. */
function parseEntry(r) {
  const fields = {}
  for (const line of r.message.split('\n').slice(1)) {
    const i = line.indexOf(': ')
    if (i > 0) fields[line.slice(0, i)] = line.slice(i + 2)
  }
  const docs = (fields['Documents ready'] ?? '').split(', ').filter((d) => d && d !== 'None ticked')
  const picks = (fields['Scholarships chosen'] ?? '').split(' | ').filter(Boolean)
  return { ...r, fields, docs, picks, follows: /#follows/.test(r.notes ?? ''), commented: /#commented/.test(r.notes ?? '') }
}

/** Rough grade band from free text: 15 strong, 10 good, 5 unclear. */
function gradePoints(text = '') {
  const t = text.toLowerCase()
  const gpa = t.match(/(\d(?:\.\d+)?)\s*\/\s*4(?:\.0)?\b/)
  const twenty = t.match(/(\d{1,2}(?:[.,]\d+)?)\s*\/\s*20\b/)
  const pct = t.match(/(\d{2}(?:\.\d+)?)\s*%/)
  if (/first class|1st class|\bfirst\b|distinction|summa|excellent|très bien|tres bien/.test(t)) return 15
  if (gpa) return Number(gpa[1]) >= 3.5 ? 15 : Number(gpa[1]) >= 3.0 ? 10 : 5
  if (twenty) return Number(twenty[1].replace(',', '.')) >= 15 ? 15 : Number(twenty[1].replace(',', '.')) >= 13 ? 10 : 5
  if (pct) return Number(pct[1]) >= 70 ? 15 : Number(pct[1]) >= 60 ? 10 : 5
  if (/2[:.]1|upper second|second class upper|merit|very good|bien|cum laude/.test(t)) return 10
  return 5
}

/** Score out of 100, with the parts shown to the admin. */
function score(e) {
  const core = CORE_DOCS.filter((d) => e.docs.includes(d)).length
  const why = e.fields['Why study abroad'] ?? ''
  const parts = {
    documents: core * 10,
    follows: e.follows ? 10 : 0,
    commented: e.commented ? 10 : 0,
    grades: gradePoints(e.fields['Last qualification and grade']),
    motivation: why.length >= 200 ? 10 : why.length >= 100 ? 6 : 3,
    scholarships: e.picks.length >= 2 ? 5 : e.picks.length ? 3 : 0,
  }
  const total = Object.values(parts).reduce((a, b) => a + b, 0)
  // Eligible for the draw: follows, commented and has every core document.
  return { ...e, core, parts, total, eligible: e.follows && e.commented && core === CORE_DOCS.length }
}

const waLink = (phone, name) => {
  const digits = String(phone ?? '').replace(/\D/g, '')
  return digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(`Hello ${name}, this is Merit Leaders about your entry for our free scholarship application support.`)}`
    : null
}

function Entry({ e, rank, winner, onToggle }) {
  const [open, setOpen] = useState(false)
  const wa = waLink(e.phone, e.full_name?.split(' ')[0] ?? '')
  return (
    <li className={`rounded-2xl border bg-white shadow-soft ${winner ? 'border-gold-400 ring-2 ring-gold-300' : 'border-navy-900/[0.07]'}`}>
      <div className="flex flex-wrap items-center gap-4 p-4 sm:p-5">
        <span className="w-8 text-center font-display text-2xl font-semibold text-navy-400">{rank}</span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-navy-950">
            {e.full_name} {winner && <span className="ml-1 rounded-full bg-gold-200 px-2 py-0.5 text-xs font-bold text-navy-950">DRAWN</span>}
          </p>
          <p className="text-sm text-navy-500">
            {[e.country, e.study_level, e.fields['Field of study'], e.fields['Last qualification and grade']].filter(Boolean).join(' · ')}
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-navy-800">
          <input type="checkbox" checked={e.follows} onChange={() => onToggle('follows')} className="h-4 w-4 accent-navy-900" />
          Follows us
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-navy-800">
          <input type="checkbox" checked={e.commented} onChange={() => onToggle('commented')} className="h-4 w-4 accent-navy-900" />
          Commented
        </label>
        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${e.core === CORE_DOCS.length ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
          Docs {e.core}/{CORE_DOCS.length}
        </span>
        <span className="w-16 text-right font-display text-2xl font-semibold text-navy-950">{e.total}</span>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-label="Show details">
          <Icon name="chevronDown" className={`h-4 w-4 text-navy-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <p className="px-4 pb-4 text-base italic leading-relaxed text-navy-700 sm:px-5">“{e.fields['Why study abroad']}”</p>
      {open && (
        <div className="space-y-3 border-t border-navy-900/[0.07] p-4 text-sm sm:p-5">
          <p>
            <span className="text-navy-500">Score: </span>
            {Object.entries(e.parts).map(([k, v]) => `${k} ${v}`).join(' · ')}
          </p>
          <p><span className="text-navy-500">Follows us as: </span>{e.fields['Follows us as']}</p>
          <p><span className="text-navy-500">Documents: </span>{e.docs.join(', ') || 'none'}</p>
          <div>
            <span className="text-navy-500">Scholarships chosen:</span>
            <ul className="mt-1 list-disc pl-5">
              {e.picks.map((p) => {
                const url = p.match(/https:\/\/\S+/)?.[0]
                return <li key={p}>{url ? <a href={url} target="_blank" rel="noopener noreferrer" className="underline">{p.replace(url, '').trim()}</a> : p}</li>
              })}
            </ul>
          </div>
          <p><span className="text-navy-500">Email: </span><a href={`mailto:${e.email}`} className="underline">{e.email}</a> · Entered {fmtDateTime(e.created_at)}</p>
          {wa && (
            <Btn as="a" href={wa} target="_blank" rel="noopener noreferrer" icon="whatsapp" className="!bg-[#1FA855] hover:!bg-[#188f47]">
              Message on WhatsApp
            </Btn>
          )}
        </div>
      )}
    </li>
  )
}

export default function Giveaway() {
  const { data, loading, error, setData } = useLoad(api.listConsultations)
  const [onlyEligible, setOnlyEligible] = useState(false)
  const [winners, setWinners] = useState([])
  const [actionError, setActionError] = useState(null)
  const [flashNode, flash] = useFlash()

  const ranked = useMemo(
    () =>
      (data ?? [])
        .filter((r) => r.message?.startsWith(TAG))
        .map((r) => score(parseEntry(r)))
        .sort((a, b) => b.total - a.total || new Date(a.created_at) - new Date(b.created_at)),
    [data]
  )
  const eligible = ranked.filter((e) => e.eligible)
  const shown = onlyEligible ? eligible : ranked

  const toggle = async (e, tag) => {
    const has = new RegExp(`\\s*#${tag}`)
    const notes = has.test(e.notes ?? '') ? (e.notes ?? '').replace(has, '') : `${e.notes ?? ''} #${tag}`.trim()
    setActionError(null)
    try {
      await api.updateConsultation(e.id, { notes })
      setData(data.map((r) => (r.id === e.id ? { ...r, notes } : r)))
      flash()
    } catch (err) {
      setActionError(err)
    }
  }

  const draw = () => {
    const pool = [...eligible]
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[pool[i], pool[j]] = [pool[j], pool[i]]
    }
    setWinners(pool.slice(0, giveaway.places).map((e) => e.id))
  }

  const exportSheet = () =>
    downloadCsv(
      'free-application-entries-ranked.csv',
      ranked.map((e, i) => ({
        Rank: i + 1,
        Score: e.total,
        Eligible: e.eligible ? 'Yes' : 'No',
        Drawn: winners.includes(e.id) ? 'Yes' : '',
        Name: e.full_name,
        Nationality: e.country,
        Level: e.study_level,
        Field: e.fields['Field of study'],
        'Qualification and grade': e.fields['Last qualification and grade'],
        'Core documents': `${e.core}/${CORE_DOCS.length}`,
        'Documents ready': e.docs.join(', '),
        'Follows us': e.follows ? 'Yes' : 'No',
        'Follows us as': e.fields['Follows us as'],
        Commented: e.commented ? 'Yes' : 'No',
        'Why study abroad': e.fields['Why study abroad'],
        'Scholarships chosen': e.picks.join(' | '),
        WhatsApp: e.phone,
        Email: e.email,
        Entered: fmtDateTime(e.created_at),
      }))
    )

  return (
    <div className="space-y-6">
      <PageTitle
        title="Free application entries"
        sub={`Ranked by score out of 100. Eligible for the draw: follows us, commented, and all ${CORE_DOCS.length} core documents.`}
      >
        <Btn variant="outline" icon="file" disabled={!ranked.length} onClick={exportSheet}>
          Export ranked sheet
        </Btn>
        <Btn icon="award" disabled={!eligible.length} onClick={draw}>
          Draw {giveaway.places} at random
        </Btn>
      </PageTitle>
      <ErrorNote error={error || actionError} />

      <div className="flex flex-wrap items-center gap-4 text-sm text-navy-700">
        <span><strong>{ranked.length}</strong> entries</span>
        <span><strong>{eligible.length}</strong> eligible</span>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={onlyEligible} onChange={(e) => setOnlyEligible(e.target.checked)} className="h-4 w-4 accent-navy-900" />
          Show eligible only
        </label>
        <span className="text-navy-500">Grades are estimated from what students typed; check them yourself.</span>
      </div>

      {loading ? (
        <p className="text-navy-500">Loading…</p>
      ) : shown.length ? (
        <ul className="space-y-3">
          {shown.map((e, i) => (
            <Entry key={e.id} e={e} rank={i + 1} winner={winners.includes(e.id)} onToggle={(tag) => toggle(e, tag)} />
          ))}
        </ul>
      ) : (
        <Empty icon="users" title={ranked.length ? 'No eligible entries yet' : 'No entries yet'}>
          Entries from the free application page appear here.
        </Empty>
      )}
      {flashNode}
    </div>
  )
}
