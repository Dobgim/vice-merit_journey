// Counts the listings added today (UTC) in src/data/listings-auto.js, so the routines
// can keep to the daily mix: by type, scholarships by study level, and by country.
// Usage: node scripts/today-counts.mjs [YYYY-MM-DD]
import fs from 'fs'

const day = process.argv[2] ?? new Date().toISOString().slice(0, 10)
const text = fs.readFileSync(new URL('../src/data/listings-auto.js', import.meta.url), 'utf8')

const field = (line, name) => (line.match(new RegExp(`${name}: (['"])(.*?)\\1`)) ?? [])[2] ?? ''
const levelOf = (level) => {
  const l = level.toLowerCase()
  const ug = /undergrad|bachelor/.test(l)
  const ms = /master|graduate|postgrad|mba|llm/.test(l.replace(/undergrad\w*/g, ''))
  const phd = /phd|doctor/.test(l)
  if (phd && !ug && !ms) return 'PhD only'
  return [ug && 'Bachelor', ms && 'Master', phd && 'PhD'].filter(Boolean).join(' + ') || `other (${level || 'no level'})`
}
const MULTI = /international|worldwide|online|europe\b|multiple|various|global|africa\b|asia\b/i
const countryOf = (c) => (/united kingdom|\buk\b|england|scotland|wales/i.test(c) ? 'United Kingdom' : /united states|\busa\b/i.test(c) ? 'United States' : c.split(/[(,]/)[0].trim())

let type = '?'
const types = {}
const levels = {}
const countries = {}
for (const line of text.split('\n')) {
  const head = line.match(/^const (\w+)Rows = \[/)
  if (head) type = head[1]
  if (!line.includes(`added: '${day}`)) continue
  types[type] = (types[type] ?? 0) + 1
  if (type === 'scholarship') {
    const lv = levelOf(field(line, 'level'))
    levels[lv] = (levels[lv] ?? 0) + 1
  }
  const c = field(line, 'country')
  if (c && !MULTI.test(c)) countries[countryOf(c)] = (countries[countryOf(c)] ?? 0) + 1
}

const count = (o, k) => o[k] ?? 0
const sum = (pred) => Object.entries(levels).filter(([k]) => pred(k)).reduce((n, [, v]) => n + v, 0)
console.log(`Added on ${day} (UTC)`)
console.log('By type:', ['scholarship', 'fellowship', 'grant', 'internship', 'competition'].map((t) => `${t} ${count(types, t)}`).join(', '))
console.log('Scholarships by level:', JSON.stringify(levels))
console.log(`  master's: ${sum((k) => k.includes('Master'))} (need 8+), bachelor's: ${sum((k) => k.includes('Bachelor'))} (need 5+), PhD only: ${count(levels, 'PhD only')} (max 6)`)
const full = Object.entries(countries).filter(([c, n]) => n >= (c === 'United Kingdom' ? 4 : 5)).map(([c]) => c)
console.log('By country:', JSON.stringify(countries))
console.log('Countries already full for today (skip them):', full.length ? full.join(', ') : 'none')
