'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

type BagType = 'custom1' | 'custom2' | 'stock'
type BagSize = (typeof SIZE_ORDER)[number]

const SIZE_ORDER = ['21', '22', '23', '25', '26', '28', '12', '14', '15', '32', '35', '30'] as const

const PRICING: Record<BagType, Record<string, number>> = {
  custom1: { '21': 95.56, '22': 119.8, '23': 117.4, '25': 133.08, '26': 102.29, '28': 112.1, '12': 115.35, '14': 99.68, '15': 95.78 },
  custom2: { '21': 119.46, '22': 149.76, '23': 146.76, '25': 166.36, '26': 127.86, '28': 140.12, '12': 144.18, '14': 124.61, '15': 119.71 },
  stock: { '21': 95.56, '22': 119.81, '23': 117.41, '25': 65.91, '26': 102.29, '28': 112.1, '12': 115.35, '14': 99.69, '15': 95.78, '32': 70.84, '35': 90.84, '30': 116.03 },
}

const UNITS_PER_CASE: Record<string, number> = {
  '21': 3000,
  '22': 3000,
  '23': 3000,
  '25': 2000,
  '26': 1000,
  '28': 500,
  '12': 3000,
  '14': 2000,
  '15': 1000,
  '32': 1000,
  '35': 1000,
  '30': 500,
}

const SIZE_DIMS: Record<string, string> = {
  '21': '3.5" x 1.5" x 10"',
  '22': '4.5" x 2.25" x 11"',
  '23': '5" x 2" x 10"',
  '25': '6" x 4" x 11"',
  '26': '7" x 4" x 14"',
  '28': '8" x 5" x 17"',
  '12': '7" x 10"',
  '14': '9" x 11"',
  '15': '8.5" x 3.5" x 14.5"',
  '32': '9" x 5.5" x 18"',
  '35': '12" x 7" x 23"',
  '30': '12" x 7" x 25"',
}

export default function QuoteBuilderPage() {
  const [type, setType] = useState<BagType>('custom1')
  const [size, setSize] = useState<BagSize>('21')
  const [cases, setCases] = useState(4)
  const [isReorder, setIsReorder] = useState(false)

  const sizeOptions = useMemo(
    () => SIZE_ORDER.filter((id) => PRICING[type][id] !== undefined),
    [type]
  )

  const selectedSize = sizeOptions.includes(size) ? size : sizeOptions[0]
  const casePrice = PRICING[type][selectedSize] || 0
  const validCases = Number.isFinite(cases) ? Math.max(4, Math.floor(cases)) : 4
  const subtotal = casePrice * validCases
  const artFee = !isReorder && type.startsWith('custom') ? 50 : 0
  const total = subtotal + artFee
  const totalUnits = (UNITS_PER_CASE[selectedSize] || 0) * validCases

  return (
    <div className="bg-primary-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/catalog" className="inline-block mb-6 text-primary-200 hover:text-white font-semibold transition-colors">
            Back to Catalog
          </Link>
          <h1 className="text-5xl md:text-6xl font-extrabold">Build Your Bag Quote</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Instant estimate by bag type, size, and case count</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-primary-50 rounded-2xl shadow-xl p-8 space-y-6">
            <div>
              <label htmlFor="quote-type" className="block text-sm font-semibold text-gray-700 mb-2">Bag Type / Print</label>
              <select
                id="quote-type"
                value={type}
                onChange={(e) => {
                  const nextType = e.target.value as BagType
                  const nextOptions = SIZE_ORDER.filter((id) => PRICING[nextType][id] !== undefined)
                  setType(nextType)
                  if (!nextOptions.includes(selectedSize)) {
                  setSize((nextOptions[0] || '21') as BagSize)
                }
              }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
              >
                <option value="custom1">Custom 1-Color</option>
                <option value="custom2">Custom 3-Color</option>
                <option value="stock">Stock Bags</option>
              </select>
            </div>

            <div>
              <label htmlFor="quote-size" className="block text-sm font-semibold text-gray-700 mb-2">Bag Size</label>
              <select
                id="quote-size"
                value={selectedSize}
                onChange={(e) => setSize(e.target.value as BagSize)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
              >
                {sizeOptions.map((id) => (
                  <option key={id} value={id}>
                    #{id} - {SIZE_DIMS[id]} - {UNITS_PER_CASE[id].toLocaleString()} per case
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quote-cases" className="block text-sm font-semibold text-gray-700 mb-2">Number of Cases (Minimum 4)</label>
              <input
                id="quote-cases"
                type="number"
                min={4}
                value={validCases}
                onChange={(e) => setCases(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label htmlFor="quote-order-type" className="block text-sm font-semibold text-gray-700 mb-2">Order Type</label>
              <select
                id="quote-order-type"
                value={isReorder ? 'reorder' : 'first'}
                onChange={(e) => setIsReorder(e.target.value === 'reorder')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
              >
                <option value="first">First-Time Order</option>
                <option value="reorder">Exact Reorder</option>
              </select>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-2">
              <h2 className="text-3xl font-extrabold text-gray-800">Total: ${total.toFixed(2)}</h2>
              <p className="text-gray-700">Case Price: ${casePrice.toFixed(2)}</p>
              <p className="text-gray-700">Cases: {validCases}</p>
              <p className="text-gray-700">Total Bags: {totalUnits.toLocaleString()}</p>
              <p className="text-gray-700">4 Week Lead Time</p>
              <p className="text-gray-700">Free Freight on 8+ Cases (Commercial Address)</p>
              <p className="font-semibold text-gray-800">Shipping not included in total.</p>
              {!isReorder && type.startsWith('custom') ? <p className="text-primary-700 font-semibold">$50 Art/Plate Fee Applied</p> : null}
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-block w-full text-center bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg hover:shadow-xl"
              >
                Request Final Quote
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
