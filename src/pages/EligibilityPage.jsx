import { useEffect, useMemo, useState } from 'react'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import OpportunityGrid from '../components/ui/OpportunityGrid'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import useAllOpportunities from '../hooks/useAllOpportunities'
import { kinds } from '../data/opportunities'
import { COUNTRIES, LEVELS, countryBySlug, isOpenTo, levelBySlug, matchesLevel } from '../lib/eligibility'

const KEY = 'ml_eligibility_profile'
const BLANK = { country: '', level: '', kind: '', field: '' }

function loadProfile() {
  try {
    return { ...BLANK, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') }
  } catch {
    return BLANK
  }
}

const control =
  'mt-2 h-12 w-full rounded-xl border border-navy-900/[0.12] bg-white px-4 text-base text-navy-950 transition-colors hover:border-navy-900/25 focus:outline-none focus:ring-2 focus:ring-gold-400/60'

/**
 * "Am I eligible?" — the visitor picks nationality, level, type and an
 * optional field once (remembered in their browser), and sees only the open
 * opportunities that fit, nearest deadline first.
 */
export default function EligibilityPage() {
  const entries = useAllOpportunities()
  const [profile, setProfile] = useState(loadProfile)
  const set = (key) => (e) => setProfile((p) => ({ ...p, [key]: e.target.value }))

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(profile))
    } catch {
      /* storage blocked — the form still works */
    }
  }, [profile])

  const country = countryBySlug(profile.country)
  const level = levelBySlug(profile.level)
  const field = profile.field.trim().toLowerCase()

  const matches = useMemo(
    () =>
      entries.filter(({ kind, item }) => {
        if (profile.kind && kind !== profile.kind) return false
        if (!isOpenTo(item, country)) return false
        if (!matchesLevel(item, level)) return false
        if (field) {
          const hay = [item.name, item.fields, item.summary, item.category, ...(item.tags ?? [])].join(' ').toLowerCase()
          // Calls open to any field still count for a specific subject.
          if (!hay.includes(field) && !/all (disciplines|fields)|any (field|discipline)/.test(hay)) return false
        }
        return true
      }),
    [entries, profile.kind, country, level, field]
  )

  const ready = Boolean(country)

  return (
    <>
      <Seo
        title="Am I eligible? Find scholarships you can apply for"
        description="Enter your nationality and study level to see the open scholarships, fellowships, grants and internships you can apply for, with deadlines and official links."
      />
      <PageHeader
        crumb="Am I eligible?"
        eyebrow="Eligibility matcher"
        title="Find the opportunities"
        accent="you can apply for."
        lede="Tell us where you’re from and what you want to study. We’ll show only the open calls that accept you, nearest deadline first."
      />

      <Section tone="light">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-3xl border border-navy-900/[0.07] bg-white p-6 shadow-soft sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-navy-800">
                Your nationality
                <select value={profile.country} onChange={set('country')} className={control}>
                  <option value="">Choose your country…</option>
                  {[...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-navy-800">
                Study level
                <select value={profile.level} onChange={set('level')} className={control}>
                  <option value="">Any level</option>
                  {LEVELS.map((l) => (
                    <option key={l.slug} value={l.slug}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-navy-800">
                Looking for
                <select value={profile.kind} onChange={set('kind')} className={control}>
                  <option value="">Everything</option>
                  {Object.values(kinds).map((k) => (
                    <option key={k.key} value={k.key}>
                      {k.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-navy-800">
                Field of study <span className="font-normal text-navy-500">(optional)</span>
                <input value={profile.field} onChange={set('field')} placeholder="e.g. engineering, public health, law" className={control} />
              </label>
            </div>
            <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-navy-600">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0 text-navy-500" />
              Matches are based on each call’s published rules. Always confirm on the official page — or ask an advisor to check your profile.
            </p>
          </div>

          <div className="mt-12">
            {ready ? (
              <>
                <p className="mb-8 text-center text-lg text-navy-800" aria-live="polite">
                  <span className="font-display text-2xl font-semibold text-navy-950">{matches.length}</span> open{' '}
                  {matches.length === 1 ? 'opportunity matches' : 'opportunities match'} your profile
                </p>
                <OpportunityGrid
                  entries={matches}
                  empty="No open calls match all of these right now. Try “Any level” or clear the field — or book a consultation and we’ll search for you."
                />
              </>
            ) : (
              <p className="text-center text-lg text-navy-700/80">Choose your nationality to see your matches.</p>
            )}
          </div>

          <div className="mx-auto mt-14 flex max-w-4xl flex-col items-center gap-4 rounded-2xl border border-navy-900/[0.07] bg-white p-8 text-center shadow-soft sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="font-display text-xl font-semibold text-navy-950">Want a personal shortlist?</h2>
              <p className="mt-1.5 text-base text-navy-700/80">An advisor reviews your profile and tells you where you’re genuinely competitive.</p>
            </div>
            <Button to="/book-consultation" icon="arrowRight" className="shrink-0">
              Book a consultation
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
