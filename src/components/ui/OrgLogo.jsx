import { useState } from 'react'
import { isUsableLogo, logoUrl } from '../../lib/logo'
import Flag from './Flag'

/**
 * Organisation logo on a white tile. Falls back to the country flag when the
 * listing has no known website or the logo fails to load.
 */
export default function OrgLogo({ item, size = 'md', className = '' }) {
  const [failed, setFailed] = useState(false)
  const src = logoUrl(item)
  const box = { sm: 'h-9 w-9 rounded-lg p-1', md: 'h-12 w-12 rounded-xl p-1.5', lg: 'h-16 w-16 rounded-2xl p-2' }[size]

  if (!src || failed) {
    return <Flag emoji={item.flag} className="h-5 w-7" emojiClassName="text-2xl" />
  }

  return (
    <span className={`inline-flex shrink-0 items-center justify-center bg-white shadow-sm ring-1 ring-navy-900/10 ${box} ${className}`}>
      <img
        src={src}
        alt={`${item.org || item.name} logo`}
        loading="lazy"
        onError={() => setFailed(true)}
        onLoad={(e) => !item.logo && !isUsableLogo(e.currentTarget, size === 'lg' ? 48 : 32) && setFailed(true)}
        className="h-full w-full object-contain"
      />
    </span>
  )
}
