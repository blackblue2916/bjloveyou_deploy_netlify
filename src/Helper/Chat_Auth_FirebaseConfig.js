// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWohe8fdGurhzhibyc4NyhhWG7QQwkM6A",
  authDomain: "bj-house-chat.firebaseapp.com",
  projectId: "bj-house-chat",
  storageBucket: "bj-house-chat.appspot.com",
  messagingSenderId: "742361527657",
  appId: "1:742361527657:web:d3191280d4a6e876bbb9f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "bj-house-chat");

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
