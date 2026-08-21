/**
 * useContactForm — Custom hook for contact form logic.
 * Manages form state, validation, cooldown, honeypot, and submission.
 * Delegates actual API/Firebase calls to contactService.
 */
import { useState } from 'react';
import { submitContactMessage } from '../../../services/contactService';
import { CONTACT_COOLDOWN_MS, SUCCESS_DISPLAY_MS } from '../../../constants';

const INITIAL_FORM_DATA = { name: '', email: '', message: '', botField: '' };
const COOLDOWN_KEY = 'lastContactSubmit';

function getInitialCooldown() {
  const lastSubmit = localStorage.getItem(COOLDOWN_KEY);
  if (lastSubmit) {
    const timeSince = Date.now() - parseInt(lastSubmit, 10);
    return timeSince < CONTACT_COOLDOWN_MS;
  }
  return false;
}

export default function useContactForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [cooldown, setCooldown] = useState(getInitialCooldown);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) return;
    if (isSubmitting) return;

    if (cooldown) {
      setErrorMsg('Anda telah mengirim pesan baru-baru ini. Silakan coba lagi nanti.');
      return;
    }

    // Honeypot check (bot prevention)
    if (formData.botField) {
      // Fake success for bots
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), SUCCESS_DISPLAY_MS);
      setFormData(INITIAL_FORM_DATA);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await submitContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      localStorage.setItem(COOLDOWN_KEY, Date.now().toString());
      setCooldown(true);

      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);

      setTimeout(() => {
        setSubmitted(false);
      }, SUCCESS_DISPLAY_MS);
    } catch (error) {
      setErrorMsg('Maaf, pesan gagal dikirim. Silakan periksa koneksi Anda dan coba lagi.');
      console.error('Contact form submission failed:', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    submitted,
    isSubmitting,
    errorMsg,
    handleChange,
    handleSubmit,
  };
}
