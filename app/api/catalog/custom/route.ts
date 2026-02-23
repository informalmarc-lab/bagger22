import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

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
  const basePath = path.join(process.cwd(), 'public', 'catalog', 'custom')
  const oneColor = getImagesFromFolder(path.join(basePath, '1-color'), '1-color')
  const twoColor = getImagesFromFolder(path.join(basePath, '2-color'), '2-color')
  const threeColor = getImagesFromFolder(path.join(basePath, '3-color'), '3-color')

  return NextResponse.json({
    '1-color': oneColor,
    '2-color': twoColor,
    '3-color': threeColor,
  })
}
