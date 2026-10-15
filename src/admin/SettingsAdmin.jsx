import { useEffect, useState } from 'react'
import { company } from '../data/site'
import Icon from '../components/ui/Icon'
import * as api from './api'
import { Btn, ErrorNote, Field, PageTitle, Panel, inputCls, useFlash } from './ui'

const initial = () => ({
  domain: company.domain || 'meritleaders.com',
  email: company.email,
  phone: company.phone,
  whatsapp: company.whatsapp,
  whatsappDisplay: company.whatsappDisplay,
  hours: company.hours,
  socials: Object.fromEntries(company.socials.map((s) => [s.label, s.href])),
})

export default function SettingsAdmin() {
  const [form, setForm] = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [flashNode, flash] = useFlash()

  useEffect(() => {
    api
      .getSettings()
      .then((s) => {
        if (s.contact) {
          setForm((f) => ({
            ...f,
            ...s.contact,
            domain: s.contact.domain || f.domain,
            socials: { ...f.socials, ...(s.contact.socials || {}) },
          }))
        }
      })
      .catch(setError)
  }, [])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const socials = Object.fromEntries(
        Object.entries(form.socials).map(([k, v]) => [k, (v || '').trim()])
      )
      const cleanDomain = form.domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim()
      await api.saveSetting('contact', {
        ...form,
        domain: cleanDomain,
        whatsapp: form.whatsapp.replace(/\D/g, ''),
        socials,
      })
      flash('Saved — visitors and dashboard reflect changes immediately')
    } catch (err) {
      setError(err)
    } finally {
      setSaving(false)
    }
  }

  const liveUrl = `https://${form.domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim() || 'meritleaders.com'}`

  return (
    <form onSubmit={save} className="space-y-6">
      <PageTitle
        title="Settings & Custom Domain"
        sub="Manage your custom domain, contact email, phone, and social media links."
      >
        <Btn as="button" type="submit" variant="gold" icon="check" disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </Btn>
      </PageTitle>
      <ErrorNote error={error} />

      {/* Custom Domain Banner */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gold-400/30 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-6 text-white shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold-400/20 text-gold-300 ring-1 ring-gold-400/40">
            <Icon name="globe" className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-300">Active Custom Domain</span>
            <p className="font-display text-xl font-bold tracking-tight text-white">{liveUrl}</p>
            <p className="mt-0.5 text-xs text-navy-200">Linked to this website and admin system</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-400 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-navy-950 shadow-sm transition hover:bg-gold-300 active:scale-95"
          >
            <span>Visit Live Domain</span>
            <Icon name="external" className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Custom Domain & Website">
          <div className="space-y-4">
            <Field
              label="Custom Domain Name"
              hint="e.g. meritleaders.com (without https://). Linked in the dashboard and throughout all site links."
            >
              <div className="flex gap-2">
                <span className="flex items-center rounded-xl bg-navy-50 px-3 text-sm font-medium text-navy-500">https://</span>
                <input
                  type="text"
                  required
                  value={form.domain}
                  onChange={set('domain')}
                  className={inputCls}
                  placeholder="meritleaders.com"
                />
              </div>
            </Field>

            <div className="rounded-xl bg-mist p-3.5 text-xs leading-relaxed text-navy-700">
              <p className="font-semibold text-navy-900">Custom Domain Status:</p>
              <p className="mt-1">
                Your custom domain <strong className="text-navy-950">{form.domain}</strong> is linked to your production deployment on GitHub & Vercel. Visitors navigating to this domain reach this site directly.
              </p>
            </div>
          </div>
        </Panel>

        <Panel title="Contact Details">
          <div className="space-y-4">
            <Field label="Contact Email" hint="Displayed in the website footer, contact section, and structured data.">
              <input type="email" required value={form.email} onChange={set('email')} className={inputCls} />
            </Field>
            <Field label="Phone (call)">
              <input value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+237 6 79 55 41 14" />
            </Field>
            <Field label="WhatsApp number" hint="Digits only, with country code (e.g. 237679554114).">
              <input value={form.whatsapp} onChange={set('whatsapp')} inputMode="numeric" className={inputCls} />
            </Field>
            <Field label="WhatsApp displayed text">
              <input value={form.whatsappDisplay} onChange={set('whatsappDisplay')} className={inputCls} placeholder="+237 6 79 55 41 14" />
            </Field>
            <Field label="Opening hours">
              <input value={form.hours} onChange={set('hours')} className={inputCls} />
            </Field>
          </div>
        </Panel>

        <Panel title="Social Media Profiles" className="xl:col-span-2">
          <p className="mb-4 text-sm text-navy-600">
            Paste the full URL to each profile. Leave empty to hide that icon from the site footer.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {company.socials.map((s) => (
              <label key={s.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-700">
                  <Icon name={s.icon} className="h-[1.1rem] w-[1.1rem]" />
                </span>
                <span className="sr-only">{s.label}</span>
                <input
                  type="url"
                  value={form.socials[s.label] ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, socials: { ...f.socials, [s.label]: e.target.value } }))}
                  placeholder={`https://${s.label.toLowerCase() === 'x' ? 'x' : s.label.toLowerCase()}.com/…`}
                  className={inputCls}
                />
              </label>
            ))}
          </div>
        </Panel>
      </div>
      {flashNode}
    </form>
  )
}
