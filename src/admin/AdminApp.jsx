import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { company } from '../data/site'
import { kinds } from '../data/opportunities'
import { fetchOpportunities } from '../lib/supabase'
import { daysLeft, deadlineStatus, formatDate } from '../lib/deadline'
import Icon from '../components/ui/Icon'
import * as api from './api'
import { Btn, ErrorNote, Field, Panel, PageTitle, Stat, StatusBadge, fmtDateTime, inputCls, useLoad } from './ui'
import Consultations from './Consultations'
import Subscribers from './Subscribers'
import Listings from './Listings'
import ListingEditor from './ListingEditor'
import PackagesAdmin from './PackagesAdmin'
import SettingsAdmin from './SettingsAdmin'
import MediaAdmin from './MediaAdmin'

/* ------------------------------------------------------------------ Login */

function Login({ onSignedIn, notAdminEmail }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      onSignedIn(await api.signIn(email.trim(), password))
    } catch (err) {
      setError(err)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4 py-12">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-lift">
        <div className="flex items-center gap-3">
          <img src="/logo-mark.png" alt="" className="h-11 w-11 rounded-xl ring-1 ring-navy-900/10" />
          <div>
            <p className="font-display text-lg font-semibold text-navy-950">{company.name}</p>
            <p className="text-sm text-navy-500">Admin dashboard</p>
          </div>
        </div>

        {!api.isLive && (
          <p className="mt-5 rounded-xl bg-gold-50 px-4 py-3 text-sm leading-relaxed text-gold-900 ring-1 ring-gold-300/60">
            <strong>Demo mode.</strong> Supabase is not connected yet, so any email and password will
            sign you in and changes are saved only in this browser.
          </p>
        )}
        {notAdminEmail && (
          <p className="mt-5 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700 ring-1 ring-rose-200">
            {notAdminEmail} is signed in but is not an admin. Add it to the <code>admins</code> table in Supabase.
          </p>
        )}

        <div className="mt-6 space-y-4">
          <Field label="Email">
            <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="leadermerit17@gmail.com" />
          </Field>
          <Field label="Password">
            <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
          </Field>
          <ErrorNote error={error} />
          <Btn as="button" type="submit" disabled={busy} className="w-full">
            {busy ? 'Signing in…' : 'Sign in'}
          </Btn>
        </div>
        <Link to="/" className="mt-5 block text-center text-sm text-navy-500 hover:text-navy-900">
          ← Back to website
        </Link>
      </form>
    </div>
  )
}

/* ----------------------------------------------------------------- Layout */

const NAV = [
  { to: '/admin', label: 'Overview', icon: 'layers', end: true },
  { to: '/admin/requests', label: 'Consultation requests', icon: 'mail' },
  { to: '/admin/subscribers', label: 'Subscribers', icon: 'bell' },
  { to: '/admin/listings/scholarships', label: 'Scholarships', icon: 'cap' },
  { to: '/admin/listings/grants', label: 'Grants', icon: 'wallet' },
  { to: '/admin/listings/fellowships', label: 'Fellowships', icon: 'users' },
  { to: '/admin/listings/internships', label: 'Internships', icon: 'building' },
  { to: '/admin/listings/competitions', label: 'Competitions & awards', icon: 'trending' },
  { to: '/admin/media', label: 'Media & Images', icon: 'image' },
  { to: '/admin/packages', label: 'Packages & prices', icon: 'star' },
  { to: '/admin/settings', label: 'Settings & Domain', icon: 'globe' },
]

