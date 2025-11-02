// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcN9hg65lSOddIt9nbThTS0k5WGUV5FUo",
  authDomain: "netflixgpt-b40bb.firebaseapp.com",
  projectId: "netflixgpt-b40bb",
  storageBucket: "netflixgpt-b40bb.firebasestorage.app",
  messagingSenderId: "1069865098495",
  appId: "1:1069865098495:web:7ac57d5a24f7a2b10800ca",
  measurementId: "G-VX5D1NT931",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
