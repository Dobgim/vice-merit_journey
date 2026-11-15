import Seo from '../components/layout/Seo'
import { staticSeo } from '../lib/seo'
import PageHeader from '../components/layout/PageHeader'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import HowItWorks from '../components/sections/HowItWorks'
import Button from '../components/ui/Button'

export default function About() {
  return (
    <>
      <Seo {...staticSeo.about} />

      <PageHeader
        crumb="About"
        eyebrow="Who we are"
        title="An independent consultancy built around one"
        accent="outcome."
        lede="We are former admissions readers, scholarship panellists and academic writers who got tired of watching strong students lose funding to weak applications. Merit Leaders exists to close that gap — ethically, and in the open."
      >
        <Button to="/book-consultation" variant="gold" size="lg" icon="arrowRight">
          Talk to an advisor
        </Button>
      </PageHeader>

      <WhyChooseUs />
      <HowItWorks />
    </>
  )
}
