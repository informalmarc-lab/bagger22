'use client'

import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function EmployeeLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [nextPath, setNextPath] = useState('/quote-builder')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const nextPathRaw = params.get('next') || '/quote-builder'
    setNextPath(nextPathRaw.startsWith('/') ? nextPathRaw : '/quote-builder')
  }, [])

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (loading) return

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/employee-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, next: nextPath }),
      })

      if (!response.ok) {
        setError('Invalid employee password.')
        return
      }

      router.push(nextPath)
    } catch (submitError) {
      console.error('Employee login failed:', submitError)
      setError('Unable to sign in right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] bg-primary-50 py-20">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-primary-50 rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Employee Login</h1>
          <p className="text-gray-600 mb-6">Enter employee password to access internal quote tools.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="employee-password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                id="employee-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {error ? (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-xl font-semibold text-white transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800'
              }`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
