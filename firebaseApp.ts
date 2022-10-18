// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore" 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GOOGLE_API_KEY,
  authDomain: "api-practice-34748.firebaseapp.com",
  projectId: "api-practice-34748",
  storageBucket: "api-practice-34748.appspot.com",
  messagingSenderId: "176420384681",
  appId: "1:176420384681:web:3fb0b169e97d935e055eb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 

export const initFirebase = () => {
  return app
}