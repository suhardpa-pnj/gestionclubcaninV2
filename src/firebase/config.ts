import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Ces informations se trouvent dans la console Firebase (Paramètres du projet > Général)
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJET_ID",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de la base de données Firestore
export const db = getFirestore(app);
