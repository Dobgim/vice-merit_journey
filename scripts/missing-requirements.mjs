/**
 * Open listings that still have no list of required documents, nearest
 * deadline first, as tab-separated lines: kind, slug, deadline, name, official link.
 *
 *   node scripts/missing-requirements.mjs [limit]
 *
 * Add an entry for each one to src/data/requirements-auto.js (written from the
 * official call); the last line prints how many are left.
 */
import { createServer } from 'vite'

const limit = Number(process.argv[2]) || Infinity
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' })
try {
  const { kinds } = await server.ssrLoadModule('/src/data/opportunities.js')
  const { requirements } = await server.ssrLoadModule('/src/data/requirements.js')
  const { hasFixedDeadline, isOpenYet } = await server.ssrLoadModule('/src/lib/deadline.js')
  const { retiredSlugs } = await server.ssrLoadModule('/src/data/fixes-oct21-2026.js')
  const today = new Date().toISOString().slice(0, 10)

  const missing = Object.entries(kinds)
    .flatMap(([kind, c]) => c.items.map((item) => ({ kind, item })))
    .filter(({ item }) => !retiredSlugs.has(item.slug) && hasFixedDeadline(item) && isOpenYet(item) && item.deadline >= today)
    .filter(({ item }) => !(item.documents?.length || requirements[item.slug]?.documents?.length))
    .sort((a, b) => a.item.deadline.localeCompare(b.item.deadline))

  for (const { kind, item } of missing.slice(0, limit))
    console.log([kind, item.slug, item.deadline, item.name, item.officialUrl].join('\t'))
  console.log(`# ${missing.length} open listings without a documents list`)
} finally {
  await server.close()
}
