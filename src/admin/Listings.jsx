import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { kinds } from '../data/opportunities'
import { deadlineStatus, formatDate } from '../lib/deadline'
import Icon from '../components/ui/Icon'
import DeadlineChip from '../components/ui/DeadlineChip'
import * as api from './api'
import { Btn, Empty, ErrorNote, PageTitle, inputCls, useFlash, useLoad } from './ui'

export default function Listings() {
  const { kind } = useParams()
  const config = kinds[kind]
  const { data, loading, error, reload, setData } = useLoad(() => api.listOpportunities(kind), [kind])
  const [q, setQ] = useState('')
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState(null)
  const [flashNode, flash] = useFlash()

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase()
    return (data ?? []).filter((r) => !term || `${r.data.name} ${r.data.org} ${r.data.country}`.toLowerCase().includes(term))
  }, [data, q])

  if (!config) return <Empty title="Unknown section" />

  const importAll = async () => {
    setBusy(true)
    setActionError(null)
    try {
      await api.importBundled(kind)
      reload()
      flash(`${config.items.length} ${config.plural} imported`)
    } catch (e) {
      setActionError(e)
    } finally {
      setBusy(false)
    }
  }

  const togglePublished = async (r) => {
    try {
      await api.saveOpportunity({ id: r.id, kind, published: !r.published, data: { ...r.data, slug: r.slug } })
      setData(data.map((x) => (x.id === r.id ? { ...x, published: !r.published } : x)))
      flash(r.published ? 'Hidden from the website' : 'Published')
    } catch (e) {
      setActionError(e)
    }
  }

  const flyer = async (r) => {
    setActionError(null)
    try {
      const { downloadFlyer } = await import('../lib/flyerImage')
      await downloadFlyer({ ...r.data, slug: r.slug }, { kind, label: config.flyerLabel })
    } catch (e) {
      setActionError(e)
    }
  }

  const remove = async (r) => {
    if (!window.confirm(`Delete “${r.data.name}”? It will disappear from the website.`)) return
    try {
      await api.deleteOpportunity(r.id)
      setData(data.filter((x) => x.id !== r.id))
      flash('Deleted')
    } catch (e) {
      setActionError(e)
    }
  }

  const usingBuiltIn = !loading && !error && data?.length === 0

  return (
    <div className="space-y-6">
      <PageTitle title={config.title} sub={`Add, edit, hide or delete ${config.plural} shown on ${config.path}.`}>
        <Btn as={Link} to={`/admin/listings/${kind}/new`} variant="gold" icon="plus">
          Add {config.singular}
        </Btn>
      </PageTitle>
      <ErrorNote error={error || actionError} />

      {usingBuiltIn && (
        <div className="rounded-2xl border border-gold-300/60 bg-gold-50 p-5">
          <p className="font-semibold text-gold-900">
            Your website is currently showing the {config.items.length} built-in {config.plural}.
          </p>
          <p className="mt-1 text-[0.88rem] text-gold-900/80">
            Import them first so you can edit them here. Once you add or import anything, the website shows only what
            is listed on this page.
          </p>
          <Btn variant="primary" icon="arrowRight" disabled={busy} onClick={importAll} className="mt-4">
            {busy ? 'Importing…' : `Import the ${config.items.length} built-in ${config.plural}`}
          </Btn>
        </div>
      )}

      {!!data?.length && (
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${config.plural}…`} className={`${inputCls} sm:max-w-sm`} />
      )}

      {loading ? (
        <p className="text-navy-500">Loading…</p>
      ) : rows.length ? (
        <ul className="space-y-3">
          {rows.map((r) => {
            const closed = deadlineStatus(r.data.deadline).state === 'closed'
            return (
              <li key={r.id} className="flex flex-col gap-4 rounded-2xl border border-navy-900/[0.07] bg-white p-4 shadow-soft sm:flex-row sm:items-center sm:p-5">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link to={`/admin/listings/${kind}/${r.id}`} className="font-semibold text-navy-950 hover:underline">
                      {r.data.name}
                    </Link>
                    {!r.published && (
                      <span className="rounded-full bg-navy-900/[0.06] px-2 py-0.5 text-[0.7rem] font-semibold text-navy-600">Hidden</span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-[0.8rem] text-navy-500">
                    {[r.data.org, r.data.country, r.data.deadline ? `Deadline ${formatDate(r.data.deadline)}` : 'Rolling'].filter(Boolean).join(' · ')}
                  </p>
                  <div className="mt-2">
                    <DeadlineChip deadline={r.data.deadline} />
                    {closed && <span className="ml-2 text-[0.75rem] text-navy-500">Update the deadline for the next cycle.</span>}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Btn as={Link} to={`/admin/listings/${kind}/${r.id}`} variant="primary" icon="pen">Edit</Btn>
                  <Btn variant="outline" icon="file" onClick={() => flyer(r)}>Flyer</Btn>
                  <Btn variant="outline" onClick={() => togglePublished(r)}>{r.published ? 'Hide' : 'Publish'}</Btn>
                  {r.published && (
                    <Btn as="a" href={`${config.path}/${r.slug}`} target="_blank" rel="noreferrer" variant="ghost" icon="external">
                      View
                    </Btn>
                  )}
                  <Btn variant="danger" onClick={() => remove(r)} aria-label={`Delete ${r.data.name}`}>
                    <Icon name="close" className="h-4 w-4" />
                  </Btn>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        !usingBuiltIn && <Empty title={`No ${config.plural} match`} />
      )}
      {flashNode}
    </div>
  )
}
