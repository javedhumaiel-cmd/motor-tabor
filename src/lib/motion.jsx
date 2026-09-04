import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1]

/*
  ParallaxImage — image drifts on scroll inside a clipped frame.
  The inner layer is oversized so the drift never exposes an edge.
*/
export function ParallaxImage({ src, alt = '', className = '', imgClassName = '', speed = 46, hover = false }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed])
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-8%] will-change-transform">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`h-full w-full object-cover ${hover ? 'transition-transform duration-[1200ms] ease-out group-hover:scale-105' : ''} ${imgClassName}`}
        />
      </motion.div>
    </div>
  )
}

/*
  CountUp — animates a leading integer when scrolled into view.
  Non-numeric values (e.g. "Palms") render as-is.
*/
export function CountUp({ value, className = '' }) {
  const m = String(value).match(/^(\d+)(.*)$/)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const [n, setN] = useState(0)
  const target = m ? parseInt(m[1], 10) : 0

  useEffect(() => {
    if (!m || !inView) return
    const controls = animate(0, target, {
      duration: 1.3,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target, m])

  if (!m) return <span className={className}>{value}</span>
  return (
    <span ref={ref} className={className}>
      {n}
      {m[2]}
    </span>
  )
}

/*
  WordReveal — each word rises from a masked line, staggered. Premium headline feel.
  Word gaps come from marginRight so they never collapse inside the inline-block clip.
*/
export function WordReveal({ text, className = '', delay = 0, wordDelay = 0.055 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -12% 0px' })
  const words = text.split(' ')
  return (
    <span ref={ref} className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: '0.08em', marginRight: i < words.length - 1 ? '0.26em' : 0 }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%' }}
            animate={inView ? { y: 0 } : { y: '115%' }}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * wordDelay }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

export { EASE }
