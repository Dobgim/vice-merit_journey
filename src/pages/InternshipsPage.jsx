import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Scholarships from '../components/sections/Scholarships'
import Newsletter from '../components/sections/Newsletter'
import Button from '../components/ui/Button'

export default function InternshipsPage() {
  return (
    <>
      <Seo
        title="Internships"
        description="Paid and stipend-supported internships at the UN, IMF, World Bank, European Commission and more — requirements, pay, deadlines and how to apply."
      />

      <PageHeader
        crumb="Internships"
        eyebrow="Internships"
        title="Internships that launch an"
        accent="international career."
        lede="Paid and stipend-supported internships at international organisations and global institutions. We can prepare your CV, cover letter and interview so you stand out."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/book-consultation?package=Internship%20application" variant="gold" size="lg" icon="arrowRight">
            Get help with my application
          </Button>
          <Button href="#alerts" variant="ghostLight" size="lg" icon="bell" iconRight={false}>
            Get internship alerts
          </Button>
        </div>
      </PageHeader>

      <Scholarships kind="internships" />
      <div id="alerts" className="scroll-mt-24">
        <Newsletter />
      </div>
    </>
  )
}
