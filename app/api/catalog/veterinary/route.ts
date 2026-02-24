import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const CACHE_TTL_MS = 10 * 60 * 1000
const EXT_PRIORITY: Record<string, number> = { '.webp': 5, '.png': 4, '.jpg': 3, '.jpeg': 2, '.gif': 1 }

type VetPayload = {
  vb1: { src: string; name: string }[]
  vb2: { src: string; name: string }[]
  vb6: { src: string; name: string }[]
}

let cachedPayload: { data: VetPayload; expiresAt: number } | null = null

function getImagesFromFolder(dir: string, design: string): { src: string; name: string }[] {
  const imageMap = new Map<string, { src: string; name: string; ext: string }>()
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
          src: `/catalog/veterinary/${design}/${file}`,
          name,
          ext,
        })
      }
    }
  } catch {
    // ignore
  }
  const images = [...imageMap.values()].map(({ src, name }) => ({ src, name }))
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

  const basePath = path.join(process.cwd(), 'public', 'catalog', 'veterinary')
  const vb1 = getImagesFromFolder(path.join(basePath, 'vb1'), 'vb1')
  const vb2 = getImagesFromFolder(path.join(basePath, 'vb2'), 'vb2')
  const vb6 = getImagesFromFolder(path.join(basePath, 'vb6'), 'vb6')

  const data: VetPayload = { vb1, vb2, vb6 }
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
