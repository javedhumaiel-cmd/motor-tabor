import Reveal from './Reveal'
import { site, stats } from '../data'

// Editorial intro that sits directly beneath the hero.
export default function Overview() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal as="p" className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          The Residence &middot; {site.address.replace(' Street', '')}
        </Reveal>

        <Reveal
          as="h2"
          delay={80}
          className="mt-6 max-w-4xl font-display text-4xl md:text-5xl font-light leading-tight tracking-tight text-ink"
        >
          A brand-new address for
          <br className="hidden sm:block" /> one-bedroom living in {site.neighborhood}.
        </Reveal>

        <Reveal
          as="p"
          delay={100}
          className="mt-8 max-w-2xl text-stone-600 leading-relaxed"
        >
          Motor Tabor is a new-construction one-bedroom community in the {site.neighborhood}{' '}
          neighborhood of West Los Angeles — moments from Culver City, Century City, West LA, and the
          I-10 — pairing high-end finishes with resort-style amenities for a way of living that feels
          effortless from the moment you arrive.
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-20 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 80}
              className="border-t border-stone-200 pt-6"
            >
              <p className="font-display text-4xl md:text-5xl font-light leading-none text-ink">
                {stat.value}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-stone-500">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
