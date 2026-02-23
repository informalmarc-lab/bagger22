import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK || ''
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'contact-submissions.ndjson')

type Submission = {
  submissionType: string
  name: string
  email: string
  phone: string
  company: string
  bagType: string
  quantity: string
  message: string
}

function normalize(value: unknown, fallback = ''): string {
  if (typeof value !== 'string') return fallback
  const trimmed = value.trim()
  return trimmed || fallback
}

async function saveSubmission(submission: Submission) {
  await fs.mkdir(path.dirname(SUBMISSIONS_FILE), { recursive: true })
  const payload = {
    ...submission,
    createdAt: new Date().toISOString(),
  }
  await fs.appendFile(SUBMISSIONS_FILE, `${JSON.stringify(payload)}\n`, 'utf8')
}

async function sendToDiscord(submission: Submission): Promise<boolean> {
  if (!WEBHOOK_URL) return false

  const payload = {
    content: `**New Contact Form Submission**
**Type:** ${submission.submissionType}
**Name:** ${submission.name}
**Email:** ${submission.email}
**Phone:** ${submission.phone || 'N/A'}
**Company:** ${submission.company || 'N/A'}
**Bag Type:** ${submission.bagType || 'N/A'}
**Quantity:** ${submission.quantity || 'N/A'}
**Message:** ${submission.message}`,
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10000)

  try {
    const discordRes = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!discordRes.ok) {
      const text = await discordRes.text().catch(() => '')
      console.error('Discord webhook responded with', discordRes.status, text)
      return false
    }

    return true
  } catch (err) {
    console.error('Discord webhook request failed:', err)
    return false
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const submission: Submission = {
      submissionType: normalize(data?.submissionType, 'Contact Form'),
      name: normalize(data?.name),
      email: normalize(data?.email),
      phone: normalize(data?.phone, 'N/A'),
      company: normalize(data?.company, 'N/A'),
      bagType: normalize(data?.bagType, 'N/A'),
      quantity: normalize(data?.quantity, 'N/A'),
      message: normalize(data?.message),
    }

    if (!submission.name || !submission.email || !submission.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let stored = false
    try {
      await saveSubmission(submission)
      stored = true
    } catch (err) {
      console.error('Failed to save submission:', err)
    }

    const forwarded = await sendToDiscord(submission)

    if (!stored && !forwarded) {
      return NextResponse.json({ error: 'Unable to process submission right now' }, { status: 500 })
    }

    return NextResponse.json({ success: true, forwarded, stored })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
