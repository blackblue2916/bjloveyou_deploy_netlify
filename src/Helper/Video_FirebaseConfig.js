// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHWzCTY_gsGa4bcj7fK5xepy_GV8p8428",
  authDomain: "lspvideo-blog.firebaseapp.com",
  databaseURL: "https://lspvideo-blog-default-rtdb.firebaseio.com",
  projectId: "lspvideo-blog",
  storageBucket: "lspvideo-blog.appspot.com",
  messagingSenderId: "666330965019",
  appId: "1:666330965019:web:044d7f7a06268ccbbf44be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig, "lspvideo-blog");
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
