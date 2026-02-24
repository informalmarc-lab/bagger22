import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const BLOCKED_FOLDERS = new Set(['api'])
const EXT_PRIORITY: Record<string, number> = { '.webp': 5, '.png': 4, '.jpg': 3, '.jpeg': 2, '.gif': 1 }

function getImagesRecursive(root: string, folder: string, current = root): { src: string; name: string }[] {
  const imageMap = new Map<string, { src: string; name: string; ext: string }>()

  const walk = (currentDir: string) => {
    const list = fs.readdirSync(currentDir)
    for (const file of list) {
      const fullPath = path.join(currentDir, file)
      const stat = fs.statSync(fullPath)
      if (stat.isDirectory()) {
        walk(fullPath)
        continue
      }
      const ext = path.extname(file).toLowerCase()
      if (!IMAGE_EXT.includes(ext)) continue
      const relative = path.relative(root, fullPath).replace(/\\/g, '/')
      const key = relative.slice(0, -ext.length)
      const existing = imageMap.get(key)
      if (existing && (EXT_PRIORITY[existing.ext] || 0) >= (EXT_PRIORITY[ext] || 0)) {
        continue
      }
      imageMap.set(key, {
        src: `/catalog/${folder}/${relative}`,
        name: path.basename(file, ext),
        ext,
      })
    }
  }

  walk(current)
  return [...imageMap.values()].map(({ src, name }) => ({ src, name }))
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ folder: string }> }
) {
  const { folder } = await params
  if (!folder || BLOCKED_FOLDERS.has(folder)) {
    return NextResponse.json({ images: [] }, { status: 404 })
  }

  const catalogPath = path.join(process.cwd(), 'public', 'catalog', folder)

  if (!fs.existsSync(catalogPath)) {
    return NextResponse.json({ images: [] })
  }

  try {
    const images = getImagesRecursive(catalogPath, folder)
    images.sort((a, b) => a.src.localeCompare(b.src))
    return NextResponse.json({ images })
  } catch {
    return NextResponse.json({ images: [] })
  }
}
