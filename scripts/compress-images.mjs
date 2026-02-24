import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const ROOTS = ['public/catalog', 'public/gallery']
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png'])
const WEBP_QUALITY = Number(process.env.WEBP_QUALITY || 62)
const MAX_DIMENSION = Number(process.env.MAX_IMAGE_DIM || 2200)
const DELETE_ORIGINALS = process.env.DELETE_ORIGINALS === '1'

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(full)))
    } else {
      files.push(full)
    }
  }

  return files
}

async function convertToWebp(srcPath) {
  const ext = path.extname(srcPath).toLowerCase()
  if (!SOURCE_EXTS.has(ext)) return null

  const outPath = srcPath.slice(0, -ext.length) + '.webp'
  const tempPath = outPath + '.tmp'
  const srcStat = await fs.stat(srcPath)

  try {
    const existing = await fs.stat(outPath)
    if (existing.mtimeMs >= srcStat.mtimeMs) {
      return {
        srcPath,
        outPath,
        srcBytes: srcStat.size,
        outBytes: existing.size,
        skipped: true,
        deleted: false,
      }
    }
  } catch {
    // continue
  }

  const image = sharp(srcPath, { failOn: 'none' }).rotate()
  const metadata = await image.metadata()

  if ((metadata.width || 0) > MAX_DIMENSION || (metadata.height || 0) > MAX_DIMENSION) {
    image.resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  await image.webp({ quality: WEBP_QUALITY, effort: 4 }).toFile(tempPath)

  const outStat = await fs.stat(tempPath)

  await fs.rename(tempPath, outPath)
  let deleted = false
  if (DELETE_ORIGINALS) {
    try {
      await fs.unlink(srcPath)
      deleted = true
    } catch {
      deleted = false
    }
  }

  return {
    srcPath,
    outPath,
    srcBytes: srcStat.size,
    outBytes: outStat.size,
    skipped: false,
    deleted,
  }
}

async function main() {
  let converted = 0
  let skipped = 0
  let failed = 0
  let deleted = 0
  let totalBefore = 0
  let totalAfter = 0

  for (const root of ROOTS) {
    try {
      await fs.access(root)
    } catch {
      continue
    }

    const allFiles = await walk(root)
    const imageFiles = allFiles.filter((file) => SOURCE_EXTS.has(path.extname(file).toLowerCase()))

    for (const file of imageFiles) {
      try {
        const result = await convertToWebp(file)
        if (!result) continue
        if (result.skipped) {
          skipped += 1
        } else {
          converted += 1
          totalBefore += result.srcBytes
          totalAfter += result.outBytes
        }
        if (result.deleted) deleted += 1
      } catch (err) {
        failed += 1
        console.error('convert failed:', file, err)
      }
    }
  }

  const saved = Math.max(0, totalBefore - totalAfter)
  console.log(`converted=${converted}`)
  console.log(`skipped=${skipped}`)
  console.log(`deleted=${deleted}`)
  console.log(`failed=${failed}`)
  console.log(`before_bytes=${totalBefore}`)
  console.log(`after_bytes=${totalAfter}`)
  console.log(`saved_bytes=${saved}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
