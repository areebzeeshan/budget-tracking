// Mock Firebase configuration for demo mode - no external dependencies
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "demo-app-id",
}

// Mock authentication object
const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (callback) => {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem("demoUser")
    if (demoUser) {
      callback(JSON.parse(demoUser))
    } else {
      callback(null)
    }
    return () => {} // unsubscribe function
  },
  signInWithEmailAndPassword: async (email, password) => {
    // Demo login - accept any email/password
    const demoUser = {
      uid: "demo-user-123",
      email: email,
      displayName: email.split("@")[0],
    }
    localStorage.setItem("demoUser", JSON.stringify(demoUser))
    return { user: demoUser }
  },
  createUserWithEmailAndPassword: async (email, password) => {
    // Demo signup - accept any email/password
    const demoUser = {
      uid: "demo-user-123",
      email: email,
      displayName: email.split("@")[0],
    }
    localStorage.setItem("demoUser", JSON.stringify(demoUser))
    return { user: demoUser }
  },
  signOut: async () => {
    localStorage.removeItem("demoUser")
    return Promise.resolve()
  },
}

// Mock database object
const mockDb = {
  collection: (name) => ({
    add: (data) => Promise.resolve({ id: `demo-${Date.now()}` }),
    get: () => Promise.resolve({ docs: [] }),
    where: () => ({
      get: () => Promise.resolve({ docs: [] }),
    }),
  }),
}

// Mock Firestore functions
const mockCollection = (db, name) => ({
  add: (data) => Promise.resolve({ id: `demo-${Date.now()}` }),
  get: () => Promise.resolve({ docs: [] }),
})

const mockAddDoc = async (collection, data) => {
  return Promise.resolve({ id: `demo-${Date.now()}` })
}

const mockGetDocs = async (query) => {
  return Promise.resolve({ docs: [] })
}

const mockQuery = (collection, ...conditions) => {
  return collection
}

const mockOrderBy = (field, direction) => {
  return { field, direction }
}

const mockWhere = (field, operator, value) => {
  return { field, operator, value }
}

// Export mock implementations
export const auth = mockAuth
export const db = mockDb
export const collection = mockCollection
export const addDoc = mockAddDoc
export const getDocs = mockGetDocs
export const query = mockQuery
export const orderBy = mockOrderBy
export const where = mockWhere
export const onAuthStateChanged = mockAuth.onAuthStateChanged
export const signInWithEmailAndPassword = mockAuth.signInWithEmailAndPassword
export const createUserWithEmailAndPassword = mockAuth.createUserWithEmailAndPassword

export default null
