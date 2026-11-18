/**
 * Articles from the Merit Leaders blog (blog.meritleaders.com). The RSS feed
 * gives every post; the blog's home page adds the cover image and read time.
 * Both are fetched through same-origin /blog-proxy paths (see vercel.json),
 * because the blog sends no CORS headers. New articles appear automatically.
 * Articles published on this site (data/posts.js) are listed alongside them.
 */
import { posts as ownPosts } from '../data/posts'

export const BLOG_URL = 'https://blog.meritleaders.com'

const parse = (text, type) => new DOMParser().parseFromString(text, type)

async function getText(path) {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`${path} returned ${res.status}`)
  return res.text()
}

/** link → { image, readTime, excerpt } from one page of the blog's article list. */
async function pageDetails(path) {
  const doc = parse(await getText(path), 'text/html')
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

// The blog's home page lists only the newest 10 articles; older ones are on /page/2, /page/3…
const MAX_PAGES = 10

/** Cover, read time and excerpt for each feed link, reading list pages until every link is found. */
async function listDetails(links, first) {
  const details = { ...(await first) }
  for (let n = 2; n <= MAX_PAGES && links.some((l) => !details[l]); n++) {
    const page = await pageDetails(`/blog-proxy/page/${n}`).catch(() => ({}))
    if (!Object.keys(page).length) break // past the last page
    Object.assign(details, page)
  }
  return details
}

let cache = null

/** Newest first: our own articles plus the blog's. Rejects only if there are none and the feed cannot be read. */
export function fetchBlogPosts() {
  cache ??= fetchFeedPosts()
    .catch((err) => {
      cache = null // allow a retry on the next visit
      if (!ownPosts.length) throw err
      return []
    })
    .then((feed) => [...ownPosts, ...feed].sort((a, b) => (b.date ?? 0) - (a.date ?? 0)))
  return cache
}

/** Articles from blog.meritleaders.com. */
function fetchFeedPosts() {
  return (async () => {
    // The home page is fetched alongside the feed; further pages only if the feed needs them.
    const home = pageDetails('/blog-proxy/home').catch(() => ({})) // images are a nice-to-have
    const feed = await getText('/blog-proxy/feed.xml')
    const doc = parse(feed, 'application/xml')
    if (doc.querySelector('parsererror')) throw new Error('The blog feed could not be read')
    const items = [...doc.querySelectorAll('item')]
    const links = items.map((item) => item.querySelector('link')?.textContent.trim()).filter(Boolean)
    const extra = await listDetails(links, home).catch(() => ({}))

    return items
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
  })()
}

export const formatPostDate = (date) =>
  date ? date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''
