import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Countries from '../components/sections/Countries'
import CTABand from '../components/sections/CTABand'
import Button from '../components/ui/Button'

export default function CountriesPage() {
  return (
    <>
      <Seo
        title="Study Destinations"
        description="Scholarship and admission guidance for the UK, USA, Canada, Germany, Australia, the Netherlands and more — funding landscape, visa routes and intake timelines."
      />

      <PageHeader
        eyebrow="Where you could study"
        title="Destinations we know"
        accent="inside out."
        lede="Each country has its own funding culture, visa route and intake rhythm. These are the systems our advisors work in daily — so your timeline is built on how they actually behave, not on guesswork."
      >
        <Button to="/contact" variant="gold" size="lg" icon="arrowRight">
          Discuss my destination
        </Button>
      </PageHeader>

      <Countries />
      <CTABand />
    </>
  )
}
