import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, company } from '../../data/site'

/** Creates the head tag if it is missing, then sets one attribute on it. */
function setHeadTag(selector, create, attr, value) {
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = create()
    document.head.appendChild(tag)
  }
  tag.setAttribute(attr, value)
}

/**
 * Per-route document title, meta description, canonical URL and optional
 * JSON-LD. Kept deliberately tiny — no helmet dependency, so there is nothing
 * extra to ship. The canonical always points at the www address of the
 * current page (without query string), so Google indexes each listing on its
 * own instead of treating every page as the homepage.
 */
export default function Seo({ title, description, jsonLd }) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = title ? `${title} — ${company.name}` : `${company.name} — Scholarship Consultancy`

    if (!description) return
    setHeadTag('meta[name="description"]', () => Object.assign(document.createElement('meta'), { name: 'description' }), 'content', description)
  }, [title, description])

  useEffect(() => {
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/+$/, '')}`
    setHeadTag('link[rel="canonical"]', () => Object.assign(document.createElement('link'), { rel: 'canonical' }), 'href', url)
    setHeadTag('meta[property="og:url"]', () => {
      const m = document.createElement('meta')
      m.setAttribute('property', 'og:url')
      return m
    }, 'content', url)
  }, [pathname])

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
