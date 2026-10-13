import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import Scholarships from '../components/sections/Scholarships'
import Newsletter from '../components/sections/Newsletter'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import Button from '../components/ui/Button'
import { kinds } from '../data/opportunities'

const copy = {
  fellowships: {
    title: 'Fellowships that open',
    accent: 'doors.',
    lede: 'Leadership, research, journalism and creative fellowships from around the world — many fully funded. We can help you write a standout application.',
    help: 'Fellowship application',
  },
  competitions: {
    title: 'Competitions and awards',
    accent: 'worth entering.',
    lede: 'Essay, writing, photography, science and business competitions with prizes and recognition. Need a winning essay? We can help.',
    help: 'Competition entry',
  },
}

/** Listing page for the opportunity types that share one simple layout. */
export default function OpportunityPage({ kind }) {
  const config = kinds[kind]
  const c = copy[kind]

  return (
    <>
      <Seo title={config.title} description={config.lede} />
      <PageHeader crumb={config.title} eyebrow={config.eyebrow} title={c.title} accent={c.accent} lede={c.lede}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to={`/book-consultation?package=${encodeURIComponent(c.help)}`} variant="gold" size="lg" icon="arrowRight">
            Get help with my application
          </Button>
          <Button href="#alerts" variant="ghostLight" size="lg" icon="bell" iconRight={false}>
            Get alerts
          </Button>
        </div>
      </PageHeader>

      <Scholarships kind={kind} />
      <div id="alerts" className="scroll-mt-24">
        <WhatsAppGroup />
        <Newsletter />
      </div>
    </>
  )
}
