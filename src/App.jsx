import { Suspense, lazy } from 'react'
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
import OpportunityPage from './pages/OpportunityPage'
import CountriesPage from './pages/CountriesPage'
import FAQPage from './pages/FAQPage'
import BlogPage from './pages/BlogPage'
import LandingPage from './pages/LandingPage'
import ExplorePage from './pages/ExplorePage'
import EligibilityPage from './pages/EligibilityPage'
import BookConsultationPage from './pages/BookConsultationPage'
import NotFound from './pages/NotFound'
import LegalPage from './pages/LegalPage'

// The dashboard is a separate download, so visitors never load it.
const AdminApp = lazy(() => import('./admin/AdminApp'))

/**
 * Every page is imported eagerly on purpose. The whole site is ~120 kB gzipped,
 * so bundling it once buys instant route changes — no chunk request, no
 * loading spinner, no layout shift between pages.
 */
export default function App() {
  return (
    <Routes>
      <Route
        path="admin/*"
        element={
          <Suspense fallback={<div className="min-h-screen bg-navy-950" />}>
            <AdminApp />
          </Suspense>
        }
      />
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
        <Route path="fellowships" element={<OpportunityPage key="fellowships" kind="fellowships" />} />
        <Route path="fellowships/:slug" element={<ScholarshipDetail key="fellowships" kind="fellowships" />} />
        <Route path="competitions" element={<OpportunityPage key="competitions" kind="competitions" />} />
        <Route path="competitions/:slug" element={<ScholarshipDetail key="competitions" kind="competitions" />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="eligibility" element={<EligibilityPage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="for/:slug" element={<LandingPage key="for" type="for" />} />
        <Route path="study-in/:slug" element={<LandingPage key="study-in" type="study-in" />} />
        <Route path="level/:slug" element={<LandingPage key="level" type="level" />} />
        <Route path="book-consultation" element={<BookConsultationPage />} />
        <Route path="privacy" element={<LegalPage key="privacy" doc="privacy" />} />
        <Route path="terms" element={<LegalPage key="terms" doc="terms" />} />
        {/* Old links and bookmarks */}
        <Route path="contact" element={<Navigate to="/book-consultation" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
