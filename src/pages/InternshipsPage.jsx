import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import OpportunityCount from '../components/ui/OpportunityCount'
import Scholarships from '../components/sections/Scholarships'
import Newsletter from '../components/sections/Newsletter'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import Button from '../components/ui/Button'
import { kinds } from '../data/opportunities'
import { useOpportunities } from '../hooks/useScholarships'
import { kindTitle, kindDescription } from '../lib/seo'

export default function InternshipsPage() {
  const open = useOpportunities('internships').length
  return (
    <>
      <Seo
        title={kindTitle(kinds.internships, open)}
        description={kindDescription(kinds.internships)}
      />

      <PageHeader
        crumb="Internships"
        eyebrow="Internships"
        title="Internships that launch an"
        accent="international career."
        lede="Paid and stipend-supported internships at international organisations and global institutions. We can prepare your CV, cover letter and interview so you stand out."
      >
        <OpportunityCount kind="internships" />
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/book-consultation?package=Internship%20application" variant="gold" size="lg" icon="arrowRight">
            Get help with my application
          </Button>
          <Button to="/eligibility" variant="ghostLight" size="lg" icon="checkCircle" iconRight={false}>
            Am I eligible?
          </Button>
        </div>
      </PageHeader>

      <Scholarships kind="internships" />
      <div id="alerts" className="scroll-mt-24">
        <WhatsAppGroup />
        <Newsletter />
      </div>
    </>
  )
}
