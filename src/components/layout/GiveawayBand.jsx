import { Link, useLocation } from 'react-router-dom'
import useNow from '../../hooks/useNow'
import { giveaway, isGiveawayOpen } from '../../data/giveaway'

/**
 * Slim band above the footer on every page while the free application
 * giveaway is open. It hides itself on the giveaway page and once entries close.
 */
export default function GiveawayBand() {
  const now = useNow(60_000)
  const { pathname } = useLocation()
  if (!isGiveawayOpen(now) || pathname.startsWith(giveaway.path) || pathname.startsWith('/admin')) return null

  const days = Math.ceil((new Date(giveaway.closesAt) - now) / 86_400_000)
  return (
    <div className="bg-gold-100 py-5">
      <div className="container flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base leading-snug text-navy-900">
          <strong>Free for {giveaway.places} students:</strong> we'll guide your full scholarship application.{' '}
          <span className="text-navy-700">Entries close in {days} {days === 1 ? 'day' : 'days'}.</span>
        </p>
        <Link
          to={giveaway.path}
          className="inline-flex h-11 shrink-0 items-center rounded-full bg-navy-950 px-5 text-sm font-semibold text-white hover:bg-navy-800"
        >
          Enter the draw
        </Link>
      </div>
    </div>
  )
}
