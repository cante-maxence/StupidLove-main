// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9IErvFpX4LVhuYSU9-80iBoGJ7ZBAkXA",
  authDomain: "stupidlove-0344.firebaseapp.com",
  projectId: "stupidlove-0344",
  storageBucket: "stupidlove-0344.appspot.com",
  messagingSenderId: "774567160823",
  appId: "1:774567160823:web:d54da7accd4c32d7725cf2",
  measurementId: "G-L4XWKQTPP7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth };
export { db };