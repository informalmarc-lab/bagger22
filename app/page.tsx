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

const stats = [
  { value: '24h', label: 'Typical quote response' },
  { value: '4+', label: 'Case minimum on custom orders' },
  { value: 'US', label: 'Shipping support nationwide' },
]

const categories = [
  {
    href: '/catalog/pharmacy',
    title: 'Pharmacy Bags',
    text: 'Stock TY, GS, and plastic GS designs in multiple size options.',
  },
  {
    href: '/catalog/veterinary',
    title: 'Veterinary Bags',
    text: 'Popular VB series designs built for vet practices and pet stores.',
  },
  {
    href: '/catalog/custom',
    title: 'Custom Print Gallery',
    text: '1-color, 2-color, and 3-color examples for your next custom run.',
  },
]

const processSteps = [
  {
    title: '1. Send your request',
    body: 'Tell us your bag style, use case, and estimated volume.',
  },
  {
    title: '2. Review options',
    body: 'We recommend size plus generic or custom print options that fit your operation. We use one standard paper type.',
  },
  {
    title: '3. Confirm and produce',
    body: 'Approve your details and move into production with clear lead-time expectations.',
  },
]

export default function Home() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative overflow-hidden text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-800 to-slate-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="section-container relative z-10 py-24 md:py-32">
          <div className="max-w-5xl">
            <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide">
              Monroe, North Carolina Manufacturer
            </p>
            <h1 className="heading-serif mt-6 text-balance text-5xl font-bold leading-tight md:text-7xl">
              Paper Bags That Carry Your Brand With Confidence
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-primary-100 md:text-xl">
              Bagco builds dependable paper bag orders for pharmacy, veterinary, dispensary, and specialty retail
              businesses across the U.S.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-xl bg-primary-50 px-8 py-4 font-bold text-primary-800 shadow-lg"
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

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/20 bg-white/10 px-4 py-4 backdrop-blur-sm">
                  <p className="text-2xl font-extrabold text-white">{item.value}</p>
                  <p className="text-sm font-semibold text-primary-100">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container grid gap-5 md:grid-cols-3">
          {categories.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="surface-card surface-card-hover rounded-2xl p-7"
            >
              <h2 className="text-2xl font-bold text-slate-800">{item.title}</h2>
              <p className="mt-2 text-slate-600">{item.text}</p>
              <span className="mt-5 inline-block font-semibold text-primary-700">View Collection</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="section-container">
          <div className="surface-card rounded-3xl p-8 md:p-12">
            <h2 className="heading-serif text-4xl font-bold text-slate-900">How Orders Move From Idea to Delivery</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {processSteps.map((step) => (
                <article key={step.title} className="rounded-2xl border border-slate-200/80 bg-white/80 p-5">
                  <h3 className="text-lg font-bold text-slate-800">{step.title}</h3>
                  <p className="mt-2 text-slate-600">{step.body}</p>
                </article>
              ))}
            </div>
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
                <p className="mt-2 text-slate-600">
                  Custom orders typically start at multi-case quantities. Contact us for exact options.
                </p>
              </article>
              <article>
                <h3 className="font-bold text-slate-800">Can you match existing branding?</h3>
                <p className="mt-2 text-slate-600">
                  Yes. Send your artwork and we can help prepare print-ready proofs.
                </p>
              </article>
              <article>
                <h3 className="font-bold text-slate-800">How fast is follow-up?</h3>
                <p className="mt-2 text-slate-600">
                  Most quote and sample requests receive a response within one business day.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-900" />
        <div className="section-container relative z-10 text-center">
          <h2 className="heading-serif text-4xl font-bold text-white md:text-5xl">Ready to Start Your Bag Order?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-primary-100">
            Request pricing or samples and our team will help you choose the right size, style, and print plan.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-primary-50 px-8 py-4 font-bold text-primary-800 shadow-lg"
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
