import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDIBQ9Pc-hIWDZWL-0ksVyhvS2yp9k2BzU",
  authDomain: "system-tickets-47987.firebaseapp.com",
  projectId: "system-tickets-47987",
  storageBucket: "system-tickets-47987.appspot.com",
  messagingSenderId: "792546812611",
  appId: "1:792546812611:web:e6b1f125428551cd9db876",
  measurementId: "G-F91ZCGBLHB"
};

const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)

export { auth, db, storage };