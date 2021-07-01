// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD86r_AXR9zqO0ubSolFUb7ZTirEiLn34o",
    authDomain: "whatsapp-clone-b608b.firebaseapp.com",
    projectId: "whatsapp-clone-b608b",
    storageBucket: "whatsapp-clone-b608b.appspot.com",
    messagingSenderId: "721012982801",
    appId: "1:721012982801:web:551f0d8ff9a239c169ddb0",
    measurementId: "G-M2SYJTEGMT"
  };

  const firebaseApp=firebase.initializeApp(firebaseConfig);

  const db=firebaseApp.firestore();
  const auth=firebase.auth();

  const provider= new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;