function Sidebar({ session, onSignOut, onNavigate }) {
  const liveUrl = `https://${company.domain || 'meritleaders.com'}`

  return (
    <div className="flex h-full flex-col bg-navy-950 p-4 text-white">
      <Link to="/admin" onClick={onNavigate} className="flex items-center gap-3 px-2 py-2">
        <img src="/logo-mark.png" alt="" className="h-10 w-10 rounded-xl bg-white p-0.5" />
        <div className="leading-tight">
          <p className="font-display font-semibold">{company.name}</p>
          <p className="text-xs text-navy-100/55">Admin</p>
        </div>
      </Link>

      <nav className="mt-6 flex-1 space-y-0.5" aria-label="Admin">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-white/10 text-white' : 'text-navy-100/70 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <Icon name={n.icon} className="h-[1.05rem] w-[1.05rem] text-gold-300" />
            {n.label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-2 border-t border-white/10 pt-4">
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm text-navy-100/90 transition hover:bg-white/10 hover:text-white"
          title={`Visit ${liveUrl}`}
        >
          <span className="flex items-center gap-2">
            <Icon name="globe" className="h-4 w-4 text-gold-300" />
            <span>Live Site</span>
          </span>
          <span className="flex items-center gap-1 rounded bg-gold-400/20 px-1.5 py-0.5 text-[11px] font-semibold text-gold-200">
            {company.domain || 'meritleaders.com'}
            <Icon name="external" className="h-3 w-3" />
          </span>
        </a>
        <div className="px-3 text-xs text-navy-100/45">
          Signed in as <span className="break-all text-navy-100/80">{session.email}</span>
        </div>
        <button type="button" onClick={onSignOut} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-navy-100/70 hover:bg-white/5 hover:text-white">
          <Icon name="arrowLeft" className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  )
}

/* --------------------------------------------------------------- Overview */

function Overview() {
  const requests = useLoad(api.listConsultations)
  const subs = useLoad(api.listSubscribers)
  const listings = useLoad(() =>
    Promise.all(
      Object.values(kinds).map(async (k) => ({ kind: k, items: await fetchOpportunities(k.key, k.items) }))
    )
  )

  const all = listings.data ?? []
  const closingSoon = all
    .flatMap(({ kind, items }) => items.map((i) => ({ ...i, kind })))
    .filter((i) => deadlineStatus(i.deadline).state === 'closing')
    .sort((a, b) => daysLeft(a.deadline) - daysLeft(b.deadline))
  const newCount = requests.data?.filter((r) => r.status === 'new').length ?? 0
  const liveUrl = `https://${company.domain || 'meritleaders.com'}`

  return (
    <div className="space-y-6">
      <PageTitle title="Overview" sub="What needs your attention today." />
      <ErrorNote error={requests.error || subs.error || listings.error} />

      {/* Custom Domain quick access banner */}
      <div className="flex flex-col gap-3 rounded-2xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-4 text-white shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-400/20 text-gold-300 ring-1 ring-gold-400/30">
            <Icon name="globe" className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-300">Connected Custom Domain</p>
            <p className="truncate font-display font-semibold text-white">{liveUrl}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gold-400 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-sm transition hover:bg-gold-300 active:scale-95"
          >
            <span>Open Website</span>
            <Icon name="external" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="New requests" value={requests.loading ? '…' : newCount} hint={`${requests.data?.length ?? 0} in total`} icon="mail" />
        <Stat label="Subscribers" value={subs.loading ? '…' : subs.data?.length ?? 0} hint="Scholarship alerts list" icon="bell" />
        <Stat
          label="Open listings"
          value={listings.loading ? '…' : all.reduce((n, { items }) => n + items.filter((i) => deadlineStatus(i.deadline).state !== 'closed').length, 0)}
          hint={all.map(({ kind, items }) => `${items.length} ${kind.plural}`).join(' · ')}
          icon="award"
        />
        <Stat label="Closing in 45 days" value={listings.loading ? '…' : closingSoon.length} hint="Remind your clients" icon="clock" />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel
          title="Latest consultation requests"
          actions={<Link to="/admin/requests" className="text-sm font-semibold text-navy-700 hover:text-navy-950">See all →</Link>}
        >
          {requests.data?.length ? (
            <ul className="divide-y divide-navy-900/[0.07]">
              {requests.data.slice(0, 6).map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-navy-950">{r.full_name}</p>
                    <p className="truncate text-sm text-navy-500">
                      {r.study_level} · {r.country} · {fmtDateTime(r.created_at)}
                    </p>
                  </div>
                  <StatusBadge status={r.status} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base text-navy-500">{requests.loading ? 'Loading…' : 'No requests yet.'}</p>
          )}
        </Panel>

        <Panel title="Deadlines coming up">
          {closingSoon.length ? (
            <ul className="divide-y divide-navy-900/[0.07]">
              {closingSoon.slice(0, 8).map((i) => (
                <li key={`${i.kind.key}-${i.slug}`} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-navy-950">{i.name}</p>
                    <p className="truncate text-sm text-navy-500">
                      {i.kind.flyerLabel} · closes {formatDate(i.deadline)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-semibold text-rose-700 ring-1 ring-rose-200">
                    {deadlineStatus(i.deadline).label}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base text-navy-500">{listings.loading ? 'Loading…' : 'Nothing closes in the next 45 days.'}</p>
          )}
        </Panel>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------- Root */

export default function AdminApp() {
  const [session, setSession] = useState(undefined)
  const [drawer, setDrawer] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = `Admin — ${company.name}`
    // Keep the dashboard out of search engines.
    const robots = document.createElement('meta')
    robots.name = 'robots'
    robots.content = 'noindex, nofollow'
    document.head.appendChild(robots)
    api.getSession().then(setSession).catch(() => setSession(null))
    return () => robots.remove()
  }, [])
  useEffect(() => setDrawer(false), [pathname])

  if (session === undefined) {
    return <div className="flex min-h-screen items-center justify-center bg-navy-950 text-navy-100/70">Loading…</div>
  }
  if (!session || session.notAdmin) {
    return <Login onSignedIn={setSession} notAdminEmail={session?.notAdmin ? session.email : null} />
  }

  const signOut = async () => {
    await api.signOut()
    setSession(null)
  }

  const liveUrl = `https://${company.domain || 'meritleaders.com'}`

  return (
    <div className="notranslate min-h-screen bg-mist" translate="no">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 lg:block">
        <Sidebar session={session} onSignOut={signOut} />
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-navy-950 px-4 py-3 text-white lg:hidden">
        <div className="flex items-center gap-2">
          <img src="/logo-mark.png" alt="" className="h-7 w-7 rounded-lg bg-white p-0.5" />
          <span className="font-display font-semibold">{company.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 rounded-lg bg-gold-400/20 px-2.5 py-1 text-xs font-semibold text-gold-300"
          >
            <span>Live site</span>
            <Icon name="external" className="h-3 w-3" />
          </a>
          <button type="button" onClick={() => setDrawer(true)} aria-label="Open menu" className="rounded-full p-2 hover:bg-white/10">
            <Icon name="menu" className="h-5 w-5" />
          </button>
        </div>
      </div>
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="Close menu" onClick={() => setDrawer(false)} className="absolute inset-0 bg-navy-950/60" />
          <div className="absolute inset-y-0 left-0 w-72">
            <Sidebar session={session} onSignOut={signOut} onNavigate={() => setDrawer(false)} />
          </div>
        </div>
      )}

      <main className="min-w-0 overflow-x-hidden px-4 py-6 sm:px-6 lg:ml-64 lg:px-10 lg:py-10">
        {!api.isLive && (
          <p className="mb-6 rounded-xl bg-gold-50 px-4 py-3 text-sm text-gold-900 ring-1 ring-gold-300/60">
            <strong>Demo mode:</strong> changes are saved only in this browser. Connect Supabase (see README) to go live.
          </p>
        )}
        <div className="mx-auto max-w-6xl">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="requests" element={<Consultations />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="listings/:kind" element={<Listings />} />
            <Route path="listings/:kind/new" element={<ListingEditor />} />
            <Route path="listings/:kind/:id" element={<ListingEditor />} />
            <Route path="media" element={<MediaAdmin />} />
            <Route path="packages" element={<PackagesAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
            <Route path="*" element={<Overview />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
