import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import 'firebase/compat/auth';


const firebaseConfig = {
      apiKey: "AIzaSyBE3IbpsEVC5YIypN5W3DaSWO80x5sNMvc",
      authDomain: "topagoapp.firebaseapp.com",
     // databaseURL: "https://creatovantag-default-rtdb.firebaseio.com",
      projectId: "topagoapp",
      storageBucket: "topagoapp.appspot.com",
      messagingSenderId: "548820232443",
      appId: "1:548820232443:web:f1e22434bd4555f7eb685e",
      measurementId: "G-0KF2N4YPMD"
  };

  firebase.initializeApp(firebaseConfig);

  firebase.firestore().settings({ experimentalForceLongPolling: true,  merge:true });

  export default firebase;


