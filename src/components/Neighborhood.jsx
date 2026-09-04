import Reveal from './Reveal'
import { ParallaxImage, WordReveal } from '../lib/motion'
import { neighborhood, site } from '../data'

const BANNER = 'https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/img/gallery/g01.jpg'

export default function Neighborhood() {
  return (
    <section id="location">
      <div className="relative h-[62vh] min-h-[440px]">
        <ParallaxImage
          src={BANNER}
          alt="Palms, West Los Angeles from above"
          className="absolute inset-0 h-full w-full"
          speed={70}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full items-center justify-center px-6 text-center text-white">
          <div className="max-w-3xl">
            <Reveal as="p" className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
              The Neighborhood
            </Reveal>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
              <WordReveal text="At the center of the Westside." />
            </h2>
            <Reveal as="p" delay={200} className="mt-5 text-sm text-white/80">
              {site.address} &middot; West Los Angeles
            </Reveal>
          </div>
        </div>
      </div>

      <div className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <Reveal as="p" className="max-w-2xl text-stone-600">
            Set in walkable {site.neighborhood}, moments from the Westside&rsquo;s dining, coffee and
            creative campuses. Quick access to the 10 and 405 freeways puts the beaches, Culver City
            and Century City all within easy reach.
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {neighborhood.map((item, i) => (
              <Reveal key={item.place} delay={i * 90} className="border-t border-stone-200 pt-6">
                <h3 className="font-display text-xl text-ink">{item.place}</h3>
                <p className="mt-2 text-sm text-stone-500">{item.detail}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
