import Reveal from './Reveal'
import { ParallaxImage, WordReveal } from '../lib/motion'
import { unitFeatures } from '../data'

const CDN = 'https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/img/gallery'

export default function Residence() {
  return (
    <section id="residence" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — parallax imagery */}
          <div className="lg:sticky lg:top-24">
            <Reveal className="group">
              <ParallaxImage
                src={`${CDN}/g11.jpg`}
                alt="Chef-style kitchen with chevron tile backsplash and stainless appliances"
                className="rounded-2xl aspect-[4/5]"
                hover
              />
            </Reveal>
            <Reveal delay={120} className="group mt-4">
              <ParallaxImage
                src={`${CDN}/g12.jpg`}
                alt="Staged bedroom with a window view"
                className="rounded-2xl aspect-[16/10]"
                speed={30}
                hover
              />
            </Reveal>
          </div>

          {/* RIGHT — copy + feature list */}
          <div>
            <Reveal as="p" className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
              Inside your home
            </Reveal>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight text-ink md:text-5xl">
              <WordReveal text="Designed down to the last detail." />
            </h2>
            <Reveal as="p" delay={120} className="mt-6 max-w-md text-stone-600 leading-relaxed">
              Every one-bedroom residence at Motor Tabor is light-filled and thoughtfully finished —
              open layouts, natural materials, and considered details that make a home feel effortless
              from the moment you walk in.
            </Reveal>

            <ul className="mt-12 grid gap-x-8 sm:grid-cols-2">
              {unitFeatures.map((feature, i) => (
                <Reveal
                  as="li"
                  key={feature}
                  delay={i * 55}
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
