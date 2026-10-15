/**
 * Data layer for the public site and the admin dashboard.
 *
 * Live mode: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (see .env.example)
 * and run supabase/schema.sql once. Everything then reads and writes Supabase,
 * and row-level security restricts admin actions to emails in `admins`.
 *
 * Demo mode (no env vars): everything still works, but data lives in this
 * browser's localStorage — handy for trying the dashboard, never shared.
 *
 * The client is imported dynamically so the ~110 kB SDK never enters the main
 * bundle unless credentials are actually present.
 */

const url = import.meta.env.VITE_SUPABASE_URL || 'https://uitneltxtkmjqsbrbfzd.supabase.co'
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdG5lbHR4dGttanFzYnJiZnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwNTU4MDgsImV4cCI6MjEwNzYzMTgwOH0.hvyW-ehCi4eF46KtSJ0p8bRNcXSUWmqQiYEcFRxi770'

export const isSupabaseConfigured = Boolean(url && anonKey)

let clientPromise = null

/** Lazily creates (and memoises) the Supabase client. Null when unconfigured. */
export async function getSupabase() {
  if (!isSupabaseConfigured) return null

  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url, anonKey)
    )
  }

  return clientPromise
}

/* ---------------------------------------------------------- Demo storage */

export const demo = {
  read(key, fallback) {
    try {
      const raw = localStorage.getItem(`ml_demo_${key}`)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  },
  write(key, value) {
    try {
      localStorage.setItem(`ml_demo_${key}`, JSON.stringify(value))
    } catch {
      /* storage full or blocked — demo only */
    }
  },
}

export const newId = () =>
  globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/* ---------------------------------------------------------- Public writes */

/** Submit a consultation request. Resolves to { ok, mode, error }. */
export async function submitConsultation(payload) {
  const row = {
    full_name: payload.fullName,
    email: payload.email,
    phone: payload.phone || null,
    study_level: payload.studyLevel,
    country: payload.country,
    message: payload.message,
  }

  const supabase = await getSupabase()

  if (!supabase) {
    await pause(900)
    const rows = demo.read('consultations', [])
    demo.write('consultations', [
      { ...row, id: newId(), status: 'new', notes: '', created_at: new Date().toISOString() },
      ...rows,
    ])
    return { ok: true, mode: 'demo' }
  }

  const { error } = await supabase.from('consultations').insert(row)
  return error ? { ok: false, mode: 'live', error } : { ok: true, mode: 'live' }
}

/** Subscribe an email to alerts. Resolves to { ok, mode, error }. */
export async function subscribeToAlerts({ email, studyLevel }) {
  const row = { email: email.trim().toLowerCase(), study_level: studyLevel || null }
  const supabase = await getSupabase()

  if (!supabase) {
    await pause(700)
    const rows = demo.read('subscribers', [])
    if (!rows.some((r) => r.email === row.email)) {
      demo.write('subscribers', [{ ...row, id: newId(), created_at: new Date().toISOString() }, ...rows])
    }
    return { ok: true, mode: 'demo' }
  }

  const { error } = await supabase.from('subscribers').insert(row)
  // 23505 = unique violation: already subscribed, which is a success to the visitor.
  if (error && error.code !== '23505') return { ok: false, mode: 'live', error }
  return { ok: true, mode: 'live' }
}

/* ----------------------------------------------------------- Public reads */

const toListing = (row) => ({ ...row.data, id: row.id, slug: row.slug, published: row.published })

/**
 * Published listings of one kind ('scholarships' | 'grants' | 'internships').
 * Falls back to the bundled list until the admin has added any of that kind.
 */
export async function fetchOpportunities(kind, fallback = []) {
  const supabase = await getSupabase()

  if (!supabase) {
    const rows = demo.read('opportunities', []).filter((r) => r.kind === kind)
    return rows.length ? rows.filter((r) => r.published).map(toListing) : fallback
  }

  const { data, error } = await supabase
    .from('opportunities')
    .select('id, kind, slug, published, data')
    .eq('kind', kind)
    .eq('published', true)

  if (error || !data?.length) return fallback
  return data.map(toListing)
}

/** All site settings as { key: value }. Empty object when none are saved. */
export async function fetchSettings() {
  const supabase = await getSupabase()
  if (!supabase) return demo.read('settings', {})

  const { data, error } = await supabase.from('settings').select('key, value')
  if (error || !data) return {}
  return Object.fromEntries(data.map((r) => [r.key, r.value]))
}
