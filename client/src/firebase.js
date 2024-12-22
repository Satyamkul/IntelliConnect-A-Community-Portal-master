// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClmQbd-ytT3gLqTVK6OyiU9QEjrtXPGtg",
  authDomain: "intelliconnect-df987.firebaseapp.com",
  projectId: "intelliconnect-df987",
  storageBucket: "intelliconnect-df987.firebasestorage.app",
  messagingSenderId: "798056058659",
  appId: "1:798056058659:web:982dc634ab3bc1137bc696",
  measurementId: "G-DYJYZFLTLD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
getAnalytics(app);

//Authentication

// Function to register a new user
const register = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User registered:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

// Function to log in a user
const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User logged in:", userCredential.user);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in user:", error);
    }
};

// Example usage
register("test@example.com", "password123");
login("test@example.com", "password123");

