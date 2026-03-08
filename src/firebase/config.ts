import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tes clés récupérées depuis la console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpnZMqv6NWmqbrfy17aZ7dHQnPqPq6Q5Ng",
  authDomain: "gestionclubcaninv2.firebaseapp.com",
  projectId: "gestionclubcaninv2",
  storageBucket: "gestionclubcaninv2.firebasestorage.app",
  messagingSenderId: "897167468441",
  appId: "1:897167468441:web:a8f5f0f9e29155f4db5508",
  measurementId: "G-2LV96K7KNH"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de la base de données (Firestore)
export const db = getFirestore(app);
