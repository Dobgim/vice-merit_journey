/**
 * Renders a flag emoji as a real flag image. Windows has no flag emoji (it
 * shows letters like "US"), so country flags come from flagcdn.com; other
 * emoji such as 🌍 are drawn as-is.
 */
function isoFromEmoji(emoji = '') {
  const points = [...emoji].map((c) => c.codePointAt(0))
  if (points.length !== 2 || points.some((p) => p < 0x1f1e6 || p > 0x1f1ff)) return null
  return points.map((p) => String.fromCharCode(p - 0x1f1e6 + 97)).join('')
}

export default function Flag({ emoji, className = 'h-5 w-7', emojiClassName = '' }) {
  const iso = isoFromEmoji(emoji)
  if (!iso) {
    return (
      <span className={`leading-none ${emojiClassName}`} aria-hidden>
        {emoji}
      </span>
    )
  }
  return (
    <img
      src={`https://flagcdn.com/${iso}.svg`}
      alt=""
      aria-hidden
      loading="lazy"
      className={`inline-block shrink-0 rounded-[3px] object-cover shadow-sm ring-1 ring-black/10 ${className}`}
    />
  )
}
