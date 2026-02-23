import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Bagco in Monroe, North Carolina and our custom printed, pharmacy, and specialty paper bag manufacturing services.',
}

export default function About() {
  return (
    <div className="bg-primary-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold">About Bagco</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Your trusted partner in paper bags — custom printed, pharmacy, and more</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-primary-50 rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Our Story</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              Bagco is based in Monroe, North Carolina. Owner Marc Castella and our team 
              provide high-quality paper bags for businesses of all kinds—custom printed bags, pharmacy bags, 
              dispensary bags, veterinary bags, winery bags, holiday and pride bags, and more.
            </p>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              We work with our in-house designers to create the perfect bag for your business. Already have a logo? 
              We're happy to work with your existing branding to create paper bags that reflect your brand.
            </p>

            <h2 className="text-4xl font-extrabold mb-6 mt-12 text-gray-800">Our Mission</h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              To provide quality paper bag and packaging solutions for retail, pharmacy, dispensary, faith, 
              veterinary, winery, and specialty businesses—with great design and customer service.
            </p>

            <h2 className="text-4xl font-extrabold mb-6 mt-12 text-gray-800">Why Choose Us</h2>
            <ul className="list-none space-y-4 text-lg">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">In-house design support — we work with your logo and branding</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Custom printed bags in 1-, 2-, and 3-color options</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Pharmacy bags, dispensary bags, veterinary, winery, holiday & pride bags</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">High-quality materials and construction (no handles on our bags)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Flexible order quantities</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Dedicated customer service</span>
              </li>
            </ul>

            <div className="mt-12 p-8 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl shadow-lg">
              <h3 className="text-3xl font-extrabold mb-4 text-gray-800">Get in Touch</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Interested in learning more about our paper bag manufacturing services? 
                We'd love to discuss how we can help meet your packaging needs.
              </p>
              <a 
                href="/contact" 
                className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
