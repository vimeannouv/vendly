import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaNLbxPrsuGmtL8mIv8_my-dPI_qB3Pc8",
  authDomain: "vendly-c5e77.firebaseapp.com",
  databaseURL: "https://vendly-c5e77-default-rtdb.firebaseio.com",
  projectId: "vendly-c5e77",
  storageBucket: "vendly-c5e77.firebasestorage.app",
  messagingSenderId: "7104525177",
  appId: "1:7104525177:web:ce3a2a6a9a4e5492f175a8",
  measurementId: "G-1HB35M7QHG",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
