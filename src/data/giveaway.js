/**
 * Free application support giveaway (November 2026). The page, its site-wide
 * band and its sitemap entry all disappear once `closesAt` has passed; old
 * links then show the 404 page.
 */
export const giveaway = {
  path: '/free-application',
  places: 5,
  closesAt: '2026-11-16T23:59:00Z',
  closesLabel: 'Sunday 16 November 2026, 23:59 GMT',
  drawLabel: 'Tuesday 18 November 2026',
  // Scholarships students can pick must close after this, so there is time to prepare.
  pickFrom: '2026-11-25',
  maxPicks: 3,
}

export const isGiveawayOpen = (now = new Date()) => now < new Date(giveaway.closesAt)
