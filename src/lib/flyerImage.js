/**
 * Shareable A4-shaped flyer image (1080×1527 JPEG) for one listing: brand,
 * title, host country and flag, key facts, what you get, requirements and
 * documents (trimmed to fit the page), the official apply link printed and as
 * a QR code, and Merit Leaders' contacts in one row (WhatsApp, email, website,
 * with Facebook and LinkedIn underneath). Drawn on a canvas so every
 * flyer is crisp and identical everywhere. Loaded on demand (with `qrcode`).
 */
import QRCode from 'qrcode'
import { SITE_URL, company } from '../data/site'
import { formatDate } from './deadline'
import { isoFromEmoji } from '../components/ui/Flag'
import { isUsableLogo, logoUrl } from './logo'

const W = 1080
const PAD = 72

const C = {
  navy950: '#070f26',
  navy900: '#0f1b3d',
  navy800: '#1a2850',
  navy600: '#2c4486',
  gold200: '#ead9a8',
  gold300: '#dcbf72',
  gold500: '#c08f35',
  gold700: '#835525',
  white: '#ffffff',
  muted: 'rgba(227,233,246,0.74)',
  faint: 'rgba(227,233,246,0.5)',
}

const ACCENT = { scholarships: '#dcbf72', grants: '#6ee7b7', internships: '#7dd3fc', fellowships: '#c4b5fd', competitions: '#fda4af' }

const DISPLAY = '"Source Serif 4", Georgia, serif'
const SANS = '"Source Sans 3", system-ui, sans-serif'

/* ---------------------------------------------------------------- helpers */

const withTimeout = (promise, ms, fallback = null) =>
  Promise.race([promise, new Promise((resolve) => setTimeout(() => resolve(fallback), ms))])

function loadImage(src, crossOrigin) {
  return withTimeout(
    new Promise((resolve) => {
      const img = new Image()
      if (crossOrigin) img.crossOrigin = 'anonymous'
      img.onload = () => resolve(img)
      img.onerror = () => resolve(null)
      img.src = src
    }),
    6000
  )
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

/** Greedy word wrap; the last allowed line gets an ellipsis if text remains. */
function wrap(ctx, text = '', maxWidth, maxLines = Infinity) {
  const words = String(text).split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (let i = 0; i < words.length; i++) {
    const test = line ? `${line} ${words[i]}` : words[i]
    if (ctx.measureText(test).width <= maxWidth || !line) {
      line = test
    } else {
      lines.push(line)
      line = words[i]
      if (lines.length === maxLines) {
        let last = lines[maxLines - 1]
        while (ctx.measureText(`${last}…`).width > maxWidth && last.includes(' ')) last = last.slice(0, last.lastIndexOf(' '))
        lines[maxLines - 1] = `${last}…`
        return lines
      }
    }
  }
  if (line) lines.push(line)
  return lines.slice(0, maxLines)
}

/** Largest font size (from `sizes`) at which `text` fits in `maxLines`. */
function fit(ctx, text, maxWidth, maxLines, sizes, font) {
  for (const size of sizes) {
    ctx.font = font(size)
    const lines = wrap(ctx, text, maxWidth, Infinity)
    if (lines.length <= maxLines) return { size, lines }
  }
  const size = sizes[sizes.length - 1]
  ctx.font = font(size)
  return { size, lines: wrap(ctx, text, maxWidth, maxLines) }
}

function displayUrl(url = '') {
  const s = url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
  return s.length > 60 ? `${s.slice(0, 57)}…` : s
}

function pill(ctx, x, y, text, { bg, fg, size = 20, padX = 18, h = 40, align = 'left' }) {
  ctx.font = `800 ${size}px ${SANS}`
  ctx.letterSpacing = '2px'
  const w = ctx.measureText(text).width + padX * 2
  const left = align === 'right' ? x - w : x
  ctx.fillStyle = bg
  roundRect(ctx, left, y, w, h, h / 2)
  ctx.fill()
  ctx.fillStyle = fg
  ctx.textBaseline = 'middle'
  ctx.fillText(text, left + padX, y + h / 2 + 1)
  ctx.textBaseline = 'alphabetic'
  ctx.letterSpacing = '0px'
  return w
}

/** The EU flag image cannot be drawn cross-origin, so draw it: blue field, 12 gold stars. */
function drawEuFlag(ctx, x, y, w, h) {
  ctx.fillStyle = '#003399'
  ctx.fillRect(x, y, w, h)
  ctx.fillStyle = '#ffcc00'
  const cx = x + w / 2
  const cy = y + h / 2
  const ring = h / 3
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    const sx = cx + Math.cos(a) * ring
    const sy = cy + Math.sin(a) * ring
    ctx.beginPath()
    for (let k = 0; k < 10; k++) {
      const r = k % 2 ? 1.6 : 3.8
      const t = -Math.PI / 2 + (k * Math.PI) / 5
      ctx.lineTo(sx + Math.cos(t) * r, sy + Math.sin(t) * r)
    }
    ctx.fill()
  }
}

