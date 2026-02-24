import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const CACHE_TTL_MS = 10 * 60 * 1000
const EXT_PRIORITY: Record<string, number> = { '.webp': 5, '.png': 4, '.jpg': 3, '.jpeg': 2, '.gif': 1 }

type CustomPayload = {
  '1-color': { src: string; name: string }[]
  '2-color': { src: string; name: string }[]
  '3-color': { src: string; name: string }[]
}

let cachedPayload: { data: CustomPayload; expiresAt: number } | null = null

function getImagesFromFolder(dir: string, folderName: string): { src: string; name: string }[] {
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
          src: `/catalog/custom/${folderName}/${file}`,
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

  const basePath = path.join(process.cwd(), 'public', 'catalog', 'custom')
  const oneColor = getImagesFromFolder(path.join(basePath, '1-color'), '1-color')
  const twoColor = getImagesFromFolder(path.join(basePath, '2-color'), '2-color')
  const threeColor = getImagesFromFolder(path.join(basePath, '3-color'), '3-color')

  const data: CustomPayload = {
    '1-color': oneColor,
    '2-color': twoColor,
    '3-color': threeColor,
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
