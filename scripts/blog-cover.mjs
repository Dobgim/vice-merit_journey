/**
 * Keep a blog article's cover photo on this site.
 *
 *   node scripts/blog-cover.mjs content/blog/2026-11-19-my-article.md [more files…]
 *
 * For each article whose `Cover:` line is a web address (e.g. a Wikimedia
 * Commons 1280px thumbnail), downloads the photo, crops it to 1200×630 (the
 * size cards and social previews use), saves it as
 * public/blog-covers/<slug>.jpg and points `Cover:` at that file. Articles
 * whose cover is already local are left alone. Exits with code 1 if a
 * download fails, leaving that article's `Cover:` unchanged.
 */
import fs from 'fs'
import path from 'path'
import { createCanvas, loadImage } from '@napi-rs/canvas'

const W = 1200
const H = 630
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function download(url) {
  for (let i = 0; i < 4; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'MeritLeadersSite/1.0 (blog cover)' }, signal: AbortSignal.timeout(20000) })
      if (res.ok && /^image\//.test(res.headers.get('content-type') ?? '')) return Buffer.from(await res.arrayBuffer())
    } catch {
      // retried below
    }
    await sleep(3000)
  }
  return null
}

let failed = false
for (const file of process.argv.slice(2)) {
  let text = fs.readFileSync(file, 'utf8')
  const line = text.match(/^Cover:[ \t]*(https?:\/\/\S+)/m)
  if (!line) {
    console.log(`${file}: no web address in Cover:, nothing to do`)
    continue
  }
  const slug = path.basename(file, '.md').replace(/^\d{4}-\d{2}-\d{2}-/, '')
  const buf = await download(line[1])
  if (!buf) {
    console.error(`${file}: could not download ${line[1]}`)
    failed = true
    continue
  }
  const img = await loadImage(buf)
  const scale = Math.max(W / img.width, H / img.height)
  const sw = W / scale
  const sh = H / scale
  const canvas = createCanvas(W, H)
  canvas.getContext('2d').drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, 0, 0, W, H)
  fs.mkdirSync('public/blog-covers', { recursive: true })
  fs.writeFileSync(`public/blog-covers/${slug}.jpg`, await canvas.encode('jpeg', 82))
  text = text.replace(line[0], `Cover: /blog-covers/${slug}.jpg`)
  fs.writeFileSync(file, text)
  console.log(`${file}: saved public/blog-covers/${slug}.jpg (from ${img.width}x${img.height})`)
}
process.exit(failed ? 1 : 0)
