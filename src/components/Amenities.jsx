import Reveal from './Reveal'
import { ParallaxImage, WordReveal } from '../lib/motion'
import { amenities, conveniences } from '../data'

export default function Amenities() {
  return (
    <section id="amenities" className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Header */}
        <Reveal as="p" className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          Amenities
        </Reveal>
        <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-5xl">
          <WordReveal text="Space to live well." />
        </h2>
        <Reveal as="p" delay={120} className="mt-6 max-w-xl text-stone-600">
          Resort-style shared spaces designed for the way you actually live — from a rooftop pool
          wrapped in skyline to quiet corners made for slow mornings. Every gathering place is a
          natural extension of home.
        </Reveal>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {amenities.map((a, i) => (
            <Reveal
              key={a.title}
              className={`${a.span} group relative overflow-hidden rounded-3xl`}
              delay={i * 90}
              y={40}
            >
              <div className="relative min-h-[320px] lg:min-h-[440px]">
                <ParallaxImage src={a.img} alt={a.title} className="absolute inset-0 h-full w-full" hover />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h3 className="font-display text-2xl md:text-3xl">{a.title}</h3>
                  <p className="mt-2 max-w-md text-sm text-white/85">{a.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Conveniences */}
        <div className="mt-16 grid grid-cols-2 gap-x-8 md:grid-cols-3">
          {conveniences.map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className="border-t border-stone-200 pt-5">
              <p className="font-medium text-ink">{c.title}</p>
              <p className="mt-1 text-sm text-stone-500">{c.note}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