async function ensureFonts() {
  if (!document.fonts?.load) return
  await withTimeout(
    Promise.all(
      [`700 64px ${DISPLAY}`, `600 40px ${DISPLAY}`, `400 24px ${SANS}`, `600 24px ${SANS}`, `800 20px ${SANS}`].map((f) =>
        document.fonts.load(f).catch(() => null)
      )
    ),
    4000
  )
}

/* ------------------------------------------------------------------- draw */

// A4 proportions (1 : 1.414)
const H = 1527

/** Bulleted list inside a card. */
function bullets(ctx, items, inner, y, accent, { max = 6, lines = 2, size = 24 } = {}) {
  ctx.font = `500 ${size}px ${SANS}`
  const lh = Math.round(size * 1.4)
  for (const text of items.slice(0, max)) {
    const ls = wrap(ctx, text, inner.w - 34, lines)
    ctx.fillStyle = accent
    ctx.beginPath()
    ctx.arc(inner.x + 7, y + 14, 5, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = C.white
    ls.forEach((l, i) => ctx.fillText(l, inner.x + 30, y + 22 + i * lh))
    y += ls.length * lh + 10
  }
  return y
}

const shortUrl = (u = '') => u.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')

/** This opportunity's page on meritleaders.com — what flyers and shares link to. */
export const listingUrl = (item, kind = 'scholarships') => `${SITE_URL}/${kind}/${item.slug}`

export async function drawFlyer(item, { kind = 'scholarships', label = 'Scholarship' } = {}) {
  await ensureFonts()
  const accent = ACCENT[kind] ?? ACCENT.scholarships
  const iso = isoFromEmoji(item.flag)
  const orgLogoSrc = logoUrl(item, 256)
  const [logo, flag, orgLogo] = await Promise.all([
    loadImage('/logo-mark.png'),
    iso ? loadImage(`https://flagcdn.com/w160/${iso}.png`, true) : null,
    orgLogoSrc ? loadImage(orgLogoSrc, true) : null,
  ])

  // Content is drawn on a transparent canvas, then placed on the background.
  const content = document.createElement('canvas')
  content.width = W
  content.height = H
  const ctx = content.getContext('2d')
  ctx.textBaseline = 'alphabetic'

  /* Brand header */
  let y = 64
  ctx.fillStyle = C.white
  roundRect(ctx, PAD, y, 84, 84, 20)
  ctx.fill()
  if (logo) ctx.drawImage(logo, PAD + 5, y + 5, 74, 74)
  ctx.font = `600 40px ${DISPLAY}`
  ctx.fillStyle = C.white
  const merit = 'Merit '
  ctx.fillText(merit, PAD + 104, y + 44)
  ctx.fillStyle = C.gold300
  ctx.fillText(company.name.replace(/^Merit\s*/, ''), PAD + 104 + ctx.measureText(merit).width, y + 44)
  ctx.font = `600 17px ${SANS}`
  ctx.letterSpacing = '3px'
  ctx.fillStyle = C.faint
  ctx.fillText(company.tagline.toUpperCase(), PAD + 104, y + 74)
  ctx.letterSpacing = '0px'
  pill(ctx, W - PAD, y + 22, label.toUpperCase(), { bg: accent, fg: C.navy950, align: 'right' })

  /* Country row */
  y = 184
  let x = PAD
  if (orgLogo && (item.logo || isUsableLogo(orgLogo))) {
    ctx.fillStyle = C.white
    roundRect(ctx, x, y - 10, 68, 68, 16)
    ctx.fill()
    ctx.drawImage(orgLogo, x + 8, y - 2, 52, 52)
    x += 88
  }
  if (flag || iso === 'eu') {
    ctx.save()
    roundRect(ctx, x, y, 72, 48, 8)
    ctx.clip()
    if (flag) ctx.drawImage(flag, x, y, 72, 48)
    else drawEuFlag(ctx, x, y, 72, 48)
    ctx.restore()
    x += 92
  } else if (!iso && item.flag) {
    ctx.font = `44px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`
    ctx.textBaseline = 'middle'
    ctx.fillText(item.flag, x, y + 26)
    ctx.textBaseline = 'alphabetic'
    x += 66
  }
  ctx.font = `600 30px ${SANS}`
  ctx.fillStyle = C.white
  ctx.textBaseline = 'middle'
  ctx.fillText(wrap(ctx, item.country, W - PAD * 2 - (x - PAD) - 300, 1)[0] ?? '', x, y + 25)
  ctx.textBaseline = 'alphabetic'
  if (item.funding) pill(ctx, W - PAD, y + 4, item.funding.toUpperCase(), { bg: 'rgba(255,255,255,0.1)', fg: C.gold200, align: 'right' })

  /* Title, organisation, summary */
  y = 268
  const title = fit(ctx, item.name, W - PAD * 2, 2, [64, 56, 50, 44, 40], (s) => `700 ${s}px ${DISPLAY}`)
  ctx.fillStyle = C.white
  const lh = Math.round(title.size * 1.12)
  title.lines.forEach((line, i) => ctx.fillText(line, PAD, y + title.size + i * lh))
  y += title.size + (title.lines.length - 1) * lh + 42
  if (item.org) {
    ctx.font = `600 26px ${SANS}`
    ctx.fillStyle = C.gold300
    ctx.fillText(wrap(ctx, item.org, W - PAD * 2, 1)[0] ?? '', PAD, y)
    y += 10
  } else y -= 30
  ctx.font = `400 24px ${SANS}`
  ctx.fillStyle = C.muted
  for (const line of wrap(ctx, item.summary, W - PAD * 2, 2)) {
    y += 33
    ctx.fillText(line, PAD, y)
  }
  y += 28

  /* Key facts */
  const gap = 16
  const colW = (W - PAD * 2 - gap * 2) / 3
  ;[
    ['VALUE', item.amount],
    ['DEADLINE', item.deadline ? formatDate(item.deadline) : 'Rolling'],
    ['LEVEL', item.level],
  ].forEach(([h, v], i) => {
    const bx = PAD + i * (colW + gap)
    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    roundRect(ctx, bx, y, colW, 108, 18)
    ctx.fill()
    ctx.font = `800 17px ${SANS}`
    ctx.letterSpacing = '2px'
    ctx.fillStyle = accent
    ctx.fillText(h, bx + 22, y + 34)
    ctx.letterSpacing = '0px'
    ctx.font = `600 22px ${SANS}`
    ctx.fillStyle = C.white
    wrap(ctx, v || '—', colW - 44, 2).forEach((l, j) => ctx.fillText(l, bx + 22, y + 66 + j * 29))
  })
  y += 108 + 20

  /* Lists — trimmed until everything fits on the A4 page */
  const benefits = (item.benefits ?? []).filter(Boolean)
  const reqs = (item.eligibility ?? []).filter((e) => !/^(Open to|Level):/.test(e))
  const docs = (item.documents ?? []).filter(Boolean)

  const contactH = 92
  const qrPanelH = 176
  const panelY = H - 36 - contactH - 18 - qrPanelH
  const room = panelY - 20

  // One panel with three sub-sections keeps the overhead low so more items fit.
  const drawLists = (g, top, lim) => {
    const inner = { x: PAD + 28, w: W - PAD * 2 - 56 }
    let cy = top + 14
    const section = (heading, list, max) => {
      if (!list.length || !max) return
      g.font = `800 17px ${SANS}`
      g.letterSpacing = '2px'
      g.fillStyle = accent
      g.fillText(heading, inner.x, cy + 26)
      g.letterSpacing = '0px'
      cy = bullets(g, list, inner, cy + 36, accent, { max, lines: lim.lines, size: 21 }) + 4
    }
    section('WHAT YOU GET', benefits, lim.b)
    section('REQUIREMENTS', reqs, lim.r)
    section('DOCUMENTS YOU NEED', docs, lim.d)
    const h = cy - top + 10
    g.save()
    g.globalCompositeOperation = 'destination-over'
    g.fillStyle = 'rgba(255,255,255,0.06)'
    roundRect(g, PAD, top, W - PAD * 2, h, 22)
    g.fill()
    g.restore()
    g.strokeStyle = 'rgba(255,255,255,0.12)'
    roundRect(g, PAD, top, W - PAD * 2, h, 22)
    g.stroke()
    return top + h
  }
  // Try the fullest version first, then drop items (documents first) until it fits.
  const tries = []
  for (const lines of [2, 1]) for (let d = 6; d >= 2; d--) for (let r = 5; r >= 2; r--) for (let b = 4; b >= 1; b--) tries.push({ b, r, d, lines })
  tries.sort((p, q) => q.b + q.r + q.d + q.lines * 3 - (p.b + p.r + p.d + p.lines * 3))
  const scratch = document.createElement('canvas')
  scratch.width = W
  scratch.height = H * 2
  const sctx = scratch.getContext('2d')
  const lim = tries.find((t) => {
    sctx.clearRect(0, 0, W, H * 2)
    return drawLists(sctx, y, t) <= room
  }) ?? { b: 1, r: 1, d: 1, lines: 1 }
  drawLists(ctx, y, lim)

  /* Apply panel — compact QR, still easy to scan */
  ctx.fillStyle = C.white
  roundRect(ctx, PAD, panelY, W - PAD * 2, qrPanelH, 22)
  ctx.fill()
  const qrSize = 136
  // The QR code and link send people to this opportunity's page on our site
  // first; that page has the eligibility checklist and the official Apply button.
  const target = listingUrl(item, kind)
  {
    const qr = document.createElement('canvas')
    await QRCode.toCanvas(qr, target, { width: qrSize, margin: 0, errorCorrectionLevel: 'M', color: { dark: C.navy950, light: '#ffffff' } })
    ctx.drawImage(qr, PAD + 20, panelY + 20, qrSize, qrSize)
  }
  const tx = PAD + 20 + qrSize + 28
  const tw = W - PAD - 24 - tx
  ctx.font = `800 19px ${SANS}`
  ctx.letterSpacing = '3px'
  ctx.fillStyle = C.gold700
  ctx.fillText('APPLY HERE', tx, panelY + 50)
  ctx.letterSpacing = '0px'
  ctx.font = `700 25px ${SANS}`
  ctx.fillStyle = C.navy950
  const urlText = displayUrl(target).replace(/\//g, '/ ')
  wrap(ctx, urlText, tw, 2).map((l) => l.replace(/\/ /g, '/')).forEach((l, i) => ctx.fillText(l, tx, panelY + 88 + i * 32))
  ctx.font = `400 20px ${SANS}`
  ctx.fillStyle = C.navy600
  ctx.fillText('Scan the code or open the link to apply.', tx, panelY + qrPanelH - 24)

  /* Contacts — one horizontal row, social pages underneath */
  const cy0 = H - 36 - contactH
  ctx.fillStyle = 'rgba(255,255,255,0.07)'
  roundRect(ctx, PAD, cy0, W - PAD * 2, contactH, 18)
  ctx.fill()
  const row = [
    ['WhatsApp', company.whatsappDisplay],
    ['Email', company.email],
    ['Web', company.domain],
  ]
  ctx.textAlign = 'center'
  const cw = (W - PAD * 2) / row.length
  row.forEach(([k, v], i) => {
    const cx = PAD + cw * i + cw / 2
    ctx.font = `800 15px ${SANS}`
    ctx.letterSpacing = '2px'
    ctx.fillStyle = C.gold200
    ctx.fillText(k.toUpperCase(), cx, cy0 + 30)
    ctx.letterSpacing = '0px'
    ctx.font = `700 22px ${SANS}`
    ctx.fillStyle = C.white
    ctx.fillText(wrap(ctx, v, cw - 16, 1)[0] ?? '', cx, cy0 + 58)
  })
  const socials = company.socials.filter((s) => s.href && /facebook|linkedin/i.test(s.label)).map((s) => shortUrl(s.href))
  if (socials.length) {
    ctx.font = `500 17px ${SANS}`
    ctx.fillStyle = C.muted
    ctx.fillText(socials.join('   ·   '), W / 2, cy0 + 82)
  }
  ctx.textAlign = 'left'
  const height = H

  /* Background with the content on top */
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = height
  const out = canvas.getContext('2d')
  const bg = out.createLinearGradient(0, 0, W, height)
  bg.addColorStop(0, C.navy800)
  bg.addColorStop(0.55, C.navy900)
  bg.addColorStop(1, C.navy950)
  out.fillStyle = bg
  out.fillRect(0, 0, W, height)
  const glow = out.createRadialGradient(W - 120, 120, 0, W - 120, 120, 520)
  glow.addColorStop(0, `${accent}55`)
  glow.addColorStop(1, `${accent}00`)
  out.fillStyle = glow
  out.fillRect(0, 0, W, height)
  out.strokeStyle = 'rgba(255,255,255,0.045)'
  for (let gx = W / 2; gx < W; gx += 40) {
    out.beginPath()
    out.moveTo(gx, 0)
    out.lineTo(gx, 640)
    out.stroke()
  }
  out.drawImage(content, 0, 0)
  return canvas
}

export async function flyerBlob(item, opts) {
  const canvas = await drawFlyer(item, opts)
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not create the image.'))), 'image/jpeg', 0.92)
  )
}

export const flyerFileName = (item) => `${item.slug || 'flyer'}-merit-leaders.jpg`

export async function downloadFlyer(item, opts) {
  const blob = await flyerBlob(item, opts)
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = flyerFileName(item)
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 2000)
}
