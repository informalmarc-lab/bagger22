import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

type PharmacyImage = {
  src: string
  name: string
  type: 'ty' | 'gs' | 'plastic-gs'
}

function getImagesFromFolder(dir: string, type: 'ty' | 'gs' | 'plastic-gs'): PharmacyImage[] {
  const images: PharmacyImage[] = []
  if (!fs.existsSync(dir)) return images

  try {
    const list = fs.readdirSync(dir)
    for (const file of list) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      const ext = path.extname(file).toLowerCase()
      if (!stat.isDirectory() && IMAGE_EXT.includes(ext)) {
        images.push({
          src: `/catalog/pharmacy/${type}/${file}`,
          name: path.basename(file, ext),
          type,
        })
      }
    }
  } catch {
    // Ignore errors
  }

  return images.sort((a, b) => a.src.localeCompare(b.src))
}

export async function GET() {
  const basePath = path.join(process.cwd(), 'public', 'catalog', 'pharmacy')
  
  const tyImages = getImagesFromFolder(path.join(basePath, 'ty'), 'ty')
  const gsImages = getImagesFromFolder(path.join(basePath, 'gs'), 'gs')
  const plasticGsImages = getImagesFromFolder(path.join(basePath, 'plastic-gs'), 'plastic-gs')

  return NextResponse.json({
    ty: tyImages,
    gs: gsImages,
    'plastic-gs': plasticGsImages,
  })
}
