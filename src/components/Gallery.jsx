import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Reveal from './Reveal'
import { WordReveal, EASE } from '../lib/motion'
import { gallery } from '../data'

export default function Gallery() {
  const [active, setActive] = useState(null)
  const isOpen = active !== null

  const close = () => setActive(null)
  const prev = () => setActive((i) => (i === null ? i : (i - 1 + gallery.length) % gallery.length))
  const next = () => setActive((i) => (i === null ? i : (i + 1) % gallery.length))

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <section id="gallery" className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <Reveal as="p" className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          Gallery
        </Reveal>
        <h2 className="mt-4 font-display text-4xl md:text-5xl font-light leading-tight tracking-tight text-ink">
          <WordReveal text="A closer look." />
        </h2>
        <Reveal as="p" delay={120} className="mt-4 max-w-xl text-stone-500">
          Every corner considered — from the light that fills each room to the details that make it home.
        </Reveal>

        <div className="mt-14 columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {gallery.map((item, i) => (
            <Reveal key={item.src} delay={(i % 3) * 90} className="mb-4 break-inside-avoid">
              <motion.button
                onClick={() => setActive(i)}
                aria-label={`View ${item.label}`}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="group relative block w-full overflow-hidden rounded-2xl shadow-sm"
              >
                <img
                  src={item.src}
                  loading="lazy"
                  alt={item.label}
                  className="w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-105"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 to-transparent opacity-0 transition duration-500 group-hover:opacity-100"
                />
                <span className="pointer-events-none absolute bottom-4 left-4 translate-y-2 text-sm text-white opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.label}
                </span>
              </motion.button>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={gallery[active].label}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                close()
              }}
              aria-label="Close gallery"
              className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              &times;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-white/80 transition hover:bg-white/10 hover:text-white md:left-8"
            >
              &#8249;
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-3xl text-white/80 transition hover:bg-white/10 hover:text-white md:right-8"
            >
              &#8250;
            </button>
            <motion.figure
              key={active}
              className="flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <img
                src={gallery[active].src}
                alt={gallery[active].label}
                className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain"
              />
              <figcaption className="mt-4 text-sm uppercase tracking-[0.25em] text-white/70">
                {gallery[active].label}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
