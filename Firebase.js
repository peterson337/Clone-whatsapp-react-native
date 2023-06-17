import React from 'react';
import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {getMetadata} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDwtrQLLUJnNS5xxUc3p0DBkCbmA1b2J-g",
    authDomain: "whats-app-clone-react-na-bb03d.firebaseapp.com",
    projectId: "whats-app-clone-react-na-bb03d",
    storageBucket: "whats-app-clone-react-na-bb03d.appspot.com",
    messagingSenderId: "849456330028",
    appId: "1:849456330028:web:560049cea8f8a5e18ae889",
    measurementId: "G-JWP62K3YVN"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const storage = getStorage(app);

    export{db, provider, auth, storage, getMetadata};

    const Firebase = () => {
        return null;
      };
      
      export default Firebase;