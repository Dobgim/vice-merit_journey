import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Scholarships from '../components/sections/Scholarships'
import Categories from '../components/sections/Categories'
import CTABand from '../components/sections/CTABand'
import Button from '../components/ui/Button'

export default function ScholarshipsPage() {
  return (
    <>
      <Seo
        title="Scholarships"
        description="Browse fully funded and partially funded scholarships for undergraduate, graduate, postgraduate and international students, with deadlines and eligibility at a glance."
      />

      <PageHeader
        eyebrow="Open opportunities"
        title="Awards our students are applying to"
        accent="right now."
        lede="A live sample of the funding we track — filtered by level, country and funding type. Every listing is verified against the awarding body before it reaches this page."
      >
        <Button to="/contact" variant="gold" size="lg" icon="arrowRight">
          Check my eligibility
        </Button>
      </PageHeader>

      <Scholarships />
      <Categories />
      <CTABand />
    </>
  )
}
