import Reveal from './Reveal'
import { unitFeatures } from '../data'

export default function Residence() {
  return (
    <section id="residence" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — imagery */}
          <Reveal className="lg:sticky lg:top-24">
            <div className="group overflow-hidden rounded-2xl aspect-[4/5]">
              <img
                src="https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/img/gallery/g11.jpg"
                alt="Chef-style kitchen with chevron tile backsplash and stainless appliances"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="group mt-4 overflow-hidden rounded-2xl aspect-[16/10]">
              <img
                src="https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/img/gallery/g12.jpg"
                alt="Staged bedroom with a window view"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>

          {/* RIGHT — copy + feature list */}
          <div>
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
                Inside your home
              </p>
              <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-5xl">
                Designed down to the last detail.
              </h2>
              <p className="mt-6 max-w-md text-stone-600 leading-relaxed">
                Every one-bedroom residence at Motor Tabor is light-filled and
                thoughtfully finished — open layouts, natural materials, and
                considered details that make a home feel effortless from the
                moment you walk in.
              </p>
            </Reveal>

            <ul className="mt-12 grid gap-x-8 sm:grid-cols-2">
              {unitFeatures.map((feature, i) => (
                <Reveal
                  as="li"
                  key={feature}
                  delay={i * 60}
                  className="flex gap-3 border-t border-stone-200 py-4"
                >
                  <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                  <span className="text-stone-700 leading-relaxed">{feature}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
