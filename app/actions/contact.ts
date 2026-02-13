'use server'

import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
})

export async function submitContactForm(data: z.infer<typeof contactSchema>) {
  const parsed = contactSchema.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' }
  }

  try {
    // Log the submission for now — Resend integration can be added
    // when RESEND_API_KEY is configured in environment variables
    console.info('Contact form submission:', {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || 'Not provided',
      message: parsed.data.message,
      timestamp: new Date().toISOString(),
    })

    // If Resend is configured, send email notification
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      await resend.emails.send({
        from: 'Reiki Practice <noreply@reiki-practice.ch>',
        to: process.env.CONTACT_EMAIL || 'info@reiki-practice.ch',
        subject: `New Contact: ${parsed.data.name}`,
        text: `
Name: ${parsed.data.name}
Email: ${parsed.data.email}
Phone: ${parsed.data.phone || 'Not provided'}

Message:
${parsed.data.message}
        `.trim(),
      })
    }

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    return { success: false, error: 'Failed to send message' }
  }
}
