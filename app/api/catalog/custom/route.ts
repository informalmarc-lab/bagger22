import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const CACHE_TTL_MS = 10 * 60 * 1000

type CustomPayload = {
  '1-color': { src: string; name: string }[]
  '2-color': { src: string; name: string }[]
  '3-color': { src: string; name: string }[]
}

let cachedPayload: { data: CustomPayload; expiresAt: number } | null = null

function getImagesFromFolder(dir: string, folderName: string): { src: string; name: string }[] {
  const images: { src: string; name: string }[] = []
  if (!fs.existsSync(dir)) return images

  try {
    const list = fs.readdirSync(dir)
    for (const file of list) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      const ext = path.extname(file).toLowerCase()
      if (!stat.isDirectory() && IMAGE_EXT.includes(ext)) {
        images.push({
          src: `/catalog/custom/${folderName}/${file}`,
          name: path.basename(file, ext),
        })
      }
    }
  } catch {
    // ignore
  }
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
