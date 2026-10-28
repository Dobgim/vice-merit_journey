/**
 * Articles published on meritleaders.com itself (content/blog/*.md). Each file
 * starts with "Key: value" lines (Title, Meta description, Published, Cover,
 * Cover credit), a blank line, then the article in simple Markdown: ## and ###
 * headings, paragraphs, - lists, - [ ] checklists, 1. numbered lists, **bold**,
 * *italic* and [links](url). Plain functions so the build (build-seo.js) can
 * pre-render the same HTML the site shows.
 */
import { SITE_URL } from '../data/site.js'

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function inline(text) {
  return esc(text)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      // Links to our own site stay in the same tab.
      const own = url.startsWith(SITE_URL) ? url.slice(SITE_URL.length) || '/' : url.startsWith('/') ? url : null
      return own
        ? `<a href="${own}">${label}</a>`
        : `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
}

/** Markdown (the subset above) → HTML string. */
export function markdownToHtml(md) {
  const out = []
  let list = null // { tag, items }
  let para = []
  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(' '))}</p>`)
    para = []
  }
  const flushList = () => {
    if (list) out.push(`<${list.tag}${list.check ? ' class="checklist"' : ''}>${list.items.join('')}</${list.tag}>`)
    list = null
  }
  const addItem = (tag, html, check = false) => {
    flushPara()
    if (list && list.tag !== tag) flushList()
    list ??= { tag, items: [], check }
    list.items.push(`<li>${html}</li>`)
  }

  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim()
    let m
    if (!line) {
      flushPara()
      flushList()
    } else if ((m = line.match(/^(#{2,3})\s+(.*)$/))) {
      flushPara()
      flushList()
      const tag = m[1].length === 2 ? 'h2' : 'h3'
      out.push(`<${tag}>${inline(m[2])}</${tag}>`)
    } else if ((m = line.match(/^- \[( |x)\]\s+(.*)$/i))) {
      addItem('ul', `<span class="box" aria-hidden="true"></span>${inline(m[2])}`, true)
    } else if ((m = line.match(/^[-*]\s+(.*)$/))) {
      addItem('ul', inline(m[1]))
    } else if ((m = line.match(/^\d+\.\s+(.*)$/))) {
      addItem('ol', inline(m[1]))
    } else {
      if (list) flushList()
      para.push(line)
    }
  }
  flushPara()
  flushList()
  return out.join('\n')
}

/** One file → post. `file` is the file name, e.g. 2026-10-28-my-article.md */
export function parsePost(file, raw) {
  const name = file.split(/[\\/]/).pop().replace(/\.md$/, '')
  const [, fileDate, slug] = name.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/) ?? [null, null, name]
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n')
  const split = text.indexOf('\n\n')
  const meta = {}
  for (const line of text.slice(0, split).split('\n')) {
    const m = line.match(/^([A-Za-z ]+):\s*(.*)$/)
    if (m) meta[m[1].trim().toLowerCase()] = m[2].trim()
  }
  const body = text.slice(split + 2).trim()
  const published = meta.published || fileDate
  const words = body.split(/\s+/).length
  return {
    id: slug,
    slug,
    title: meta.title ?? slug,
    excerpt: meta['meta description'] ?? '',
    date: published ? new Date(`${published}T08:00:00Z`) : null,
    image: meta.cover || null,
    imageCredit: meta['cover credit'] || null,
    readTime: `${Math.max(1, Math.round(words / 200))} min read`,
    to: `/blog/${slug}`,
    link: `${SITE_URL}/blog/${slug}`,
    html: markdownToHtml(body),
  }
}
