import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  deleteDoc,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

// A Configuração de Firebase de Nossa Aplicação Web
const firebaseConfig = {
  apiKey: "AIzaSyDYuZfFIZPCxXmDcw9j3_dlkuyM-57OKWA",
  authDomain: "girl-talk-app.firebaseapp.com",
  databaseURL: "https://girl-talk-app-default-rtdb.firebaseio.com",
  projectId: "girl-talk-app",
  storageBucket: "girl-talk-app.appspot.com",
  messagingSenderId: "994363584873",
  appId: "1:994363584873:web:6cf262fb179661b8b00df8",
};

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);
// Inicializar authentication
export const auth = getAuth(app);
// inicializa o firestore
export const db = getFirestore(app);
// inicializa o storage
export const storage = getStorage(app);
//
const provedor = new GoogleAuthProvider();

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  provedor,
  GoogleAuthProvider,
};
