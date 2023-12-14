// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEJlGVDCqUQB8bgepxWYElSP2J-gqJusc",
  authDomain: "busybuy-ee7af.firebaseapp.com",
  projectId: "busybuy-ee7af",
  storageBucket: "busybuy-ee7af.appspot.com",
  messagingSenderId: "294199753456",
  appId: "1:294199753456:web:5318fcd280ce7d3d396035"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);