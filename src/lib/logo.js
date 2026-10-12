/**
 * The organisation's logo for a listing, taken from the icon its own website
 * publishes (via Google's site-icon service). Uses, in order: an uploaded
 * `logo`, the `logoDomain` set on the listing, or the official link's domain.
 * Listings with neither (web-search links) have no logo and show the flag.
 */
export function logoDomain(item) {
  if (item.logoDomain) return item.logoDomain
  if (!item.officialUrl || item.officialSearch) return null
  try {
    return new URL(item.officialUrl).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

/**
 * Google returns a tiny generic globe when a site has no proper icon, and some
 * sites only publish a 16px favicon. Anything smaller than this is too blurry
 * to show as a logo, so callers fall back to the country flag.
 */
export const MIN_LOGO_PX = 48
export const isUsableLogo = (img, min = MIN_LOGO_PX) => Boolean(img) && img.naturalWidth >= min

export function logoUrl(item, size = 128) {
  if (item.logo) return item.logo
  const domain = logoDomain(item)
  return domain ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}` : null
}
