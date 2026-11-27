/**
 * The embeddable "upcoming fully funded deadlines" widget. build-seo.js writes
 * it as one small static page (dist/widget/deadlines.html) that other sites
 * show in an iframe; /deadline-widget (src/pages/WidgetPage.jsx) gives site
 * owners the embed code. The code also carries a plain text link to the site,
 * since links inside an iframe do not count for the page that embeds it.
 */
import { LEVELS, matchesLevel } from './eligibility.js'

export const WIDGET_PATH = '/widget/deadlines'
export const WIDGET_PAGE_PATH = '/deadline-widget'

export const widgetSeo = {
  title: 'Free Scholarship Deadlines Widget for Your Website',
  description:
    'Add a free, auto-updating box of upcoming fully funded scholarship deadlines to your school, blog or student group website. Copy one line of code.',
}

export const WIDGET_LEVELS = [{ slug: 'all', label: 'All levels' }, ...LEVELS.filter((l) => ['undergraduate', 'masters', 'phd'].includes(l.slug)).map((l) => ({ slug: l.slug, label: l.short }))]

const clampCount = (n) => Math.min(15, Math.max(3, Number(n) || 6))

/** Suggested iframe height for a number of rows. */
export const widgetHeight = (count) => 112 + clampCount(count) * 64

/** The code a site owner pastes: the iframe plus a real text link back to the site. */
export function embedCode(siteUrl, { count = 6, level = 'all', theme = 'light' } = {}) {
  const n = clampCount(count)
  const src = `${siteUrl}${WIDGET_PATH}?count=${n}&level=${encodeURIComponent(level)}&theme=${theme}`
  return [
    `<iframe src="${src}" title="Upcoming fully funded scholarship deadlines" width="100%" height="${widgetHeight(n)}" style="border:0;max-width:440px" loading="lazy"></iframe>`,
    `<p style="font:13px/1.4 sans-serif;margin:4px 0 0">Scholarship deadlines by <a href="${siteUrl}/fully-funded-scholarships-2027">Merit Leaders</a></p>`,
  ].join('\n')
}

/**
 * The widget page. `entries` are open fully funded scholarships as
 * { item, path }. Rows are filtered and counted in the browser (?count, ?level,
 * ?theme), and calls whose deadline has passed since the build are dropped.
 */
export function widgetHtml(entries, siteUrl) {
  const rows = entries
    .filter((e) => e.item.deadline)
    .sort((a, b) => a.item.deadline.localeCompare(b.item.deadline))
    .slice(0, 120)
    .map(({ item, path }) => ({
      n: item.name,
      u: siteUrl + path,
      c: [item.flag, item.country].filter(Boolean).join(' '),
      l: item.level ?? '',
      d: item.deadline.slice(0, 10),
      v: LEVELS.filter((l) => matchesLevel(item, l)).map((l) => l.slug),
    }))
  const data = JSON.stringify(rows).replace(/</g, '\\u003c')
  const calendar = `${siteUrl}/fully-funded-scholarships-2027`
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, follow" />
<title>Upcoming fully funded scholarship deadlines — Merit Leaders</title>
<style>
:root{--bg:#ffffff;--fg:#0f1b3d;--muted:#4a5a85;--line:#e3e9f6;--chip:#070f26;--chipfg:#ffffff;--gold:#a3712a;--soon:#b4232f}
.dark{--bg:#0b1220;--fg:#f2f5fb;--muted:#a9b6d6;--line:#22304f;--chip:#dcbf72;--chipfg:#070f26;--gold:#dcbf72;--soon:#ff8a95}
*{box-sizing:border-box}html,body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.4 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif}
.w{border:1px solid var(--line);border-radius:14px;padding:14px 14px 10px;background:var(--bg)}
h1{font-size:15px;margin:0 0 10px;font-weight:700}h1 span{color:var(--gold)}
ol{list-style:none;margin:0;padding:0}li{display:flex;gap:10px;align-items:center;padding:8px 0;border-top:1px solid var(--line)}
li:first-child{border-top:0}.d{flex:none;width:44px;text-align:center;border-radius:8px;background:var(--chip);color:var(--chipfg);padding:4px 0;line-height:1.1}
.d b{display:block;font-size:17px}.d small{font-size:10px;text-transform:uppercase;letter-spacing:.05em}
.t{min-width:0}.t a{color:var(--fg);font-weight:600;text-decoration:none;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.t a:hover{text-decoration:underline}.m{color:var(--muted);font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.s{color:var(--soon);font-weight:600}
.f{display:flex;justify-content:space-between;gap:8px;margin-top:8px;font-size:12px}.f a{color:var(--gold);font-weight:600;text-decoration:none}.f a:hover{text-decoration:underline}
</style>
</head>
<body>
<div class="w">
<h1>Fully funded scholarships <span>closing soon</span></h1>
<ol id="list"></ol>
<div class="f"><a href="${calendar}" target="_blank" rel="noopener">See all deadlines →</a><a href="${siteUrl}/" target="_blank" rel="noopener">Merit Leaders</a></div>
</div>
<noscript><p><a href="${calendar}">See upcoming fully funded scholarship deadlines on Merit Leaders</a></p></noscript>
<script>
(function(){
var rows=${data};
var q=new URLSearchParams(location.search);
var n=Math.min(15,Math.max(3,parseInt(q.get('count'),10)||6));
var level=q.get('level')||'all';
if(q.get('theme')==='dark')document.documentElement.className='dark';
var now=new Date();var today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
var M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
var out=rows.filter(function(r){var p=r.d.split('-');var d=new Date(+p[0],p[1]-1,+p[2]);r.left=Math.round((d-today)/864e5);return r.left>=0&&(level==='all'||r.v.indexOf(level)>-1)}).slice(0,n);
document.getElementById('list').innerHTML=out.length?out.map(function(r){var p=r.d.split('-');var left=r.left===0?'Closes today':r.left+(r.left===1?' day left':' days left');
return '<li><div class="d"><small>'+M[p[1]-1]+'</small><b>'+(+p[2])+'</b></div><div class="t"><a href="'+esc(r.u)+'" target="_blank" rel="noopener">'+esc(r.n)+'</a><div class="m">'+esc(r.c)+(r.l?' · '+esc(r.l):'')+' · <span'+(r.left<=14?' class="s"':'')+'>'+left+'</span></div></div></li>'}).join(''):'<li>New deadlines are added every day.</li>';
})();
</script>
</body>
</html>
`
}
