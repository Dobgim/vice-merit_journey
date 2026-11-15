import Seo from '../components/layout/Seo'
import { staticSeo } from '../lib/seo'
import PageHeader from '../components/layout/PageHeader'
import FAQ from '../components/sections/FAQ'

export default function FAQPage() {
  return (
    <>
      <Seo {...staticSeo.faq} />

      <PageHeader
        crumb="FAQ"
        eyebrow="Before you ask"
        title="The questions students ask us"
        accent="most."
        lede="Straight answers on fees, timelines, eligibility and where our involvement stops. If yours is not here, ask an advisor directly — we answer within one working day."
      />

      <FAQ />
    </>
  )
}
