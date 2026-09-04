import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { site } from '../data'

/*
  SCRUB-SCROLLING HERO — real drone footage.
  The pinned video's currentTime is driven by scroll progress, so scrolling
  literally flies the camera down into the building. Poster shows instantly
  while the clip buffers.
*/

const VIDEO = 'https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/video/hero.mp4'
const POSTER = 'https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/video/poster.jpg'

export default function Hero() {
  const ref = useRef(null)
  const videoRef = useRef(null)
  const durationRef = useRef(0)
  const rafRef = useRef(0)
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Drive the video frame from scroll position.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const video = videoRef.current
    const d = durationRef.current
    if (!video || !d) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const t = Math.min(d - 0.05, Math.max(0, v * d))
      if (Math.abs(video.currentTime - t) > 0.015) video.currentTime = t
    })
  })

  const onMeta = () => {
    if (videoRef.current) {
      durationRef.current = videoRef.current.duration || 0
      setReady(true)
    }
  }

  // Text motion
  const titleY = useTransform(scrollYProgress, [0, 0.9], [0, -70])
  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.82, 1], [1, 1, 1, 0])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  if (reduce) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <img src={POSTER} alt="Motor Tabor" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70" />
        <div className="relative z-10 flex h-full items-center">
          <HeroText />
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[300vh] w-full" aria-label="Motor Tabor">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Poster underlay for instant paint */}
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <video
          ref={videoRef}
          src={VIDEO}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={onMeta}
          onLoadedData={onMeta}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Legibility scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        <motion.div style={{ y: titleY, opacity: textOpacity }} className="relative z-10 flex h-full items-center">
          <HeroText />
        </motion.div>

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
