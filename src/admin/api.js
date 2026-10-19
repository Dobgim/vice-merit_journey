/**
 * Admin data access. Same function surface in both modes:
 *   live — Supabase; row-level security only lets emails listed in `admins`
 *          read requests/subscribers or change listings and settings.
 *   demo — localStorage in this browser (see src/lib/supabase.js).
 */
import { RETIRED_KEY, demo, getSupabase, isSupabaseConfigured, newId } from '../lib/supabase'
import { kinds } from '../data/opportunities'
import { slugify } from '../lib/deadline'
import { clearOpportunityCache } from '../hooks/useScholarships'

export const isLive = isSupabaseConfigured

const now = () => new Date().toISOString()

async function must(promise) {
  const { data, error } = await promise
  if (error) throw new Error(error.message)
  return data
}

/* ------------------------------------------------------------------- Auth */

export async function getSession() {
  const sb = await getSupabase()
  if (!sb) return demo.read('session', null)
  const { data } = await sb.auth.getSession()
  if (!data.session) return null
  // Signed in is not enough: the email must also be listed in `admins`.
  const { data: isAdmin } = await sb.rpc('is_admin')
  return isAdmin ? { email: data.session.user.email } : { email: data.session.user.email, notAdmin: true }
}

export async function signIn(email, password) {
  const sb = await getSupabase()
  if (!sb) {
    const session = { email }
    demo.write('session', session)
    return session
  }
  const { error } = await sb.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)
  return getSession()
}

export async function signOut() {
  const sb = await getSupabase()
  if (!sb) return demo.write('session', null)
  await sb.auth.signOut()
}

/* ---------------------------------------------------------- Consultations */

export const CONSULTATION_STATUSES = ['new', 'contacted', 'in progress', 'won', 'closed']

export async function listConsultations() {
  const sb = await getSupabase()
  if (!sb) return demo.read('consultations', [])
  return must(sb.from('consultations').select('*').order('created_at', { ascending: false }))
}

export async function updateConsultation(id, patch) {
  const sb = await getSupabase()
  if (!sb) {
    demo.write('consultations', demo.read('consultations', []).map((r) => (r.id === id ? { ...r, ...patch } : r)))
    return
  }
  await must(sb.from('consultations').update(patch).eq('id', id))
}

export async function deleteConsultation(id) {
  const sb = await getSupabase()
  if (!sb) {
    demo.write('consultations', demo.read('consultations', []).filter((r) => r.id !== id))
    return
  }
  await must(sb.from('consultations').delete().eq('id', id))
}

/* ------------------------------------------------------------ Subscribers */

export async function listSubscribers() {
  const sb = await getSupabase()
  if (!sb) return demo.read('subscribers', [])
  return must(sb.from('subscribers').select('*').order('created_at', { ascending: false }))
}

export async function deleteSubscriber(id) {
  const sb = await getSupabase()
  if (!sb) {
    demo.write('subscribers', demo.read('subscribers', []).filter((r) => r.id !== id))
    return
  }
  await must(sb.from('subscribers').delete().eq('id', id))
}

/* ---------------------------------------------------------- Opportunities */

/** Rows: { id, kind, slug, published, data, updated_at } — `data` is the listing. */
export async function listOpportunities(kind) {
  const sb = await getSupabase()
  if (!sb) return demo.read('opportunities', []).filter((r) => r.kind === kind)
  return must(sb.from('opportunities').select('*').eq('kind', kind).order('updated_at', { ascending: false }))
}

export async function getOpportunity(id) {
  const sb = await getSupabase()
  if (!sb) return demo.read('opportunities', []).find((r) => r.id === id) ?? null
  return must(sb.from('opportunities').select('*').eq('id', id).maybeSingle())
}

/* Built-in listings are shown on the website even before they are imported,
   so one the admin deletes, hides or renames is "retired" — otherwise the
   bundled copy would reappear. */
const isBuiltIn = (kind, slug) => kinds[kind]?.items.some((i) => i.slug === slug)

async function getRetired() {
  return (await getSettings())[RETIRED_KEY] ?? {}
}

async function setRetired(kind, slug, retire) {
  if (!isBuiltIn(kind, slug)) return
  const all = await getRetired()
  const slugs = new Set(all[kind] ?? [])
  if (slugs.has(slug) === retire) return
  if (retire) slugs.add(slug)
  else slugs.delete(slug)
  await saveSetting(RETIRED_KEY, { ...all, [kind]: [...slugs] })
}

/** Built-in listings not in the dashboard yet (added to the code since the last import). */
export async function newBuiltIn(kind, rows) {
  const retired = new Set((await getRetired())[kind] ?? [])
  const saved = new Set(rows.map((r) => r.slug))
  return kinds[kind].items.filter((i) => !saved.has(i.slug) && !retired.has(i.slug))
}

