import { Link } from 'react-router-dom'
import Seo from '../components/layout/Seo'
import Icon from '../components/ui/Icon'
import PageHeader from '../components/layout/PageHeader'
import OpportunityCount from '../components/ui/OpportunityCount'
import Scholarships from '../components/sections/Scholarships'
import Newsletter from '../components/sections/Newsletter'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import Categories from '../components/sections/Categories'
import Button from '../components/ui/Button'
import { kinds } from '../data/opportunities'
import { useOpportunities } from '../hooks/useScholarships'
import { kindTitle, kindDescription } from '../lib/seo'
import { CHINA_PATH, isChinaGov } from '../lib/chinaGov'

/** Entry to the Chinese Government Scholarship section. */
function ChinaBanner({ count }) {
  if (!count) return null
  return (
    <div className="container pt-10">
      <Link
        to={CHINA_PATH}
        className="group flex flex-col gap-4 rounded-2xl bg-navy-950 p-6 text-white shadow-soft ring-1 ring-gold-300/30 transition-colors hover:ring-gold-300/70 sm:flex-row sm:items-center sm:justify-between sm:p-8"
      >
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-300">Study in China</p>
          <h2 className="mt-2 font-display text-2xl font-semibold">Chinese Government Scholarships (CSC)</h2>
          <p className="mt-2 text-base leading-relaxed text-navy-100/80">
            {count} fully funded calls open now: Type B university programmes, the Type A embassy route and CAS-ANSO.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-300 px-5 py-3 text-sm font-semibold text-navy-950">
          See all CSC scholarships
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </div>
  )
}

export default function ScholarshipsPage() {
  const scholarships = useOpportunities('scholarships')
  const open = scholarships.length
  const china = scholarships.filter(isChinaGov).length
  return (
    <>
      <Seo
        title={kindTitle(kinds.scholarships, open)}
        description={kindDescription(kinds.scholarships)}
      />

      <PageHeader
        crumb="Scholarships"
        eyebrow="Open opportunities"
        title="Awards our students are applying to"
        accent="right now."
        lede="Search the funding we track by level, country and funding type. Every listing has a full breakdown — eligibility, benefits, documents and a step-by-step guide — verified against the awarding body."
      >
        <OpportunityCount kind="scholarships" />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/eligibility" variant="gold" size="lg" icon="arrowRight">
            Check my eligibility
          </Button>
          <Button href="#alerts" variant="ghostLight" size="lg" icon="bell" iconRight={false}>
            Get deadline alerts
          </Button>
        </div>
      </PageHeader>

      <ChinaBanner count={china} />
      <Scholarships kind="scholarships" />
      <div id="alerts" className="scroll-mt-24">
        <WhatsAppGroup />
        <Newsletter />
      </div>
      <Categories />
    </>
  )
}
