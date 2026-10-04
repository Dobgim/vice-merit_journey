import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { studyLevels } from '../../data/site'
import { subscribeToAlerts } from '../../lib/supabase'
import Reveal from '../ui/Reveal'
import Button from '../ui/Button'
import Icon from '../ui/Icon'

/** "Scholarship alerts" sign-up band: new awards and deadline reminders by email. */
export default function Newsletter() {
  const [done, setDone] = useState(false)
  const [serverError, setServerError] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', studyLevel: '' } })

  const onSubmit = async (values) => {
    setServerError(null)
    const result = await subscribeToAlerts(values)
    if (!result.ok) {
      setServerError('That did not go through. Please try again in a moment.')
      return
    }
    setDone(true)
  }

  return (
    <section className="relative bg-mist py-12 sm:py-16">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-navy-900/[0.07] bg-white px-7 py-10 shadow-soft sm:px-12 sm:py-12">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-gold-300/25 blur-[90px]"
            />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
              <div>
                <span className="eyebrow rounded-full bg-navy-900/[0.04] px-3 py-1.5 text-navy-600 ring-1 ring-navy-900/[0.07]">
                  <Icon name="bell" className="h-3.5 w-3.5" />
                  Scholarship alerts
                </span>
                <h2 className="mt-5 font-display text-[1.7rem] font-semibold leading-[1.15] text-navy-950 balance sm:text-[2.1rem]">
                  New awards and deadline reminders, <span className="italic text-gold-600">in your inbox.</span>
                </h2>
                <p className="mt-3 text-[0.97rem] leading-[1.7] text-navy-700/80">
                  One short email a fortnight: newly verified scholarships for your level and a heads-up
                  30 days before major deadlines. No spam, unsubscribe any time.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
                    role="status"
                  >
                    <Icon name="checkCircle" className="h-6 w-6 shrink-0 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-emerald-900">You are on the list.</p>
                      <p className="mt-1 text-[0.9rem] text-emerald-800/80">
                        The next alert will arrive with the coming fortnight’s new awards.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    className="grid gap-3 sm:grid-cols-[1fr_auto]"
                  >
                    <label className="block sm:col-span-2">
                      <span className="sr-only">Email address</span>
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        className={`h-12 w-full rounded-xl border bg-white px-4 text-[0.95rem] text-navy-950 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-gold-400/60 ${
                          errors.email ? 'border-rose-300' : 'border-navy-900/[0.12] hover:border-navy-900/25'
                        }`}
                        {...register('email', {
                          required: 'Enter your email to subscribe',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please check that email address' },
                        })}
                      />
                    </label>

                    <label className="block">
                      <span className="sr-only">Study level</span>
                      <select
                        className="h-12 w-full rounded-xl border border-navy-900/[0.12] bg-white px-4 text-[0.95rem] text-navy-950 hover:border-navy-900/25 focus:outline-none focus:ring-2 focus:ring-gold-400/60"
                        {...register('studyLevel')}
                      >
                        <option value="">All study levels</option>
                        {studyLevels.map((l) => (
                          <option key={l} value={l}>
                            {l}
                          </option>
                        ))}
                      </select>
                    </label>

                    <Button as="button" type="submit" size="md" icon="arrowRight" disabled={isSubmitting}>
                      {isSubmitting ? 'Subscribing…' : 'Get alerts'}
                    </Button>

                    {(errors.email || serverError) && (
                      <p className="flex items-center gap-1.5 text-[0.8rem] font-medium text-rose-600 sm:col-span-2">
                        <Icon name="close" className="h-3 w-3" />
                        {errors.email?.message ?? serverError}
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
