// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDdb0TMx7c3N1tjuZQKrsUvknj_N9RtRbQ",
    authDomain: "blitzmind-45b7f.firebaseapp.com",
    projectId: "blitzmind-45b7f",
    storageBucket: "blitzmind-45b7f.appspot.com",
    messagingSenderId: "370794671824",
    appId: "1:370794671824:web:06762a90816bb911b678d5",
    measurementId: "G-XX1EVXWKFL"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
export {auth, firebase}
