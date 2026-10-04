import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faqs } from '../../data/site'
import { Section } from '../ui/Primitives'
import SectionHeading from '../ui/SectionHeading'
import Reveal, { EASE } from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

function AccordionItem({ item, index, isOpen, onToggle }) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-colors duration-500 ${
        isOpen
          ? 'border-gold-300/60 bg-white shadow-soft'
          : 'border-navy-900/[0.07] bg-white/60 hover:border-navy-900/[0.14] hover:bg-white'
      }`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
        >
          <span
            className={`font-display text-[1.05rem] font-semibold leading-snug transition-colors duration-300 sm:text-[1.13rem] ${
              isOpen ? 'text-navy-950' : 'text-navy-800'
            }`}
          >
            {item.q}
          </span>

          <motion.span
            animate={{ rotate: isOpen ? 135 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
              isOpen ? 'bg-navy-900 text-gold-200' : 'bg-navy-900/[0.05] text-navy-700'
            }`}
          >
            <Icon name="plus" className="h-4 w-4" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <p className="px-6 pb-6 text-[0.95rem] leading-[1.8] text-navy-700/85 sm:pr-16">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <Section id="faq" tone="light">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow="Questions"
              title="Straight answers,"
              accent="before you commit"
              lede="If your question is not here, ask it on the discovery call — it is free, and we answer honestly."
            />

            <Reveal delay={0.25} className="mt-9">
              <div className="rounded-2xl bg-navy-950 p-6 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
                    <Icon name="mic" className="h-5 w-5 text-gold-300" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">Still deciding?</h3>
                </div>
                <p className="mt-3.5 text-[0.92rem] leading-[1.7] text-navy-100/70">
                  Bring your transcript and a rough goal. In twenty minutes you will know whether a
                  funded place is realistic this cycle.
                </p>
                <Button to="/book-consultation" variant="gold" size="sm" icon="arrowRight" className="mt-5">
                  Book the call
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={0.05 * i} blur={false}>
                <AccordionItem
                  item={item}
                  index={i}
                  isOpen={open === i}
                  onToggle={() => setOpen(open === i ? -1 : i)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
