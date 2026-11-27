import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL } from '../../data/site'
import { pageTitle } from '../../lib/seo'

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
// The address the visitor landed on; its pre-rendered structured data (build-seo.js) applies only there.
const landingPath = typeof window === 'undefined' ? '' : window.location.pathname

const removePrerenderedLd = () =>
  document.querySelectorAll('script[type="application/ld+json"][data-prerender]').forEach((s) => s.remove())

export default function Seo({ title, description, jsonLd, noindex = false }) {
  const { pathname } = useLocation()

  // After moving to another page, the landing page's pre-rendered structured data no longer applies.
  useEffect(() => {
    if (pathname !== landingPath) removePrerenderedLd()
  }, [pathname])

  // The server answers every path with 200, so pages that should not be in
  // Google (not found, closed listings) say so with a robots tag instead.
  useEffect(() => {
    if (noindex) setHeadTag('meta[name="robots"]', () => Object.assign(document.createElement('meta'), { name: 'robots' }), 'content', 'noindex, follow')
    else document.querySelector('meta[name="robots"]')?.remove()
  }, [noindex, pathname])

  useEffect(() => {
    document.title = pageTitle(title)

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
    // The app's own copy replaces the pre-rendered one, so the page never has two.
    removePrerenderedLd()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.page = 'true'
    script.textContent = json
    document.head.appendChild(script)
    return () => script.remove()
  }, [json])

  return null
}
