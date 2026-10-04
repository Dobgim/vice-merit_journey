import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Scholarships from '../components/sections/Scholarships'
import Newsletter from '../components/sections/Newsletter'
import Button from '../components/ui/Button'

export default function GrantsPage() {
  return (
    <>
      <Seo
        title="Grants"
        description="Grants for entrepreneurs, researchers, innovators and community leaders — seed capital, research funding and prizes, with eligibility, benefits and how to apply."
      />

      <PageHeader
        crumb="Grants"
        eyebrow="Grants & funding"
        title="Funding for your idea, research or"
        accent="business."
        lede="Non-repayable grants, seed capital and innovation prizes, each with a full breakdown of who can apply, what you get and how to apply. Need help with the proposal? We write and review grant applications too."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/book-consultation?package=Grant%20application" variant="gold" size="lg" icon="arrowRight">
            Get help with a grant proposal
          </Button>
          <Button href="#alerts" variant="ghostLight" size="lg" icon="bell" iconRight={false}>
            Get grant alerts
          </Button>
        </div>
      </PageHeader>

      <Scholarships kind="grants" />
      <div id="alerts" className="scroll-mt-24">
        <Newsletter />
      </div>
    </>
  )
}
