import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { site } from '../data'

/*
  SCRUB-SCROLLING HERO
  --------------------
  A pinned, scroll-driven cinematic sequence that mimics the drone-into-lobby
  move: exterior  ->  aerial over the rooftop pool  ->  into the lobby.
  Each layer's opacity + scale is tied to scroll progress.

  >> DROP-IN VIDEO LATER <<
  When the drone clip is ready, replace LAYER 1 with:
    <motion.video src="/video/hero.mp4" muted playsInline
      style={{ scale: layer1Scale, opacity: layer1Opacity }}
      className="absolute inset-0 h-full w-full object-cover" />
  or, for a true frame-scrub, drive video.currentTime from scrollYProgress.
*/

const layers = [
  { src: '/img/hero.jpg', kicker: 'Palms · West Los Angeles' },
  { src: '/img/gallery/g02.jpg', kicker: 'Rooftop pool & sky deck' },
  { src: '/img/gallery/g03.jpg', kicker: 'Step inside' },
]

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Layer 1 — exterior
  const o1 = useTransform(scrollYProgress, [0, 0.28, 0.4], [1, 1, 0])
  const s1 = useTransform(scrollYProgress, [0, 0.4], [1.04, 1.22])
  // Layer 2 — aerial / pool
  const o2 = useTransform(scrollYProgress, [0.3, 0.44, 0.62, 0.72], [0, 1, 1, 0])
  const s2 = useTransform(scrollYProgress, [0.3, 0.72], [1.14, 1.28])
  // Layer 3 — lobby
  const o3 = useTransform(scrollYProgress, [0.64, 0.82], [0, 1])
  const s3 = useTransform(scrollYProgress, [0.64, 1], [1.16, 1.02])

  const opacities = [o1, o2, o3]
  const scales = [s1, s2, s3]

  // Text motion
  const titleY = useTransform(scrollYProgress, [0, 0.85], [0, -60])
  const subOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [1, 1, 1, 0])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  if (reduce) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <img src="/img/hero.jpg" alt="Motor Tabor exterior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        <HeroText />
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[280vh] w-full" aria-label="Motor Tabor">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {layers.map((layer, i) => (
          <motion.div key={i} style={{ opacity: opacities[i] }} className="absolute inset-0">
            <motion.img
              src={layer.src}
              alt=""
              style={{ scale: scales[i] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </motion.div>
        ))}

        {/* Legibility scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <motion.div style={{ y: titleY, opacity: subOpacity }} className="relative z-10 flex h-full items-center">
          <HeroText />
        </motion.div>

        {/* Kicker that changes with the sequence */}
        <div className="pointer-events-none absolute bottom-28 left-0 right-0 z-10 flex justify-center">
          {layers.map((layer, i) => (
            <motion.span
              key={i}
              style={{ opacity: opacities[i] }}
              className="absolute text-[11px] font-medium uppercase tracking-[0.32em] text-white/80"
            >
              {layer.kicker}
            </motion.span>
          ))}
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/70"
        >
          <div className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-white/80" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function HeroText() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-white/75">
        {site.address} · {site.neighborhood}
      </p>
      <h1 className="max-w-4xl font-display text-6xl font-light leading-[0.95] tracking-tight text-white sm:text-7xl md:text-8xl">
        Brand-new living
        <br />
        in <span className="italic text-white">Palms.</span>
      </h1>
      <p className="mt-7 max-w-xl text-base font-light leading-relaxed text-white/85 md:text-lg">
        Sunlit one-bedroom residences with a rooftop pool, private fitness studio,
        and the Westside at your doorstep.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-4">
        <a
          href="#contact"
          className="rounded-full bg-white px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition hover:bg-gold hover:text-white"
        >
          Schedule a Tour
        </a>
        <a
          href="#residence"
          className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium tracking-wide text-white transition hover:border-white hover:bg-white/10"
        >
          Explore the Residence
        </a>
      </div>
    </div>
  )
}
