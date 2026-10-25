import { daysLeft, parseDate } from './deadline'

/**
 * When a listing was posted on the site: `posted` if set, otherwise the day it
 * was added/checked (`verified`). Drives the "Posted" date, the NEW badge and
 * the "New this week" filter.
 */
export const postedOn = (item) => (parseDate(item?.posted) ? item.posted : parseDate(item?.verified) ? item.verified : null)

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
