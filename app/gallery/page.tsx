'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type GalleryImage = { src: string; folder: string; name: string }

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  useEffect(() => {
    fetch('/api/gallery?limit=96')
      .then((res) => res.json())
      .then((data) => {
        setImages(data.images || [])
      })
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    // Handle ESC key to close modal
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

  const handleImageClick = (img: GalleryImage) => {
    setSelectedImage(img)
    document.body.style.overflow = 'hidden' // Prevent background scrolling
  }

  const handleCloseModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset' // Restore scrolling
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  return (
    <div className="bg-primary-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold">Gallery</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">
            Explore our paper bag designs and manufacturing capabilities
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-600 text-lg">Loading gallery images...</p>
          ) : images.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <div
                  key={img.src + idx}
                  onClick={() => handleImageClick(img)}
                  className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-100 cursor-pointer transform hover:scale-105"
                >
                  <div className="aspect-square relative">
                    <Image
                      src={img.src}
                      alt={img.name}
                      fill
                      priority={idx < 12}
                      quality={54}
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">No images found in this section yet.</p>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container mx-auto px-4 text-center">
          <Link href="/contact" className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl">
            Contact Us for More Samples
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
              quality={80}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  )
}
