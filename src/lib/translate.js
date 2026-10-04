/**
 * Site translation via Google Translate, driven by our own language menu.
 *
 * The chosen language is stored in Google's `googtrans` cookie and the page
 * reloads; on load, the translate script is injected only when a non-English
 * language is active, so English visitors never download it.
 */

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'pt', label: 'Português', short: 'PT' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'it', label: 'Italiano', short: 'IT' },
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'zh-CN', label: '中文 (简体)', short: 'ZH' },
  { code: 'ru', label: 'Русский', short: 'RU' },
  { code: 'tr', label: 'Türkçe', short: 'TR' },
  { code: 'hi', label: 'हिन्दी', short: 'HI' },
  { code: 'sw', label: 'Kiswahili', short: 'SW' },
]

/** Hand-checked menu labels; Google turns e.g. "Packages" into "Colis" (parcels). */
const MENU = {
  fr: {
    Home: 'Accueil',
    About: 'À propos',
    Services: 'Services',
    Packages: 'Forfaits',
    Opportunities: 'Opportunités',
    Scholarships: 'Bourses',
    Grants: 'Subventions',
    Internships: 'Stages',
    Countries: 'Pays',
    FAQ: 'FAQ',
  },
}

export function hasManualMenu() {
  return Boolean(MENU[currentLanguage()])
}

export function menuLabel(label) {
  return MENU[currentLanguage()]?.[label] ?? label
}

export function currentLanguage() {
  const match = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/;]+\/([^;]+)/)
  return match ? decodeURIComponent(match[1]) : 'en'
}

/** Google may set the cookie on the bare host or the parent domain; cover both. */
function writeCookie(value) {
  const host = window.location.hostname
  const parent = host.split('.').slice(-2).join('.')
  const domains = new Set(['', host, parent.includes('.') ? `.${parent}` : ''])
  const tail = value ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  for (const d of domains) {
    document.cookie = `googtrans=${value}; path=/${d ? `; domain=${d}` : ''}${tail}`
  }
}

export function setLanguage(code) {
  if (code === currentLanguage()) return
  writeCookie(code === 'en' ? '' : `/en/${code}`)
  window.location.reload()
}

/**
 * Google Translate swaps text nodes for <font> elements, which React does not
 * expect. Make removeChild/insertBefore tolerant so re-renders don't crash.
 * (Workaround from facebook/react#11538.)
 */
function patchDomForTranslation() {
  const removeChild = Node.prototype.removeChild
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child
    return removeChild.call(this, child)
  }
  const insertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return node
    return insertBefore.call(this, node, ref)
  }
}

/** Call once before React renders. */
export function initTranslation() {
  const lang = currentLanguage()
  if (lang === 'en') return

  patchDomForTranslation()
  document.documentElement.lang = lang
  if (lang === 'ar') document.documentElement.dir = 'rtl'

  const mount = document.createElement('div')
  mount.id = 'google_translate_element'
  mount.hidden = true
  document.body.appendChild(mount)

  window.googleTranslateElementInit = () => {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', autoDisplay: false },
      'google_translate_element'
    )
  }

  const script = document.createElement('script')
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.body.appendChild(script)
}
