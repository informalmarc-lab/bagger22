import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

function getImages(dir: string, baseUrl: string): { src: string; folder: string; name: string }[] {
  const results: { src: string; folder: string; name: string }[] = []
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
      results.push(...getImages(fullPath, baseUrl))
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

export async function GET() {
  const publicDir = path.join(process.cwd(), 'public')
  const galleryPath = path.join(publicDir, 'gallery')
  const catalogPath = path.join(publicDir, 'catalog')

  const galleryImages = getImages(galleryPath, '/gallery')
  const catalogImages = getImages(catalogPath, '/catalog')
  
  const allImages = [...galleryImages, ...catalogImages]
    .sort(() => Math.random() - 0.5) // Randomize all

  const folders = [...new Set(allImages.map((i) => i.folder))].filter(Boolean).sort()

  return NextResponse.json({ images: allImages, folders })
}
