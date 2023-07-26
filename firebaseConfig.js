
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAeaUq9yWKm1GmNZfrqLPsqWdlTRSDmYoI",
  authDomain: "reactnative-tick.firebaseapp.com",
  projectId: "reactnative-tick",
  storageBucket: "reactnative-tick.appspot.com",
  messagingSenderId: "164448642532",
  appId: "1:164448642532:web:3258c7f7db3195cc2c13f1",
  measurementId: "G-HQ5LNB5V8K"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);