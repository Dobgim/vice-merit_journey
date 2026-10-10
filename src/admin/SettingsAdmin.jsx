import { useEffect, useState } from 'react'
import { company } from '../data/site'
import Icon from '../components/ui/Icon'
import * as api from './api'
import { Btn, ErrorNote, Field, PageTitle, Panel, inputCls, useFlash } from './ui'

const initial = () => ({
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
      .then((s) => s.contact && setForm((f) => ({ ...f, ...s.contact, socials: { ...f.socials, ...s.contact.socials } })))
      .catch(setError)
  }, [])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const socials = Object.fromEntries(Object.entries(form.socials).map(([k, v]) => [k, v.trim()]))
      await api.saveSetting('contact', { ...form, whatsapp: form.whatsapp.replace(/\D/g, ''), socials })
      flash('Saved — visitors see the change on their next visit')
    } catch (err) {
      setError(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <PageTitle title="Contact & social links" sub="Shown in the footer, on the Book Consultation page and on every WhatsApp button.">
        <Btn as="button" type="submit" variant="gold" icon="check" disabled={saving}>{saving ? 'Saving…' : 'Save changes'}</Btn>
      </PageTitle>
      <ErrorNote error={error} />

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Contact details">
          <div className="space-y-4">
            <Field label="Email">
              <input type="email" value={form.email} onChange={set('email')} className={inputCls} />
            </Field>
            <Field label="Phone (call)">
              <input value={form.phone} onChange={set('phone')} className={inputCls} placeholder="+237 6 79 55 41 14" />
            </Field>
            <Field label="WhatsApp number" hint="Digits only, with country code and no + (e.g. 237679554114). Used for every WhatsApp button.">
              <input value={form.whatsapp} onChange={set('whatsapp')} inputMode="numeric" className={inputCls} />
            </Field>
            <Field label="WhatsApp number as displayed">
              <input value={form.whatsappDisplay} onChange={set('whatsappDisplay')} className={inputCls} placeholder="+237 6 79 55 41 14" />
            </Field>
            <Field label="Opening hours">
              <input value={form.hours} onChange={set('hours')} className={inputCls} />
            </Field>
          </div>
        </Panel>

        <Panel title="Social media">
          <p className="mb-4 text-[0.85rem] text-navy-600">Paste the full link to each profile. Leave a field empty to hide that icon.</p>
          <div className="space-y-3">
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
