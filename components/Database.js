import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: "ferry-app-7d4d2.firebaseapp.com",
  databaseURL: "https://ferry-app-7d4d2-default-rtdb.firebaseio.com",
  projectId: "ferry-app-7d4d2",
  storageBucket: "ferry-app-7d4d2.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appID,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();

export default db;
