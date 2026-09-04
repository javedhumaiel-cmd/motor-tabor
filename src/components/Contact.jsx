import { useState } from 'react'
import Reveal from './Reveal'
import { site } from '../data'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Tour request — ${form.name || 'Motor Tabor'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`,
    )
    // Opens the visitor's own mail client — nothing is sent automatically.
    window.location.href = `mailto:${site.leasingEmail}?subject=${subject}&body=${body}`
  }

  const field =
    'w-full border-b border-stone-300 bg-transparent py-3 text-ink placeholder-stone-400 outline-none transition focus:border-gold'

  return (
    <section id="contact" className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:py-32 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold">Schedule a Tour</p>
            <h2 className="mt-5 font-display text-4xl font-light leading-tight md:text-5xl">
              Come see it in person.
            </h2>
            <p className="mt-6 max-w-md text-white/70">
              Call, email, or send a note and our leasing team will arrange a private tour of Motor Tabor.
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-10 space-y-6">
            <ContactRow label="Leasing" value={site.leasingPhone} href={`tel:${site.leasingPhone.replace(/[^\d]/g, '')}`} />
            <ContactRow label="Office" value={site.officePhone} href={`tel:${site.officePhone.replace(/[^\d]/g, '')}`} />
            <ContactRow label="Email" value={site.leasingEmail} href={`mailto:${site.leasingEmail}`} />
            <ContactRow label="Address" value={`${site.address}, ${site.city}`} href={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}`} />
          </Reveal>

          <Reveal delay={150} className="mt-10 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Map to Motor Tabor"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
              className="h-64 w-full grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>

        <Reveal delay={100} as="form" onSubmit={submit} className="flex flex-col justify-center">
          <div className="space-y-8">
            <input className={field} placeholder="Full name" value={form.name} onChange={update('name')} required />
            <input className={field} type="email" placeholder="Email address" value={form.email} onChange={update('email')} required />
            <input className={field} placeholder="Phone (optional)" value={form.phone} onChange={update('phone')} />
            <textarea className={field} rows={4} placeholder="Move-in timing, questions, anything else…" value={form.message} onChange={update('message')} />
          </div>
          <button
            type="submit"
            className="mt-10 w-full rounded-full bg-white px-8 py-4 text-sm font-medium tracking-wide text-ink transition hover:bg-gold hover:text-white"
          >
            Request a Tour
          </button>
          <p className="mt-4 text-center text-xs text-white/40">
            Opens your email app — no data is stored on this site.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function ContactRow({ label, value, href }) {
  return (
    <a href={href} className="group flex items-baseline justify-between border-b border-white/10 pb-4">
      <span className="text-xs uppercase tracking-[0.25em] text-white/50">{label}</span>
      <span className="text-right text-lg text-white transition group-hover:text-gold">{value}</span>
    </a>
  )
}
