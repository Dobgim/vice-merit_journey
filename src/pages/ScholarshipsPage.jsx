import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import OpportunityCount from '../components/ui/OpportunityCount'
import Scholarships from '../components/sections/Scholarships'
import Newsletter from '../components/sections/Newsletter'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import Categories from '../components/sections/Categories'
import Button from '../components/ui/Button'

export default function ScholarshipsPage() {
  return (
    <>
      <Seo
        title="Scholarships"
        description="Search fully funded and partially funded scholarships for undergraduate, graduate, PhD and postdoctoral applicants — with eligibility, benefits, required documents and live deadlines."
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

      <Scholarships kind="scholarships" />
      <div id="alerts" className="scroll-mt-24">
        <WhatsAppGroup />
        <Newsletter />
      </div>
      <Categories />
    </>
  )
}
