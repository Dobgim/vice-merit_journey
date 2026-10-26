import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COUNTRIES, LEVELS } from '../../lib/eligibility'
import { Section } from '../ui/Primitives'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'

const control =
  'h-12 w-full rounded-xl border border-navy-900/[0.12] bg-white px-4 text-base text-navy-950 transition-colors hover:border-navy-900/25 focus:outline-none focus:ring-2 focus:ring-gold-400/60'

const sortedCountries = [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name))

/** Home-page shortcut into the "Am I eligible?" matcher: two choices, one button. */
export default function EligibilityTeaser() {
  const navigate = useNavigate()
  const [country, setCountry] = useState('')
  const [level, setLevel] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const q = new URLSearchParams()
    if (country) q.set('country', country)
    if (level) q.set('level', level)
    navigate(`/eligibility${q.size ? `?${q}` : ''}`)
  }

  return (
    <Section tone="light">
      <div className="container">
        <Reveal>
          <form
            onSubmit={submit}
            className="mx-auto max-w-5xl rounded-3xl border border-gold-400/30 bg-gradient-to-br from-gold-50 via-white to-white p-6 shadow-soft sm:p-10"
          >
            <div className="flex flex-col gap-2 text-center sm:text-left">
              <span className="eyebrow justify-center text-gold-700 sm:justify-start">
                <Icon name="checkCircle" className="h-4 w-4" />
                Am I eligible?
              </span>
              <h2 className="font-display text-2xl font-semibold text-navy-950 sm:text-3xl">
                See every opportunity you can apply for — in seconds.
              </h2>
              <p className="text-base text-navy-700/80">
                Pick your nationality and level. We’ll show only the open calls that accept you, nearest deadline first.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <label className="sr-only" htmlFor="et-country">Your nationality</label>
              <select id="et-country" value={country} onChange={(e) => setCountry(e.target.value)} className={control}>
                <option value="">Your nationality…</option>
                {sortedCountries.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
              <label className="sr-only" htmlFor="et-level">Study level</label>
              <select id="et-level" value={level} onChange={(e) => setLevel(e.target.value)} className={control}>
                <option value="">Any level</option>
                {LEVELS.map((l) => (
                  <option key={l.slug} value={l.slug}>
                    {l.label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 px-6 text-base font-semibold text-navy-950 shadow-soft transition-transform hover:-translate-y-0.5"
              >
                Show my matches
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
