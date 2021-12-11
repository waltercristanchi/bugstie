// Import the functions you need from the SDKs you need
import { initializeApp, getFirebase } from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7bqBCmRDrXS56PVv2B6tenBE-kZRRmQE",
  authDomain: "bugsita-87dc5.firebaseapp.com",
  databaseURL: "https://bugsita-87dc5-default-rtdb.firebaseio.com",
  projectId: "bugsita-87dc5",
  storageBucket: "bugsita-87dc5.appspot.com",
  messagingSenderId: "50867759177",
  appId: "1:50867759177:web:d1c6dadedc4948d12df798"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage()
const reference = ref
const uBytes = uploadBytes
export {storage, reference, uBytes, app, getDownloadURL}