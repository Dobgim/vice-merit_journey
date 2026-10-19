import { useEffect, useState } from 'react'
import { fetchBlogPosts } from '../lib/blog'

/** { posts, status: 'loading' | 'ready' | 'error' } */
export default function useBlogPosts() {
  const [state, setState] = useState({ posts: [], status: 'loading' })

  useEffect(() => {
    let live = true
    fetchBlogPosts()
      .then((posts) => live && setState({ posts, status: 'ready' }))
      .catch(() => live && setState({ posts: [], status: 'error' }))
    return () => {
      live = false
    }
  }, [])

  return state
}
