import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCngPICiakOhyyjpF6RxMjqXXYpwZ5-RPA",
  authDomain: "interviewprep-dd35d.firebaseapp.com",
  projectId: "interviewprep-dd35d",
  storageBucket: "interviewprep-dd35d.firebasestorage.app",
  messagingSenderId: "792921212033",
  appId: "1:792921212033:web:bbb3f4af2721c648307980",
  measurementId: "G-MBFKJZQBXK",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
