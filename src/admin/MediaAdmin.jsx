import { useRef, useState } from 'react'
import Icon from '../components/ui/Icon'
import * as api from './api'
import { Btn, Empty, ErrorNote, PageTitle, fmtDateTime, useFlash, useLoad } from './ui'

function formatBytes(bytes) {
  if (!bytes || isNaN(bytes)) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaAdmin() {
  const { data, loading, error, setData, reload } = useLoad(api.listImages)
  const [uploading, setUploading] = useState(false)
  const [actionError, setActionError] = useState(null)
  const [flashNode, flash] = useFlash()
  const cameraInputRef = useRef(null)
  const fileInputRef = useRef(null)

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setActionError(null)
    try {
      const url = await api.uploadFlyer(file)
      flash('Image uploaded successfully to Supabase!')
      await reload()
    } catch (err) {
      setActionError(err)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleDelete = async (name) => {
    if (!window.confirm('Delete this image from storage?')) return
    setActionError(null)
    try {
      await api.deleteImage(name)
      setData((prev) => (prev || []).filter((item) => item.name !== name))
      flash('Image deleted')
    } catch (err) {
      setActionError(err)
    }
  }

  const copyUrl = (url) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      flash('Image URL copied to clipboard!')
    } else {
      window.prompt('Copy image URL:', url)
    }
  }

  return (
    <div className="space-y-6">
      <PageTitle
        title="Media & Images"
        sub="Store website flyers, photos, and banners in Supabase. Easily upload straight from your phone."
      >
        <div className="flex flex-wrap items-center gap-2">
          {/* Camera input for mobile */}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gold-400 px-4 py-2.5 text-sm font-semibold text-navy-950 shadow-sm transition hover:bg-gold-300 active:scale-95">
            <Icon name="camera" className="h-4 w-4" />
            <span>Camera</span>
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleUpload}
              className="sr-only"
              disabled={uploading}
            />
          </label>

          {/* Gallery / File picker */}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-navy-800 active:scale-95">
            <Icon name="plus" className="h-4 w-4" />
            <span>{uploading ? 'Uploading…' : 'Upload Image'}</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="sr-only"
              disabled={uploading}
            />
          </label>
        </div>
      </PageTitle>

      <ErrorNote error={error || actionError} />

      {uploading && (
        <div className="flex items-center gap-3 rounded-2xl border border-gold-300/60 bg-gold-50 p-4 text-sm text-gold-950 animate-pulse">
          <Icon name="clock" className="h-5 w-5 text-gold-600 animate-spin" />
          <span>Uploading and storing image in Supabase…</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center p-12 text-navy-500">
          <p>Loading stored images…</p>
        </div>
      ) : data?.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {data.map((item) => (
            <div
              key={item.name}
              className="group flex flex-col overflow-hidden rounded-2xl border border-navy-900/[0.08] bg-white shadow-soft transition hover:shadow-lift"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-950/5">
                <img
                  src={item.url}
                  alt={item.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.classList.add('hidden')
                  }}
                />
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-2 top-2 rounded-lg bg-navy-950/70 p-1.5 text-white backdrop-blur-md transition hover:bg-navy-950"
                  title="Open full size"
                >
                  <Icon name="external" className="h-3.5 w-3.5" />
                </a>
              </div>

              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <p className="truncate text-sm font-semibold text-navy-950" title={item.name}>
                    {item.name}
                  </p>
                  <p className="mt-1 flex items-center justify-between text-xs text-navy-500">
                    <span>{formatBytes(item.size)}</span>
                    {item.created_at && <span>{fmtDateTime(item.created_at)}</span>}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-navy-900/[0.06] pt-3">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-navy-900/10 px-2.5 py-1.5 text-xs font-semibold text-navy-800 transition hover:bg-navy-50 active:scale-95"
                  >
                    <Icon name="copy" className="h-3.5 w-3.5 text-navy-500" />
                    <span>Copy URL</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.name)}
                    className="flex items-center justify-center rounded-lg p-1.5 text-navy-400 transition hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                    title="Delete image"
                  >
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty icon="image" title="No images stored yet">
          Take a photo with your phone or click "Upload Image" above to store your first image in Supabase.
        </Empty>
      )}

      {flashNode}
    </div>
  )
}
