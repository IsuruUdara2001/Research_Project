// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";          // Add this
import { getFirestore } from "firebase/firestore";

// Replace these values with your Firebase web app config
const firebaseConfig = {
    apiKey: "AIzaSyAAgpbqXxhhDM9qzYona1ipkxifBhhTwC0",
    authDomain: "smartbeltmonitoring.firebaseapp.com",
    projectId: "smartbeltmonitoring",
    storageBucket: "smartbeltmonitoring.firebasestorage.app",
    messagingSenderId: "23504518224",
    appId: "1:23504518224:web:2fac685948cf3d6366a555",
    measurementId: "G-W9B6QEK08H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore reference
const db = getFirestore(app);

// Authentication reference
const auth = getAuth(app);   // Add this

export { db, auth };          // Export auth along with db
