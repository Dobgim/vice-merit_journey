/**
 * The fully funded scholarship deadline calendar (/fully-funded-scholarships-2027):
 * every open fully funded scholarship, grouped by the month its deadline falls in.
 * Used by the page and by its pre-rendered HTML (build-seo.js).
 */

export const CALENDAR_PATH = '/fully-funded-scholarships-2027'

export const calendarSeo = {
  title: 'Fully Funded Scholarships 2027: Deadline Calendar',
  description:
    'Every open fully funded scholarship for international students, month by month by deadline: bachelor’s, master’s and PhD, with official links. Updated daily.',
}

export const isFullyFunded = (item) => item.funding === 'Fully Funded'

const MONTH = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

/** "2027-01-14" → "January 2027". */
export const monthLabel = (key) => MONTH.format(new Date(`${key}-15T12:00:00Z`))

/**
 * Groups listings by the month of their deadline, earliest month first, each
 * month sorted by date. `getItem` reads the listing out of a wrapper ({ item }).
 */
export function byMonth(list, getItem = (x) => x) {
  const months = new Map()
  for (const x of list) {
    const key = String(getItem(x).deadline ?? '').slice(0, 7)
    if (!/^\d{4}-\d{2}$/.test(key)) continue
    if (!months.has(key)) months.set(key, [])
    months.get(key).push(x)
  }
  return [...months.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, items]) => ({
      key,
      label: monthLabel(key),
      items: items.sort((a, b) => getItem(a).deadline.localeCompare(getItem(b).deadline)),
    }))
}
