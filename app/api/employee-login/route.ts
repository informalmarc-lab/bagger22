import { NextResponse } from 'next/server'

const COOKIE_NAME = 'bagco_employee_auth'
const DEFAULT_PASSWORD = 'Bagsarefun'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const password = typeof body?.password === 'string' ? body.password : ''
    const nextPathRaw = typeof body?.next === 'string' ? body.next : '/quote-builder'
    const nextPath = nextPathRaw.startsWith('/') ? nextPathRaw : '/quote-builder'

    const expectedPassword = process.env.EMPLOYEE_PANEL_PASSWORD || DEFAULT_PASSWORD
    if (password !== expectedPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true, next: nextPath })
    response.cookies.set(COOKIE_NAME, 'ok', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 12,
    })

    return response
  } catch (error) {
    console.error('Employee login error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
