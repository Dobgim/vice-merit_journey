import { useEffect, useState } from 'react'
import Icon from './Icon'

/**
 * Preview of the shareable flyer image, with Download and (where supported)
 * native Share — on phones that sends the image straight to WhatsApp etc.
 * The generator and QR library load only when this component mounts.
 */
export default function FlyerDownload({ item, kind, label }) {
  const [url, setUrl] = useState(null)
  const [blob, setBlob] = useState(null)
  const [error, setError] = useState(null)
  const [canShare, setCanShare] = useState(false)

  useEffect(() => {
    let alive = true
    let objectUrl
    setUrl(null)
    import('../../lib/flyerImage')
      .then(({ flyerBlob }) => flyerBlob(item, { kind, label }))
      .then((b) => {
        if (!alive) return
        objectUrl = URL.createObjectURL(b)
        setBlob(b)
        setUrl(objectUrl)
        const file = new File([b], 'flyer.jpg', { type: 'image/jpeg' })
        setCanShare(Boolean(navigator.canShare?.({ files: [file] })))
      })
      .catch((e) => alive && setError(e))
    return () => {
      alive = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [item, kind, label])

  const fileName = `${item.slug || 'flyer'}-merit-leaders.jpg`

  const share = async () => {
    const file = new File([blob], fileName, { type: 'image/jpeg' })
    try {
      await navigator.share({ files: [file], title: item.name, text: `${item.name} — apply here: ${(!item.officialSearch && item.officialUrl) || window.location.href}` })
    } catch {
      /* cancelled */
    }
  }

  return (
    <div>
      <div className="overflow-hidden rounded-xl bg-navy-900 ring-1 ring-navy-900/10">
        {url ? (
          <img src={url} alt={`Flyer for ${item.name}`} className="block aspect-[1080/1527] w-full" />
        ) : (
          <div className="flex aspect-[1080/1527] items-center justify-center text-sm text-navy-100/60">
            {error ? 'Could not create the flyer.' : 'Creating flyer…'}
          </div>
        )}
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <a
          href={url ?? undefined}
          download={fileName}
          aria-disabled={!url}
          className={`inline-flex h-10 items-center justify-center gap-2 rounded-full bg-navy-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-navy-800 ${
            url ? '' : 'pointer-events-none opacity-50'
          }`}
        >
          <Icon name="arrowRight" className="h-4 w-4 rotate-90" />
          Download
        </a>
        {canShare ? (
          <button
            type="button"
            onClick={share}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-navy-900/15 bg-white px-4 text-sm font-semibold text-navy-900 hover:border-navy-900/35"
          >
            <Icon name="share" className="h-4 w-4" />
            Share
          </button>
        ) : (
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${item.name} — apply here: ${(!item.officialSearch && item.officialUrl) || window.location.href}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-navy-900/15 bg-white px-4 text-sm font-semibold text-navy-900 hover:border-navy-900/35"
          >
            <Icon name="whatsapp" className="h-4 w-4" />
            Send link
          </a>
        )}
      </div>
    </div>
  )
}
