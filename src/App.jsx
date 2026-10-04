import { Navigate, Route, Routes } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'

import Home from './pages/Home'
import About from './pages/About'
import ServicesPage from './pages/ServicesPage'
import PackagesPage from './pages/PackagesPage'
import ScholarshipsPage from './pages/ScholarshipsPage'
import ScholarshipDetail from './pages/ScholarshipDetail'
import GrantsPage from './pages/GrantsPage'
import InternshipsPage from './pages/InternshipsPage'
import CountriesPage from './pages/CountriesPage'
import FAQPage from './pages/FAQPage'
import BookConsultationPage from './pages/BookConsultationPage'
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
        <Route path="packages" element={<PackagesPage />} />
        <Route path="scholarships" element={<ScholarshipsPage />} />
        <Route path="scholarships/:slug" element={<ScholarshipDetail key="scholarships" />} />
        <Route path="grants" element={<GrantsPage />} />
        <Route path="grants/:slug" element={<ScholarshipDetail key="grants" kind="grants" />} />
        <Route path="internships" element={<InternshipsPage />} />
        <Route path="internships/:slug" element={<ScholarshipDetail key="internships" kind="internships" />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="book-consultation" element={<BookConsultationPage />} />
        {/* Old links and bookmarks */}
        <Route path="contact" element={<Navigate to="/book-consultation" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
