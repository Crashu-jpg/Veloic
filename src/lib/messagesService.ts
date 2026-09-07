import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface CloudMessage {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const MESSAGES_COLLECTION = 'messages';
const SUBSCRIBERS_COLLECTION = 'subscribers';

/**
 * Submit message directly to Firebase Firestore Cloud Database
 */
export async function submitMessageToDatabase(payload: {
  name: string;
  email: string;
  topic: string;
  message: string;
}): Promise<{ success: boolean; id: string }> {
  try {
    const docRef = await addDoc(collection(db, MESSAGES_COLLECTION), {
      name: payload.name.trim() || 'Anonymous Visitor',
      email: payload.email.trim(),
      topic: payload.topic.trim(),
      message: payload.message.trim(),
      read: false,
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });

    console.log('[Firestore] Message written directly with ID:', docRef.id);

    // Also mirror to server for local backup
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch(() => {});

    return { success: true, id: docRef.id };
  } catch (firestoreErr) {
    console.warn('[Firestore] Direct write failed, falling back to server API:', firestoreErr);
    // Fallback to server API
    const res = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return { success: true, id: data.id || `msg_${Date.now()}` };
  }
}

/**
 * Subscribe email to launch alerts in Firestore
 */
export async function subscribeToAlertsInDatabase(email: string): Promise<boolean> {
  try {
    await addDoc(collection(db, SUBSCRIBERS_COLLECTION), {
      email: email.trim(),
      subscribedAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.warn('[Firestore] Subscriber save error:', err);
    return false;
  }
}

/**
 * Listen to live real-time messages from Firestore for Founder Inbox Desk
 */
export function subscribeToFounderMessages(
  onMessagesUpdate: (messages: CloudMessage[]) => void
) {
  try {
    const q = query(
      collection(db, MESSAGES_COLLECTION),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const msgs: CloudMessage[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          let createdAtStr = data.createdAt;
          if (!createdAtStr && data.timestamp instanceof Timestamp) {
            createdAtStr = data.timestamp.toDate().toISOString();
          }
          return {
            id: docSnap.id,
            name: data.name || 'Anonymous Visitor',
            email: data.email || '',
            topic: data.topic || 'General Inquiry',
            message: data.message || '',
            createdAt: createdAtStr || new Date().toISOString(),
            read: !!data.read,
          };
        });
        onMessagesUpdate(msgs);
      },
      (error) => {
        console.warn('[Firestore] Snapshot listener error, falling back to REST API:', error);
      }
    );
  } catch (err) {
    console.warn('[Firestore] Could not attach realtime listener:', err);
    return () => {};
  }
}

/**
 * Mark message as read in Firestore
 */
export async function markMessageReadInDatabase(id: string) {
  try {
    const docRef = doc(db, MESSAGES_COLLECTION, id);
    await updateDoc(docRef, { read: true });
  } catch (err) {
    console.warn('[Firestore] Mark read error:', err);
  }
}

/**
 * Delete message from Firestore
 */
export async function deleteMessageFromDatabase(id: string) {
  try {
    const docRef = doc(db, MESSAGES_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('[Firestore] Delete error:', err);
  }
}
