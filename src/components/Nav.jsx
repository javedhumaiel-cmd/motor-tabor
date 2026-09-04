import { useEffect, useState } from 'react'
import { nav, site } from '../data'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-paper/90 backdrop-blur-md shadow-[0_1px_0_rgba(33,30,24,0.08)]' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex flex-col leading-none">
          <span
            className={`font-display text-xl tracking-tight transition-colors ${
              solid ? 'text-ink' : 'text-white'
            }`}
          >
            Motor Tabor
          </span>
          <span
            className={`mt-1 text-[10px] font-medium uppercase tracking-[0.3em] transition-colors ${
              solid ? 'text-stone-500' : 'text-white/70'
            }`}
          >
            Apartments
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors hover:text-gold ${
                solid ? 'text-stone-700' : 'text-white/90'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={`tel:${site.leasingPhone.replace(/[^\d]/g, '')}`}
            className={`text-sm font-medium tracking-wide transition-colors ${
              solid ? 'text-ink hover:text-gold' : 'text-white hover:text-white/80'
            }`}
          >
            {site.leasingPhone}
          </a>
          <a
            href="#contact"
            className={`rounded-full px-5 py-2.5 text-sm font-medium tracking-wide transition ${
              solid ? 'bg-ink text-white hover:bg-gold' : 'bg-white text-ink hover:bg-gold hover:text-white'
            }`}
          >
            Schedule a Tour
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          className={`relative z-50 flex h-10 w-10 items-center justify-center lg:hidden ${
            solid ? 'text-ink' : 'text-white'
          }`}
        >
          <div className="space-y-1.5">
            <span className={`block h-px w-6 bg-current transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-current transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-paper transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-center gap-2 px-8">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-stone-200 py-4 font-display text-3xl text-ink"
            >
              {item.label}
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-3">
            <a href={`tel:${site.leasingPhone.replace(/[^\d]/g, '')}`} className="text-lg text-stone-700">
              {site.leasingPhone}
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-ink px-6 py-3.5 text-center text-sm font-medium tracking-wide text-white"
            >
              Schedule a Tour
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
