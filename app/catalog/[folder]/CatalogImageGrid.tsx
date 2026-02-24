'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type CatalogImage = {
  src: string
  name: string
}

export default function CatalogImageGrid({ images }: { images: CatalogImage[] }) {
  const [selectedImage, setSelectedImage] = useState<CatalogImage | null>(null)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
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

  const openModal = (image: CatalogImage) => {
    setSelectedImage(image)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedImage(null)
    document.body.style.overflow = 'unset'
  }

  if (!images.length) {
    return <p className="text-center text-slate-600 text-lg">No images found in this catalog section yet.</p>
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((img) => (
          <button
            key={img.src}
            type="button"
            onClick={() => openModal(img)}
            className="surface-card rounded-xl overflow-hidden text-left cursor-zoom-in"
          >
            <div className="aspect-square relative bg-slate-100">
              <Image
                src={img.src}
                alt={img.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close image"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div
            className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.name}
              width={1400}
              height={1400}
              className="max-w-full max-h-full object-contain"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </>
  )
}
