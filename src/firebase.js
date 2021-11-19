import firebase from "firebase/compat/app";
import "firebase/compat/auth";

export const auth = firebase
  .initializeApp({
    // apiKey: "AIzaSyCEY2JqDoHr2AkwqRdDUideNP0TA07nIKM",
    // authDomain: "chatapp2-22f4c.firebaseapp.com",
    // projectId: "chatapp2-22f4c",
    // storageBucket: "chatapp2-22f4c.appspot.com",
    // messagingSenderId: "251375772774",
    // appId: "1:251375772774:web:1bdf0f2b1863b5f2b4f9a7",
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  })
  .auth();
