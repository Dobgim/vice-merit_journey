import { useState } from 'react'
import { motion } from 'framer-motion'
import Seo from '../components/layout/Seo'
import PageHeader from '../components/layout/PageHeader'
import CTABand from '../components/sections/CTABand'
import { Badge, Card, IconTile, Section } from '../components/ui/Primitives'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal, { Stagger, StaggerItem } from '../components/ui/Reveal'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { company, currencies, packageAddons, packageFaqs, packageSteps, packages } from '../data/site'

const whatsappFor = (text) => `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`

function CurrencyToggle({ value, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-navy-900/10 bg-white p-1 shadow-soft" role="group" aria-label="Currency">
      {Object.entries(currencies).map(([code, c]) => {
        const active = value === code
        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            aria-pressed={active}
            className={`relative isolate rounded-full px-5 py-2 text-[0.85rem] font-semibold transition-colors ${
              active ? 'text-white' : 'text-navy-700 hover:text-navy-950'
            }`}
          >
            {active && (
              <motion.span
                layoutId="currency-pill"
                className="absolute inset-0 -z-10 rounded-full bg-navy-900"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {c.label}
          </button>
        )
      })}
    </div>
  )
}

function PackageCard({ pkg, currency }) {
  const price = currencies[currency].format(pkg.price[currency])
  const featured = pkg.popular

  return (
    <Card
      hover={!featured}
      className={`flex h-full flex-col p-7 sm:p-8 ${
        featured ? 'border-navy-900 bg-gradient-to-b from-navy-900 to-navy-950 text-white shadow-lift lg:-my-4 lg:py-12' : ''
      }`}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-gold-400/25 blur-[70px]"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <IconTile name={pkg.icon} tone={featured ? 'gold' : 'navy'} />
        {featured && (
          <Badge variant="gold" icon="star">
            Most popular
          </Badge>
        )}
      </div>

      <h3 className={`relative mt-6 font-display text-[1.45rem] font-semibold ${featured ? 'text-white' : 'text-navy-950'}`}>
        {pkg.name}
      </h3>
      <p className={`relative mt-2 text-[0.92rem] leading-[1.6] ${featured ? 'text-navy-100/75' : 'text-navy-700/80'}`}>
        {pkg.tagline}
      </p>

      <div className="relative mt-6 flex flex-wrap items-end gap-x-2 gap-y-1">
        <span className={`font-display text-[2.4rem] font-semibold leading-none ${featured ? 'text-gold-200' : 'text-navy-950'}`}>
          {price}
        </span>
        <span className={`pb-1 text-[0.85rem] ${featured ? 'text-navy-100/60' : 'text-navy-500'}`}>{pkg.unit}</span>
      </div>
      <p className={`relative mt-2 inline-flex items-center gap-1.5 text-[0.8rem] ${featured ? 'text-navy-100/60' : 'text-navy-500'}`}>
        <Icon name="clock" className="h-3.5 w-3.5" />
        Delivery: {pkg.delivery}
      </p>

      <ul className={`relative mt-6 flex-1 space-y-3 border-t pt-6 ${featured ? 'border-white/10' : 'border-navy-900/[0.07]'}`}>
        {pkg.features.map((f) => (
          <li key={f} className={`flex gap-3 text-[0.92rem] leading-[1.55] ${featured ? 'text-navy-50' : 'text-navy-800'}`}>
            <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-gold-300' : 'text-emerald-600'}`} />
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-8 grid gap-2.5">
        <Button
          href={whatsappFor(`Hi ${company.name} — I would like the ${pkg.name} package (${price}). Can we get started?`)}
          target="_blank"
          rel="noopener noreferrer"
          variant={featured ? 'gold' : 'primary'}
          size="md"
          icon="whatsapp"
          iconRight={false}
          className="w-full"
        >
          Order on WhatsApp
        </Button>
        <Button
          to={`/contact?package=${encodeURIComponent(pkg.name)}`}
          variant={featured ? 'ghostLight' : 'outline'}
          size="md"
          className="w-full"
        >
          Ask a question first
        </Button>
      </div>
    </Card>
  )
}

export default function PackagesPage() {
  const [currency, setCurrency] = useState('USD')

  return (
    <>
      <Seo
        title="Packages & Pricing"
        description="Let us write your full scholarship application. Essay, complete application and premium multi-application packages with clear prices in USD and FCFA."
      />

      <PageHeader
        eyebrow="Packages & pricing"
        title="Let us write your scholarship application"
        accent="for you."
        lede="From a single personal statement to your complete application — essays, CV, forms and documents — written from your real story by advisors who know what committees look for. Clear prices, no hidden fees."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="#pricing" variant="gold" size="lg" icon="arrowRight">
            See prices
          </Button>
          <Button
            href={whatsappFor(`Hi ${company.name} — I would like to know more about your application writing packages.`)}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghostLight"
            size="lg"
            icon="whatsapp"
            iconRight={false}
          >
            Chat on WhatsApp
          </Button>
        </div>
      </PageHeader>

      {/* Pricing */}
      <Section id="pricing" tone="light">
        <div className="container">
          <SectionHeading
            eyebrow="Choose your package"
            title="One clear price,"
            accent="everything written."
            lede="Every package is written from an interview with you and reviewed by you before anything is submitted."
          />

          <Reveal delay={0.1} className="mt-10 flex justify-center">
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </Reveal>

          <Stagger className="mt-12 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.id} className="h-full">
                <PackageCard pkg={pkg} currency={currency} />
              </StaggerItem>
            ))}
          </Stagger>

          <p className="mt-10 text-center text-[0.85rem] text-navy-500">
            50% deposit to start · balance before final delivery · Mobile Money, Orange Money, bank transfer or card
          </p>
        </div>
      </Section>

      {/* Add-ons */}
      <Section tone="white" className="!py-16 sm:!py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow text-navy-500">Add-ons</p>
            <h2 className="mt-3 font-display text-[2rem] font-semibold leading-tight text-navy-950">
              Need just one piece?
            </h2>
            <p className="mt-3 max-w-md text-[0.97rem] leading-[1.7] text-navy-700/80">
              Add any of these to a package, or order them on their own.
            </p>
          </div>

          <Card hover={false} className="divide-y divide-navy-900/[0.07]">
            {packageAddons.map((a) => (
              <div key={a.name} className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="text-[0.95rem] font-medium text-navy-900">{a.name}</span>
                <span className="shrink-0 font-semibold text-navy-950">
                  {a.price ? currencies[currency].format(a.price[currency]) : a.note}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </Section>

      {/* Process */}
      <Section tone="light">
        <div className="container">
          <SectionHeading eyebrow="How it works" title="From first message to" accent="final file" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {packageSteps.map((step, i) => (
              <StaggerItem key={step.title}>
                <Card className="h-full p-6">
                  <span className="font-display text-[2.2rem] font-semibold leading-none text-gold-500">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy-950">{step.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-[1.65] text-navy-700/80">{step.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="white">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Before you" accent="order" />
          <div className="mt-12 grid gap-3">
            {packageFaqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-navy-900/[0.08] bg-mist/60 p-5 open:bg-white open:shadow-soft">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Icon name="plus" className="mt-0.5 h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 text-[0.94rem] leading-[1.7] text-navy-700">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      <CTABand />
    </>
  )
}
