import { useState } from 'react'
import { company } from '../../data/site'
import { formatDate } from '../../lib/deadline'
import { isUsableLogo, logoUrl } from '../../lib/logo'
import Flag from './Flag'

const accents = {
  scholarships: { glow: 'bg-gold-400/35', bar: 'from-gold-300 to-gold-500', pill: 'bg-gold-300 text-navy-950' },
  grants: { glow: 'bg-emerald-400/30', bar: 'from-emerald-300 to-emerald-500', pill: 'bg-emerald-300 text-navy-950' },
  internships: { glow: 'bg-sky-400/30', bar: 'from-sky-300 to-sky-500', pill: 'bg-sky-300 text-navy-950' },
  fellowships: { glow: 'bg-violet-400/30', bar: 'from-violet-300 to-violet-500', pill: 'bg-violet-300 text-navy-950' },
  competitions: { glow: 'bg-rose-400/30', bar: 'from-rose-300 to-rose-500', pill: 'bg-rose-300 text-navy-950' },
}

/** Organisation logo on a white tile, with the country flag pinned to its corner. */
function LogoTile({ item, hero, onFail }) {
  return (
    <span className="relative inline-block">
      <span
        className={`flex items-center justify-center bg-white shadow-2xl ring-1 ring-white/40 ${
          hero ? 'h-24 w-24 rounded-3xl p-3 sm:h-32 sm:w-32 sm:p-4' : 'h-14 w-14 rounded-2xl p-2 sm:h-16 sm:w-16'
        }`}
      >
        <img
          src={logoUrl(item, 256)}
          alt=""
          loading="lazy"
          onError={onFail}
          onLoad={(e) => !item.logo && !isUsableLogo(e.currentTarget) && onFail()}
          className="h-full w-full object-contain"
        />
      </span>
      <span className="absolute -bottom-2 -right-3">
        <Flag emoji={item.flag} className={hero ? 'h-6 w-9 sm:h-8 sm:w-12' : 'h-4 w-6'} emojiClassName={hero ? 'text-3xl' : 'text-lg'} />
      </span>
    </span>
  )
}

/**
 * The 2:1 banner at the top of every listing. Shows an uploaded `image` if the
 * listing has one; otherwise a branded banner with the organisation's logo
 * (or the country flag when no logo is available).
 */
export default function Flyer({ item, kind = 'scholarships', label = 'Scholarship', size = 'card', className = '' }) {
  const hero = size === 'hero'
  const a = accents[kind] ?? accents.scholarships
  const [logoFailed, setLogoFailed] = useState(false)
  const hasLogo = Boolean(logoUrl(item)) && !logoFailed

  // w-full + min-w-0: an aspect-ratio box must take its width from the card,
  // never from its content — otherwise it pushes the card past a phone screen.
  const frame = `relative isolate aspect-[2/1] w-full min-w-0 overflow-hidden ${className}`

  if (item.image) {
    return (
      <div className={`${frame} bg-navy-900`}>
        <img src={item.image} alt={`${item.name} flyer`} loading="lazy" className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div className={`${frame} bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950 text-white`} aria-hidden>
      {/* Texture + glow */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:linear-gradient(to_left,black,transparent_75%)]" />
      <div className={`absolute -right-10 -top-12 -z-10 h-2/3 w-1/2 rounded-full blur-3xl ${a.glow}`} />

      {/* Visual anchor: organisation logo, or an oversized flag */}
      <span className={`absolute right-[6%] top-1/2 -translate-y-1/2 ${hasLogo ? 'rotate-[-4deg]' : '-z-10 rotate-[-8deg] opacity-95 drop-shadow-2xl'}`}>
        {hasLogo ? (
          <LogoTile item={item} hero={hero} onFail={() => setLogoFailed(true)} />
        ) : (
          <Flag
            emoji={item.flag}
            className={hero ? 'h-20 w-28 rounded-lg sm:h-36 sm:w-52' : 'h-12 w-16 rounded-md sm:h-14 sm:w-20'}
            emojiClassName={hero ? 'text-[6rem] sm:text-[10rem]' : 'text-[4rem] sm:text-[5rem]'}
          />
        )}
      </span>

      <div className={`flex h-full min-w-0 flex-col justify-between ${hero ? 'p-5 sm:p-9' : 'p-3.5 sm:p-4'}`}>
        <div className="flex min-w-0 flex-wrap items-center gap-1.5 pr-[30%]">
          <span className={`rounded-full px-2.5 py-0.5 font-bold uppercase tracking-wider ${a.pill} ${hero ? 'text-[0.68rem] sm:text-[0.72rem]' : 'text-[0.58rem]'}`}>
            {label}
          </span>
          {item.funding && (
            <span className={`rounded-full bg-white/10 px-2.5 py-0.5 font-semibold text-white ring-1 ring-white/20 ${hero ? 'text-[0.68rem] sm:text-[0.72rem]' : 'text-[0.58rem]'}`}>
              {item.funding}
            </span>
          )}
        </div>

        <div className="min-w-0 max-w-[64%]">
          {item.org && (
            <p className={`line-clamp-1 font-semibold uppercase tracking-[0.12em] text-white/60 ${hero ? 'text-[0.68rem] sm:text-[0.75rem]' : 'text-[0.55rem]'}`}>
              {item.org}
            </p>
          )}
          <p
            className={`mt-1 line-clamp-2 break-words font-display font-semibold leading-[1.1] ${
              hero ? 'text-[1.3rem] sm:text-[2.2rem]' : 'text-[0.98rem] sm:text-[1.05rem]'
            }`}
          >
            {item.name}
          </p>
        </div>

        <div className="flex min-w-0 items-center justify-between gap-2">
          <span className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md bg-gradient-to-r px-2 py-1 font-bold text-navy-950 ${a.bar} ${hero ? 'text-[0.72rem] sm:text-[0.8rem]' : 'text-[0.58rem]'}`}>
            {item.deadline ? `Deadline: ${formatDate(item.deadline)}` : 'Rolling deadline'}
          </span>
          <span className={`notranslate min-w-0 items-center gap-1.5 truncate font-semibold text-white/70 ${hero && hasLogo ? 'hidden sm:inline-flex' : 'inline-flex'} ${hero ? 'text-[0.72rem] sm:text-[0.78rem]' : 'text-[0.55rem]'}`} translate="no">
            <img src="/logo-mark.png" alt="" className={`shrink-0 rounded bg-white p-px ${hero ? 'h-6 w-6' : 'h-4 w-4'}`} />
            <span className="truncate">{company.name}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
