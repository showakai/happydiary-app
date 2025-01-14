import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD204lkEVcqKi0KVousqhWOffMWcOVeMlI",
  authDomain: "diary-27a71.firebaseapp.com",
  projectId: "diary-27a71",
  storageBucket: "diary-27a71.firebasestorage.app",
  messagingSenderId: "904465741289",
  appId: "1:904465741289:web:b722df1b71794c797d4778",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, db, provider };
