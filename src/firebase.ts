// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0q0EiwCJMG7NDfW4lA9glh4S5lXhV5UU",
  authDomain: "scaffold-app-kailash.firebaseapp.com",
  projectId: "scaffold-app-kailash",
  storageBucket: "scaffold-app-kailash.appspot.com",
  messagingSenderId: "400416290345",
  appId: "1:400416290345:web:ee502d8dab00c715d04e38",
  measurementId: "G-807GPYF1TF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};