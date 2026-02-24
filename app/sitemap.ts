import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bagco.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = [
    '',
    '/about',
    '/catalog',
    '/catalog/custom',
    '/catalog/pharmacy',
    '/catalog/veterinary',
    '/gallery',
    '/shipping',
    '/contact',
    '/request-sample',
    '/quote-builder',
  ]

  const catalogRoot = path.join(process.cwd(), 'public', 'catalog')
  const dynamicCatalogRoutes =
    fs.existsSync(catalogRoot)
      ? fs
          .readdirSync(catalogRoot, { withFileTypes: true })
          .filter((entry) => entry.isDirectory())
          .map((entry) => `/catalog/${entry.name}`)
      : []

  const routes = [...new Set([...baseRoutes, ...dynamicCatalogRoutes])]

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.7,
  }))
}
