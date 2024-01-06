// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx_cE2QH3OZnz5fQp7T8SqqDikULcGkK0",
  authDomain: "stack-overflow-clone-a6132.firebaseapp.com",
  projectId: "stack-overflow-clone-a6132",
  storageBucket: "stack-overflow-clone-a6132.appspot.com",
  messagingSenderId: "936663427170",
  appId: "1:936663427170:web:85bbbda40329c325f4093b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;