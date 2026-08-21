/**
 * Application-wide constants.
 * Centralizes magic numbers and repeated values.
 */

// ── Navigation ──────────────────────────────────────────
export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'tools', label: 'Tools' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact me' },
];

export const VALID_SECTIONS = NAV_ITEMS.map((item) => item.id);

// ── Firestore collections ───────────────────────────────
export const COLLECTIONS = {
  CONTACTS: 'contacts',
  MESSAGES: 'messages',
};

// ── Contact form ────────────────────────────────────────
export const CONTACT_COOLDOWN_MS = 3_600_000; // 1 hour
export const SUCCESS_DISPLAY_MS = 5_000; // 5 seconds

// ── Chat ────────────────────────────────────────────────
export const MAX_MESSAGE_LENGTH = 1_000;
