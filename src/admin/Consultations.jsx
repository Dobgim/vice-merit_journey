import { useMemo, useState } from 'react'
import Icon from '../components/ui/Icon'
import * as api from './api'
import { Btn, Empty, ErrorNote, PageTitle, StatusBadge, downloadCsv, fmtDateTime, inputCls, useFlash, useLoad } from './ui'

const waLink = (phone, name) => {
  const digits = String(phone ?? '').replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}?text=${encodeURIComponent(`Hello ${name}, this is Merit Leaders following up on your consultation request.`)}` : null
}

function Request({ r, onChange, onDelete }) {
  const [open, setOpen] = useState(r.status === 'new')
  const [notes, setNotes] = useState(r.notes ?? '')
  const wa = waLink(r.phone, r.full_name?.split(' ')[0] ?? '')

  return (
    <li className="rounded-2xl border border-navy-900/[0.07] bg-white shadow-soft">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5">
        <div className="min-w-0">
          <p className="truncate font-semibold text-navy-950">{r.full_name}</p>
          <p className="truncate text-[0.8rem] text-navy-500">
            {[r.study_level, r.country, fmtDateTime(r.created_at)].filter(Boolean).join(' · ')}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <StatusBadge status={r.status} />
          <Icon name="chevronDown" className={`h-4 w-4 text-navy-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {open && (
        <div className="space-y-4 border-t border-navy-900/[0.07] p-4 sm:p-5">
          <div className="grid gap-3 text-[0.88rem] sm:grid-cols-2">
            <p>
              <span className="text-navy-500">Email: </span>
              <a href={`mailto:${r.email}`} className="font-semibold text-navy-900 underline-offset-2 hover:underline">{r.email}</a>
            </p>
            <p>
              <span className="text-navy-500">Phone / WhatsApp: </span>
              <span className="font-semibold text-navy-900">{r.phone || '—'}</span>
            </p>
          </div>
          <p className="whitespace-pre-wrap rounded-xl bg-mist p-4 text-[0.92rem] leading-relaxed text-navy-800">{r.message}</p>

          <div className="grid gap-3 sm:grid-cols-[200px_1fr]">
            <label className="block">
              <span className="mb-1.5 block text-[0.8rem] font-semibold text-navy-800">Status</span>
              <select value={r.status} onChange={(e) => onChange({ status: e.target.value })} className={inputCls}>
                {api.CONSULTATION_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[0.8rem] font-semibold text-navy-800">Private notes</span>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => notes !== (r.notes ?? '') && onChange({ notes })}
                placeholder="Call booked for Monday, interested in Chevening…"
                className={`${inputCls} resize-y`}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            {wa && (
              <Btn as="a" href={wa} target="_blank" rel="noopener noreferrer" variant="primary" icon="whatsapp" className="!bg-[#1FA855] hover:!bg-[#188f47]">
                Reply on WhatsApp
              </Btn>
            )}
            <Btn as="a" href={`mailto:${r.email}?subject=${encodeURIComponent('Your Merit Leaders consultation')}`} variant="outline" icon="mail">
              Reply by email
            </Btn>
            <Btn variant="danger" icon="close" onClick={onDelete} className="sm:ml-auto">
              Delete
            </Btn>
          </div>
        </div>
      )}
    </li>
  )
}

export default function Consultations() {
  const { data, loading, error, setData } = useLoad(api.listConsultations)
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const [actionError, setActionError] = useState(null)
  const [flashNode, flash] = useFlash()

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    return (data ?? [])
      .filter((r) => filter === 'all' || r.status === filter)
      .filter((r) => !term || [r.full_name, r.email, r.phone, r.country, r.message].join(' ').toLowerCase().includes(term))
  }, [data, filter, q])

  const update = async (id, patch) => {
    setActionError(null)
    try {
      await api.updateConsultation(id, patch)
      setData(data.map((r) => (r.id === id ? { ...r, ...patch } : r)))
      flash()
    } catch (e) {
      setActionError(e)
    }
  }

  const remove = async (r) => {
    if (!window.confirm(`Delete the request from ${r.full_name}? This cannot be undone.`)) return
    try {
      await api.deleteConsultation(r.id)
      setData(data.filter((x) => x.id !== r.id))
      flash('Deleted')
    } catch (e) {
      setActionError(e)
    }
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Consultation requests" sub="Everyone who filled in the Book Consultation form.">
        <Btn variant="outline" icon="file" disabled={!data?.length} onClick={() => downloadCsv('consultation-requests.csv', data)}>
          Export CSV
        </Btn>
      </PageTitle>
      <ErrorNote error={error || actionError} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, country, message…" className={`${inputCls} sm:max-w-sm`} />
        <div className="flex flex-wrap gap-1.5">
          {['all', ...api.CONSULTATION_STATUSES].map((s) => {
            const count = s === 'all' ? data?.length ?? 0 : data?.filter((r) => r.status === s).length ?? 0
            return (
              <button
                key={s}
                type="button"
                onClick={() => setFilter(s)}
                className={`rounded-full px-3.5 py-2 text-[0.8rem] font-semibold capitalize transition-colors ${
                  filter === s ? 'bg-navy-900 text-white' : 'bg-white text-navy-700 ring-1 ring-navy-900/10 hover:text-navy-950'
                }`}
              >
                {s} <span className="opacity-60">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      {loading ? (
        <p className="text-navy-500">Loading…</p>
      ) : rows.length ? (
        <ul className="space-y-3">
          {rows.map((r) => (
            <Request key={r.id} r={r} onChange={(patch) => update(r.id, patch)} onDelete={() => remove(r)} />
          ))}
        </ul>
      ) : (
        <Empty icon="mail" title={data?.length ? 'No requests match' : 'No requests yet'}>
          New requests from the Book Consultation page appear here.
        </Empty>
      )}
      {flashNode}
    </div>
  )
}
