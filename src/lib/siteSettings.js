/**
 * Settings saved in the admin dashboard (contact details, social links,
 * package prices) are applied onto the bundled defaults before the site
 * renders. The last copy is cached so repeat visits render instantly.
 */
import { company, packageAddons, packages } from '../data/site'
import { fetchSettings } from './supabase'

const CACHE_KEY = 'ml_settings_cache'

export const CONTACT_FIELDS = ['domain', 'email', 'phone', 'whatsapp', 'whatsappDisplay', 'hours']

function replaceArray(target, next) {
  if (Array.isArray(next) && next.length) target.splice(0, target.length, ...next)
}

export function applySettings(settings = {}) {
  const contact = settings.contact
  if (contact) {
    // Phone fields must contain a real number — a saved label (e.g. the business name) is ignored.
    const isNumber = (v) => String(v).replace(/\D/g, '').length >= 8
    for (const f of CONTACT_FIELDS) {
      if (!contact[f]) continue
      if (['phone', 'whatsapp', 'whatsappDisplay'].includes(f)) {
        if (!isNumber(contact[f])) continue
        // Same number in another spacing: keep one consistent format across the site.
        if (String(contact[f]).replace(/\D/g, '') === String(company[f]).replace(/\D/g, '')) continue
      }
      company[f] = f === 'whatsapp' ? String(contact[f]).replace(/\D/g, '') : contact[f]
    }
    // The domain was once saved misspelled ("meritleadrs"); never show that to visitors.
    for (const f of ['email', 'domain']) company[f] = company[f].replace(/meritleadrs\./i, 'meritleaders.')
    if (contact.socials) {
      company.socials = company.socials.map((s) => ({ ...s, href: contact.socials[s.label] ?? s.href }))
    }
  }
  if (settings.packages) {
    replaceArray(packages, settings.packages.packages)
    replaceArray(packageAddons, settings.packages.addons)
  }
}

/** Apply cached settings now; fetch fresh ones (waiting at most `timeout` ms). */
export async function loadSiteSettings(timeout = 1200) {
  let cached = null
  try {
    cached = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null')
  } catch {
    /* ignore */
  }
  if (cached) applySettings(cached)

  const fresh = fetchSettings().then((s) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(s))
    } catch {
      /* ignore */
    }
    return s
  })

  // With a cache we render immediately and use fresh settings next visit.
  if (cached) return
  const s = await Promise.race([fresh, new Promise((r) => setTimeout(() => r(null), timeout))])
  if (s) applySettings(s)
}
