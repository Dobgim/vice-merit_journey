/**
 * Articles from the Merit Leaders blog (blog.meritleaders.com). The RSS feed
 * gives every post; the blog's home page adds the cover image and read time.
 * Both are fetched through same-origin /blog-proxy paths (see vercel.json),
 * because the blog sends no CORS headers. New articles appear automatically.
 */
export const BLOG_URL = 'https://blog.meritleaders.com'

const parse = (text, type) => new DOMParser().parseFromString(text, type)

async function getText(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`${path} returned ${res.status}`)
  return res.text()
}

/** link → { image, readTime, excerpt } from the blog's home page. */
async function homeDetails() {
  const doc = parse(await getText('/blog-proxy/home'), 'text/html')
  const details = {}
  for (const item of doc.querySelectorAll('article')) {
    const href = item.querySelector('h2 a, h3 a')?.getAttribute('href')
    if (!href) continue
    const meta = [...item.querySelectorAll('.bz-meta span')].map((s) => s.textContent.trim())
    details[new URL(href, BLOG_URL).href] = {
      image: item.querySelector('img')?.getAttribute('src') || null,
      readTime: meta.find((m) => /read/i.test(m)) ?? null,
      excerpt: item.querySelector('.c-excerpt')?.textContent.trim() || null,
    }
  }
  return details
}

let cache = null

/** Newest first. Rejects only if the feed itself cannot be read. */
export function fetchBlogPosts() {
  cache ??= (async () => {
    const [feed, extra] = await Promise.all([
      getText('/blog-proxy/feed.xml'),
      homeDetails().catch(() => ({})), // images are a nice-to-have
    ])
    const doc = parse(feed, 'application/xml')
    if (doc.querySelector('parsererror')) throw new Error('The blog feed could not be read')

    return [...doc.querySelectorAll('item')]
      .map((item) => {
        const text = (tag) => item.querySelector(tag)?.textContent.trim() ?? ''
        const link = text('link')
        const more = extra[link] ?? {}
        return {
          id: text('guid') || link,
          title: text('title'),
          link,
          excerpt: text('description') || more.excerpt || '',
          date: text('pubDate') ? new Date(text('pubDate')) : null,
          image: more.image ?? null,
          readTime: more.readTime ?? null,
        }
      })
      .filter((p) => p.title && p.link)
      .sort((a, b) => (b.date ?? 0) - (a.date ?? 0))
  })().catch((err) => {
    cache = null // allow a retry on the next visit
    throw err
  })
  return cache
}

export const formatPostDate = (date) =>
  date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
