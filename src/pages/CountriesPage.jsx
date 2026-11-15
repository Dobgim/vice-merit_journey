import Seo from '../components/layout/Seo'
import { staticSeo } from '../lib/seo'
import PageHeader from '../components/layout/PageHeader'
import Countries from '../components/sections/Countries'
import Button from '../components/ui/Button'

export default function CountriesPage() {
  return (
    <>
      <Seo {...staticSeo.countries} />

      <PageHeader
        crumb="Countries"
        eyebrow="Where you could study"
        title="Destinations we know"
        accent="inside out."
        lede="Each country has its own funding culture, visa route and intake rhythm. These are the systems our advisors work in daily — so your timeline is built on how they actually behave, not on guesswork."
      >
        <Button to="/book-consultation" variant="gold" size="lg" icon="arrowRight">
          Discuss my destination
        </Button>
      </PageHeader>

      <Countries />
    </>
  )
}
