import { nav, site } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <div className="font-display text-2xl tracking-tight text-ink">Motor Tabor</div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-500">
              {site.address}, {site.city}
              <br />
              {site.neighborhood} · West Los Angeles
            </p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-3">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-stone-600 transition hover:text-gold">
                {item.label}
              </a>
            ))}
          </div>

          <div className="text-sm text-stone-600">
            <a href={`tel:${site.leasingPhone.replace(/[^\d]/g, '')}`} className="block hover:text-gold">
              {site.leasingPhone}
            </a>
            <a href={`mailto:${site.email}`} className="mt-1 block hover:text-gold">
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-stone-200 pt-8 text-xs text-stone-400 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} {site.entity}</p>
          <p className="flex items-center gap-2">
            <span aria-hidden className="inline-flex h-4 w-4 items-center justify-center border border-stone-400 text-[9px]">⌂</span>
            Equal Housing Opportunity
          </p>
        </div>
      </div>
    </footer>
  )
}
