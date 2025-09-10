import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Firestore collections
export const usersCollection = "users";
export const transactionsCollection = "transactions";
export const accountsCollection = "accounts";
export const categoriesCollection = "categories";

// Helper functions
export const getUserDoc = (userId) => doc(db, usersCollection, userId);
export const getTransactionsCollection = (userId) =>
  collection(db, usersCollection, userId, transactionsCollection);
export const getAccountsCollection = (userId) =>
  collection(db, usersCollection, userId, accountsCollection);

// Helper to verify the session cookie
export async function verifySessionCookie(sessionCookie) {
  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    return { uid: decodedClaims.uid, email: decodedClaims.email };
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return null;
  }
}

// Helper to create a session cookie
export async function createSessionCookie(idToken, expiresIn) {
  return auth.createSessionCookie(idToken, { expiresIn });
}

// Helper to revoke all sessions for a user
export async function revokeUserSessions(uid) {
  await auth.revokeRefreshTokens(uid);
}

export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  getDoc,
  setDoc,
};

export default null;
