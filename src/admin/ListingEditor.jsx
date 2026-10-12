import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { kinds } from '../data/opportunities'
import { slugify } from '../lib/deadline'
import { ScholarshipCard } from '../components/sections/Scholarships'
import Icon from '../components/ui/Icon'
import * as api from './api'
import { Btn, ErrorNote, Field, PageTitle, Panel, inputCls } from './ui'

const LIST_FIELDS = [
  ['eligibility', 'Who can apply', 'One requirement per line'],
  ['benefits', 'What you get', 'One benefit per line'],
  ['documents', 'Required documents', 'One document per line'],
  ['howToApply', 'How to apply (steps)', 'One step per line, in order'],
]

const SCHOLARSHIP_LEVELS = ['Undergraduate', 'Graduate', 'Postgraduate', 'PhD', 'Postdoctoral']

const blank = {
  name: '', slug: '', org: '', country: '', flag: '', level: '', funding: '', category: '', amount: '',
  deadline: '', deadlineNote: '', verified: new Date().toISOString().slice(0, 10), duration: '',
  nationalities: '', fields: '', officialUrl: '', image: '', summary: '', tags: '', overview: '',
  eligibility: '', benefits: '', documents: '', howToApply: '', timeline: [], faqs: [],
}

/** Listing object → form strings */
function toForm(item) {
  return {
    ...blank,
    ...Object.fromEntries(Object.entries(item).filter(([, v]) => typeof v === 'string')),
    deadline: item.deadline ?? '',
    tags: (item.tags ?? []).join(', '),
    overview: (item.overview ?? []).join('\n\n'),
    ...Object.fromEntries(LIST_FIELDS.map(([k]) => [k, (item[k] ?? []).join('\n')])),
    timeline: item.timeline ?? [],
    faqs: item.faqs ?? [],
  }
}

/** Form strings → listing object */
function toListing(f) {
  const lines = (s) => s.split('\n').map((x) => x.trim()).filter(Boolean)
  const out = {
    ...f,
    deadline: f.deadline || null,
    tags: f.tags.split(',').map((t) => t.trim()).filter(Boolean),
    overview: f.overview.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    ...Object.fromEntries(LIST_FIELDS.map(([k]) => [k, lines(f[k])])),
    timeline: f.timeline.filter((t) => t.date.trim() || t.label.trim()),
    faqs: f.faqs.filter((x) => x.q.trim() && x.a.trim()),
  }
  for (const k of ['image', 'deadlineNote', 'category']) if (!out[k]) delete out[k]
  return out
}

function RowsEditor({ rows, onChange, fields, addLabel }) {
  const set = (i, key, value) => onChange(rows.map((r, j) => (j === i ? { ...r, [key]: value } : r)))
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex gap-2">
          {fields.map(([key, placeholder, width]) => (
            <input key={key} value={r[key]} onChange={(e) => set(i, key, e.target.value)} placeholder={placeholder} className={`${inputCls} ${width}`} />
          ))}
          <button type="button" onClick={() => onChange(rows.filter((_, j) => j !== i))} aria-label="Remove row" className="shrink-0 rounded-full px-2 text-navy-400 hover:text-rose-600">
            <Icon name="close" className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...rows, Object.fromEntries(fields.map(([k]) => [k, '']))])}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-950"
      >
        <Icon name="plus" className="h-4 w-4" />
        {addLabel}
      </button>
    </div>
  )
}

