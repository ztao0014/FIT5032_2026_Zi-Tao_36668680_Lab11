import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAqsWBZ976DihfMlDNdLJAIfhHfmBtwCyw",
  authDomain: "week7-zitao-36668680.firebaseapp.com",
  projectId: "week7-zitao-36668680",
  storageBucket: "week7-zitao-36668680.firebasestorage.app",
  messagingSenderId: "493740199185",
  appId: "1:493740199185:web:69f7ed701566e1da6b50b0"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

export { app, db }