export async function saveOpportunity({ id, kind, published, data }) {
  const slug = data.slug?.trim() || slugify(data.name)
  const { slug: _drop, id: _id, published: _p, ...listing } = data
  const row = { kind, slug, published, data: listing, updated_at: now() }
  clearOpportunityCache()
  const previous = id ? (await getOpportunity(id))?.slug : null

  const sb = await getSupabase()
  let saved
  if (!sb) {
    const rows = demo.read('opportunities', [])
    if (rows.some((r) => r.kind === kind && r.slug === slug && r.id !== id)) {
      throw new Error(`Another ${kinds[kind].singular} already uses the web address “${slug}”.`)
    }
    saved = { ...row, id: id ?? newId() }
    demo.write('opportunities', id ? rows.map((r) => (r.id === id ? saved : r)) : [saved, ...rows])
  } else if (id) {
    saved = await must(sb.from('opportunities').update(row).eq('id', id).select().single())
  } else {
    saved = await must(sb.from('opportunities').insert(row).select().single())
  }

  if (previous && previous !== slug) await setRetired(kind, previous, true)
  await setRetired(kind, slug, !published)
  return saved
}

export async function deleteOpportunity(id, { kind, slug } = {}) {
  clearOpportunityCache()
  const sb = await getSupabase()
  if (!sb) {
    demo.write('opportunities', demo.read('opportunities', []).filter((r) => r.id !== id))
  } else {
    await must(sb.from('opportunities').delete().eq('id', id))
  }
  if (kind && slug) await setRetired(kind, slug, true)
}

/** Copy the built-in listings of a kind into the database so they can be edited. */
export async function importBundled(kind) {
  clearOpportunityCache()
  const retired = new Set((await getRetired())[kind] ?? [])
  const rows = kinds[kind].items.filter((item) => !retired.has(item.slug)).map((item) => {
    const { slug, ...data } = item
    return { kind, slug: slug ?? slugify(item.name), published: true, data, updated_at: now() }
  })
  const sb = await getSupabase()
  if (!sb) {
    const existing = demo.read('opportunities', [])
    const taken = new Set(existing.filter((r) => r.kind === kind).map((r) => r.slug))
    demo.write('opportunities', [
      ...rows.filter((r) => !taken.has(r.slug)).map((r) => ({ ...r, id: newId() })),
      ...existing,
    ])
    return
  }
  await must(sb.from('opportunities').upsert(rows, { onConflict: 'kind,slug', ignoreDuplicates: true }))
}

/* --------------------------------------------------------------- Settings */

export async function getSettings() {
  const sb = await getSupabase()
  if (!sb) return demo.read('settings', {})
  const data = await must(sb.from('settings').select('key, value'))
  return Object.fromEntries(data.map((r) => [r.key, r.value]))
}

export async function saveSetting(key, value) {
  try {
    localStorage.removeItem('ml_settings_cache')
  } catch {
    /* ignore */
  }
  const sb = await getSupabase()
  if (!sb) {
    demo.write('settings', { ...demo.read('settings', {}), [key]: value })
    return
  }
  await must(sb.from('settings').upsert({ key, value, updated_at: now() }))
}

/* ---------------------------------------------------- Flyers & Media Storage */

/** Upload a flyer or website image; resolves to a public URL to store. */
export async function uploadFlyer(file) {
  if (file.type && !file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG, WebP or GIF).')
  }
  const sb = await getSupabase()
  if (!sb) {
    if (file.size > 1.5 * 1024 * 1024) throw new Error('In demo mode images must be under 1.5 MB.')
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const url = reader.result
        const items = demo.read('media_images', [])
        demo.write('media_images', [{ name: file.name, url, created_at: now(), size: file.size }, ...items])
        resolve(url)
      }
      reader.onerror = () => reject(new Error('Could not read that file.'))
      reader.readAsDataURL(file)
    })
  }
  const ext = (file.name?.split('.').pop()?.toLowerCase()) || (file.type?.split('/')[1]?.toLowerCase()) || 'jpg'
  const path = `${Date.now()}-${newId()}.${ext}`
  const { error } = await sb.storage.from('flyers').upload(path, file, {
    cacheControl: '31536000',
    contentType: file.type || 'image/jpeg'
  })
  if (error) throw new Error(error.message)
  return sb.storage.from('flyers').getPublicUrl(path).data.publicUrl
}

/** Lists all images stored in Supabase storage bucket 'flyers'. */
export async function listImages() {
  const sb = await getSupabase()
  if (!sb) return demo.read('media_images', [])

  const { data, error } = await sb.storage.from('flyers').list('', {
    limit: 100,
    sortBy: { column: 'created_at', order: 'desc' },
  })
  if (error) throw new Error(error.message)

  return (data || [])
    .filter((f) => f.name && !f.name.startsWith('.'))
    .map((item) => ({
      name: item.name,
      id: item.id || item.name,
      created_at: item.created_at,
      size: item.metadata?.size,
      url: sb.storage.from('flyers').getPublicUrl(item.name).data.publicUrl,
    }))
}

/** Deletes an image from the storage bucket. */
export async function deleteImage(name) {
  const sb = await getSupabase()
  if (!sb) {
    demo.write('media_images', demo.read('media_images', []).filter((i) => i.name !== name))
    return
  }
  const { error } = await sb.storage.from('flyers').remove([name])
  if (error) throw new Error(error.message)
}
