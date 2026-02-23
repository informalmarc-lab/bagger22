'use client'

import { useState } from 'react'

export default function RequestSamplePage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    bagType: '',
    preferredSize: '',
    shippingAddress: '',
    notes: '',
  })
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return
    setSending(true)

    const message = [
      'Sample request details:',
      `Preferred Size: ${formData.preferredSize || 'Not specified'}`,
      `Shipping Address: ${formData.shippingAddress}`,
      `Notes: ${formData.notes || 'N/A'}`,
    ].join('\n')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: 'Sample Request',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          bagType: formData.bagType || 'Sample Request',
          quantity: 'Sample pack',
          message,
        }),
      })

      if (!res.ok) throw new Error('Failed to send')

      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        bagType: '',
        preferredSize: '',
        shippingAddress: '',
        notes: '',
      })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      console.error('Sample request error:', err)
      alert('Failed to send sample request. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-primary-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold">Request Samples</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Tell us what you want and we will follow up with sample options.</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary-50 to-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-primary-50 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input id="name" name="name" autoComplete="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input id="email" name="email" type="email" autoComplete="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                <input id="phone" name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
                <input id="company" name="company" autoComplete="organization" value={formData.company} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500" />
              </div>

              <div>
                <label htmlFor="bagType" className="block text-sm font-semibold text-gray-700 mb-2">Bag Type</label>
                <select id="bagType" name="bagType" value={formData.bagType} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl">
                  <option value="">Select a type</option>
                  <option value="pharmacy">Pharmacy Bags</option>
                  <option value="veterinary">Veterinary Bags</option>
                  <option value="custom">Custom Printed Bags</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="preferredSize" className="block text-sm font-semibold text-gray-700 mb-2">Preferred Size / Style</label>
                <input id="preferredSize" name="preferredSize" value={formData.preferredSize} onChange={handleChange} placeholder='e.g., #25 (6" x 4" x 11")' className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" />
              </div>

              <div>
                <label htmlFor="shippingAddress" className="block text-sm font-semibold text-gray-700 mb-2">Shipping Address *</label>
                <textarea id="shippingAddress" name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} required rows={3} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"></textarea>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-2">Additional Notes</label>
                <textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"></textarea>
              </div>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl font-semibold">
                  Thank you. Your sample request has been sent.
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className={`w-full px-6 py-4 rounded-xl font-bold text-lg text-white shadow-lg transform transition ${sending ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800'}`}
              >
                {sending ? 'Sending...' : 'Submit Sample Request'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
