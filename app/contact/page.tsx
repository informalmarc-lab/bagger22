'use client'

import { useState } from 'react'

type ApiResult = {
  success?: boolean
  forwarded?: boolean
  stored?: boolean
  error?: string
}

type UiStatus = {
  type: 'idle' | 'success' | 'warning' | 'error'
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    bagType: '',
    quantity: '',
    message: '',
  })

  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<UiStatus>({ type: 'idle', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (status.type !== 'idle') {
      setStatus({ type: 'idle', message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (sending) return

    setSending(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      let payload: ApiResult = {}
      try {
        payload = (await res.json()) as ApiResult
      } catch {
        payload = {}
      }

      if (!res.ok) {
        setStatus({ type: 'error', message: payload.error || 'Failed to send message. Please try again.' })
        return
      }

      if (payload.forwarded) {
        setStatus({ type: 'success', message: 'Message sent successfully and delivered to our team.' })
      } else if (payload.stored) {
        setStatus({
          type: 'warning',
          message:
            'Message received and saved, but live team notification is currently unavailable. We will still follow up.',
        })
      } else {
        setStatus({ type: 'error', message: 'Submission was not processed. Please try again.' })
        return
      }

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        bagType: '',
        quantity: '',
        message: '',
      })
    } catch (err) {
      console.error('Send error:', err)
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  const statusClassName =
    status.type === 'success'
      ? 'bg-green-50 border-green-200 text-green-700'
      : status.type === 'warning'
        ? 'bg-amber-50 border-amber-200 text-amber-700'
        : status.type === 'error'
          ? 'bg-red-50 border-red-200 text-red-700'
          : ''

  return (
    <div className="bg-primary-50">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold">Contact Us</h1>
          <p className="text-xl md:text-2xl mt-4 text-primary-100">Get in touch for quotes and custom orders</p>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-primary-50 to-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary-50 rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Get in Touch</h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Have questions about our paper bags or need a custom quote? Fill out the form and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-6">
                <div className="flex items-start p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl transition-transform duration-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 text-lg">Email</h3>
                    <p className="text-gray-700">
                      <a href="mailto:info@bagco.com" className="hover:text-primary-600 font-semibold underline">info@bagco.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl transition-transform duration-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 text-lg">Phone</h3>
                    <p className="text-gray-700">
                      <a href="tel:+12525161944" className="hover:text-primary-600 font-semibold underline">(252) 516-1944</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl transition-transform duration-200">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4 shadow-lg flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1 text-lg">Mailing Address</h3>
                    <p className="text-gray-700 leading-relaxed">
                      912 Houston Drive<br />
                      Monroe, North Carolina 28110
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
                  <label htmlFor="bagType" className="block text-sm font-semibold text-gray-700 mb-2">Bag Type Interest</label>
                  <select id="bagType" name="bagType" value={formData.bagType} onChange={handleChange} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl">
                    <option value="">Select a type</option>
                    <option value="custom">Custom Printed Bags</option>
                    <option value="dispensary">Dispensary Bags</option>
                    <option value="faith">Faith & Religion Bags</option>
                    <option value="seasonal">Seasonal & Holiday Bags</option>
                    <option value="pharmacy">Pharmacy Bags</option>
                    <option value="pride">Pride Bags</option>
                    <option value="usa">USA Bags</option>
                    <option value="veterinary">Veterinary Bags</option>
                    <option value="winery">Winery Bags</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-sm font-semibold text-gray-700 mb-2">Estimated Quantity</label>
                  <input id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="e.g., 1000, 5000, 10000+" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl"></textarea>
                </div>

                {status.type !== 'idle' ? (
                  <div className={`border px-4 py-3 rounded-xl font-semibold ${statusClassName}`}>
                    {status.message}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={sending}
                  aria-busy={sending}
                  className={`w-full px-6 py-4 rounded-xl font-bold text-lg text-white shadow-lg transform transition ${sending ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800'}`}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}