import { useState } from 'react'
import Icon from './Icon'

/** Share links for the current page, plus copy-link and the native share sheet. */
export default function ShareBar({ title, url = typeof window !== 'undefined' ? window.location.href : '' }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  const targets = [
    { label: 'WhatsApp', icon: 'whatsapp', href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'Facebook', icon: 'facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'LinkedIn', icon: 'linkedin', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'X', icon: 'x', href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { label: 'Telegram', icon: 'telegram', href: `https://t.me/share/url?url=${u}&text=${t}` },
    { label: 'Email', icon: 'mail', href: `mailto:?subject=${t}&body=${u}` },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this link:', url)
    }
  }

  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const btn =
    'flex h-10 w-10 items-center justify-center rounded-xl border border-navy-900/[0.1] bg-white text-navy-700 transition-colors duration-300 hover:border-navy-900/30 hover:bg-navy-900 hover:text-white'

  return (
    <div className="flex flex-wrap gap-2">
      {targets.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${s.label}`}
          title={s.label}
          className={btn}
        >
          <Icon name={s.icon} className="h-[1.05rem] w-[1.05rem]" />
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className={btn}>
        <Icon name={copied ? 'check' : 'link'} className="h-[1.05rem] w-[1.05rem]" />
      </button>
      {canNativeShare && (
        <button
          type="button"
          onClick={() => navigator.share({ title, url }).catch(() => {})}
          aria-label="More sharing options"
          title="More"
          className={btn}
        >
          <Icon name="share" className="h-[1.05rem] w-[1.05rem]" />
        </button>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Link copied' : ''}
      </span>
    </div>
  )
}
