// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB_o3FHcaINAIEmh9F7RkXw4cPHvuQclg",
  authDomain: "buradashopapp.firebaseapp.com",
  projectId: "buradashopapp",
  storageBucket: "buradashopapp.appspot.com",
  messagingSenderId: "978958007073",
  appId: "1:978958007073:web:de1e1af5292466d6909c60"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;