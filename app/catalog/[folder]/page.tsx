import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const RESERVED = new Set(['custom', 'pharmacy', 'veterinary'])
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp'])
const HIDDEN_PREFIX = '.'

const LABELS: Record<string, { title: string; description: string }> = {
  bakery: {
    title: 'Bakery Bags',
    description: 'Browse bakery paper bag designs and request pricing for your preferred sizes.',
  },
  college: {
    title: 'College & University Bags',
    description: 'Campus-themed bag styles and related paper packaging designs.',
  },
  dispensary: {
    title: 'Dispensary Bags',
    description: 'Dispensary-ready paper bag options with multiple design styles.',
  },
  faith: {
    title: 'Faith & Religious Bags',
    description: 'Faith and religious-themed paper bag design collection.',
  },
  grocery: {
    title: 'Grocery Bags',
    description: 'Paper grocery bag options for retail and checkout use cases.',
  },
  holiday: {
    title: 'Holiday Bags',
    description: 'Holiday-themed paper bag designs including seasonal programs.',
  },
  'magazine-comics': {
    title: 'Dispensary Store Bags',
    description: 'Bag options and print examples for dispensary storefront and counter use.',
  },
  minicases: {
    title: 'Mini Cases',
    description:
      'Mini cases are typically cheaper per order and come in smaller case counts, usually 500 or 1,000 bags per case. Email info@bagco.com for current options and pricing.',
  },
  pride: {
    title: 'Pride Bags',
    description: 'Pride-themed paper bag designs for inclusive retail programs.',
  },
  seasonal: {
    title: 'Seasonal Bags',
    description: 'Seasonal and holiday-style paper bag designs.',
  },
  usa: {
    title: 'USA Bags',
    description: 'USA-themed bag design collection with non-duplicate imported assets.',
  },
  winery: {
    title: 'Winery Bags',
    description: 'Winery and bottle-shop oriented paper bag design examples.',
  },
}

function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

function getImageList(dirPath: string, slug: string): { src: string; name: string }[] {
  const images: { src: string; name: string }[] = []
  if (!fs.existsSync(dirPath)) return images

  const walk = (current: string, webPrefix: string) => {
    const list = fs.readdirSync(current)
    for (const file of list) {
      const fullPath = path.join(current, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath, `${webPrefix}/${file}`)
      } else {
        const ext = path.extname(file).toLowerCase()
        if (!IMAGE_EXT.has(ext)) continue
        images.push({
          src: `${webPrefix}/${file}`.replace(/\\/g, '/'),
          name: path.basename(file, ext),
        })
      }
    }
  }

  walk(dirPath, `/catalog/${slug}`)
  return images.sort((a, b) => a.src.localeCompare(b.src))
}

function isCatalogDirectory(basePath: string, folderName: string): boolean {
  if (!folderName || folderName.startsWith(HIDDEN_PREFIX) || RESERVED.has(folderName)) {
    return false
  }

  const fullPath = path.join(basePath, folderName)
  try {
    return fs.statSync(fullPath).isDirectory()
  } catch {
    return false
  }
}

export async function generateStaticParams() {
  const catalogRoot = path.join(process.cwd(), 'public', 'catalog')
  if (!fs.existsSync(catalogRoot)) return []

  return fs
    .readdirSync(catalogRoot)
    .filter((folder) => isCatalogDirectory(catalogRoot, folder))
    .map((folder) => ({ folder }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ folder: string }>
}): Promise<Metadata> {
  const { folder } = await params
  const catalogRoot = path.join(process.cwd(), 'public', 'catalog')
  if (!isCatalogDirectory(catalogRoot, folder)) return {}
  const copy = LABELS[folder]
  const title = copy?.title || `${titleFromSlug(folder)} Bags`
  const description =
    copy?.description || `Browse ${titleFromSlug(folder)} bag designs and request pricing from Bagco.`
  return { title, description }
}

export default async function CatalogFolderPage({
  params,
}: {
  params: Promise<{ folder: string }>
}) {
  const { folder } = await params
  const catalogRoot = path.join(process.cwd(), 'public', 'catalog')
  if (!isCatalogDirectory(catalogRoot, folder)) notFound()

  const folderPath = path.join(catalogRoot, folder)

  const images = getImageList(folderPath, folder)
  const copy = LABELS[folder]
  const pageTitle = copy?.title || `${titleFromSlug(folder)} Bags`
  const description =
    copy?.description || `Browse ${titleFromSlug(folder)} paper bag options and request pricing.`

  return (
    <div className="bg-primary-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="section-container relative z-10">
          <Link href="/catalog" className="inline-block mb-6 text-primary-200 hover:text-white font-semibold transition-colors">
            ← Back to Catalog
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold">{pageTitle}</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">{description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="section-container">
          {images.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.src}
                  className="surface-card rounded-xl overflow-hidden"
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
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-600 text-lg">No images found in this catalog section yet.</p>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="section-container text-center">
          <Link
            href={`/contact?collection=${folder}`}
            className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Request a Quote for {pageTitle}
          </Link>
        </div>
      </section>
    </div>
  )
}
