// Import the functions you need from the SDKs you need

import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth"
import { getFirestore } from "@firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyC5-dSkS_CNm3c1WL9hz6_AUOOqY65Se4E",

    authDomain: "authentication-ec77f.firebaseapp.com",

    projectId: "authentication-ec77f",

    storageBucket: "authentication-ec77f.appspot.com",

    messagingSenderId: "1037027074270",

    appId: "1:1037027074270:web:45e1bad2718f9e9821624f"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };