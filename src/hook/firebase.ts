// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH9IDaDZWv-CljRPaqwFTdVBaDA0FeUls",
  authDomain: "bycycle-759de.firebaseapp.com",
  projectId: "bycycle-759de",
  storageBucket: "bycycle-759de.firebasestorage.app",
  messagingSenderId: "400921965087",
  appId: "1:400921965087:web:7e12c8658398940d615b2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;