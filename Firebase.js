import React from 'react';
import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBKqICbsOqVlXFrEbJ5nZMZJTameHUtSCE",
    authDomain: "appcadastro-c0fed.firebaseapp.com",
    projectId: "appcadastro-c0fed",
    storageBucket: "appcadastro-c0fed.appspot.com",
    messagingSenderId: "454194097712",
    appId: "1:454194097712:web:30453926fa5eeba95ec7f5",
    measurementId: "G-DZERZK042C"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

  export{db, provider, auth};

  const Firebase = () => {
      return null;
    };
    
    export default Firebase;
