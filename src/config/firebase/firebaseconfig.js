import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";  

const firebaseConfig = {
    apiKey: "AIzaSyBE3IbpsEVC5YIypN5W3DaSWO80x5sNMvc",
    authDomain: "topagoapp.firebaseapp.com",
    databaseURL: "https://creatovantag-default-rtdb.firebaseio.com",
    projectId: "topagoapp",
    storageBucket: "topagoapp.appspot.com",
    messagingSenderId: "548820232443",
    appId: "1:548820232443:web:f1e22434bd4555f7eb685e",
    measurementId: "G-0KF2N4YPMD"
 }

 const firebase = initializeApp(firebaseConfig);
 const db = getFirestore();
 export default { firebase, db };
 //console.log(app)
/*import firebase from "firebase/compat/app"
import "firebase/storage" 

const firebaseConfig = {
    apiKey: "AIzaSyBE3IbpsEVC5YIypN5W3DaSWO80x5sNMvc",
    authDomain: "topagoapp.firebaseapp.com",
    databaseURL: "https://creatovantag-default-rtdb.firebaseio.com",
    projectId: "topagoapp",
    storageBucket: "topagoapp.appspot.com",
    messagingSenderId: "548820232443",
    appId: "1:548820232443:web:f1e22434bd4555f7eb685e",
    measurementId: "G-0KF2N4YPMD"
  };

  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings({ experimentalForceLongPolling: true });

  export default firebase; */