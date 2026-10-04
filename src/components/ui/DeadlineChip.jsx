import { deadlineStatus } from '../../lib/deadline'

const styles = {
  open: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  closing: 'bg-rose-50 text-rose-700 ring-rose-200',
  closed: 'bg-navy-900/[0.05] text-navy-500 ring-navy-900/[0.08]',
  rolling: 'bg-navy-50 text-navy-700 ring-navy-900/[0.08]',
}

const dark = {
  open: 'bg-emerald-400/10 text-emerald-200 ring-emerald-300/25',
  closing: 'bg-rose-400/15 text-rose-200 ring-rose-300/30',
  closed: 'bg-white/10 text-navy-100/70 ring-white/15',
  rolling: 'bg-white/10 text-navy-100 ring-white/15',
}

/** Live "N days left" / "Closed" pill, with a pulse when time is short. */
export default function DeadlineChip({ deadline, tone = 'light', className = '' }) {
  const { state, label } = deadlineStatus(deadline)
  const palette = tone === 'dark' ? dark : styles

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold tracking-wide ring-1 ${palette[state]} ${className}`}
    >
      {state === 'closing' ? (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
        </span>
      ) : (
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            state === 'open' ? 'bg-emerald-500' : state === 'closed' ? 'bg-navy-300' : 'bg-navy-400'
          }`}
        />
      )}
      {label}
    </span>
  )
}
