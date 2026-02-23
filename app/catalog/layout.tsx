import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Catalog',
  description:
    'Browse Bagco catalog collections including custom printed, pharmacy, and veterinary paper bags with available sizes and case quantities.',
}

export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
