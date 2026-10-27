import { daysLeft, parseDate } from './deadline'

/**
 * When a listing was posted on the site: `posted` if set, otherwise the day it
 * was added/checked (`verified`). Either may be a plain date (2026-10-26) or a
 * full timestamp (2026-10-26T23:06:00Z) — newer listings record the time too.
 * Drives the "Posted" line, the NEW badge, "Newest first" and "New this week".
 */
export const postedOn = (item) => (parseDate(item?.posted) ? item.posted : parseDate(item?.verified) ? item.verified : null)

const hasTime = (value) => /T\d{2}:\d{2}/.test(value ?? '')

/** Exact posting moment as a Date (midnight when only the day is known). */
export function postedAt(item) {
  const value = postedOn(item)
  if (!value) return null
  return hasTime(value) ? new Date(value) : parseDate(value)
}

/** Sort key, oldest → newest: posting time in ms (0 when unknown). */
export const postedSortKey = (item) => postedAt(item)?.getTime() ?? 0

/**
 * "26 Oct 2026, 23:06" in the visitor's own time zone, or just the date when
 * the time was not recorded. Within the last day: "3 hours ago" / "just now".
 */
export function formatPosted(item, now = new Date()) {
  const value = postedOn(item)
  if (!value) return null
  const at = postedAt(item)
  const date = at.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
  if (!hasTime(value)) return date
  const mins = Math.round((now - at) / 60_000)
  if (mins >= 0 && mins < 60) return mins < 2 ? 'just now' : `${mins} minutes ago`
  if (mins >= 60 && mins < 24 * 60) {
    const h = Math.round(mins / 60)
    return `${h} hour${h === 1 ? '' : 's'} ago`
  }
  return `${date}, ${at.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
}

/** Whole days since the listing was posted (null when unknown). */
export function daysSincePosted(item, now = new Date()) {
  const d = daysLeft(postedOn(item), now)
  return d === null ? null : -d
}

export const NEW_DAYS = 7
export const isNew = (item, now) => {
  const d = daysSincePosted(item, now)
  return d !== null && d >= 0 && d <= NEW_DAYS
}

const closesWithin = (days) => (item, now) => {
  const d = daysLeft(item.deadline, now)
  return d !== null && d >= 0 && d <= days
}

/** Listing-page "Show" switch (`?when=`): key → label and test(item, now, saved). */
export const TIMING_FILTERS = {
  all: { label: 'All', test: () => true },
  new: { label: 'New this week', test: (i, now) => isNew(i, now) },
  week: { label: 'Closing in 7 days', test: closesWithin(7) },
  month: { label: 'Closing in 30 days', test: closesWithin(30) },
  saved: { label: 'Saved', test: (i, now, saved) => saved.has(i.slug) },
}
