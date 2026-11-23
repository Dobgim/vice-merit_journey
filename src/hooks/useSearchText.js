import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * Text for a search box that is mirrored in the address (?q=…).
 *
 * The box keeps its own text, so typing is never slowed or cut by updating the address on
 * every key. The address follows a moment after the last key, and `query` is a deferred copy
 * for filtering, so re-sorting a long list never blocks typing. When the address changes from
 * outside the box (a Clear button, the back button, a shared link), the box follows it.
 *
 * Returns [text, setText, query].
 */
export default function useSearchText(key = 'q', delay = 350) {
  const [params, setParams] = useSearchParams()
  const fromUrl = params.get(key) ?? ''
  const [text, setText] = useState(fromUrl)
  const sent = useRef(fromUrl)

  useEffect(() => {
    if (fromUrl !== sent.current) {
      sent.current = fromUrl
      setText(fromUrl)
    }
  }, [fromUrl])

  useEffect(() => {
    if (text === sent.current) return undefined
    const timer = setTimeout(() => {
      sent.current = text
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (text) next.set(key, text)
          else next.delete(key)
          return next
        },
        { replace: true, preventScrollReset: true }
      )
    }, delay)
    return () => clearTimeout(timer)
  }, [text, key, delay, setParams])

  return [text, setText, useDeferredValue(text)]
}
