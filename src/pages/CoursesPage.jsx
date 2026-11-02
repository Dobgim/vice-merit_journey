import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Newsletter from '../components/sections/Newsletter'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { Section } from '../components/ui/Primitives'
import { COURSES_CHECKED, courseFields, courseLevels, courses } from '../data/courses'
import { SITE_URL } from '../data/site'
import { formatDate } from '../lib/deadline'

const LEDE =
  'Courses where the learning, the assessment and the proof of completion are all free, from technology and health to law, farming and languages. No free trials and no card needed.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  url: `${SITE_URL}/courses`,
  itemListElement: courses.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Course',
      name: c.name,
      description: c.summary,
      url: c.url,
      provider: { '@type': 'Organization', name: c.provider },
    },
  })),
}

function CourseCard({ course }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-navy-900/10 bg-white p-6 shadow-soft">
      <p className="text-sm font-semibold text-navy-600">{course.provider}</p>
      <h2 className="mt-1 font-display text-xl font-semibold leading-snug text-navy-950">{course.name}</h2>
      <p className="mt-3 text-base leading-relaxed text-navy-700/90">{course.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2 text-sm text-navy-700">
        <li className="rounded-full bg-navy-900/[0.05] px-3 py-1">{course.level}</li>
        <li className="inline-flex items-center gap-1.5 rounded-full bg-navy-900/[0.05] px-3 py-1">
          <Icon name="clock" className="h-3.5 w-3.5" />
          {course.time}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-full bg-gold-300/30 px-3 py-1 font-medium text-navy-900">
          <Icon name="award" className="h-3.5 w-3.5" />
          Free {course.certificate.toLowerCase()}
        </li>
      </ul>
      <p className="mt-4 mb-5 text-sm leading-relaxed text-navy-600">
        <span className="font-semibold text-navy-800">To earn it: </span>
        {course.earn}
      </p>
      <Button href={course.url} target="_blank" rel="noopener noreferrer" variant="primary" size="sm" icon="external" className="mt-auto self-start">
        Go to course
      </Button>
    </article>
  )
}

function Pills({ label, options, value, counts, onChange }) {
  return (
    <div className="mt-5">
      <p className="mb-2 text-center text-sm font-medium text-navy-600">{label}</p>
      <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-2">
        {options.map((option) => {
          const active = value === option
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              aria-pressed={active}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active ? 'bg-navy-900 text-white shadow-soft' : 'border border-navy-900/10 bg-white text-navy-700 hover:text-navy-950'
              }`}
            >
              {option} <span className={active ? 'text-white/70' : 'text-navy-400'}>{counts[option] ?? 0}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const countBy = (list, key) => {
  const counts = { All: list.length }
  for (const c of list) counts[c[key]] = (counts[c[key]] ?? 0) + 1
  return counts
}

/** Free courses by field. Filters are mirrored in the URL so a view can be shared. */
export default function CoursesPage() {
  const [params, setParams] = useSearchParams()
  const field = courseFields.includes(params.get('field')) ? params.get('field') : 'All'
  const level = courseLevels.includes(params.get('level')) ? params.get('level') : 'All'
  const query = params.get('q') ?? ''

  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'All') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const searched = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return courses
    return courses.filter((c) => [c.name, c.provider, c.field, c.summary].join(' ').toLowerCase().includes(q))
  }, [query])

  const inLevel = level === 'All' ? searched : searched.filter((c) => c.level === level)
  const inField = field === 'All' ? searched : searched.filter((c) => c.field === field)
  const list = field === 'All' ? inLevel : inLevel.filter((c) => c.field === field)

  return (
    <>
      <Seo title="Free Courses with Free Certificates" description={LEDE} jsonLd={jsonLd} />
      <PageHeader crumb="Free Courses" eyebrow="Free courses & certificates" title="Learn for free, and" accent="keep the certificate." lede={LEDE}>
        <p className="mb-6 inline-flex items-baseline gap-2.5 rounded-2xl bg-white/10 px-5 py-3 ring-1 ring-white/20 backdrop-blur">
          <span className="font-display text-3xl font-semibold leading-none text-gold-300 tabular-nums">{courses.length}</span>
          <span className="text-base font-semibold text-white">courses across {courseFields.length} fields</span>
        </p>
      </PageHeader>

      <Section id="courses" tone="light">
        <div className="container">
          <label className="mx-auto block max-w-xl">
            <span className="sr-only">Search courses</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setParam('q', e.target.value)}
              placeholder="Search by subject or provider"
              className="h-12 w-full rounded-xl border border-navy-900/[0.12] bg-white px-4 text-base text-navy-950 transition-colors duration-300 hover:border-navy-900/25 focus:outline-none focus:ring-2 focus:ring-gold-400/60"
            />
          </label>

          <Pills label="Field" options={['All', ...courseFields]} value={field} counts={countBy(inLevel, 'field')} onChange={(v) => setParam('field', v)} />
          <Pills label="Level" options={['All', ...courseLevels]} value={level} counts={countBy(inField, 'level')} onChange={(v) => setParam('level', v)} />

          {list.length ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {list.map((course) => (
                <CourseCard key={course.url} course={course} />
              ))}
            </div>
          ) : (
            <p className="mx-auto mt-12 max-w-xl text-center text-lg leading-[1.75] text-navy-700/80">
              No courses match that search. Try another subject or clear the filters.
            </p>
          )}

          <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-navy-600">
            Last checked on {formatDate(COURSES_CHECKED)}. Most of these show that you finished a course; they are not degrees or formal
            qualifications. Providers can change their terms, so confirm the certificate is still free before you start.
          </p>
        </div>
      </Section>

      <Newsletter />
    </>
  )
}
