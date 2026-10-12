import { formatDate, parseDate } from '../../lib/deadline'
import useNow from '../../hooks/useNow'
import Icon from './Icon'

/**
 * Live countdown to the end of the deadline day (23:59:59 local time),
 * ticking every second. Nothing is shown for rolling deadlines.
 */
export default function Countdown({ deadline }) {
  const now = useNow(1000)
  const date = parseDate(deadline)
  if (!date) return null

  const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
  const ms = end - now

  // Closed: the page already shows a "cycle has closed" notice.
  if (ms <= 0) return null

  const s = Math.floor(ms / 1000)
  const parts = [
    ['Days', Math.floor(s / 86400)],
    ['Hours', Math.floor((s % 86400) / 3600)],
    ['Minutes', Math.floor((s % 3600) / 60)],
    ['Seconds', s % 60],
  ]
  const urgent = s < 7 * 86400

  return (
    <div
      className={`rounded-2xl border p-4 shadow-soft sm:p-5 ${urgent ? 'border-rose-200 bg-rose-50' : 'border-navy-900/[0.07] bg-white'}`}
      role="timer"
      aria-label={`${parts[0][1]} days, ${parts[1][1]} hours and ${parts[2][1]} minutes left to apply`}
    >
      <p className={`flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-wider ${urgent ? 'text-rose-700' : 'text-navy-500'}`}>
        <Icon name="clock" className="h-4 w-4" />
        Time left to apply · closes {formatDate(deadline)}
      </p>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {parts.map(([label, value]) => (
          <div key={label} className={`rounded-xl px-1 py-2.5 text-center ${urgent ? 'bg-white' : 'bg-mist'}`}>
            <div className={`font-display text-[1.6rem] font-semibold leading-none tabular-nums sm:text-[1.9rem] ${urgent ? 'text-rose-700' : 'text-navy-950'}`}>
              {String(value).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[0.65rem] font-semibold uppercase tracking-wider text-navy-500 sm:text-[0.7rem]">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
