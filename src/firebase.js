// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// TODO: Take from key vault/secure place during run time:
const firebaseApp = initializeApp({
    apiKey: 'AIzaSyBwFwmSIhbxrKVV4Kn4jFRqa42vMkNlWdI',
    authDomain: "moveo-95e24.firebaseapp.com",
    projectId: "moveo-95e24",
    storageBucket: "moveo-95e24.appspot.com",
    messagingSenderId: "620622526026",
    appId: "1:620622526026:web:e1aa2a9c805293b3bf58b3"
  });
  
const auth = getAuth();

onAuthStateChanged(auth, user => {
    console.log(user); 
});

const db = getFirestore(firebaseApp);


const signIn = async (email, password) => {
    try {
        var authResult = await signInWithEmailAndPassword(auth, email, password);
        if (authResult.user) {
            const docRef = doc(db, "users", authResult.user.uid);
            const docSnap = await getDoc(docRef);
        }
    } catch (err) {
      console.error(err);
    }
  };

export {
auth,
signIn as signInWithEmailAndPassword,
};