import { useMemo, useState } from 'react'
import * as api from './api'
import { Btn, Empty, ErrorNote, PageTitle, downloadCsv, fmtDateTime, inputCls, useFlash, useLoad } from './ui'

export default function Subscribers() {
  const { data, loading, error, setData } = useLoad(api.listSubscribers)
  const [q, setQ] = useState('')
  const [actionError, setActionError] = useState(null)
  const [flashNode, flash] = useFlash()

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    return (data ?? []).filter((r) => !term || `${r.email} ${r.study_level ?? ''}`.toLowerCase().includes(term))
  }, [data, q])

  const remove = async (r) => {
    if (!window.confirm(`Remove ${r.email} from the alerts list?`)) return
    try {
      await api.deleteSubscriber(r.id)
      setData(data.filter((x) => x.id !== r.id))
      flash('Removed')
    } catch (e) {
      setActionError(e)
    }
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Subscribers" sub="People who signed up for scholarship and deadline alerts.">
        <Btn
          variant="outline"
          icon="file"
          disabled={!data?.length}
          onClick={() => downloadCsv('subscribers.csv', data.map(({ email, study_level, created_at }) => ({ email, study_level, created_at })))}
        >
          Export CSV
        </Btn>
        <Btn
          variant="primary"
          icon="mail"
          disabled={!rows.length}
          onClick={() => {
            navigator.clipboard?.writeText(rows.map((r) => r.email).join(', '))
            flash('Emails copied — paste them into BCC')
          }}
        >
          Copy emails
        </Btn>
      </PageTitle>
      <ErrorNote error={error || actionError} />

      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search email or study level…" className={`${inputCls} sm:max-w-sm`} />

      {loading ? (
        <p className="text-navy-500">Loading…</p>
      ) : rows.length ? (
        <div className="overflow-x-auto rounded-2xl border border-navy-900/[0.07] bg-white shadow-soft">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-navy-900/[0.07] text-xs uppercase tracking-wider text-navy-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Study level</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-900/[0.06]">
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="px-5 py-3 font-semibold text-navy-950">{r.email}</td>
                  <td className="px-5 py-3 text-navy-700">{r.study_level || 'All levels'}</td>
                  <td className="px-5 py-3 text-navy-500">{fmtDateTime(r.created_at)}</td>
                  <td className="px-5 py-3 text-right">
                    <button type="button" onClick={() => remove(r)} className="text-sm font-semibold text-rose-600 hover:text-rose-800">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty icon="bell" title={data?.length ? 'No subscribers match' : 'No subscribers yet'}>
          Sign-ups from the “Get alerts” forms on the website appear here.
        </Empty>
      )}
      <p className="text-sm text-navy-500">{data?.length ?? 0} subscribers in total.</p>
      {flashNode}
    </div>
  )
}
