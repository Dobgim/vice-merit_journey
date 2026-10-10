import { useEffect, useState } from 'react'
import { packageAddons, packages } from '../data/site'
import Icon from '../components/ui/Icon'
import * as api from './api'
import { Btn, ErrorNote, Field, PageTitle, Panel, inputCls, useFlash } from './ui'

const clone = (x) => JSON.parse(JSON.stringify(x))
const num = (v) => (v === '' ? '' : Number(v))

export default function PackagesAdmin() {
  const [pkgs, setPkgs] = useState(() => clone(packages))
  const [addons, setAddons] = useState(() => clone(packageAddons))
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [flashNode, flash] = useFlash()

  useEffect(() => {
    api
      .getSettings()
      .then((s) => {
        if (s.packages?.packages?.length) setPkgs(clone(s.packages.packages))
        if (s.packages?.addons?.length) setAddons(clone(s.packages.addons))
      })
      .catch(setError)
  }, [])

  const setPkg = (i, patch) => setPkgs((list) => list.map((p, j) => (j === i ? { ...p, ...patch } : p)))
  const setAddon = (i, patch) => setAddons((list) => list.map((a, j) => (j === i ? { ...a, ...patch } : a)))

  const save = async () => {
    setSaving(true)
    setError(null)
    try {
      const cleanAddons = addons
        .filter((a) => a.name.trim())
        .map((a) => (a.price && (a.price.USD !== '' || a.price.XAF !== '') ? { name: a.name, price: { USD: Number(a.price.USD) || 0, XAF: Number(a.price.XAF) || 0 } } : { name: a.name, price: null, note: a.note || '' }))
      await api.saveSetting('packages', { packages: pkgs, addons: cleanAddons })
      flash('Prices saved — they show on the Packages page')
    } catch (e) {
      setError(e)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageTitle title="Packages & prices" sub="What visitors see on the Packages page.">
        <Btn as="a" href="/packages" target="_blank" rel="noreferrer" variant="outline" icon="external">View page</Btn>
        <Btn variant="gold" icon="check" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save changes'}</Btn>
      </PageTitle>
      <ErrorNote error={error} />

      <div className="grid gap-6 xl:grid-cols-3">
        {pkgs.map((p, i) => (
          <Panel key={p.id} title={p.name || 'Package'}>
            <div className="space-y-3">
              <Field label="Name">
                <input value={p.name} onChange={(e) => setPkg(i, { name: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Tagline">
                <input value={p.tagline} onChange={(e) => setPkg(i, { tagline: e.target.value })} className={inputCls} />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Price (USD)">
                  <input type="number" min="0" value={p.price.USD} onChange={(e) => setPkg(i, { price: { ...p.price, USD: num(e.target.value) } })} className={inputCls} />
                </Field>
                <Field label="Price (FCFA)">
                  <input type="number" min="0" step="500" value={p.price.XAF} onChange={(e) => setPkg(i, { price: { ...p.price, XAF: num(e.target.value) } })} className={inputCls} />
                </Field>
              </div>
              <Field label="Price unit" hint="e.g. per essay, per scholarship">
                <input value={p.unit} onChange={(e) => setPkg(i, { unit: e.target.value })} className={inputCls} />
              </Field>
              <Field label="Delivery time">
                <input value={p.delivery} onChange={(e) => setPkg(i, { delivery: e.target.value })} className={inputCls} />
              </Field>
              <Field label="What's included" hint="One item per line">
                <textarea
                  rows={6}
                  value={p.features.join('\n')}
                  onChange={(e) => setPkg(i, { features: e.target.value.split('\n') })}
                  onBlur={() => setPkg(i, { features: p.features.map((f) => f.trim()).filter(Boolean) })}
                  className={`${inputCls} resize-y`}
                />
              </Field>
              <label className="flex items-center gap-2 text-[0.88rem] text-navy-800">
                <input
                  type="radio"
                  name="popular"
                  checked={Boolean(p.popular)}
                  onChange={() => setPkgs((list) => list.map((x, j) => ({ ...x, popular: j === i })))}
                  className="accent-navy-900"
                />
                Highlight as “Most popular”
              </label>
            </div>
          </Panel>
        ))}
      </div>

      <Panel title="Add-ons">
        <div className="space-y-2">
          <div className="hidden grid-cols-[1fr_120px_140px_32px] gap-2 px-1 text-[0.72rem] font-semibold uppercase tracking-wider text-navy-500 sm:grid">
            <span>Name</span><span>USD</span><span>FCFA</span><span />
          </div>
          {addons.map((a, i) => (
            <div key={i} className="grid grid-cols-2 gap-2 sm:grid-cols-[1fr_120px_140px_32px]">
              <input value={a.name} onChange={(e) => setAddon(i, { name: e.target.value })} placeholder="Add-on name" className={`${inputCls} col-span-2 sm:col-span-1`} />
              {a.price ? (
                <>
                  <input type="number" min="0" value={a.price.USD} onChange={(e) => setAddon(i, { price: { ...a.price, USD: num(e.target.value) } })} className={inputCls} aria-label="USD" />
                  <input type="number" min="0" step="500" value={a.price.XAF} onChange={(e) => setAddon(i, { price: { ...a.price, XAF: num(e.target.value) } })} className={inputCls} aria-label="FCFA" />
                </>
              ) : (
                <input value={a.note ?? ''} onChange={(e) => setAddon(i, { note: e.target.value })} placeholder="Price text, e.g. +30% of package price" className={`${inputCls} sm:col-span-2`} />
              )}
              <button type="button" onClick={() => setAddons((l) => l.filter((_, j) => j !== i))} aria-label="Remove add-on" className="justify-self-start text-navy-400 hover:text-rose-600">
                <Icon name="close" className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setAddons((l) => [...l, { name: '', price: { USD: '', XAF: '' } }])}
            className="inline-flex items-center gap-1.5 pt-1 text-[0.85rem] font-semibold text-navy-700 hover:text-navy-950"
          >
            <Icon name="plus" className="h-4 w-4" />
            Add add-on
          </button>
        </div>
      </Panel>
      {flashNode}
    </div>
  )
}
