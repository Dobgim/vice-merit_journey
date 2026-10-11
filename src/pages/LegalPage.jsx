import { Link } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import { Section } from '../components/ui/Primitives'
import { company } from '../data/site'
import { legal } from '../data/legal'

/** Privacy policy and terms of service, rendered from src/data/legal.js. */
export default function LegalPage({ doc }) {
  const page = legal[doc]

  return (
    <>
      <Seo title={page.title} description={page.description} />
      <PageHeader crumb={page.title} eyebrow="Legal" title={page.title} lede={page.lede} />

      <Section tone="light" className="!pt-12 sm:!pt-16">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <nav aria-label="Sections" className="hidden lg:block">
            <ul className="sticky top-28 space-y-1 text-[0.85rem]">
              {page.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#s${i + 1}`} className="block rounded-lg px-3 py-1.5 text-navy-600 hover:bg-white hover:text-navy-950">
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <article className="min-w-0 rounded-2xl border border-navy-900/[0.07] bg-white p-6 shadow-soft sm:p-10">
            <p className="text-[0.85rem] text-navy-500">Last updated: {page.updated}</p>
            {page.sections.map((s, i) => (
              <section key={s.title} id={`s${i + 1}`} className="scroll-mt-28 border-b border-navy-900/[0.06] py-7 last:border-0 last:pb-0">
                <h2 className="font-display text-[1.35rem] font-semibold text-navy-950">
                  {i + 1}. {s.title}
                </h2>
                {s.body.map((para) =>
                  Array.isArray(para) ? (
                    <ul key={para[0]} className="mt-3 list-disc space-y-1.5 pl-5 text-[0.95rem] leading-[1.7] text-navy-800 marker:text-gold-500">
                      {para.map((li) => (
                        <li key={li}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={para.slice(0, 40)} className="mt-3 text-[0.95rem] leading-[1.75] text-navy-800">
                      {para}
                    </p>
                  )
                )}
              </section>
            ))}

            <div className="mt-8 rounded-xl bg-mist p-5 text-[0.92rem] text-navy-800">
              Questions about this page? Email{' '}
              <a href={`mailto:${company.email}`} className="font-semibold text-navy-950 underline underline-offset-2">
                {company.email}
              </a>{' '}
              or{' '}
              <Link to="/book-consultation" className="font-semibold text-navy-950 underline underline-offset-2">
                contact us
              </Link>
              .
            </div>
          </article>
        </div>
      </Section>
    </>
  )
}
