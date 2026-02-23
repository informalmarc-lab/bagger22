import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp']

function getImagesFromFolder(dir: string, design: string): { src: string; name: string }[] {
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
          src: `/catalog/veterinary/${design}/${file}`,
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
  const basePath = path.join(process.cwd(), 'public', 'catalog', 'veterinary')
  const vb1 = getImagesFromFolder(path.join(basePath, 'vb1'), 'vb1')
  const vb2 = getImagesFromFolder(path.join(basePath, 'vb2'), 'vb2')
  const vb6 = getImagesFromFolder(path.join(basePath, 'vb6'), 'vb6')

  return NextResponse.json({ vb1, vb2, vb6 })
}
