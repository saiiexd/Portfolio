'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ContactFormData, FormStatus } from '@/types'
import { SITE_CONFIG } from '@/lib/constants'
import { Send, CheckCircle, AlertCircle, ExternalLink, Mail } from 'lucide-react'
import styles from './ContactForm.module.scss'

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [lastSubmitted, setLastSubmitted] = useState<ContactFormData | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactFormData>()

  const getMailtoLink = () => {
    const vals = getValues()
    const subject = (lastSubmitted?.subject || vals.subject || 'Portfolio Inquiry').trim()
    const message = (lastSubmitted?.message || vals.message || '').trim()
    return `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  }

  const onSubmit = async (data: ContactFormData) => {
    setStatus('submitting')
    setLastSubmitted(data)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await res.json().catch(() => ({}))

      if (res.ok && result.success) {
        setStatus('success')
        reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      noValidate
      aria-label="Contact form"
    >
      {/* Hidden honeypot for spam bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none' }}
        {...register('botField')}
        aria-hidden="true"
      />

      {/* Name */}
      <div className={styles.field}>
        <label htmlFor="contact-name" className={styles.label}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder="Your name or organization"
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name', { required: 'Your name is required' })}
        />
        {errors.name && (
          <p id="name-error" className={styles.errorMsg} role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label htmlFor="contact-email" className={styles.label}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder="your.email@company.com"
          className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          {...register('email', {
            required: 'Your email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Please enter a valid email address',
            },
          })}
        />
        {errors.email && (
          <p id="email-error" className={styles.errorMsg} role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className={styles.field}>
        <label htmlFor="contact-subject" className={styles.label}>
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          className={styles.input}
          placeholder="e.g. AI/ML Engineer Role · Technical Discussion"
          {...register('subject')}
        />
      </div>

      {/* Message */}
      <div className={styles.field}>
        <label htmlFor="contact-message" className={styles.label}>
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder="Describe the opportunity, technical scope, or discussion topic..."
          className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message', {
            required: 'A message is required',
            minLength: { value: 10, message: 'Please write at least 10 characters' },
          })}
        />
        {errors.message && (
          <p id="message-error" className={styles.errorMsg} role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button & Direct Mail Option */}
      <div className={styles.submitRow}>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className={styles.submitBtn}
        >
          {status === 'submitting' ? (
            <span className={styles.spinner} aria-hidden="true" />
          ) : (
            <Send size={16} aria-hidden="true" />
          )}
          {status === 'submitting' ? 'Transmitting…' : 'Send Message'}
        </button>

        <a
          href={getMailtoLink()}
          className={styles.directMailBtn}
          title="Open in your default email client"
        >
          <Mail size={15} aria-hidden="true" />
          <span>Open Email Client</span>
        </a>
      </div>

      {/* Status messages */}
      <div aria-live="polite" aria-atomic="true">
        {status === 'success' && (
          <div className={styles.successMsg}>
            <CheckCircle size={18} aria-hidden="true" />
            <div>
              <strong>Message dispatched successfully!</strong>
              <p style={{ marginTop: '4px', fontSize: '13px', opacity: 0.9 }}>
                Delivered directly to {SITE_CONFIG.email}. I will review and reply within
                1–2 business days.
              </p>
            </div>
          </div>
        )}
        {status === 'error' && (
          <div className={styles.errorState}>
            <AlertCircle size={18} aria-hidden="true" />
            <div>
              <strong>Transmission issue encountered.</strong>
              <p style={{ marginTop: '4px', fontSize: '13px' }}>
                Please click below to send directly to{' '}
                <strong>{SITE_CONFIG.email}</strong> via your email app:
              </p>
              <div style={{ marginTop: '8px' }}>
                <a
                  href={getMailtoLink()}
                  className={styles.fallbackLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                  }}
                >
                  <span>Launch Mailto to {SITE_CONFIG.email}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}
