'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type PharmacyImage = { src: string; name: string; type: 'ty' | 'gs' | 'plastic-gs' }

const PRODUCT_INFO = {
  ty: {
    title: 'Pharmacy Bags - TY Design',
    description: 'Full Case of Pharmacy "Thank You" Bag design #TY in eight Quantity/Size options.',
    sizes: [
      { id: '21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case' },
      { id: '22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { id: '23', dims: '5" x 2" x 10"', qty: '3,000 per case' },
      { id: '25', dims: '6" x 4" x 11"', qty: '1,000 per case' },
      { id: '26', dims: '7" x 4" x 14"', qty: '1,000 per case' },
      { id: '28', dims: '8" x 5" x 17"', qty: '500 per case' },
      { id: '12', dims: '7" x 10"', qty: '3,000 per case' },
      { id: '14', dims: '9" x 11"', qty: '2,000 per case' },
      { id: '15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case' },
    ],
  },
  gs: {
    title: 'Pharmacy Bags - GS Design',
    description: 'Full Case of Stock Pharmacy Bag in "GS" design. These classic Pharmacy bags have been our most popular item for many years. They are perfect for any pharmacy and come in a range of Eight Quantity/Size options.',
    sizes: [
      { id: '21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case' },
      { id: '22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { id: '23', dims: '5" x 2" x 10"', qty: '3,000 per case' },
      { id: '25', dims: '6" x 4" x 11"', qty: '1,000 per case' },
      { id: '26', dims: '7" x 4" x 14"', qty: '1,000 per case' },
      { id: '28', dims: '8" x 5" x 17"', qty: '500 per case' },
      { id: '12', dims: '7" x 10"', qty: '3,000 per case' },
      { id: '14', dims: '9" x 11"', qty: '2,000 per case' },
      { id: '15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case' },
    ],
  },
  'plastic-gs': {
    title: 'Pharmacy Bags - Plastic GS Design',
    description: 'Full Case of Plastic Pharmacy Bags in our stock "GS" design. These classic Pharmacy bags have been a very popular item for many years. They are perfect for any pharmacy and come in a range of Three Quantity/Size options.',
    sizes: [
      { id: '32', dims: '9" x 5.5" x 18"', qty: '1,000 per case' },
      { id: '35', dims: '12" x 7" x 23"', qty: '1,000 per case' },
      { id: '30', dims: '12" x 7" x 25"', qty: '500 per case' },
    ],
  },
}

export default function PharmacyCatalog() {
  const [images, setImages] = useState<{ ty: PharmacyImage[]; gs: PharmacyImage[]; 'plastic-gs': PharmacyImage[] }>({
    ty: [],
    gs: [],
    'plastic-gs': [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<PharmacyImage | null>(null)

  const handleImageClick = (img: PharmacyImage) => {
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
    fetch('/api/catalog/pharmacy')
      .then((res) => res.json())
      .then((data) => setImages(data || { ty: [], gs: [], 'plastic-gs': [] }))
      .catch(() => setImages({ ty: [], gs: [], 'plastic-gs': [] }))
      .finally(() => setLoading(false))
  }, [])

  const renderSection = (type: 'ty' | 'gs' | 'plastic-gs') => {
    const info = PRODUCT_INFO[type]
    const typeImages = images[type]

    return (
      <section key={type} className="py-12 border-b border-gray-200 last:border-b-0">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{info.title}</h2>
          <p className="text-gray-600 mb-6">{info.description}</p>

          {/* Images */}
          {typeImages.length > 0 && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {typeImages.map((img, idx) => (
                <div
                  key={img.src + idx}
                  onClick={() => handleImageClick(img)}
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-100 cursor-pointer"
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

          {/* Size Options */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Sizes:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {info.sizes.map((size) => (
                <div key={size.id} className="bg-primary-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-800">#{size.id}</p>
                  <p className="text-sm text-gray-600">{size.dims}</p>
                  <p className="text-sm text-gray-600">{size.qty}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/contact"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Contact Us for Pricing
              </Link>
            </div>
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
          <Link href="/catalog" className="inline-block mb-6 text-primary-200 hover:text-white font-semibold transition-colors">
            ← Back to Catalog
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold">Pharmacy Bags Catalog</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Three types: TY Design, GS Design, and Plastic GS Design</p>
        </div>
      </section>

      {loading ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 text-lg">Loading pharmacy catalog...</p>
          </div>
        </section>
      ) : (
        <>
          {renderSection('ty')}
          {renderSection('gs')}
          {renderSection('plastic-gs')}
        </>
      )}

      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 text-center">
          <Link href="/contact" className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
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
