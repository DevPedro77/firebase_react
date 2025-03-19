import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCOU2Y-bN1wueH0YxE7YLzFBw0Nd-tsv4A",
  authDomain: "react-app-bf9e1.firebaseapp.com",
  projectId: "react-app-bf9e1",
  storageBucket: "react-app-bf9e1.firebasestorage.app",
  messagingSenderId: "1084696728064",
  appId: "1:1084696728064:web:74ff48028aef23f762bee5",
  measurementId: "G-WHQBQVG6Z8"
};

//instaciando as configs
const firebaseApp = initializeApp(firebaseConfig);

//exportando a config do banco de dados
const db = getFirestore(firebaseApp);
const auth = getAuth();

export {db, auth};