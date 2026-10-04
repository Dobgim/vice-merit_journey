import Seo from '../components/layout/Seo'
import Hero from '../components/sections/Hero'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import Services from '../components/sections/Services'
import Categories from '../components/sections/Categories'
import HowItWorks from '../components/sections/HowItWorks'
import Testimonials from '../components/sections/Testimonials'
import Newsletter from '../components/sections/Newsletter'

export default function Home() {
  return (
    <>
      <Seo
        title="Win the Scholarship You Deserve"
        description="Merit Leaders matches undergraduate, graduate, postgraduate and international students with scholarships they are genuinely competitive for — then supports every step of the application."
      />
      <Hero />
      <WhyChooseUs />
      <Services />
      <Categories />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </>
  )
}
