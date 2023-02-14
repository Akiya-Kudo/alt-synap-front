// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { Auth, getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQDnvr2OmIJIOf6p5BrRt9rJxaQwpTK9w",
    authDomain: "tipsy-c5831.firebaseapp.com",
    projectId: "tipsy-c5831",
    storageBucket: "tipsy-c5831.appspot.com",
    messagingSenderId: "305354854873",
    appId: "1:305354854873:web:e8d0a78206eeb111d789c8",
    measurementId: "G-M29TKM34S7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const storage = getStorage(app);

// const isSSR = typeof window === "undefined";
// console.log(isSSR);