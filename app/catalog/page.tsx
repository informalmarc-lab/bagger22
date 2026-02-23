'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const collections = [
  { name: 'Dispensary Bags', slug: 'dispensary' },
  { name: 'Faith & Religious Bags', slug: 'faith' },
  { name: 'Pride Bags', slug: 'pride' },
  { name: 'Holiday Bags', slug: 'holiday' },
  { name: 'Bakery Bags', slug: 'bakery' },
  { name: 'College & University Bags', slug: 'college' },
  { name: 'Grocery Bags', slug: 'grocery' },
  { name: 'Dispensary Store Bags', slug: 'magazine-comics' },
  { name: 'Mini Cases', slug: 'minicases' },
  { name: 'Seasonal Bags', slug: 'seasonal' },
  { name: 'USA Bags', slug: 'usa' },
  { name: 'Winery Bags', slug: 'winery' },
]

const customProducts = [
  { id: 1, name: 'Full-Custom, 1-Color Bags', price: '95.56' },
  { id: 2, name: 'Full-Custom, 2-Color Bags', price: '95.56' },
  { id: 3, name: 'Full-Custom, 3-Color Bags', price: '119.46' },
]

export default function Catalog() {
  const [randomImages, setRandomImages] = useState<string[]>([])

  useEffect(() => {
    // Fetch images from custom catalog - each product gets image from its matching folder
    fetch('/api/catalog/custom?' + Date.now())
      .then((res) => res.json())
      .then((data) => {
        const selected: string[] = []
        
        // 1-Color Bags (index 0) -> from 1-color folder
        const oneColorImages = (data['1-color'] || []).map((img: { src: string }) => img.src)
        if (oneColorImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * oneColorImages.length)
          selected.push(oneColorImages[randomIndex])
        } else {
          selected.push('')
        }
        
        // 2-Color Bags (index 1) -> from 2-color folder
        const twoColorImages = (data['2-color'] || []).map((img: { src: string }) => img.src)
        if (twoColorImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * twoColorImages.length)
          selected.push(twoColorImages[randomIndex])
        } else {
          selected.push('')
        }
        
        // 3-Color Bags (index 2) -> from 3-color folder
        const threeColorImages = (data['3-color'] || []).map((img: { src: string }) => img.src)
        if (threeColorImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * threeColorImages.length)
          selected.push(threeColorImages[randomIndex])
        } else {
          selected.push('')
        }
        
        setRandomImages(selected)
      })
      .catch(() => {
        setRandomImages(['', '', ''])
      })
  }, [])

  return (
    <div className="bg-primary-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold">Catalog</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Custom printed bags, pharmacy bags, and more</p>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">All Collections</h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalog/pharmacy"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Pharmacy Bags Catalog
            </Link>
            <Link
              href="/catalog/veterinary"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Veterinary Bags Catalog
            </Link>
            <Link
              href="/catalog/custom"
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Custom Gallery (1, 2, 3 Color)
            </Link>
            {collections.map((c) => (
              <Link
                key={c.slug}
                href={c.slug === 'pharmacy' ? '/catalog/pharmacy' : c.slug === 'veterinary' ? '/catalog/veterinary' : c.slug === 'custom' ? '/catalog/custom' : `/catalog/${c.slug}`}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Printed Bags */}
      <section className="py-20 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Custom Printed Bags</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Work with our in-house designers to create the perfect custom bag for your business. Already have a logo? We're happy to work with your existing branding to create paper bags for your business.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {customProducts.map((product, index) => {
              const productImage = randomImages[index] || null
              return (
                <div
                  key={product.id}
                  className="bg-primary-50 border-2 border-gray-100 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center relative overflow-hidden">
                    {productImage ? (
                      <Image
                        key={`${productImage}-${Date.now()}`}
                        src={productImage}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-24 h-32 bg-primary-50 rounded-xl shadow-lg flex items-center justify-center">
                        <svg className="w-12 h-12 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{product.name}</h3>
                    <p className="text-primary-600 font-bold text-lg mb-6">From ${product.price} USD</p>
                    <Link
                      href="/contact"
                      className="block w-full text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-4 text-gray-800">Browse All Bags</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Need something specific? Contact us to discuss your requirements or request a quote.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-primary-600 to-primary-700 text-white px-10 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}
