// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: "AIzaSyCAIJkkLMF2no6waTa2ZAPmnLMOzzhFEc4",
  authDomain: "my-portfolio-64.firebaseapp.com",
  projectId: "my-portfolio-64",
  storageBucket: "my-portfolio-64.appspot.com",
  messagingSenderId: "951706751147",
  appId: "1:951706751147:web:7bb0ebbcee37302c5227ee",
  measurementId: "G-XPX6MR3QE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fireStore = getFirestore(app)
const storage = getStorage(app);
export {app, analytics,auth ,fireStore,storage}
