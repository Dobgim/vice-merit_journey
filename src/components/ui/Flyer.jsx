import { company } from '../../data/site'
import { formatDate } from '../../lib/deadline'
import Flag from './Flag'

const accents = {
  scholarships: { glow: 'bg-gold-400/35', bar: 'from-gold-300 to-gold-500', pill: 'bg-gold-300 text-navy-950' },
  grants: { glow: 'bg-emerald-400/30', bar: 'from-emerald-300 to-emerald-500', pill: 'bg-emerald-300 text-navy-950' },
  internships: { glow: 'bg-sky-400/30', bar: 'from-sky-300 to-sky-500', pill: 'bg-sky-300 text-navy-950' },
}

/**
 * The 2:1 banner at the top of every listing — the "flyer". If an item has an
 * `image` (e.g. an official flyer saved to /public/flyers/), that is shown;
 * otherwise a branded flyer is drawn from the listing's own data.
 */
export default function Flyer({ item, kind = 'scholarships', label = 'Scholarship', size = 'card', className = '' }) {
  const hero = size === 'hero'
  const a = accents[kind] ?? accents.scholarships

  if (item.image) {
    return (
      <div className={`relative aspect-[2/1] overflow-hidden bg-navy-900 ${className}`}>
        <img src={item.image} alt={`${item.name} flyer`} loading="lazy" className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div
      className={`relative isolate aspect-[2/1] overflow-hidden bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 text-white ${className}`}
      aria-hidden
    >
      {/* Texture + glow */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_left,black,transparent_75%)]" />
      <div className={`absolute -right-10 -top-12 -z-10 h-2/3 w-1/2 rounded-full blur-3xl ${a.glow}`} />

      {/* Oversized flag as the visual anchor */}
      <span className="absolute right-[5%] top-1/2 -z-10 -translate-y-1/2 rotate-[-8deg] opacity-95 drop-shadow-2xl">
        <Flag
          emoji={item.flag}
          className={hero ? 'h-24 w-36 rounded-lg sm:h-36 sm:w-52' : 'h-14 w-20 rounded-md'}
          emojiClassName={hero ? 'text-[8rem] sm:text-[10rem]' : 'text-[5rem]'}
        />
      </span>

      <div className={`flex h-full flex-col justify-between ${hero ? 'p-6 sm:p-9' : 'p-4'}`}>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`rounded-full px-2.5 py-0.5 font-bold uppercase tracking-wider ${a.pill} ${hero ? 'text-[0.72rem]' : 'text-[0.6rem]'}`}>
            {label}
          </span>
          {item.funding && (
            <span className={`rounded-full bg-white/10 px-2.5 py-0.5 font-semibold text-white ring-1 ring-white/20 ${hero ? 'text-[0.72rem]' : 'text-[0.6rem]'}`}>
              {item.funding}
            </span>
          )}
        </div>

        <div className={hero ? 'max-w-[68%]' : 'max-w-[72%]'}>
          <p className={`font-semibold uppercase tracking-[0.14em] text-white/60 ${hero ? 'text-[0.75rem]' : 'text-[0.55rem]'} line-clamp-1`}>
            {item.org}
          </p>
          <p
            className={`mt-1 font-display font-semibold leading-[1.1] line-clamp-2 ${
              hero ? 'text-[1.6rem] sm:text-[2.2rem]' : 'text-[1.05rem]'
            }`}
          >
            {item.name}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className={`inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r px-2 py-1 font-bold text-navy-950 ${a.bar} ${hero ? 'text-[0.8rem]' : 'text-[0.6rem]'}`}>
            {item.deadline ? `Deadline: ${formatDate(item.deadline)}` : 'Rolling deadline'}
          </span>
          <span className={`notranslate inline-flex items-center gap-1.5 font-semibold text-white/70 ${hero ? 'text-[0.78rem]' : 'text-[0.58rem]'}`} translate="no">
            <img src="/logo-mark.png" alt="" className={`rounded bg-white p-px ${hero ? 'h-6 w-6' : 'h-4 w-4'}`} />
            {company.name}
          </span>
        </div>
      </div>
    </div>
  )
}
