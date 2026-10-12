import { useEffect, useState } from 'react'
import Icon from '../components/ui/Icon'

/* Small, consistent building blocks for the dashboard screens. */

export const inputCls =
  'w-full rounded-xl border border-navy-900/[0.12] bg-white px-3.5 py-2.5 text-base text-navy-950 placeholder:text-navy-400 transition-colors hover:border-navy-900/25 focus:outline-none focus:ring-2 focus:ring-gold-400/60'

export function PageTitle({ title, sub, children }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-semibold leading-tight text-navy-950">{title}</h1>
        {sub && <p className="mt-1 text-base text-navy-600">{sub}</p>}
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  )
}

export function Panel({ title, children, className = '', actions }) {
  return (
    <section className={`min-w-0 rounded-2xl border border-navy-900/[0.07] bg-white p-5 shadow-soft sm:p-6 ${className}`}>
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="font-display text-lg font-semibold text-navy-950">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </section>
  )
}

export function Field({ label, hint, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-semibold text-navy-800">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-navy-500">{hint}</span>}
    </label>
  )
}

const btnVariants = {
  primary: 'bg-navy-900 text-white hover:bg-navy-800',
  gold: 'bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 hover:brightness-105',
  outline: 'border border-navy-900/15 bg-white text-navy-900 hover:border-navy-900/35',
  danger: 'border border-rose-200 bg-white text-rose-700 hover:bg-rose-50',
  ghost: 'text-navy-700 hover:bg-navy-900/[0.05]',
}

export function Btn({ variant = 'primary', icon, children, className = '', as: Tag = 'button', ...rest }) {
  return (
    <Tag
      {...(Tag === 'button' ? { type: 'button' } : {})}
      {...rest}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-50 ${btnVariants[variant]} ${className}`}
    >
      {icon && <Icon name={icon} className="h-4 w-4" />}
      {children}
    </Tag>
  )
}

export function Stat({ label, value, hint, icon }) {
  return (
    <div className="rounded-2xl border border-navy-900/[0.07] bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-navy-500">{label}</span>
        {icon && <Icon name={icon} className="h-5 w-5 text-gold-600" />}
      </div>
      <div className="mt-2 font-display text-3xl font-semibold leading-none text-navy-950">{value}</div>
      {hint && <div className="mt-1.5 text-sm text-navy-500">{hint}</div>}
    </div>
  )
}

const statusStyles = {
  new: 'bg-sky-50 text-sky-700 ring-sky-200',
  contacted: 'bg-amber-50 text-amber-800 ring-amber-200',
  'in progress': 'bg-violet-50 text-violet-700 ring-violet-200',
  won: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  closed: 'bg-navy-900/[0.05] text-navy-600 ring-navy-900/10',
}

export function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ring-1 ${statusStyles[status] ?? statusStyles.closed}`}>
      {status}
    </span>
  )
}

export function Empty({ icon = 'search', title, children }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-navy-900/15 bg-white px-6 py-14 text-center">
      <Icon name={icon} className="h-8 w-8 text-navy-300" />
      <p className="mt-3 font-semibold text-navy-900">{title}</p>
      {children && <div className="mt-1.5 max-w-md text-sm text-navy-600">{children}</div>}
    </div>
  )
}

export function ErrorNote({ error }) {
  if (!error) return null
  return (
    <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700" role="alert">
      {String(error.message ?? error)}
    </p>
  )
}

/** Brief "Saved" confirmation. Call `flash()` after a successful save. */
export function useFlash() {
  const [msg, setMsg] = useState(null)
  useEffect(() => {
    if (!msg) return
    const t = setTimeout(() => setMsg(null), 2200)
    return () => clearTimeout(t)
  }, [msg])
  const node = msg && (
    <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lift" role="status">
      <Icon name="check" className="mr-2 inline h-4 w-4 text-gold-300" />
      {msg}
    </div>
  )
  return [node, (m = 'Saved') => setMsg(m)]
}

/** Load async data with loading / error / reload. */
export function useLoad(fn, deps = []) {
  const [state, setState] = useState({ loading: true, data: null, error: null })
  const [n, setN] = useState(0)
  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true }))
    fn()
      .then((data) => alive && setState({ loading: false, data, error: null }))
      .catch((error) => alive && setState({ loading: false, data: null, error }))
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, n])
  return { ...state, reload: () => setN((x) => x + 1), setData: (data) => setState((s) => ({ ...s, data })) }
}

export const fmtDateTime = (iso) =>
  iso ? new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''

export function downloadCsv(filename, rows) {
  if (!rows.length) return
  const cols = Object.keys(rows[0])
  const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  a.download = filename
  a.click()
  URL.revokeObjectURL(a.href)
}
