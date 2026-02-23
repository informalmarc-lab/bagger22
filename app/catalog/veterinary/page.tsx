'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type VetImage = { src: string; name: string }

const VET_DESIGNS = {
  vb1: {
    title: 'Veterinary Bag Design #VB1',
    description: "The cat's out of the bag! Our stock paper bags are the purr-fect match for every Veterinarian's office! Now available in three Quantity/Size options.",
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { name: 'Flat Pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case' },
    ],
  },
  vb2: {
    title: 'Veterinary Bag Design #VB2',
    description: 'Full Case of Veterinary Bags design #VB2 in three Quantity/Size options. Perfect for every Vet or Pet Store, these adorable bags will leave paw prints all over the hearts of your customers.',
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { name: 'Flat Pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case' },
    ],
  },
  vb6: {
    title: 'Veterinary Bag Design #VB6',
    description: 'Full Case of Veterinary Bags design #VB6 in three Quantity/Size options. Perfect for every Vet or Pet Store, these adorable bags will leave paw prints all over the hearts of your customers.',
    sizes: [
      { name: 'Pinch bottom #22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
      { name: 'Flat Pinch bottom #12', dims: '7" x 10"', qty: '3,000 per case' },
      { name: 'Square bottom #25', dims: '6" x 4" x 11"', qty: '1,000 per case' },
    ],
  },
}

export default function VeterinaryCatalog() {
  const [images, setImages] = useState<{ vb1: VetImage[]; vb2: VetImage[]; vb6: VetImage[] }>({
    vb1: [],
    vb2: [],
    vb6: [],
  })
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<VetImage | null>(null)

  const handleImageClick = (img: VetImage) => {
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
    fetch('/api/catalog/veterinary')
      .then((res) => res.json())
      .then((data) => setImages(data || { vb1: [], vb2: [], vb6: [] }))
      .catch(() => setImages({ vb1: [], vb2: [], vb6: [] }))
      .finally(() => setLoading(false))
  }, [])

  const combinedCustomExamples = [...images.vb1, ...images.vb2, ...images.vb6].filter((img) => {
    const upper = img.name.toUpperCase()
    return !upper.startsWith('VB1-') && !upper.startsWith('VB2-') && !upper.startsWith('VB6-')
  })

  const renderSection = (design: 'vb1' | 'vb2' | 'vb6') => {
    const info = VET_DESIGNS[design]
    const list = images[design]
    const stockPrefix = `${design.toUpperCase()}-`
    const stockImages = list.filter((img) => img.name.toUpperCase().startsWith(stockPrefix))

    return (
      <section key={design} className="py-12 border-b border-gray-200 last:border-b-0">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{info.title}</h2>
          <p className="text-gray-600 mb-6">{info.description}</p>

          {stockImages.length > 0 && (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {stockImages.map((img, idx) => (
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

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Available sizes</h3>
            <div className="grid md:grid-cols-3 gap-3">
              {info.sizes.map((s) => (
                <div key={s.name} className="bg-primary-50 p-3 rounded border border-gray-200">
                  <p className="font-semibold text-gray-800">{s.name}</p>
                  <p className="text-sm text-gray-600">{s.dims}</p>
                  <p className="text-sm text-gray-600">{s.qty}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link href="/contact" className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
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
          <h1 className="text-5xl md:text-6xl font-extrabold">Veterinary Bags Catalog</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Designs #VB1, #VB2, and #VB6</p>
        </div>
      </section>

      {loading ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-600 text-lg">Loading veterinary catalog...</p>
          </div>
        </section>
      ) : (
        <>
          {renderSection('vb1')}
          {renderSection('vb2')}
          {renderSection('vb6')}
          {combinedCustomExamples.length > 0 && (
            <section className="py-12 border-b border-gray-200">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-3 text-gray-800">Example Custom Bags</h2>
                <p className="text-gray-600 mb-6">Additional real-world custom veterinary bag examples.</p>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {combinedCustomExamples.map((img, idx) => (
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
              </div>
            </section>
          )}
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
