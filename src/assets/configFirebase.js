import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB_w3k1uJHg7YVPwxHwS7WyaW8LUsv8woE",
    authDomain: "coder-q-commerce.firebaseapp.com",
    projectId: "coder-q-commerce",
    storageBucket: "coder-q-commerce.appspot.com",
    messagingSenderId: "278796043051",
    appId: "1:278796043051:web:1b4a49d8ea55a08f36bb6e"
  };

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };