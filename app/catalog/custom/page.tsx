'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type CustomImage = { src: string; name: string }

const INTRO =
  'Full-Custom bags for your company are just a click away. Choose a 1-, 2-, or 3-Color design to suit your needs and company brand below. Upon receipt of your order, our Sales Representatives will be in touch to receive your artwork, review proofs, and schedule the final delivery of your company\'s best bags ever. When ordering 10 cases or more, please call (252) 516-1944.'

const BULLETS = [
  '4 Case Minimum Order',
  'Orders over 10 Cases, Please Call (252) 516-1944',
  'Can Print on Front, Back, and Gussets (folded sides)',
  '30-50# Machine-Finished Paper',
  'Pinch-Bottom with Gusset or Flat-Bottom Styles',
  '4 Week Lead Time',
  '$50 Art/Plate Fee Applies to Initial Order and/or Re-Orders Requiring Changes',
  'FREE FREIGHT to Commercial Address for Orders of 8 Cases or More',
  'Orders Under 8 Total Cases Billed Standard UPS Shipping Rates',
]

const EXPERT_COPY =
  'Our Bag Experts are ready to work with you today to create your company\'s best bags ever. Simply submit your order and a Bagco representative will be in touch with you in less than 24 hours to receive your artwork and create a proof of your design.'

const CUSTOM_SECTIONS = {
  '1-color': {
    title: 'Full-Custom, 1-Color Bags',
    tagline: 'FULL-CUSTOM, 1-COLOR, BAGS ARE A HIGH VALUE OPTION!',
    bullets: ['Includes Custom Printing in 1 Stock Colors', ...BULLETS],
    sizes: null,
  },
  '2-color': {
    title: 'Full-Custom, 2-Color Bags',
    tagline: 'FULL-CUSTOM, 2-COLOR, BAGS ARE OUR MOST POPULAR OPTION!',
    bullets: ['Includes Custom Printing in 2 Stock Colors', ...BULLETS],
    sizes: [
      { id: '#21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case' },
      { id: '#22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { id: '#23', dims: '5" x 2" x 10"', qty: '3,000 per case' },
      { id: '#25', dims: '6" x 4" x 11"', qty: '2,000 per case' },
      { id: '#26', dims: '7" x 4" x 14"', qty: '1,000 per case' },
      { id: '#28', dims: '8" x 5" x 17"', qty: '500 per case' },
      { id: '#12', dims: '7" x 10"', qty: '3,000 per case' },
      { id: '#14', dims: '9" x 11"', qty: '2,000 per case' },
      { id: '#15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case' },
    ],
  },
  '3-color': {
    title: 'Full-Custom, 3-Color Bags',
    tagline: 'FULL-CUSTOM, 3-COLOR, BAGS ADD A SPLASH TO YOUR CHECKOUT!',
    bullets: ['Includes Custom Printing in 3 Stock Colors', ...BULLETS],
    sizes: [
      { id: '#21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case' },
      { id: '#22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { id: '#23', dims: '5" x 2" x 10"', qty: '3,000 per case' },
      { id: '#25', dims: '6" x 4" x 11"', qty: '2,000 per case' },
      { id: '#26', dims: '7" x 4" x 14"', qty: '1,000 per case' },
      { id: '#28', dims: '8" x 5" x 17"', qty: '500 per case' },
      { id: '#12', dims: '7" x 10"', qty: '3,000 per case' },
      { id: '#14', dims: '9" x 11"', qty: '2,000 per case' },
      { id: '#15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case' },
    ],
  },
} as const

export default function CustomGallery() {
  const [images, setImages] = useState<{
    '1-color': CustomImage[]
    '2-color': CustomImage[]
    '3-color': CustomImage[]
  }>({
    '1-color': [],
    '2-color': [],
    '3-color': [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<CustomImage | null>(null)

  const handleImageClick = (img: CustomImage) => {
    setSelectedImage(img)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null)
        document.body.style.overflow = 'unset'
      }
    }
    if (selectedImage) {
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage])

  useEffect(() => {
    fetch('/api/catalog/custom')
      .then((res) => res.json())
      .then((data) => {
        // Ensure we always have arrays even if folder is empty
        setImages({
          '1-color': data['1-color'] || [],
          '2-color': data['2-color'] || [],
          '3-color': data['3-color'] || [],
        })
      })
      .catch(() => setImages({ '1-color': [], '2-color': [], '3-color': [] }))
      .finally(() => setLoading(false))
  }, [])

  const renderSection = (key: '1-color' | '2-color' | '3-color') => {
    const info = CUSTOM_SECTIONS[key]
    const list = images[key]

    return (
      <section
        key={key}
        className="py-12 border-b border-gray-200 last:border-b-0"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-1 text-gray-800">
            {info.title}
          </h2>
          <p className="text-primary-600 font-semibold mb-4 uppercase tracking-wide text-sm">
            {info.tagline}
          </p>
          <p className="text-gray-600 mb-4">{EXPERT_COPY}</p>

          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6 text-sm">
            {info.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          {list.length > 0 && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {list.map((img, idx) => (
                <div
                  key={img.src + idx}
                  onClick={() => handleImageClick(img)}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-gray-100 cursor-pointer transform hover:scale-105"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={img.src}
                      alt={img.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {info.sizes && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Bag Size / Case Qty</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {info.sizes.map((s) => (
                  <div key={s.id} className="bg-primary-50 p-3 rounded border border-gray-200 text-sm">
                    <span className="font-semibold text-gray-800">{s.id}</span>
                    <span className="text-gray-600"> ({s.dims}) {s.qty}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center">
            <Link
              href="/contact"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Us for Pricing
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="bg-primary-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link
            href="/catalog"
            className="inline-block mb-6 text-primary-200 hover:text-white font-semibold transition-colors"
          >
            ← Back to Catalog
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold">
            Custom Printed Bags Gallery
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">
            1-Color, 2-Color, and 3-Color custom bags
          </p>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-gray-700 leading-relaxed">{INTRO}</p>
        </div>
      </section>

      {loading ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 text-lg">Loading custom catalog...</p>
          </div>
        </section>
      ) : (
        <>
          {renderSection('1-color')}
          {renderSection('2-color')}
          {renderSection('3-color')}
        </>
      )}

      <section className="py-16 bg-gradient-to-br from-gray-50 to-primary-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-primary-50 rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              10 Modern Bag-Making Machines and Full-Color Flexographic Printing
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Our 10 modern bag-making machines and full-color flexographic printing capability will meet your needs for quality, service, and price. We exceed expectations for our full-custom jobs every time, guaranteed. Bagco can produce custom bags to suit your image. ¿Se habla Español? You can also include a message in the language your customers speak. Send us your artwork or put our creative team to work to design just the right bag to carry your image, your message and your products.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 text-center">
          <Link
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* Zoom Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage.src}
              alt={selectedImage.name}
              width={1200}
              height={1200}
              className="max-w-full max-h-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  )
}
