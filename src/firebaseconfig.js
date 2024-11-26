// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6NfwmfzmDzJW9ZdNeYUJn_zOLu4aASWQ",
  authDomain: "fir-storage1-7813c.firebaseapp.com",
  projectId: "fir-storage1-7813c",
  storageBucket: "fir-storage1-7813c.firebasestorage.app",
  messagingSenderId: "1030083536302",
  appId: "1:1030083536302:web:3df939b82908ea8b9b943f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);