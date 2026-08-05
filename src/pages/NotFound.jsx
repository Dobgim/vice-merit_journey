import Seo from '../components/layout/Seo'
import { Aurora } from '../components/ui/Primitives'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="That page does not exist." />

      <section className="relative isolate flex min-h-[70vh] items-center overflow-hidden bg-navy-950 px-6 py-32 text-center text-white">
        <Aurora />
        <div className="container relative">
          <p className="eyebrow text-gold-200">Error 404</p>
          <h1 className="mt-5 font-display text-[3rem] font-semibold leading-none tracking-tight sm:text-[4.5rem]">
            This page has no <span className="text-gradient italic">funding.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-[1.02rem] leading-[1.75] text-navy-100/70">
            The page you were looking for has moved or never existed. The scholarships, however,
            are very much still open.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/" variant="gold" size="lg" icon="arrowRight">
              Back to home
            </Button>
            <Button to="/scholarships" variant="ghostLight" size="lg" icon="search" iconRight={false}>
              Browse scholarships
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
