/**
 * Supabase-ready integration layer.
 *
 * The site runs perfectly without credentials — every call below falls back to a
 * simulated success so the UI is demonstrable. Add the two env vars in `.env`
 * and the same functions start writing to real tables. No component changes.
 *
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=ey...
 *
 * The client is imported dynamically so the ~110 kB SDK never enters the main
 * bundle unless credentials are actually present.
 *
 * Expected schema (see README):
 *   consultations(id, full_name, email, phone, study_level, country, message, created_at)
 *   scholarships(id, name, org, country, flag, level, funding, amount, deadline, urgent, summary, tags)
 */

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(url && anonKey)

const TABLES = {
  consultations: 'consultations',
  scholarships: 'scholarships',
}

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
    // Demo mode: pretend the network exists so the success state is reachable.
    await new Promise((resolve) => setTimeout(resolve, 900))
    if (import.meta.env.DEV) console.info('[Merit Ledger] Demo submission:', row)
    return { ok: true, mode: 'demo' }
  }

  const { error } = await supabase.from(TABLES.consultations).insert(row)
  return error ? { ok: false, mode: 'live', error } : { ok: true, mode: 'live' }
}

/** Fetch scholarships, falling back to the bundled placeholder list. */
export async function fetchScholarships(fallback = []) {
  const supabase = await getSupabase()
  if (!supabase) return fallback

  const { data, error } = await supabase
    .from(TABLES.scholarships)
    .select('*')
    .order('deadline', { ascending: true })

  if (error || !data?.length) return fallback
  return data
}
