import { useRef, useEffect, useState } from 'react'
import { useScroll, useReducedMotion } from 'framer-motion'

/*
  PREMIUM TWO-VIDEO SCRUB HERO with scroll-synced captions.
  200vh sticky viewport. Scroll progress (0→1) drives two drone clips as one
  continuous camera move, and swaps informative copy as the camera travels:
    0.0 → 0.5  hero-birds-eye  (building → high aerial)
    0.5 → 1.0  hero-pool-dive  (aerial → descent into the courtyard)
  currentTime is driven from scroll (never autoplayed); a rAF loop with light
  smoothing keeps seeking cheap, reverse-scroll perfect, and fades captions.
*/

const V1 = 'https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/video/hero-birds-eye.mp4'
const V2 = 'https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/video/hero-pool-dive.mp4'
const POSTER = 'https://cdn.jsdelivr.net/gh/javedhumaiel-cmd/motor-tabor@master/public/video/hero-poster.jpg'

// Informative copy revealed across the scroll. Contiguous bands with soft
// crossfades at the edges so exactly one reads at a time.
const CAPTIONS = [
  { from: 0.0, to: 0.22, kicker: 'Live above the ordinary', title: 'A new standard of\nmodern living.' },
  { from: 0.22, to: 0.44, kicker: 'Palms · West Los Angeles', title: 'Brand-new one-bedroom\nresidences.' },
  { from: 0.44, to: 0.66, kicker: 'Resort-style amenities', title: 'A rooftop pool &\nsky-deck lounge.' },
  { from: 0.66, to: 0.86, kicker: 'Designed for the everyday', title: 'Fitness studio, attended\nlobby, private balconies.' },
  { from: 0.86, to: 1.0, kicker: 'Now leasing · 10325 Tabor St', title: 'Come home to\nMotor Tabor.', cta: true },
]

const FADE = 0.05

function bandOpacity(p, from, to, isFirst, isLast) {
  const inStart = isFirst ? -1 : from - FADE
  const inEnd = isFirst ? 0 : from + FADE
  const outStart = isLast ? 1 : to - FADE
  const outEnd = isLast ? 2 : to + FADE
  const rampIn = inEnd === inStart ? 1 : (p - inStart) / (inEnd - inStart)
  const rampOut = outEnd === outStart ? 1 : (outEnd - p) / (outEnd - outStart)
  return Math.max(0, Math.min(1, rampIn, rampOut))
}

export default function Hero() {
  const ref = useRef(null)
  const v1Ref = useRef(null)
  const v2Ref = useRef(null)
  const d1Ref = useRef(0)
  const d2Ref = useRef(0)
  const cueRef = useRef(null)
  const capRefs = useRef([])
  const reduce = useReducedMotion()
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const onMeta1 = () => {
    if (v1Ref.current) {
      d1Ref.current = v1Ref.current.duration || 0
      setReady(true)
    }
  }
  const onMeta2 = () => {
    if (v2Ref.current) d2Ref.current = v2Ref.current.duration || 0
  }

  useEffect(() => {
    if (reduce) return
    let raf = 0
    let smooth = scrollYProgress.get()
    const last = { a: -1, b: -1 }

    const tick = () => {
      const target = scrollYProgress.get()
      smooth += (target - smooth) * 0.22
      if (Math.abs(target - smooth) < 0.0004) smooth = target
      const p = Math.min(1, Math.max(0, smooth))

      const v1 = v1Ref.current
      const v2 = v2Ref.current
      const d1 = d1Ref.current
      const d2 = d2Ref.current

      // Crossfade the two videos across the 0.5 seam.
      let o1
      if (p <= 0.48) o1 = 1
      else if (p >= 0.52) o1 = 0
      else o1 = (0.52 - p) / 0.04
      if (v1) v1.style.opacity = String(o1)
      if (v2) v2.style.opacity = String(1 - o1)

      if (v1 && d1) {
        const t1 = Math.min(d1 - 0.04, (Math.min(p, 0.5) / 0.5) * d1)
        if (Math.abs(t1 - last.a) > 0.01) {
          v1.currentTime = t1
          last.a = t1
        }
      }
      if (v2 && d2) {
        const raw = ((Math.max(p, 0.5) - 0.5) / 0.5) * d2
        const t2 = Math.min(d2 - 0.04, Math.max(0, raw))
        if (Math.abs(t2 - last.b) > 0.01) {
          v2.currentTime = t2
          last.b = t2
        }
      }

      // Fade captions by scroll band + a small lift as each enters.
      for (let i = 0; i < CAPTIONS.length; i++) {
        const el = capRefs.current[i]
        if (!el) continue
        const c = CAPTIONS[i]
        const o = bandOpacity(p, c.from, c.to, i === 0, i === CAPTIONS.length - 1)
        el.style.opacity = String(o)
        el.style.transform = `translateY(${(1 - o) * 18}px)`
        el.style.pointerEvents = o > 0.6 ? 'auto' : 'none'
      }

      if (cueRef.current) cueRef.current.style.opacity = String(Math.max(0, 1 - p * 12))

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reduce, scrollYProgress])

  if (reduce) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <img src={POSTER} alt="Motor Tabor" className="absolute inset-0 h-full w-full object-cover object-center" />
        <Scrims />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <Caption caption={CAPTIONS[0]} />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative h-[200vh] w-full" aria-label="Motor Tabor">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <img
          src={POSTER}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {/* Video 1 — building → aerial */}
        <video
          ref={v1Ref}
          src={V1}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          controls={false}
          onLoadedMetadata={onMeta1}
          onLoadedData={onMeta1}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ opacity: 1 }}
        />
        {/* Video 2 — aerial → courtyard descent */}
        <video
          ref={v2Ref}
          src={V2}
          muted
          playsInline
          preload="auto"
          controls={false}
          onLoadedMetadata={onMeta2}
          onLoadedData={onMeta2}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ opacity: 0 }}
        />

        <Scrims />

        {/* Scroll-synced captions (stacked, cross-faded by the rAF loop) */}
        <div className="relative z-10 flex h-full items-center">
          <div className="relative mx-auto h-full w-full max-w-7xl px-6">
            {CAPTIONS.map((c, i) => (
              <div
                key={i}
                ref={(el) => (capRefs.current[i] = el)}
                style={{ opacity: i === 0 ? 1 : 0 }}
                className="absolute left-6 right-6 top-1/2 -translate-y-1/2 will-change-[opacity,transform]"
              >
                <Caption caption={c} />
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div ref={cueRef} className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-white/75">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.4em]">Scroll to explore</p>
          <div className="mx-auto flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
            <span className="h-2 w-1 animate-bounce rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Scrims() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/70" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
    </>
  )
}

function Caption({ caption }) {
  return (
    <div className="max-w-4xl">
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.45em] text-white/75">{caption.kicker}</p>
      <h1 className="font-display text-5xl font-light leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
        {caption.title.split('\n').map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>
      {caption.cta && (
        <a
          href="#contact"
          className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-medium tracking-wide text-ink transition hover:bg-gold hover:text-white"
        >
          Schedule a Tour
        </a>
      )}
    </div>
  )
}
