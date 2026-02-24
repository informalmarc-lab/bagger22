import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const CACHE_TTL_MS = 5 * 60 * 1000
const DEFAULT_LIMIT = 160
const MAX_LIMIT = 800

type GalleryImage = { src: string; folder: string; name: string }
type GalleryManifest = { images: GalleryImage[]; folders: string[] }

let cachedManifest: { data: GalleryManifest; expiresAt: number } | null = null

function getImages(dir: string): GalleryImage[] {
  const results: GalleryImage[] = []
  let list: string[] = []

  try {
    if (!fs.existsSync(dir)) return results
    list = fs.readdirSync(dir)
  } catch {
    return results
  }

  for (const file of list) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)
    const ext = path.extname(file).toLowerCase()

    if (stat.isDirectory()) {
      results.push(...getImages(fullPath))
    } else if (IMAGE_EXT.includes(ext)) {
      const publicDir = path.join(process.cwd(), 'public')
      const relative = path.relative(publicDir, fullPath).replace(/\\/g, '/')

      // Calculate display folder name relative to public/gallery
      const galleryDir = path.join(publicDir, 'gallery')
      const folderRelative = path.relative(galleryDir, path.dirname(fullPath)).replace(/\\/g, '/')

      results.push({
        src: '/' + relative,
        folder: folderRelative === '.' || folderRelative === '' ? 'gallery' : folderRelative,
        name: path.basename(file, ext),
      })
    }
  }

  return results
}

function shuffleInPlace<T>(list: T[]) {
  for (let i = list.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = list[i]
    list[i] = list[j]
    list[j] = temp
  }
}

function getManifest(): GalleryManifest {
  const now = Date.now()
  if (cachedManifest && cachedManifest.expiresAt > now) {
    return cachedManifest.data
  }

  const publicDir = path.join(process.cwd(), 'public')
  const galleryPath = path.join(publicDir, 'gallery')
  const catalogPath = path.join(publicDir, 'catalog')

  const galleryImages = getImages(galleryPath)
  const catalogImages = getImages(catalogPath)
  const allImages = [...galleryImages, ...catalogImages]
  shuffleInPlace(allImages)

  const folders = [...new Set(allImages.map((i) => i.folder))].filter(Boolean).sort()
  const data = { images: allImages, folders }

  cachedManifest = {
    data,
    expiresAt: now + CACHE_TTL_MS,
  }

  return data
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  const limitParam = Number(params.get('limit'))
  const requestedLimit = Number.isFinite(limitParam) ? Math.floor(limitParam) : DEFAULT_LIMIT
  const limit = Math.max(1, Math.min(MAX_LIMIT, requestedLimit))

  const manifest = getManifest()
  const payload: GalleryManifest = {
    images: manifest.images.slice(0, limit),
    folders: manifest.folders,
  }

  return NextResponse.json(payload, {
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
