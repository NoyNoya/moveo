// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore/lite";

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


const signIn = async (email, password, setShowUserNotFoundEror) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setShowUserNotFoundEror(true);
    }
  };
const logOut = () => signOut(auth);

const fetchUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
}

const updateDocument = async (uid, updatedData) => {
  const docRef = doc(db, "users", uid);
  return await setDoc(docRef, updatedData, { merge: true });
}

export {
  updateDocument,
  auth,
  logOut,
  fetchUser,
  signIn as signInWithEmailAndPassword,
};