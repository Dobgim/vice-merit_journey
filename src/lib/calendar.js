/**
 * "Add to calendar": downloads an .ics file with the deadline as an all-day
 * event and reminders a week and a day before. Works with Google Calendar,
 * Outlook and Apple Calendar.
 */
const ics = (text = '') => String(text).replace(/\/g, '\\').replace(/[,;]/g, (c) => `\${c}`).replace(/\r?\n/g, '\n')
const day = (iso) => iso.slice(0, 10).replace(/-/g, '')

function nextDay(iso) {
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number)
  const next = new Date(Date.UTC(y, m - 1, d + 1))
  return next.toISOString().slice(0, 10)
}

export function downloadDeadline(item, pageUrl) {
  if (!item.deadline) return
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '')
  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Merit Leaders//Deadlines//EN',
    'BEGIN:VEVENT',
    `UID:${item.slug}-deadline@meritleaders.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;VALUE=DATE:${day(item.deadline)}`,
    `DTEND;VALUE=DATE:${day(nextDay(item.deadline))}`,
    `SUMMARY:${ics(`Deadline: ${item.name}`)}`,
    `DESCRIPTION:${ics(`Apply: ${item.officialUrl && !item.officialSearch ? item.officialUrl : pageUrl}\nDetails: ${pageUrl}`)}`,
    `URL:${pageUrl}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${ics(`${item.name} closes in 7 days`)}`, 'TRIGGER:-P7D', 'END:VALARM',
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${ics(`${item.name} closes tomorrow`)}`, 'TRIGGER:-P1D', 'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  const url = URL.createObjectURL(new Blob([body], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${item.slug}-deadline.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
