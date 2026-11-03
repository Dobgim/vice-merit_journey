import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RootLayout from './components/layout/RootLayout'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

/**
 * Pages other than the home page are separate downloads, so a visitor landing
 * on one page does not wait for the code of every other page. main.jsx loads
 * the current page's code before the first render, and preloadPages() fetches
 * the rest in the background once the page is up, so moving between pages
 * stays instant.
 */
const pages = {
  about: () => import('./pages/About'),
  services: () => import('./pages/ServicesPage'),
  packages: () => import('./pages/PackagesPage'),
  scholarships: () => import('./pages/ScholarshipsPage'),
  detail: () => import('./pages/ScholarshipDetail'),
  grants: () => import('./pages/GrantsPage'),
  internships: () => import('./pages/InternshipsPage'),
  opportunity: () => import('./pages/OpportunityPage'),
  courses: () => import('./pages/CoursesPage'),
  countries: () => import('./pages/CountriesPage'),
  faq: () => import('./pages/FAQPage'),
  blog: () => import('./pages/BlogPage'),
  post: () => import('./pages/BlogPostPage'),
  landing: () => import('./pages/LandingPage'),
  explore: () => import('./pages/ExplorePage'),
  eligibility: () => import('./pages/EligibilityPage'),
  book: () => import('./pages/BookConsultationPage'),
  legal: () => import('./pages/LegalPage'),
}

const About = lazy(pages.about)
const ServicesPage = lazy(pages.services)
const PackagesPage = lazy(pages.packages)
const ScholarshipsPage = lazy(pages.scholarships)
const ScholarshipDetail = lazy(pages.detail)
const GrantsPage = lazy(pages.grants)
const InternshipsPage = lazy(pages.internships)
const OpportunityPage = lazy(pages.opportunity)
const CoursesPage = lazy(pages.courses)
const CountriesPage = lazy(pages.countries)
const FAQPage = lazy(pages.faq)
const BlogPage = lazy(pages.blog)
const BlogPostPage = lazy(pages.post)
const LandingPage = lazy(pages.landing)
const ExplorePage = lazy(pages.explore)
const EligibilityPage = lazy(pages.eligibility)
const BookConsultationPage = lazy(pages.book)
const LegalPage = lazy(pages.legal)

// The dashboard is a separate download, so visitors never load it.
const AdminApp = lazy(() => import('./admin/AdminApp'))

const routePages = [
  [/^\/(scholarships|grants|internships|fellowships|competitions)\/[^/]+/, pages.detail],
  [/^\/scholarships\/?$/, pages.scholarships],
  [/^\/grants\/?$/, pages.grants],
  [/^\/internships\/?$/, pages.internships],
  [/^\/(fellowships|competitions)\/?$/, pages.opportunity],
  [/^\/blog\/[^/]+/, pages.post],
  [/^\/blog\/?$/, pages.blog],
  [/^\/(for|study-in|level)\/[^/]+/, pages.landing],
  [/^\/(privacy|terms)\/?$/, pages.legal],
  [/^\/about\/?$/, pages.about],
  [/^\/services\/?$/, pages.services],
  [/^\/packages\/?$/, pages.packages],
  [/^\/courses\/?$/, pages.courses],
  [/^\/countries\/?$/, pages.countries],
  [/^\/faq\/?$/, pages.faq],
  [/^\/explore\/?$/, pages.explore],
  [/^\/eligibility\/?$/, pages.eligibility],
  [/^\/book-consultation\/?$/, pages.book],
]

/** Loads the code for the page at `pathname`, so the first render does not wait for it. */
export function preloadPage(pathname) {
  const load = routePages.find(([re]) => re.test(pathname))?.[1]
  return load ? load().catch(() => {}) : Promise.resolve()
}

/** Fetches every page's code in the background, one after another. */
export function preloadPages() {
  const queue = Object.values(pages)
  const next = () => queue.length && queue.shift()().catch(() => {}).then(next)
  if ('requestIdleCallback' in window) window.requestIdleCallback(next, { timeout: 4000 })
  else setTimeout(next, 2000)
}

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
        <Route path="courses" element={<CoursesPage />} />
        <Route path="countries" element={<CountriesPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<BlogPostPage />} />
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
