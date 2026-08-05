import { Route, Routes } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'

import Home from './pages/Home'
import About from './pages/About'
import ServicesPage from './pages/ServicesPage'
import ScholarshipsPage from './pages/ScholarshipsPage'
import CountriesPage from './pages/CountriesPage'
import FAQPage from './pages/FAQPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

/**
 * Every page is imported eagerly on purpose. The whole site is ~120 kB gzipped,
 * so bundling it once buys instant route changes — no chunk request, no
 * loading spinner, no layout shift between pages.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="scholarships" element={<ScholarshipsPage />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
