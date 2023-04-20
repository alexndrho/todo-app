import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBKoWeEC52EDQ-ujheSQ_AvV3rKNIiaHpE',
  authDomain: 'todo-app-e1f61.firebaseapp.com',
  projectId: 'todo-app-e1f61',
  storageBucket: 'todo-app-e1f61.appspot.com',
  messagingSenderId: '578274698508',
  appId: '1:578274698508:web:cd205e6b6f63a36c489529',
  measurementId: 'G-DW8ZX8KBZZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };
