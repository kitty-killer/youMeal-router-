import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyAYdIqIteoycXoAbEr2uLERj6NrSyhM4Ps",
    authDomain: "youmeal-ac6d1.firebaseapp.com",
    databaseURL: "https://youmeal-ac6d1-default-rtdb.firebaseio.com",
    projectId: "youmeal-ac6d1",
    storageBucket: "youmeal-ac6d1.firebasestorage.app",
    messagingSenderId: "116983110957",
    appId: "1:116983110957:web:9a9166cb7ba43c44bc47a4",
    measurementId: "G-W5LZPGN59E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export { app, auth, db };