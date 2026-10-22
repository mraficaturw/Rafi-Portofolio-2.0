/**
 * Contact form service.
 * Handles Web3Forms submission.
 * Keeps external API calls out of components.
 */

/**
 * Submit a contact message via Web3Forms.
 *
 * @param {{ name: string, email: string, message: string }} data
 * @returns {Promise<void>}
 */
export async function submitContactMessage({ name, email, message }) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
      subject: `Portfolio Contact - ${trimmedName}`,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to send message via Web3Forms.');
  }
}
