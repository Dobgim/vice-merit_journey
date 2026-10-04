/**
 * Deadline helpers. Listings store ISO dates (YYYY-MM-DD); everything the UI
 * shows — "12 days left", "Closed", sort order — is derived here at render time.
 */

const DAY = 86_400_000
export const CLOSING_SOON_DAYS = 45

/** Parses YYYY-MM-DD as a local date (avoids the UTC off-by-one of `new Date(iso)`). */
export function parseDate(iso) {
  if (!iso) return null
  const [y, m, d] = String(iso).slice(0, 10).split('-').map(Number)
  if (!y || !m || !d) return null
  return new Date(y, m - 1, d)
}

/** "5 Nov 2026". Falls back to the raw value for non-ISO strings. */
export function formatDate(iso) {
  const date = parseDate(iso)
  if (!date) return iso ?? 'Rolling'
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** Whole days from today until the deadline; negative once it has passed. */
export function daysLeft(iso, now = new Date()) {
  const date = parseDate(iso)
  if (!date) return null
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((date - today) / DAY)
}

/** { state: 'open' | 'closing' | 'closed' | 'rolling', days, label } */
export function deadlineStatus(iso, now) {
  const days = daysLeft(iso, now)
  if (days === null) return { state: 'rolling', days: null, label: 'Rolling deadline' }
  if (days < 0) return { state: 'closed', days, label: 'Closed this cycle' }
  if (days === 0) return { state: 'closing', days, label: 'Closes today' }
  if (days <= CLOSING_SOON_DAYS) {
    return { state: 'closing', days, label: `${days} day${days === 1 ? '' : 's'} left` }
  }
  return { state: 'open', days, label: `${days} days left` }
}

/** Open awards first (soonest deadline first), closed awards last. */
export function byDeadline(a, b) {
  const da = daysLeft(a.deadline)
  const db = daysLeft(b.deadline)
  const rank = (d) => (d === null ? 1 : d < 0 ? 2 : 0)
  if (rank(da) !== rank(db)) return rank(da) - rank(db)
  return (da ?? 0) - (db ?? 0)
}

/** URL-safe slug for listings that do not carry one (e.g. older Supabase rows). */
export function slugify(text = '') {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
