// Import the functions you need from the SDKs you need
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";
import {getEnv} from './getEnv'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "mern-blog-9d340.firebaseapp.com",
  projectId: "mern-blog-9d340",
  storageBucket: "mern-blog-9d340.firebasestorage.app",
  messagingSenderId: "560371589655",
  appId: "1:560371589655:web:b8dd6b7690eaacb2213252"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}