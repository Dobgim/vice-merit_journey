/**
 * Shareable flyer image (1080×1350 JPEG) for one listing: brand, title, host
 * country and flag, key facts, who can apply, a short summary, and the
 * official apply link printed and as a QR code. Drawn on a canvas so every
 * flyer is crisp and identical everywhere. Loaded on demand (with `qrcode`).
 */
import QRCode from 'qrcode'
import { company } from '../data/site'
import { formatDate } from './deadline'
import { isoFromEmoji } from '../components/ui/Flag'

const W = 1080
const H = 1350
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

const DISPLAY = 'Fraunces, Georgia, serif'
const SANS = '"Plus Jakarta Sans", Inter, system-ui, sans-serif'

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

export async function drawFlyer(item, { kind = 'scholarships', label = 'Scholarship' } = {}) {
  await ensureFonts()
  const accent = ACCENT[kind] ?? ACCENT.scholarships
  const iso = isoFromEmoji(item.flag)
  const [logo, flag] = await Promise.all([
    loadImage('/logo-mark.png'),
    iso ? loadImage(`https://flagcdn.com/w160/${iso}.png`, true) : null,
  ])

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  /* Background */
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, C.navy800)
  bg.addColorStop(0.55, C.navy900)
  bg.addColorStop(1, C.navy950)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)

  const glow = ctx.createRadialGradient(W - 120, 120, 0, W - 120, 120, 520)
  glow.addColorStop(0, `${accent}55`)
  glow.addColorStop(1, `${accent}00`)
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  ctx.strokeStyle = 'rgba(255,255,255,0.045)'
  ctx.lineWidth = 1
  for (let x = W / 2; x < W; x += 40) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, 640)
    ctx.stroke()
  }

  /* Brand header */
  let y = 64
  ctx.fillStyle = C.white
  roundRect(ctx, PAD, y, 84, 84, 20)
  ctx.fill()
  if (logo) ctx.drawImage(logo, PAD + 5, y + 5, 74, 74)

  ctx.textBaseline = 'alphabetic'
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
  if (flag || iso === 'eu') {
    ctx.save()
    roundRect(ctx, x, y, 72, 48, 8)
    ctx.clip()
    if (flag) ctx.drawImage(flag, x, y, 72, 48)
    else drawEuFlag(ctx, x, y, 72, 48)
    ctx.restore()
    x += 92
  } else if (!iso && item.flag) {
    // 🌍 / 🌐 for multi-country listings
    ctx.font = `44px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`
    ctx.textBaseline = 'middle'
    ctx.fillText(item.flag, x, y + 26)
    ctx.textBaseline = 'alphabetic'
    x += 66
  }
  ctx.font = `600 30px ${SANS}`
  ctx.fillStyle = C.white
  ctx.textBaseline = 'middle'
  const country = wrap(ctx, item.country, W - PAD * 2 - (x - PAD) - 300, 1)[0] ?? ''
  ctx.fillText(country, x, y + 25)
  ctx.textBaseline = 'alphabetic'
  if (item.funding) {
    ctx.font = `800 20px ${SANS}`
    pill(ctx, W - PAD, y + 4, item.funding.toUpperCase(), { bg: 'rgba(255,255,255,0.1)', fg: C.gold200, align: 'right' })
  }

  /* Title + organisation */
  y = 268
  const title = fit(ctx, item.name, W - PAD * 2, 3, [72, 64, 56, 50, 46], (s) => `700 ${s}px ${DISPLAY}`)
  ctx.fillStyle = C.white
  const lh = Math.round(title.size * 1.12)
  title.lines.forEach((line, i) => ctx.fillText(line, PAD, y + title.size + i * lh))
  y += title.size + (title.lines.length - 1) * lh + 50

  if (item.org) {
    ctx.font = `600 26px ${SANS}`
    ctx.fillStyle = C.gold300
    ctx.fillText(wrap(ctx, item.org, W - PAD * 2, 1)[0] ?? '', PAD, y)
    y += 26
  } else {
    y -= 30
  }

  /* Summary */
  ctx.font = `400 26px ${SANS}`
  ctx.fillStyle = C.muted
  for (const line of wrap(ctx, item.summary, W - PAD * 2, 2)) {
    y += 36
    ctx.fillText(line, PAD, y)
  }
  y += 34

  /* Fact boxes */
  const box = (bx, by, bw, bh, heading, value, lines = 2) => {
    ctx.fillStyle = 'rgba(255,255,255,0.06)'
    roundRect(ctx, bx, by, bw, bh, 18)
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.12)'
    ctx.stroke()
    ctx.font = `800 17px ${SANS}`
    ctx.letterSpacing = '2px'
    ctx.fillStyle = accent
    ctx.fillText(heading, bx + 22, by + 38)
    ctx.letterSpacing = '0px'
    ctx.font = `600 24px ${SANS}`
    ctx.fillStyle = C.white
    wrap(ctx, value || '—', bw - 44, lines).forEach((l, i) => ctx.fillText(l, bx + 22, by + 76 + i * 32))
  }

  const gap = 16
  const colW = (W - PAD * 2 - gap * 2) / 3
  const facts = [
    ['VALUE', item.amount],
    ['DEADLINE', item.deadline ? formatDate(item.deadline) : 'Rolling'],
    ['LEVEL', item.level],
  ]
  facts.forEach(([h, v], i) => box(PAD + i * (colW + gap), y, colW, 128, h, v, 2))
  y += 128 + gap
  box(PAD, y, W - PAD * 2, 100, 'WHO CAN APPLY', item.nationalities || item.level, 1)
  y += 100 + gap

  /* What you get — as many benefits as fit above the apply panel */
  const panelTop = H - 64 - 46 - 250
  const room = panelTop - 28 - y
  const benefits = item.benefits ?? []
  if (benefits.length && room >= 120) {
    ctx.font = `500 23px ${SANS}`
    const lineH = 33
    const maxLines = Math.floor((room - 64) / lineH)
    const rows = []
    for (const b of benefits) {
      const lines = wrap(ctx, b, W - PAD * 2 - 78, 2)
      if (rows.length + lines.length > maxLines) break
      rows.push(...lines.map((l, i) => ({ l, first: i === 0 })))
    }
    if (rows.length) {
      const bh = 64 + rows.length * lineH
      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      roundRect(ctx, PAD, y, W - PAD * 2, bh, 18)
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.12)'
      ctx.stroke()
      ctx.font = `800 17px ${SANS}`
      ctx.letterSpacing = '2px'
      ctx.fillStyle = accent
      ctx.fillText('WHAT YOU GET', PAD + 22, y + 38)
      ctx.letterSpacing = '0px'
      ctx.font = `500 23px ${SANS}`
      rows.forEach(({ l, first }, i) => {
        const ly = y + 76 + i * lineH
        if (first) {
          ctx.fillStyle = accent
          ctx.beginPath()
          ctx.arc(PAD + 30, ly - 8, 4.5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.fillStyle = C.white
        ctx.fillText(l, PAD + 50, ly)
      })
    }
  }

  /* Apply panel (anchored to the bottom) */
  const panelH = 250
  const panelY = H - 64 - 46 - panelH
  ctx.fillStyle = C.white
  roundRect(ctx, PAD, panelY, W - PAD * 2, panelH, 26)
  ctx.fill()

  const qrSize = 202
  if (item.officialUrl) {
    const qr = document.createElement('canvas')
    await QRCode.toCanvas(qr, item.officialUrl, {
      width: qrSize,
      margin: 0,
      errorCorrectionLevel: 'M',
      color: { dark: C.navy950, light: '#ffffff' },
    })
    ctx.drawImage(qr, PAD + 24, panelY + 24, qrSize, qrSize)
  }

  const tx = PAD + 24 + qrSize + 32
  const tw = W - PAD - 28 - tx
  ctx.font = `800 20px ${SANS}`
  ctx.letterSpacing = '3px'
  ctx.fillStyle = C.gold700
  ctx.fillText(item.officialSearch ? 'FIND THE OFFICIAL CALL' : 'APPLY HERE', tx, panelY + 62)
  ctx.letterSpacing = '0px'
  ctx.font = `700 28px ${SANS}`
  ctx.fillStyle = C.navy950
  const urlText = item.officialSearch ? `Search online for “${item.name}”` : displayUrl(item.officialUrl).replace(/\//g, '/ ')
  const urlLines = wrap(ctx, urlText, tw, 3).map((l) => l.replace(/\/ /g, '/'))
  urlLines.forEach((l, i) => ctx.fillText(l, tx, panelY + 106 + i * 36))
  ctx.font = `400 21px ${SANS}`
  ctx.fillStyle = C.navy600
  ctx.fillText(item.officialSearch ? 'Scan the code to search for the official page.' : 'Scan the code or open the link to apply.', tx, panelY + panelH - 32)

  /* Footer */
  ctx.font = `600 22px ${SANS}`
  ctx.fillStyle = C.muted
  ctx.textAlign = 'center'
  ctx.fillText(
    `Need help applying? WhatsApp ${company.whatsappDisplay}  ·  ${company.domain}`,
    W / 2,
    H - 56
  )
  ctx.textAlign = 'left'

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
