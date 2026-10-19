import { NextResponse } from 'next/server'
import { SITE_CONFIG } from '@/lib/constants'

// Target recruiter email
const RECIPIENT_EMAIL = SITE_CONFIG.email // 'saivenkat262005@gmail.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, botField } = body

    // 1. Anti-spam honeypot check
    if (botField) {
      // Silently discard bot submissions
      return NextResponse.json({ success: true, message: 'Delivered' }, { status: 200 })
    }

    // 2. Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required' },
        { status: 400 },
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: 'Message must be at least 10 characters' },
        { status: 400 },
      )
    }

    // 3. Dispatch to form service (FormSubmit targeting official recipient email)
    // Custom endpoint can also be supplied via CONTACT_ENDPOINT in .env.local
    const endpoint =
      process.env.CONTACT_ENDPOINT ||
      `https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        _subject: subject?.trim()
          ? `[Portfolio Contact] ${subject.trim()}`
          : `[Portfolio Contact] Message from ${name.trim()}`,
        message: message.trim(),
        _replyto: email.trim(),
        _template: 'table',
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Contact form service error:', response.status, errText)
      return NextResponse.json(
        {
          success: false,
          error:
            'Delivery service encountered an issue. Please use the direct mailto link.',
        },
        { status: 502 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message delivered to ' + RECIPIENT_EMAIL,
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to process submission. Please use the direct email link.',
      },
      { status: 500 },
    )
  }
}
