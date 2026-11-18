/**
 * Giveaway results flyer (1080×1350 JPEG, the size Facebook, LinkedIn,
 * Instagram and WhatsApp show without cropping): brand header, headline, the
 * winners' names in alphabetical order (sized to fit, so 5 or 80 names both
 * work), the "we never ask for money" line and Merit Leaders' contacts. Same
 * colours and fonts as the listing flyers (src/lib/flyerImage.js).
 */
import { company } from '../data/site'

const W = 1080
const H = 1350
const PAD = 72

const C = {
  navy950: '#070f26',
  navy900: '#0f1b3d',
  navy800: '#1a2850',
  gold200: '#ead9a8',
  gold300: '#dcbf72',
  white: '#ffffff',
  muted: 'rgba(227,233,246,0.78)',
  faint: 'rgba(227,233,246,0.5)',
}
const DISPLAY = '"Source Serif 4", Georgia, serif'
const SANS = '"Source Sans 3", system-ui, sans-serif'

const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()

/** "faith NKEM okafor" → "Faith O." (or "Faith Nkem Okafor" with `full`). */
export function flyerName(name = '', full = false) {
  const parts = name.trim().split(/\s+/).filter(Boolean).map((w) => w.split('-').map(cap).join('-'))
  if (full || parts.length < 2) return parts.join(' ')
  return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`
}

const browserEnv = {
  createCanvas: (width, height) => Object.assign(document.createElement('canvas'), { width, height }),
  loadImage: (src) =>
    new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => resolve(null)
      img.src = src
    }),
}

async function ensureFonts() {
  if (typeof document === 'undefined' || !document.fonts?.load) return
  const loads = [`700 80px ${DISPLAY}`, `600 40px ${DISPLAY}`, `400 24px ${SANS}`, `600 24px ${SANS}`, `800 20px ${SANS}`]
  await Promise.race([Promise.all(loads.map((f) => document.fonts.load(f).catch(() => null))), new Promise((r) => setTimeout(r, 4000))])
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function wrap(ctx, text, maxWidth) {
  const lines = []
  let line = ''
  for (const word of String(text).split(/\s+/).filter(Boolean)) {
    const test = line ? `${line} ${word}` : word
    if (ctx.measureText(test).width <= maxWidth || !line) line = test
    else lines.push(line), (line = word)
  }
  if (line) lines.push(line)
  return lines
}

/** Largest name size and fewest columns at which every name fits the box. */
function layoutNames(ctx, names, box) {
  for (const size of [46, 42, 38, 34, 30, 27, 24, 22, 20, 18]) {
    ctx.font = `600 ${size}px ${SANS}`
    const widest = Math.max(...names.map((n) => ctx.measureText(n).width))
    const rowH = Math.round(size * 1.75)
    for (const cols of [1, 2, 3, 4]) {
      const colW = box.w / cols
      if (widest + size + 24 > colW) continue
      if (Math.ceil(names.length / cols) * rowH <= box.h) return { size, cols, rowH, colW, shown: names, more: 0 }
    }
  }
  // Very long lists: as many as fit at the smallest size, then "and N more".
  const size = 18
  const rowH = Math.round(size * 1.75)
  const cols = 4
  const fit = Math.floor(box.h / rowH) * cols - 1
  return { size, cols, rowH, colW: box.w / cols, shown: names.slice(0, fit), more: names.length - fit }
}

/** The results flyer as a canvas. `names` are full names; `full` keeps them whole. */
export async function drawResultsFlyer(names, { full = false, env = browserEnv } = {}) {
  await ensureFonts()
  // Repeated entries are merged before this (see Giveaway.jsx), so two equal
  // short names are two different people and both are listed.
  const list = names.map((n) => flyerName(n, full)).filter(Boolean).sort((a, b) => a.localeCompare(b))
  const canvas = env.createCanvas(W, H)
  const ctx = canvas.getContext('2d')

  /* Background: the listing flyers' navy with a gold glow */
  const bg = ctx.createLinearGradient(0, 0, W, H)
  bg.addColorStop(0, C.navy800)
  bg.addColorStop(0.55, C.navy900)
  bg.addColorStop(1, C.navy950)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, W, H)
  const glow = ctx.createRadialGradient(W - 120, 140, 0, W - 120, 140, 560)
  glow.addColorStop(0, `${C.gold300}55`)
  glow.addColorStop(1, `${C.gold300}00`)
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, W, H)

  /* Brand header */
  let y = 64
  const logo = await env.loadImage('/logo-mark.png')
  ctx.fillStyle = C.white
  roundRect(ctx, PAD, y, 84, 84, 20)
  ctx.fill()
  if (logo) ctx.drawImage(logo, PAD + 5, y + 5, 74, 74)
  ctx.font = `600 40px ${DISPLAY}`
  ctx.fillStyle = C.white
  ctx.fillText('Merit ', PAD + 104, y + 44)
  ctx.fillStyle = C.gold300
  ctx.fillText(company.name.replace(/^Merit\s*/, ''), PAD + 104 + ctx.measureText('Merit ').width, y + 44)
  ctx.font = `600 17px ${SANS}`
  ctx.letterSpacing = '3px'
  ctx.fillStyle = C.faint
  ctx.fillText(company.tagline.toUpperCase(), PAD + 104, y + 74)

  /* Pill */
  y = 200
  ctx.font = `800 20px ${SANS}`
  const pill = 'FREE APPLICATION SUPPORT · RESULTS'
  const pw = ctx.measureText(pill).width + 40
  ctx.fillStyle = C.gold300
  roundRect(ctx, PAD, y, pw, 42, 21)
  ctx.fill()
  ctx.fillStyle = C.navy950
  ctx.textBaseline = 'middle'
  ctx.fillText(pill, PAD + 20, y + 22)
  ctx.textBaseline = 'alphabetic'
  ctx.letterSpacing = '0px'

  /* Headline and intro */
  y += 42 + 92
  ctx.font = `700 84px ${DISPLAY}`
  ctx.fillStyle = C.white
  ctx.fillText('Congratulations!', PAD, y)
  y += 52
  ctx.font = `400 29px ${SANS}`
  ctx.fillStyle = C.muted
  const intro = `These ${list.length} students have been selected for free, step-by-step guidance with their scholarship applications.`
  for (const line of wrap(ctx, intro, W - PAD * 2)) {
    ctx.fillText(line, PAD, y)
    y += 40
  }
  y += 18

  /* Names */
  const footerTop = H - 36 - 92 - 18 - 64
  const panel = { x: PAD, y, w: W - PAD * 2, h: footerTop - 22 - y }
  ctx.fillStyle = 'rgba(255,255,255,0.06)'
  roundRect(ctx, panel.x, panel.y, panel.w, panel.h, 24)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.12)'
  roundRect(ctx, panel.x, panel.y, panel.w, panel.h, 24)
  ctx.stroke()
  const box = { x: panel.x + 36, y: panel.y + 30, w: panel.w - 72, h: panel.h - 60 }
  const L = layoutNames(ctx, list, box)
  const rows = Math.ceil((L.shown.length + (L.more ? 1 : 0)) / L.cols)
  const top = box.y + Math.max(0, (box.h - rows * L.rowH) / 2)
  ctx.font = `600 ${L.size}px ${SANS}`
  const entries = L.more ? [...L.shown, `and ${L.more} more`] : L.shown
  entries.forEach((name, i) => {
    // Column by column, so the alphabetical order reads top to bottom.
    const col = Math.floor(i / rows)
    const row = i % rows
    const x = box.x + col * L.colW
    const cy = top + row * L.rowH + L.rowH / 2
    const extra = L.more && i === entries.length - 1
    if (!extra) {
      ctx.fillStyle = C.gold300
      ctx.beginPath()
      ctx.arc(x + L.size * 0.3, cy, L.size * 0.17, 0, Math.PI * 2)
      ctx.fill()
    }
    ctx.fillStyle = extra ? C.gold200 : C.white
    ctx.textBaseline = 'middle'
    ctx.fillText(name, x + L.size * 0.3 + 22, cy + 1)
    ctx.textBaseline = 'alphabetic'
  })

  /* Next step and the no-fee promise */
  ctx.textAlign = 'center'
  ctx.font = `600 25px ${SANS}`
  ctx.fillStyle = C.gold200
  ctx.fillText('We will contact each of you on WhatsApp. This support is free.', W / 2, footerTop + 26)
  ctx.font = `400 21px ${SANS}`
  ctx.fillStyle = C.muted
  ctx.fillText('Merit Leaders never asks for money for this offer. Report anyone who does.', W / 2, footerTop + 58)

  /* Contacts, as on the listing flyers */
  const cy0 = H - 36 - 92
  ctx.fillStyle = 'rgba(255,255,255,0.07)'
  roundRect(ctx, PAD, cy0, W - PAD * 2, 92, 18)
  ctx.fill()
  const contacts = [
    ['WhatsApp', company.whatsappDisplay],
    ['Email', company.email],
    ['Web', company.domain],
  ]
  const cw = (W - PAD * 2) / contacts.length
  contacts.forEach(([k, v], i) => {
    const cx = PAD + cw * i + cw / 2
    ctx.font = `800 15px ${SANS}`
    ctx.letterSpacing = '2px'
    ctx.fillStyle = C.gold200
    ctx.fillText(k.toUpperCase(), cx, cy0 + 36)
    ctx.letterSpacing = '0px'
    ctx.font = `700 22px ${SANS}`
    ctx.fillStyle = C.white
    ctx.fillText(v ?? '', cx, cy0 + 66)
  })
  ctx.textAlign = 'left'
  return canvas
}

export async function downloadResultsFlyer(names, opts) {
  const canvas = await drawResultsFlyer(names, opts)
  const blob = await new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not create the image.'))), 'image/jpeg', 0.92)
  )
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'giveaway-results-merit-leaders.jpg'
  a.click()
  setTimeout(() => URL.revokeObjectURL(a.href), 2000)
}
