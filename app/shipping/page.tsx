import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Policy',
  description:
    'Bagco shipping details including free freight thresholds, standard carrier rates, and pickup options from Monroe, NC.',
}

export default function ShippingPage() {
  return (
    <div className="bg-primary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-8">
          Shipping Policy
        </h1>
        
        <div className="space-y-8 text-lg text-gray-600">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Freight Offer</h2>
            <p>
              We offer <span className="font-bold text-primary-600">FREE FREIGHT</span> on orders of 8 cases or more to any commercial address.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Standard Shipping</h2>
            <p>
              For orders under 8 cases, standard UPS or FedEx shipping rates apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Free Factory Pickup</h2>
            <p>
              Want it even faster or cheaper? Pick it up for <span className="font-bold text-primary-600">FREE</span> at our Monroe facility with no waiting and no shipping costs.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
