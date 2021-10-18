import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBlsFGCgFMuAoq0t75-CYNLngQ9LekFzZE",
  authDomain: "clone-master-8a6b8.firebaseapp.com",
  projectId: "clone-master-8a6b8",
  storageBucket: "clone-master-8a6b8.appspot.com",
  messagingSenderId: "1084148835059",
  appId: "1:1084148835059:web:160e715193262eb9c84d86"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)


export { db, app }