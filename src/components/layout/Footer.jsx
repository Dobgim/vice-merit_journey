import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { company, navLinks, services } from '../../data/site'
import Reveal from '../ui/Reveal'
import Icon from '../ui/Icon'
import Logo from '../ui/Logo'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-navy-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-navy-600/20 blur-[130px]"
      />

      <div className="container relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <Reveal>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[0.93rem] leading-[1.75] text-navy-100/60">
              An independent scholarship consultancy helping students at every level find funding
              they are genuinely competitive for — and win it.
            </p>

            <div className="mt-7 flex gap-2.5">
              {company.socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-navy-100/70 transition-colors duration-300 hover:border-gold-300/35 hover:text-gold-200"
                >
                  <Icon name={s.icon} className="h-[1.05rem] w-[1.05rem]" />
                </motion.a>
              ))}
            </div>
          </Reveal>

          {/* Navigate */}
          <Reveal delay={0.08}>
            <h3 className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-gold-200/80">
              Navigate
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1.5 text-[0.92rem] text-navy-100/65 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-gold-300 transition-all duration-300 group-hover:w-3" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Services */}
          <Reveal delay={0.14}>
            <h3 className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-gold-200/80">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <Link
                    to="/services"
                    className="group inline-flex items-center gap-1.5 text-[0.92rem] text-navy-100/65 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-gold-300 transition-all duration-300 group-hover:w-3" />
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Contact */}
          <Reveal delay={0.2}>
            <h3 className="font-display text-[0.95rem] font-semibold uppercase tracking-[0.14em] text-gold-200/80">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-4 text-[0.92rem]">
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-3 text-navy-100/65 transition-colors hover:text-white"
                >
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  {company.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
                  className="flex items-start gap-3 text-navy-100/65 transition-colors hover:text-white"
                >
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${company.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-navy-100/65 transition-colors hover:text-white"
                >
                  <Icon name="whatsapp" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  WhatsApp: {company.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3 text-navy-100/65">
                <Icon name="mapPin" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                {company.address}
              </li>
              <li className="flex items-start gap-3 text-navy-100/65">
                <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                {company.hours}
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-5 border-t border-white/[0.08] pt-8 sm:flex-row sm:justify-between">
          <p className="text-center text-[0.82rem] text-navy-100/45 sm:text-left">
            © {year} {company.name}. All rights reserved. Merit Ledger is an independent
            consultancy and is not affiliated with any government or awarding body.
          </p>

          <div className="flex items-center gap-6 text-[0.82rem] text-navy-100/45">
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              Back to top
              <Icon
                name="arrowUpRight"
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
