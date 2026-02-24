import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Request Samples',
  description:
    'Request paper bag samples from Bagco for pharmacy, veterinary, and custom printed product orders.',
}

export default function RequestSampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
