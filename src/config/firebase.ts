// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0q9o0O_4IVxYy2mrjK9TAbljrjSxx8TU",
  authDomain: "friends-land.firebaseapp.com",
  projectId: "friends-land",
  storageBucket: "friends-land.appspot.com",
  messagingSenderId: "962880649159",
  appId: "1:962880649159:web:b8ace946106eb724558be2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);