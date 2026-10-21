/**
 * Whether applying to a listing costs money (an entry, application or
 * processing fee). Listings can say so with `applicationFee` (e.g. 'US$17.99');
 * otherwise it is read from the notes, tags and documents — which also covers
 * listings saved in the dashboard. Tuition fees and fee waivers don't count.
 */
const FEE = /\b(entry|application|registration|processing|submission|participation) fees?\b|\bfee to apply\b/i
const NO_FEE = /\b(no|without|free of)\b[^.]{0,35}\bfees?\b|\bfees? (are )?(waived|waiver)\b/i

export function hasApplicationFee(item) {
  if (item.applicationFee) return true
  const texts = [item.funding, item.deadlineNote, ...(item.tags ?? []), ...(item.documents ?? []), ...(item.howToApply ?? []), ...(item.overview ?? [])]
  return texts.some((t) => typeof t === 'string' && FEE.test(t) && !NO_FEE.test(t))
}

/** Listing-page toggle: key in the URL (`?cost=`) → label and test. */
export const COST_FILTERS = {
  all: { label: 'All', test: () => true },
  free: { label: 'Free to apply', test: (i) => !hasApplicationFee(i) },
  fee: { label: 'Application fee', test: hasApplicationFee },
}
