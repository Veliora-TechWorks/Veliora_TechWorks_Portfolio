const { initializeApp } = require('firebase/app')
const { getFirestore, collection, addDoc, query, where, getDocs } = require('firebase/firestore')
const bcrypt = require('bcryptjs')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

async function initAdmin() {
  try {
    const app = initializeApp(firebaseConfig)
    const db = getFirestore(app)
    
    console.log('Connected to Firestore')

    // Check if admin already exists
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', 'admin@veliora.tech'))
    const querySnapshot = await getDocs(q)

    if (!querySnapshot.empty) {
      console.log('Admin user already exists')
      return
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)
    await addDoc(collection(db, 'users'), {
      email: 'admin@veliora.tech',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date()
    })

    console.log('Admin user created successfully')
    console.log('Email: admin@veliora.tech')
    console.log('Password: admin123')

  } catch (error) {
    console.error('Error creating admin user:', error)
  }
}

initAdmin()