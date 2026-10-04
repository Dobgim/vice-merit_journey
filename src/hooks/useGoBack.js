import { useNavigate } from 'react-router-dom'

/**
 * Returns a handler that goes to the previous page, like the browser's back
 * button. When the visitor landed here directly (no in-site history), it goes
 * to `fallback` instead of leaving the site.
 */
export default function useGoBack(fallback = '/') {
  const navigate = useNavigate()
  return () => {
    if ((window.history.state?.idx ?? 0) > 0) navigate(-1)
    else navigate(fallback)
  }
}
