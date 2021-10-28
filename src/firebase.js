// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getDatabase,  } from "firebase/database";
import { getAuth, onAuthStateChanged, getRedirectResult } from 'firebase/auth';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBwFwmSIhbxrKVV4Kn4jFRqa42vMkNlWdI',
    authDomain: "moveo-95e24.firebaseapp.com",
    projectId: "moveo-95e24",
    storageBucket: "moveo-95e24.appspot.com",
    messagingSenderId: "620622526026",
    appId: "1:620622526026:web:e1aa2a9c805293b3bf58b3"
  });

  const auth = getAuth();
  onAuthStateChanged(auth, user => { console.log(user); });

const signInWithEmailAndPassword = async (email, password) => {
    try {
        const db = getFirestore(firebaseApp);
        const q = query(collection(db, "users"), where("email", "==", email), where("password", "==", password));
        const snapshot = await getDocs(q);
        
        snapshot.forEach((doc) => {
            console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
          });
      //var result = await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export {
    // auth,
    signInWithEmailAndPassword,
  };