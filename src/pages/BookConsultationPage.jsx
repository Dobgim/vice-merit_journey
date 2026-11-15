import Seo from '../components/layout/Seo'
import { staticSeo } from '../lib/seo'
import PageHeader from '../components/layout/PageHeader'
import Contact from '../components/sections/Contact'

export default function BookConsultationPage() {
  return (
    <>
      <Seo {...staticSeo.bookConsultation} />

      <PageHeader
        crumb="Book a consultation"
        eyebrow="Book a consultation"
        title="Start with a free"
        accent="discovery call."
        lede="Twenty minutes, no obligation, no upfront fee. Tell us your level, your target countries and your timeline — you will leave the call knowing exactly which awards are realistic for you."
      />

      <Contact />
    </>
  )
}
