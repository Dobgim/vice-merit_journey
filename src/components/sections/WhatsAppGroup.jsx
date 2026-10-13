import { company } from '../../data/site'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

/**
 * "Join our WhatsApp group" band: a join button for phones and the group's
 * QR code for people browsing on a computer.
 */
export default function WhatsAppGroup() {
  return (
    <section className="relative bg-mist pt-12 sm:pt-16">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-navy-950 px-7 py-10 text-white shadow-lift sm:px-12 sm:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#1FA855]/25 blur-[90px]"
            />

            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <span className="eyebrow rounded-full bg-white/[0.06] px-3 py-1.5 text-[#5BE38F] ring-1 ring-white/10">
                  <Icon name="whatsapp" className="h-3.5 w-3.5" />
                  WhatsApp group
                </span>
                <h2 className="mt-5 font-display text-2xl font-semibold leading-tight balance sm:text-3xl">
                  Join {company.whatsappGroupName}
                </h2>
                <p className="mt-3 max-w-xl text-base leading-[1.7] text-navy-100/75">
                  New scholarships, grants and internships shared as soon as they open, deadline
                  reminders and application tips — free, straight to your phone.
                </p>
                <Button
                  href={company.whatsappGroup}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  icon="arrowRight"
                  className="mt-7 w-full sm:w-auto"
                >
                  Join the WhatsApp group
                </Button>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 md:flex-col md:gap-3 md:p-5">
                <img
                  src="/whatsapp-group-qr.svg"
                  alt={`QR code to join the ${company.whatsappGroupName} WhatsApp group`}
                  width="160"
                  height="160"
                  className="h-28 w-28 shrink-0 rounded-xl bg-white p-1.5 md:h-40 md:w-40"
                />
                <p className="text-sm leading-snug text-navy-100/70 md:max-w-[10rem] md:text-center">
                  On a computer? Scan with your phone’s camera to join.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
