import fs from 'fs/promises'
import path from 'path'

const ROOTS = ['public/catalog', 'public/gallery']
const VALID_EXTS = new Set(['.webp', '.png', '.jpg', '.jpeg', '.gif'])
const EXT_PRIORITY = new Map([
  ['.webp', 5],
  ['.png', 4],
  ['.jpg', 3],
  ['.jpeg', 2],
  ['.gif', 1],
])

const BASE_URL = process.env.WARMUP_BASE_URL || 'http://127.0.0.1:3000'
const LIMIT = Math.max(1, Number(process.env.WARMUP_LIMIT || 180))
const QUALITY = Math.max(30, Number(process.env.WARMUP_QUALITY || 56))
const SIZES = (process.env.WARMUP_SIZES || '420,750,1200')
  .split(',')
  .map((value) => Number(value.trim()))
  .filter((value) => Number.isFinite(value) && value > 0)
const CONCURRENCY = Math.max(1, Number(process.env.WARMUP_CONCURRENCY || 6))

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

async function collectPreferredImages() {
  const publicRoot = path.join(process.cwd(), 'public')
  const imageMap = new Map()

  for (const root of ROOTS) {
    const absRoot = path.join(process.cwd(), root)
    try {
      await fs.access(absRoot)
    } catch {
      continue
    }

    const files = await walk(absRoot)
    for (const file of files) {
      const ext = path.extname(file).toLowerCase()
      if (!VALID_EXTS.has(ext)) continue

      const relative = '/' + path.relative(publicRoot, file).replace(/\\/g, '/')
      const key = relative.slice(0, -ext.length)
      const existing = imageMap.get(key)
      const nextPriority = EXT_PRIORITY.get(ext) || 0
      const existingPriority = existing ? EXT_PRIORITY.get(existing.ext) || 0 : -1

      if (!existing || nextPriority > existingPriority) {
        imageMap.set(key, { url: relative, ext })
      }
    }
  }

  return [...imageMap.values()].map((entry) => entry.url).sort().slice(0, LIMIT)
}

async function warmOne(url, width) {
  const requestUrl = `${BASE_URL}/_next/image?url=${encodeURIComponent(url)}&w=${width}&q=${QUALITY}`
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  try {
    const res = await fetch(requestUrl, { signal: controller.signal })
    return res.ok
  } catch {
    return false
  } finally {
    clearTimeout(timeout)
  }
}

async function runPool(tasks, workerCount) {
  let nextIndex = 0
  const workers = new Array(workerCount).fill(0).map(async () => {
    while (nextIndex < tasks.length) {
      const index = nextIndex
      nextIndex += 1
      await tasks[index]()
    }
  })

  await Promise.all(workers)
}

async function main() {
  const images = await collectPreferredImages()
  if (!images.length) {
    console.log('No images found to warm.')
    return
  }

  const jobs = []
  let okCount = 0
  let failCount = 0

  for (const imageUrl of images) {
    for (const width of SIZES) {
      jobs.push(async () => {
        const ok = await warmOne(imageUrl, width)
        if (ok) okCount += 1
        else failCount += 1
      })
    }
  }

  console.log(`warming_images=${images.length}`)
  console.log(`warming_requests=${jobs.length}`)
  await runPool(jobs, CONCURRENCY)
  console.log(`warmup_ok=${okCount}`)
  console.log(`warmup_failed=${failCount}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
