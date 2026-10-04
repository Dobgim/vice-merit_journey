import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Contact from '../components/sections/Contact'

export default function BookConsultationPage() {
  return (
    <>
      <Seo
        title="Book a Consultation"
        description="Book a free 20-minute discovery call with a Merit Leaders advisor, or reach us on WhatsApp and email. No upfront fee, no obligation."
      />

      <PageHeader
        eyebrow="Book a consultation"
        title="Start with a free"
        accent="discovery call."
        lede="Twenty minutes, no obligation, no upfront fee. Tell us your level, your target countries and your timeline — you will leave the call knowing exactly which awards are realistic for you."
      />

      <Contact />
    </>
  )
}
