import Link from 'next/link'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/catalog', label: 'Catalog' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/request-sample', label: 'Request Sample' },
]

const collectionLinks = [
  { href: '/catalog/pharmacy', label: 'Pharmacy Bags' },
  { href: '/catalog/veterinary', label: 'Veterinary Bags' },
  { href: '/catalog/custom', label: 'Custom Printed Bags' },
  { href: '/catalog/seasonal', label: 'Seasonal & Holiday Bags' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-300">
      <div className="section-container py-16">
        <div className="mb-12 rounded-2xl border border-slate-700/70 bg-slate-900/60 px-6 py-6 md:flex md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="heading-serif text-2xl font-bold text-white">Need Help Choosing Bag Sizes?</h2>
            <p className="mt-1 text-slate-400">Tell us your business type and we will recommend the best-fit size and print options.</p>
          </div>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-xl bg-gradient-to-r from-primary-500 to-primary-700 px-6 py-3 font-semibold text-white shadow-md transition-all hover:from-primary-400 hover:to-primary-600 md:mt-0"
          >
            Talk to Bagco
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h3 className="heading-serif mb-4 bg-gradient-to-r from-primary-300 to-primary-500 bg-clip-text text-3xl font-extrabold text-transparent">
              Bagco
            </h3>
            <p className="leading-relaxed text-slate-400">
              Custom printed paper bags for pharmacies, veterinary clinics, dispensaries, and retail storefronts.
              Built in Monroe, NC.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 transition-colors hover:text-primary-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Collections</h4>
            <ul className="space-y-3">
              {collectionLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-slate-400 transition-colors hover:text-primary-300">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-bold text-white">Contact</h4>
            <ul className="space-y-3 text-slate-400">
              <li>
                <a href="mailto:info@bagco.com" className="transition-colors hover:text-primary-300">
                  info@bagco.com
                </a>
              </li>
              <li>
                <a href="tel:+12525161944" className="transition-colors hover:text-primary-300">
                  (252) 516-1944
                </a>
              </li>
              <li>
                912 Houston Drive
                <br />
                Monroe, NC 28110
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 border-t border-slate-800 pt-8">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} Bagco. All rights reserved.</p>
          <Link
            href="/employee-login"
            className="text-[11px] tracking-wide text-slate-700 opacity-40 transition-colors hover:text-slate-500 hover:opacity-90"
            aria-label="Employee access"
          >
            Employee Access
          </Link>
        </div>
      </div>
    </footer>
  )
}