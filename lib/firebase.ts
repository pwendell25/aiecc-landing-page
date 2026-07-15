import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'
import { getFunctions, type Functions } from 'firebase/functions'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export { app }

// Auth and Functions validate the API key at initialization time, which throws
// during static export's prerender pass if `.env.local` isn't filled in yet.
// Lazy getters defer that call until something actually runs client-side.
let _auth: Auth | undefined
export function getFirebaseAuth(): Auth {
  if (!_auth) _auth = getAuth(app)
  return _auth
}

let _functions: Functions | undefined
export function getFirebaseFunctions(): Functions {
  if (!_functions) _functions = getFunctions(app)
  return _functions
}

let _storage: FirebaseStorage | undefined
export function getFirebaseStorage(): FirebaseStorage {
  if (!_storage) _storage = getStorage(app)
  return _storage
}
