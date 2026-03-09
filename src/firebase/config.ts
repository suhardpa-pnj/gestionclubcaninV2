import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Tes clés récupérées depuis la console Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDpnZMqv6NWmqbrfy17aZ7dHQnPqPq6Q5Ng",
authDomain: "gestionclubcaninv2.firebaseapp.com",
  projectId: "gestionclubcaninv2",
  
  // ICI : On force l'application à utiliser ton bucket GCS
  storageBucket: "gestion-acv-storage", 
  
  messagingSenderId: "897167468441",
  appId: "1:897167468441:web:2f8b8f3b7b8f3b7b8f3b7b" // Ton App ID actuel
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app); // Export indispensable
