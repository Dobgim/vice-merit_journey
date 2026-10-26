/** ISO country code ("de") from a flag emoji ("🇩🇪"); null for anything else (🌍, 🇪🇺 gives "eu"). */
export function isoFromEmoji(emoji = '') {
  const points = [...emoji].map((c) => c.codePointAt(0))
  if (points.length !== 2 || points.some((p) => p < 0x1f1e6 || p > 0x1f1ff)) return null
  return points.map((p) => String.fromCharCode(p - 0x1f1e6 + 97)).join('')
}
