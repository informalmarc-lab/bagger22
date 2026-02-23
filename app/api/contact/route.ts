import { NextResponse } from 'next/server'

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK || ''

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Simple validation
    if (!data?.name || !data?.email || !data?.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Post to Discord webhook
    const payload = {
      content: `**New Contact Form Submission**
**Type:** ${data.submissionType || 'Contact Form'}
**Name:** ${data.name}
**Email:** ${data.email}
**Phone:** ${data.phone || 'N/A'}
**Company:** ${data.company || 'N/A'}
**Bag Type:** ${data.bagType || 'N/A'}
**Quantity:** ${data.quantity || 'N/A'}
**Message:** ${data.message}`,
    }

    const discordRes = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!discordRes.ok) {
      const text = await discordRes.text().catch(() => '')
      console.error('Discord webhook responded with', discordRes.status, text)
      return NextResponse.json({ error: 'Failed to forward to webhook' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
