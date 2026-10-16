/**
 * Sends website form submissions to the advisors' inbox through FormSubmit
 * (formsubmit.co), so bookings and sign-ups arrive as emails without a
 * server. The first submission triggers a one-time "Activate form" email to
 * the inbox; after that every submission is delivered.
 */
import { company } from '../data/site'

/**
 * Email one submission. `fields` are shown as a table in the email; `replyTo`
 * lets the advisor answer the visitor directly. Resolves to true when sent.
 */
export async function sendEmail(subject, fields, replyTo) {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${company.formEmail}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
        ...(replyTo ? { _replyto: replyTo } : {}),
        ...fields,
        Page: window.location.href,
      }),
    })
    const data = await res.json().catch(() => ({}))
    return res.ok && String(data.success) === 'true'
  } catch {
    return false
  }
}
