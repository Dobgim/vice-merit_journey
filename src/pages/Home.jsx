import Seo from '../components/layout/Seo'
import { staticSeo } from '../lib/seo'
import Hero from '../components/sections/Hero'
import EligibilityTeaser from '../components/sections/EligibilityTeaser'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import Services from '../components/sections/Services'
import Categories from '../components/sections/Categories'
import HowItWorks from '../components/sections/HowItWorks'
import Newsletter from '../components/sections/Newsletter'
import WhatsAppGroup from '../components/sections/WhatsAppGroup'
import LatestArticles from '../components/sections/LatestArticles'

export default function Home() {
  return (
    <>
      <Seo {...staticSeo.home} />
      <Hero />
      <EligibilityTeaser />
      <WhyChooseUs />
      <Services />
      <Categories />
      <HowItWorks />
      <LatestArticles />
      <WhatsAppGroup />
      <Newsletter />
    </>
  )
}
