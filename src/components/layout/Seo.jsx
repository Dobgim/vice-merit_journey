import { useEffect } from 'react'
import { company } from '../../data/site'

/**
 * Per-route document title, meta description and optional JSON-LD. Kept
 * deliberately tiny — no helmet dependency, so there is nothing extra to ship.
 */
export default function Seo({ title, description, jsonLd }) {
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

  // Structured data for rich results; removed again when the page unmounts.
  const json = jsonLd ? JSON.stringify(jsonLd) : null
  useEffect(() => {
    if (!json) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.page = 'true'
    script.textContent = json
    document.head.appendChild(script)
    return () => script.remove()
  }, [json])

  return null
}
