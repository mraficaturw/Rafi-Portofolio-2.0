/**
 * Chat service.
 * Handles Firestore operations for the real-time chat room.
 * Keeps Firebase queries out of the ChatRoom component.
 */
import { db } from '../lib/firebase';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { COLLECTIONS, MAX_MESSAGE_LENGTH } from '../constants';

/**
 * Subscribe to real-time chat messages, ordered by creation time.
 *
 * @param {(messages: Array<{id: string, [key: string]: any}>) => void} callback
 * @returns {() => void} Unsubscribe function
 */
export function subscribeToMessages(callback) {
  const q = query(
    collection(db, COLLECTIONS.MESSAGES),
    orderBy('createdAt')
  );

  return onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(msgs);
  });
}

/**
 * Send a chat message.
 *
 * @param {{ text: string, uid: string, displayName: string, photoURL: string }} data
 * @returns {Promise<void>}
 */
export async function sendChatMessage({ text, uid, displayName, photoURL }) {
  if (!text || text.length > MAX_MESSAGE_LENGTH) {
    throw new Error('Invalid message');
  }

  await addDoc(collection(db, COLLECTIONS.MESSAGES), {
    text,
    uid,
    displayName: displayName || 'Anonymous',
    photoURL: photoURL || '',
    createdAt: serverTimestamp(),
  });
}

/**
 * Format a Firestore timestamp for display.
 *
 * @param {import('firebase/firestore').Timestamp | null} timestamp
 * @returns {string}
 */
export function formatMessageTime(timestamp) {
  if (!timestamp?.toDate) return '';
  return timestamp.toDate().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}
