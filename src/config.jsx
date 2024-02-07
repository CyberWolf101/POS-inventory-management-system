import { initializeApp } from "firebase/app";
import { getFirestore, } from 'firebase/firestore';
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA8n4LA_jXXFfZgm81AIAB66iLRBNrXNq8",
  authDomain: "adscon-5db56.firebaseapp.com",
  projectId: "adscon-5db56",
  storageBucket: "adscon-5db56.appspot.com",
  messagingSenderId: "876409827602",
  appId: "1:876409827602:web:bf686bf3c4d2e69738c3cb"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDzOvajd6eTWIz7ICHhbxgOoji2U1MbAjM",
//   authDomain: "oshofri-df185.firebaseapp.com",
//   projectId: "oshofri-df185",
//   storageBucket: "oshofri-df185.appspot.com",
//   messagingSenderId: "503124590704",
//   appId: "1:503124590704:web:77776d4ad657120cdc74b5"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const storage = getStorage()

export const auth = getAuth()