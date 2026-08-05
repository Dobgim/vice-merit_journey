import { useEffect } from 'react'
import { company } from '../../data/site'

/**
 * Per-route document title and meta description. Kept deliberately tiny —
 * no helmet dependency, so there is nothing extra to ship or hydrate.
 */
export default function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} — ${company.name}` : `${company.name} — Scholarship Consultancy`

    if (!description) return
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])

  return null
}
