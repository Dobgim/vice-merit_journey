import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

/** Mid-page conversion band, sitting between the process and the awards list. */
export default function CTABand() {
  return (
    <section className="relative bg-mist py-12 sm:py-16">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 px-7 py-10 sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-20 h-64 w-64 rounded-full bg-gold-400/20 blur-[80px] animate-drift"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_right,black,transparent)]"
            />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow rounded-full bg-white/[0.07] px-3 py-1.5 text-gold-200 ring-1 ring-white/15">
                  <Icon name="clock" className="h-3.5 w-3.5" />
                  2027 cycle now open
                </span>
                <h2 className="mt-5 font-display text-[1.85rem] font-semibold leading-[1.15] text-white balance sm:text-[2.4rem]">
                  The best awards close eleven months before term starts.
                </h2>
                <p className="mt-4 text-[1rem] leading-[1.7] text-navy-100/70">
                  If you are targeting September 2027, this is the term to start. Book a free call
                  and leave with a written shortlist and a deadline calendar.
                </p>
              </div>

              <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row lg:flex-col">
                <Button to="/contact" variant="gold" size="lg" icon="arrowRight">
                  Book free consultation
                </Button>
                <Button to="/scholarships" variant="ghostLight" size="lg" icon="search" iconRight={false}>
                  See open awards
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
