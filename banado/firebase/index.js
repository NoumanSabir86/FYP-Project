import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpAK84sKI8_Rsymz0jnzL-fD1z-eiSXhc",
  authDomain: "banado-50bce.firebaseapp.com",
  projectId: "banado-50bce",
  storageBucket: "banado-50bce.appspot.com",
  messagingSenderId: "811783591053",
  appId: "1:811783591053:web:fec9fc2d4540fdd92cfec4",
  measurementId: "G-XXBKJLFHEF",
};

// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const storage = firebase.storage();

export { storage, firebase as default };
