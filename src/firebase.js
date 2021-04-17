import * as firebase from "firebase/app";
import "firebase/firestore";
import FIREBASE_CONFIG from "./firebaseConfig";

const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
const db = firebaseApp.firestore();

export { db };
