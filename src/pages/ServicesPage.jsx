import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Services from '../components/sections/Services'
import HowItWorks from '../components/sections/HowItWorks'
import Button from '../components/ui/Button'

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="Services"
        description="Scholarship search, application support, admission guidance, SOP and personal statement help, CV editing, visa guidance and interview preparation."
      />

      <PageHeader
        crumb="Services"
        eyebrow="What we do"
        title="Everything between a shortlist and an"
        accent="award letter."
        lede="Seven services that cover the full application arc. Take the whole programme or the single piece you are stuck on — advisors work to the same standard either way."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/book-consultation" variant="gold" size="lg" icon="arrowRight">
            Book a free consultation
          </Button>
          <Button to="/packages" variant="ghostLight" size="lg" icon="wallet" iconRight={false}>
            See packages & prices
          </Button>
        </div>
      </PageHeader>

      <Services />
      <HowItWorks />
    </>
  )
}
