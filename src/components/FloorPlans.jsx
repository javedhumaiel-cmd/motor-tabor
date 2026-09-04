import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import { WordReveal, EASE } from '../lib/motion'
import { plans } from '../data'

export default function FloorPlans() {
  const [active, setActive] = useState(0)
  const plan = plans[active]

  return (
    <section id="plans" className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal as="p" className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          Floor Plans
        </Reveal>
        <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-5xl">
          <WordReveal text="Find your layout." />
        </h2>
        <Reveal as="p" delay={120} className="mt-5 text-stone-600">
          Seven one-bedroom plans, each with a private balcony and walk-in closet.
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap gap-3">
          {plans.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full border px-5 py-2 text-sm transition-all duration-300 ${
                i === active
                  ? 'border-ink bg-ink text-white shadow-sm'
                  : 'border-stone-300 text-stone-600 hover:border-gold hover:text-gold'
              }`}
            >
              {p.name}
            </button>
          ))}
        </Reveal>

        <div className="mt-10 overflow-hidden rounded-3xl border border-stone-200 bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid items-center gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:p-10"
            >
              <div className="rounded-2xl bg-white">
                <img src={plan.img} className="mx-auto max-h-[520px] w-full object-contain" alt={plan.name} />
              </div>
              <div>
                <h3 className="font-display text-3xl text-ink">{plan.name}</h3>
                <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">
                  One Bedroom &middot; One Bath &middot; Private Balcony
                </p>
                <p className="mt-5 text-stone-600">
                  A considered one-bedroom layout with an open living space that opens onto a private
                  balcony. Dimensions vary by residence &mdash; contact leasing for availability and pricing.
                </p>
                <a
                  href="#contact"
                  className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-gold"
                >
                  Check availability
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