export default function ListingEditor() {
  const { kind, id } = useParams()
  const config = kinds[kind]
  const navigate = useNavigate()
  const [form, setForm] = useState(blank)
  const [published, setPublished] = useState(true)
  const [loading, setLoading] = useState(Boolean(id))
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    api
      .getOpportunity(id)
      .then((row) => {
        if (!row) throw new Error('This listing no longer exists.')
        setForm(toForm({ ...row.data, slug: row.slug }))
        setPublished(row.published)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [id])

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))
  const preview = useMemo(() => ({ ...toListing(form), slug: form.slug || slugify(form.name) || 'preview' }), [form])
  const categories = useMemo(() => [...new Set(config.items.map((i) => i.category).filter(Boolean))], [config])

  const upload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const url = await api.uploadFlyer(file)
      setForm((f) => ({ ...f, image: url }))
    } catch (err) {
      setError(err)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    try {
      await api.saveOpportunity({ id, kind, published, data: toListing(form) })
      navigate(`/admin/listings/${kind}`)
    } catch (err) {
      setError(err)
      setSaving(false)
    }
  }

  if (loading) return <p className="text-navy-500">Loading…</p>

  return (
    <form onSubmit={save} className="space-y-6">
      <PageTitle title={id ? `Edit ${config.singular}` : `New ${config.singular}`} sub={form.name || 'Fill in the details below — the preview updates as you type.'}>
        <Btn as={Link} to={`/admin/listings/${kind}`} variant="outline">Cancel</Btn>
        <Btn as="button" type="submit" variant="gold" icon="check" disabled={saving || uploading}>
          {saving ? 'Saving…' : 'Save'}
        </Btn>
      </PageTitle>
      <ErrorNote error={error} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Panel title="Basics">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name *" className="sm:col-span-2">
                <input required value={form.name} onChange={set('name')} className={inputCls} placeholder="Chevening Scholarship 2027" />
              </Field>
              <Field label="Organisation *">
                <input required value={form.org} onChange={set('org')} className={inputCls} placeholder="UK Government (FCDO)" />
              </Field>
              <Field label="Country / location *">
                <input required value={form.country} onChange={set('country')} className={inputCls} placeholder="United Kingdom" />
              </Field>
              <Field label="Flag" hint="Paste a flag emoji (🇬🇧, 🇨🇲, 🇺🇸…) or 🌍 for several countries.">
                <input value={form.flag} onChange={set('flag')} className={inputCls} placeholder="🇬🇧" />
              </Field>
              <Field label={`${config.labels.level} *`}>
                {kind === 'scholarships' ? (
                  <select required value={form.level} onChange={set('level')} className={inputCls}>
                    <option value="">Choose…</option>
                    {SCHOLARSHIP_LEVELS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                ) : (
                  <input required value={form.level} onChange={set('level')} className={inputCls} placeholder="Graduate students" />
                )}
              </Field>
              <Field label={`${config.labels.funding} *`}>
                {kind === 'scholarships' ? (
                  <select required value={form.funding} onChange={set('funding')} className={inputCls}>
                    <option value="">Choose…</option>
                    <option>Fully Funded</option>
                    <option>Partially Funded</option>
                  </select>
                ) : (
                  <input required value={form.funding} onChange={set('funding')} className={inputCls} placeholder={kind === 'grants' ? 'Seed funding' : 'Paid'} />
                )}
              </Field>
              {kind !== 'scholarships' && (
                <Field label="Category *" hint="Used for the filter buttons on the page.">
                  <input required list="categories" value={form.category} onChange={set('category')} className={inputCls} />
                  <datalist id="categories">{categories.map((c) => <option key={c} value={c} />)}</datalist>
                </Field>
              )}
              <Field label={`${config.labels.amount} *`}>
                <input required value={form.amount} onChange={set('amount')} className={inputCls} placeholder="Full tuition + stipend" />
              </Field>
              <Field label="Deadline" hint="Leave empty for rolling / year-round.">
                <input type="date" value={form.deadline} onChange={set('deadline')} className={inputCls} />
              </Field>
              <Field label="Deadline note" hint="Optional, e.g. “Expected — usually 1 March”.">
                <input value={form.deadlineNote} onChange={set('deadlineNote')} className={inputCls} />
              </Field>
              <Field label="Duration">
                <input value={form.duration} onChange={set('duration')} className={inputCls} placeholder="1 year" />
              </Field>
              <Field label="Last checked on official site">
                <input type="date" value={form.verified} onChange={set('verified')} className={inputCls} />
              </Field>
              <Field label="Who is eligible (nationalities)" className="sm:col-span-2">
                <input value={form.nationalities} onChange={set('nationalities')} className={inputCls} placeholder="Citizens of Chevening-eligible countries" />
              </Field>
              <Field label="Fields of study / areas" className="sm:col-span-2">
                <input value={form.fields} onChange={set('fields')} className={inputCls} />
              </Field>
              <Field label="Official link *" className="sm:col-span-2">
                <input required type="url" value={form.officialUrl} onChange={set('officialUrl')} className={inputCls} placeholder="https://…" />
              </Field>
              <Field label="Short summary *" hint="One or two sentences shown on the card." className="sm:col-span-2">
                <textarea required rows={2} value={form.summary} onChange={set('summary')} className={`${inputCls} resize-y`} />
              </Field>
              <Field label="Tags" hint="Comma-separated, e.g. Leadership, One-year Masters" className="sm:col-span-2">
                <input value={form.tags} onChange={set('tags')} className={inputCls} />
              </Field>
              <Field label="Web address" hint={`${config.path}/${form.slug || slugify(form.name) || '…'} — created from the name if left empty.`} className="sm:col-span-2">
                <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))} className={inputCls} />
              </Field>
            </div>
          </Panel>

          <Panel title="Flyer image">
            <p className="text-sm text-navy-600">
              Optional. Upload the official flyer or logo (a wide 2:1 image looks best). Without one, the website draws a
              branded flyer automatically.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <label className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-navy-900 px-4 text-sm font-semibold text-white hover:bg-navy-800">
                <Icon name="plus" className="h-4 w-4" />
                {uploading ? 'Uploading…' : form.image ? 'Replace image' : 'Upload image'}
                <input type="file" accept="image/*" onChange={upload} className="sr-only" disabled={uploading} />
              </label>
              {form.image && (
                <Btn variant="danger" onClick={() => setForm((f) => ({ ...f, image: '' }))}>Remove image</Btn>
              )}
            </div>
          </Panel>

          <Panel title="Full details">
            <div className="space-y-4">
              <Field label="Overview" hint="Separate paragraphs with an empty line.">
                <textarea rows={5} value={form.overview} onChange={set('overview')} className={`${inputCls} resize-y`} />
              </Field>
              {LIST_FIELDS.map(([key, label, hint]) => (
                <Field key={key} label={label} hint={hint}>
                  <textarea rows={4} value={form[key]} onChange={set(key)} className={`${inputCls} resize-y`} />
                </Field>
              ))}
              <div>
                <p className="mb-1.5 text-sm font-semibold text-navy-800">Key dates</p>
                <RowsEditor
                  rows={form.timeline}
                  onChange={(timeline) => setForm((f) => ({ ...f, timeline }))}
                  fields={[['date', 'e.g. 5 Nov 2026', 'w-40 shrink-0'], ['label', 'What happens', 'flex-1']]}
                  addLabel="Add date"
                />
              </div>
              <div>
                <p className="mb-1.5 text-sm font-semibold text-navy-800">Frequently asked questions</p>
                <RowsEditor
                  rows={form.faqs}
                  onChange={(faqs) => setForm((f) => ({ ...f, faqs }))}
                  fields={[['q', 'Question', 'flex-1'], ['a', 'Answer', 'flex-[2]']]}
                  addLabel="Add question"
                />
              </div>
            </div>
          </Panel>
        </div>

        <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <Panel title="Visibility">
            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span className="text-base text-navy-800">{published ? 'Published on the website' : 'Hidden from the website'}</span>
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="h-5 w-5 accent-navy-900" />
            </label>
          </Panel>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-500">Card preview</p>
            <div className="pointer-events-none">
              <ScholarshipCard item={preview} kind={kind} />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
