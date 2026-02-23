import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Custom Printed and Pharmacy Paper Bags',
  description:
    'Paper bags made to order for pharmacies, veterinary clinics, dispensaries, and retail businesses. Request a quote or sample from Bagco in Monroe, NC.',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of bags does Bagco offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bagco offers custom printed paper bags, pharmacy bags, veterinary bags, and other specialty retail bag options.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Bagco print my business logo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Bagco can work with your existing branding and logo, or support you with in-house design.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I request pricing or samples?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the Request a Quote or Request Samples forms on the website and a Bagco representative will follow up.',
      },
    },
  ],
}

const highlights = [
  { title: 'In-House Design Support', body: 'Bring your logo, rough idea, or existing art. We help finalize a print-ready bag design.' },
  { title: 'Fast, Reliable Fulfillment', body: 'Production and shipping options built for repeat business ordering cycles.' },
  { title: 'Built for Real-World Retail', body: 'Durable paper construction in practical sizes for pharmacy, veterinary, and specialty checkout.' },
]

const categories = [
  { href: '/catalog/pharmacy', title: 'Pharmacy Bags', text: 'Stock TY, GS, and plastic GS styles in multiple size options.' },
  { href: '/catalog/veterinary', title: 'Veterinary Bags', text: 'Pet-friendly branded designs in popular case quantities.' },
  { href: '/catalog/custom', title: 'Custom Print Gallery', text: '1-color, 2-color, and 3-color custom bag examples and specs.' },
]

export default function Home() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-slate-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="section-container relative z-10 py-24 md:py-32">
          <div className="max-w-5xl">
            <p className="inline-flex items-center rounded-full border border-white/25 bg-primary-200/20 px-4 py-2 text-sm font-semibold tracking-wide">
              Monroe, North Carolina
            </p>
            <h1 className="mt-6 heading-serif text-5xl md:text-7xl font-bold leading-tight">
              Paper Bags Made for
              <span className="block text-primary-200">Pharmacy, Retail, and Custom Brands</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl text-primary-100">
              Bagco manufactures custom printed and stock paper bags with dependable service, practical sizing,
              and design support for growing businesses.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-xl bg-primary-50 text-primary-800 px-8 py-4 font-bold shadow-lg hover:bg-primary-50"
              >
                Browse Catalog
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-primary-200/20 px-8 py-4 font-bold text-white hover:bg-primary-200/25"
              >
                Request a Quote
              </Link>
              <Link
                href="/request-sample"
                className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-transparent px-8 py-4 font-bold text-white hover:bg-primary-200/20"
              >
                Request Samples
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container grid gap-4 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="surface-card rounded-2xl p-7">
              <h2 className="text-xl font-bold text-slate-800">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          <div className="mb-8">
            <h2 className="heading-serif text-4xl font-bold text-slate-900">Shop by Collection</h2>
            <p className="mt-2 text-slate-600 max-w-2xl">
              Start with your bag category, then request pricing based on your preferred sizes and quantities.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {categories.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="surface-card group rounded-2xl p-7 hover:border-primary-300 hover:-translate-y-0.5"
              >
                <h3 className="text-2xl font-bold text-slate-800 group-hover:text-primary-700">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.text}</p>
                <span className="mt-5 inline-block font-semibold text-primary-700">View Collection</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="surface-card rounded-3xl p-8 md:p-12">
            <h2 className="heading-serif text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <article>
                <h3 className="font-bold text-slate-800">Minimum order size?</h3>
                <p className="mt-2 text-slate-600">Custom programs typically start at multi-case quantities. Contact us for your exact product tier.</p>
              </article>
              <article>
                <h3 className="font-bold text-slate-800">Can you match existing branding?</h3>
                <p className="mt-2 text-slate-600">Yes. You can send artwork, or we can help prepare print-ready proofs with your logo and brand style.</p>
              </article>
              <article>
                <h3 className="font-bold text-slate-800">How fast is follow-up?</h3>
                <p className="mt-2 text-slate-600">Most quote and sample requests receive a team response within one business day.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900" />
        <div className="section-container relative z-10 text-center">
          <h2 className="heading-serif text-4xl md:text-5xl font-bold text-white">Ready to Get Started?</h2>
          <p className="mt-3 text-primary-100 text-lg max-w-2xl mx-auto">
            Request a quote or samples and we will help you choose the right bag program for your business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary-50 text-primary-800 px-8 py-4 font-bold shadow-lg hover:bg-primary-50"
            >
              Request a Quote
            </Link>
            <Link
              href="/request-sample"
              className="inline-flex items-center justify-center rounded-xl border border-white/35 bg-transparent px-8 py-4 font-bold text-white hover:bg-primary-200/20"
            >
              Request Samples
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
