import React, { Suspense } from 'react';
import './ContactSection.css';
import { contactData } from '../../data/portfolioData';
import useContactForm from '../features/ContactForm/useContactForm';
const ChatRoom = React.lazy(() => import('../features/ChatRoom/ChatRoom'));

export default function ContactSection({ isActive }) {
  const {
    formData,
    submitted,
    isSubmitting,
    errorMsg,
    handleChange,
    handleSubmit,
  } = useContactForm();

  return (
    <section id="contact" className={`spa-section ${isActive ? 'active-section' : ''}`}>
      <div className="section-header">
        <span className="badge-gray">Contact me</span>
        <h2 className="section-title">Get in Touch</h2>
        <p className="section-subtitle">
          Hubungi saya untuk diskusi proyek, kolaborasi, atau sekadar bertanya.
        </p>
      </div>

      <div className="contact-chat-layout">
        {/* Left: Contact info + Form */}
        <div className="contact-column">
          <div className="contact-container" style={{ height: "650px" }}>
            <div className="contact-info">
              <h3 className="contact-info-title">{contactData.title}</h3>
              <p className="contact-info-desc">{contactData.description}</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              {submitted && (
                <div className="form-success-alert">
                  ✓ Terima kasih! Pesan Anda berhasil terkirim.
                </div>
              )}

              {errorMsg && (
                <div className="form-error-alert">
                  ✕ {errorMsg}
                </div>
              )}

              {/* Honeypot field (hidden from real users) */}
              <div style={{ display: 'none' }} aria-hidden="true">
                <label htmlFor="botField">Leave this field empty if you are human</label>
                <input
                  id="botField"
                  type="text"
                  name="botField"
                  value={formData.botField}
                  onChange={handleChange}
                  tabIndex="-1"
                  autoComplete="off"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">
                  Nama Lengkap
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Masukkan nama Anda..."
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="nama@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="form-textarea"
                  rows={4}
                  placeholder="Tuliskan pesan atau detail proyek Anda di sini..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                className="btn-primary contact-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Chat Room */}
        <div className="chat-column">
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', minHeight: '1000px', color: 'var(--text-secondary)' }}>Loading Chat Room...</div>}>
            <ChatRoom />
          </Suspense>
        </div>
      </div>

      <div className="social-links">
        <a href="https://github.com/mraficaturw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
        </a>
        <a href="https://linkedin.com/in/mraficaturw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="https://instagram.com/mraficw" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
        </a>
      </div>
    </section >
  );
}
