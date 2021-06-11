import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyARwuTS16nqhaIgv4rDS66ON13Pn5cL3IY",
    authDomain: "cassa-1f2d9.firebaseapp.com",
    projectId: "cassa-1f2d9",
    storageBucket: "cassa-1f2d9.appspot.com",
    messagingSenderId: "511918458078",
    appId: "1:511918458078:web:243e5840b2557812b9ee4f"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;