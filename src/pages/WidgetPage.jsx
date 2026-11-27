import { useState } from 'react'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import Button from '../components/ui/Button'
import { SITE_URL } from '../data/site'
import { WIDGET_LEVELS, WIDGET_PATH, embedCode, widgetHeight, widgetSeo } from '../lib/widget'

const COUNTS = [3, 5, 6, 8, 10]

/** A row of choice buttons. */
function Choice({ label, options, value, onChange }) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-navy-900">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map(([v, text]) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            aria-pressed={value === v}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              value === v ? 'bg-navy-900 text-white' : 'border border-navy-900/10 bg-white text-navy-700 hover:border-navy-900/30'
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </fieldset>
  )
}

/**
 * For schools, blogs and student groups: pick the options, see the widget
 * live, and copy the embed code (iframe plus a text link back to the site).
 */
export default function WidgetPage() {
  const [level, setLevel] = useState('all')
  const [count, setCount] = useState(6)
  const [theme, setTheme] = useState('light')
  const [copied, setCopied] = useState(false)

  const code = embedCode(SITE_URL, { count, level, theme })
  // The preview loads the widget from this site, so it also works on preview deployments.
  const preview = `${WIDGET_PATH}?count=${count}&level=${level}&theme=${theme}`

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <Seo title={widgetSeo.title} description={widgetSeo.description} />

      <PageHeader
        crumbs={[{ label: 'Scholarships', to: '/scholarships' }]}
        crumb="Deadlines widget"
        eyebrow="For schools, blogs and student groups"
        title="Free scholarship deadlines"
        accent="widget for your website."
        lede="Show your students the next fully funded scholarship deadlines, updated automatically every day. Choose the options, copy one piece of code, and paste it into your website."
      >
        <Button href="#build" variant="gold" size="lg" icon="arrowRight">
          Get the code
        </Button>
      </PageHeader>

      <Section tone="light" id="build" className="scroll-mt-24">
        <div className="container grid max-w-5xl gap-10 lg:grid-cols-[1fr_440px]">
          <div className="space-y-6">
            <Choice label="Level" options={WIDGET_LEVELS.map((l) => [l.slug, l.label])} value={level} onChange={setLevel} />
            <Choice label="How many scholarships" options={COUNTS.map((n) => [n, String(n)])} value={count} onChange={setCount} />
            <Choice label="Colours" options={[['light', 'Light'], ['dark', 'Dark']]} value={theme} onChange={setTheme} />

            <div>
              <label htmlFor="embed" className="text-sm font-semibold text-navy-900">
                Your code
              </label>
              <textarea
                id="embed"
                readOnly
                value={code}
                rows={6}
                onFocus={(e) => e.target.select()}
                className="mt-2 w-full rounded-xl border border-navy-900/[0.12] bg-white p-4 font-mono text-xs leading-relaxed text-navy-900"
              />
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Button onClick={copy} variant="gold" size="md" icon="arrowRight">
                  {copied ? 'Copied' : 'Copy the code'}
                </Button>
                <span className="text-sm text-navy-600" aria-live="polite">
                  {copied ? 'Now paste it into your website’s HTML.' : ''}
                </span>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-semibold text-navy-950">How to add it</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-navy-700">
                <li>Copy the code above.</li>
                <li>
                  WordPress: add a <strong>Custom HTML</strong> block and paste it. Wix, Squarespace and most school sites have an “Embed code” or “HTML” element that works the
                  same way.
                </li>
                <li>Publish. The list updates by itself every day; you never need to change it.</li>
              </ol>
              <p className="mt-4 text-sm text-navy-600">
                It is free. Please keep the short “Scholarship deadlines by Merit Leaders” line under the box.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-navy-900">Live preview</p>
            <iframe
              key={preview}
              src={preview}
              title="Preview of the scholarship deadlines widget"
              width="100%"
              height={widgetHeight(count)}
              className="w-full max-w-[440px] rounded-[14px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </Section>
    </>
  )
}
