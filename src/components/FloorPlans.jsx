import { useState } from 'react'
import Reveal from './Reveal'
import { plans } from '../data'

export default function FloorPlans() {
  const [active, setActive] = useState(0)
  const plan = plans[active]

  return (
    <section id="plans" className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
            Floor Plans
          </p>
          <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-5xl">
            Find your layout.
          </h2>
          <p className="mt-5 text-stone-600">
            Seven one-bedroom plans, each with a private balcony and walk-in closet.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-3">
          {plans.map((p, i) => (
            <button
              key={p.name}
              type="button"
              onClick={() => setActive(i)}
              className={`rounded-full border px-5 py-2 text-sm transition ${
                i === active
                  ? 'border-ink bg-ink text-white'
                  : 'border-stone-300 text-stone-600 hover:border-gold hover:text-gold'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        <Reveal
          key={active}
          className="mt-10 grid items-center gap-8 rounded-3xl border border-stone-200 bg-white p-6 md:grid-cols-[1.4fr_1fr] md:p-10"
        >
          <div className="rounded-2xl bg-white">
            <img
              src={plan.img}
              className="mx-auto max-h-[520px] w-full object-contain"
              alt={plan.name}
            />
          </div>

          <div>
            <h3 className="font-display text-3xl text-ink">{plan.name}</h3>
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">
              One Bedroom &middot; One Bath &middot; Private Balcony
            </p>
            <p className="mt-5 text-stone-600">
              A considered one-bedroom layout with an open living space that opens onto
              a private balcony. Dimensions vary by residence &mdash; contact leasing
              for availability and pricing.
            </p>
            <a
              href="#contact"
              className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-gold"
            >
              Check availability
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
