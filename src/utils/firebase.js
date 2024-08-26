// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeD8DMYJ16LyrC7dEPCqoINzj8z7Ri6wo",
  authDomain: "netflixgpt-14bdb.firebaseapp.com",
  projectId: "netflixgpt-14bdb",
  storageBucket: "netflixgpt-14bdb.appspot.com",
  messagingSenderId: "257062835103",
  appId: "1:257062835103:web:f8316935fa0b66f2d4a3aa",
  measurementId: "G-D6WG2SRC6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();


