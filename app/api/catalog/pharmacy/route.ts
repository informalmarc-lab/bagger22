import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const CACHE_TTL_MS = 10 * 60 * 1000
const EXT_PRIORITY: Record<string, number> = { '.webp': 5, '.png': 4, '.jpg': 3, '.jpeg': 2, '.gif': 1 }

type PharmacyImage = {
  src: string
  name: string
  type: 'ty' | 'gs' | 'plastic-gs'
}

type PharmacyPayload = {
  ty: PharmacyImage[]
  gs: PharmacyImage[]
  'plastic-gs': PharmacyImage[]
}

let cachedPayload: { data: PharmacyPayload; expiresAt: number } | null = null

function getImagesFromFolder(dir: string, type: 'ty' | 'gs' | 'plastic-gs'): PharmacyImage[] {
  const imageMap = new Map<string, PharmacyImage & { ext: string }>()
  if (!fs.existsSync(dir)) return []

  try {
    const list = fs.readdirSync(dir)
    for (const file of list) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      const ext = path.extname(file).toLowerCase()
      if (!stat.isDirectory() && IMAGE_EXT.includes(ext)) {
        const name = path.basename(file, ext)
        const existing = imageMap.get(name)
        if (existing && (EXT_PRIORITY[existing.ext] || 0) >= (EXT_PRIORITY[ext] || 0)) {
          continue
        }
        imageMap.set(name, {
          src: `/catalog/pharmacy/${type}/${file}`,
          name,
          type,
          ext,
        })
      }
    }
  } catch {
    // Ignore errors
  }

  const images = [...imageMap.values()].map(({ ext, ...rest }) => rest)
  return images.sort((a, b) => a.src.localeCompare(b.src))
}

export async function GET() {
  const now = Date.now()
  if (cachedPayload && cachedPayload.expiresAt > now) {
    return NextResponse.json(cachedPayload.data, {
      headers: {
        'Cache-Control': 'public, max-age=120, s-maxage=600, stale-while-revalidate=1200',
      },
    })
  }

  const basePath = path.join(process.cwd(), 'public', 'catalog', 'pharmacy')
  
  const tyImages = getImagesFromFolder(path.join(basePath, 'ty'), 'ty')
  const gsImages = getImagesFromFolder(path.join(basePath, 'gs'), 'gs')
  const plasticGsImages = getImagesFromFolder(path.join(basePath, 'plastic-gs'), 'plastic-gs')

  const data: PharmacyPayload = {
    ty: tyImages,
    gs: gsImages,
    'plastic-gs': plasticGsImages,
  }

  cachedPayload = {
    data,
    expiresAt: now + CACHE_TTL_MS,
  }

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, max-age=120, s-maxage=600, stale-while-revalidate=1200',
    },
  })
}
