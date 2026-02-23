import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
const BLOCKED_FOLDERS = new Set(['api'])

function getImagesRecursive(root: string, folder: string, current = root): { src: string; name: string }[] {
  const images: { src: string; name: string }[] = []
  const list = fs.readdirSync(current)
  for (const file of list) {
    const fullPath = path.join(current, file)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      images.push(...getImagesRecursive(root, folder, fullPath))
      continue
    }
    const ext = path.extname(file).toLowerCase()
    if (!IMAGE_EXT.includes(ext)) continue
    const relative = path.relative(root, fullPath).replace(/\\/g, '/')
    images.push({
      src: `/catalog/${folder}/${relative}`,
      name: path.basename(file, ext),
    })
  }
  return images
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
