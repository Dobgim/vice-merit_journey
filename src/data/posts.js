/**
 * Articles published on meritleaders.com (content/blog/*.md), newest first.
 * To publish a draft from content/blog-drafts, move it into content/blog.
 */
import { parsePost } from '../lib/posts'

const files = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })

export const posts = Object.entries(files)
  .map(([file, raw]) => parsePost(file, raw))
  .sort((a, b) => (b.date ?? 0) - (a.date ?? 0))
