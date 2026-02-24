'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

const SIZE_ORDER = ['21', '22', '23', '25', '26', '28', '12', '14', '15', '32', '35', '30'] as const
type BagSize = (typeof SIZE_ORDER)[number]

const BAG_DESIGNS: Record<string, Record<string, number>> = {
  GS: { '21': 95.56, '22': 119.81, '23': 117.42, '25': 65.91, '26': 102.29, '28': 112.1, '12': 115.35, '14': 99.69, '15': 95.78, '32': 70.84, '35': 90.84, '30': 116.03 },
  TY: { '21': 95.56, '22': 119.81, '23': 117.41, '25': 65.91, '26': 102.29, '28': 112.1, '12': 115.35, '14': 99.69, '15': 95.78 },
  VB1: { '12': 115.35, '22': 119.81, '25': 65.91 },
  VB2: { '12': 115.35, '22': 119.81, '25': 65.91 },
  VB6: { '12': 115.35, '22': 119.81, '25': 65.91 },
  DS: { '12': 45.0, '21': 36.0, '23': 39.0, '25': 35.0 },
  PlasticGS: { '32': 70.84, '35': 90.84, '30': 116.03 },
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

const DESIGN_OPTIONS = Object.keys(BAG_DESIGNS)

export default function QuoteBuilderPage() {
  const [design, setDesign] = useState('GS')
  const [size, setSize] = useState<BagSize>((Object.keys(BAG_DESIGNS.GS)[0] || '21') as BagSize)
  const [cases, setCases] = useState(4)
  const [isReorder, setIsReorder] = useState(false)

  const sizeOptions = useMemo(() => {
    const available = Object.keys(BAG_DESIGNS[design] || {})
    return SIZE_ORDER.filter((id) => available.includes(id))
  }, [design])

  const selectedSize = sizeOptions.includes(size) ? size : sizeOptions[0]
  const casePrice = BAG_DESIGNS[design]?.[selectedSize] || 0
  const validCases = Number.isFinite(cases) ? Math.max(4, Math.floor(cases)) : 4
  const subtotal = casePrice * validCases
  const artFee = !isReorder && !design.startsWith('V') && design !== 'DS' ? 50 : 0
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
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Design-based estimate by size and case count</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-primary-50 rounded-2xl shadow-xl p-8 space-y-6">
            <div>
              <label htmlFor="quote-design" className="block text-sm font-semibold text-gray-700 mb-2">Bag Design / Type</label>
              <select
                id="quote-design"
                value={design}
                onChange={(event) => {
                  const nextDesign = event.target.value
                  const nextSizes = Object.keys(BAG_DESIGNS[nextDesign] || {})
                  setDesign(nextDesign)
                  setSize((nextSizes[0] || '21') as BagSize)
                }}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
              >
                {DESIGN_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="quote-size" className="block text-sm font-semibold text-gray-700 mb-2">Bag Size</label>
              <select
                id="quote-size"
                value={selectedSize}
                onChange={(event) => setSize(event.target.value as BagSize)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
              >
                {sizeOptions.map((id) => (
                  <option key={id} value={id}>
                    #{id} - {UNITS_PER_CASE[id].toLocaleString()} per case - ${BAG_DESIGNS[design][id].toFixed(2)}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-2">Dimensions: {SIZE_DIMS[selectedSize]}</p>
            </div>

            <div>
              <label htmlFor="quote-cases" className="block text-sm font-semibold text-gray-700 mb-2">Number of Cases (Minimum 4)</label>
              <input
                id="quote-cases"
                type="number"
                min={4}
                value={validCases}
                onChange={(event) => setCases(Number(event.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"
              />
            </div>

            <div>
              <label htmlFor="quote-order-type" className="block text-sm font-semibold text-gray-700 mb-2">Order Type</label>
              <select
                id="quote-order-type"
                value={isReorder ? 'reorder' : 'first'}
                onChange={(event) => setIsReorder(event.target.value === 'reorder')}
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
              {!isReorder && artFee > 0 ? <p className="text-primary-700 font-semibold">$50 Art/Plate Fee Applied</p> : null}
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
