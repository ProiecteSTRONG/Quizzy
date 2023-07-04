// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBa5g_pu8b50ws_TqMN2cYJgJ1brwmajkw",
  authDomain: "quizzy-4de42.firebaseapp.com",
  projectId: "quizzy-4de42",
  storageBucket: "quizzy-4de42.appspot.com",
  messagingSenderId: "887023479183",
  appId: "1:887023479183:web:df9a617e8e8cdcbc1003fa",
  measurementId: "G-7GP89292SZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
