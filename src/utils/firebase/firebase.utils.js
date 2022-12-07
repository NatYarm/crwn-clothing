import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAIKXqaLgMWg9dkvvd0Rl_UQ2k08Ew6L38',
  authDomain: 'crwn-clothing-1d6ed.firebaseapp.com',
  projectId: 'crwn-clothing-1d6ed',
  storageBucket: 'crwn-clothing-1d6ed.appspot.com',
  messagingSenderId: '1080959593450',
  appId: '1:1080959593450:web:857c8b46b7027b4fde6093',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set up authentication
const provider = new GoogleAuthProvider();

// Call setCustomParameters
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth(); // create authentication
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Create database
export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  // if user data does not exist
  // create / set the doc with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth; // destructuring
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  // if user data exists  return userDocRef
  return userDocRef;
};
