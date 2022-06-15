// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVVuIV_VSvP3KPzpZk-HKbM9Fc-lyKJ2Q",
  authDomain: "qr-bookmark-36010.firebaseapp.com",
  databaseURL:
    "https://qr-bookmark-36010-default-rtdb.asia-southeast1.firebasedatabase.app", // database
  projectId: "qr-bookmark-36010",
  storageBucket: "qr-bookmark-36010.appspot.com", // buat nyimpen gambar
  messagingSenderId: "701979101978",
  appId: "1:701979101978:web:556b14b6b18c28f5077aa3",
  measurementId: "G-K61822L8X7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
