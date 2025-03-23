// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import the authentication module
import { getDatabase } from "firebase/database"; // Import Realtime Database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARHcrSbCf_DQVulSgcxVvegW0oTyjNiPM",
  authDomain: "billbird01-b1598.firebaseapp.com",
  projectId: "billbird01-b1598",
  storageBucket: "billbird01-b1598.appspot.com",
  messagingSenderId: "105139337060",
  appId: "1:105139337060:web:0b758d801bdac031ddac71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
const auth = getAuth(app);
const db = getDatabase(app); // Initialize Realtime Database

export { auth, db }; // Export auth and db for use in other files
