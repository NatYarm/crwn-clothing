import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  //signInWithRedirect,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from 'firebase/firestore';

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
// const firebaseApp =
initializeApp(firebaseConfig);

// Set up authentication provider
const googleProvider = new GoogleAuthProvider();

// Call setCustomParameters
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// create authentication
export const auth = getAuth();

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// sign in with google redirect
// export const signInWithGoogleRedirect = () =>
//   signInWithRedirect(auth, googleProvider);

// Create database
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collecitonKey,
  objectsToAdd,
  field = 'title'
) => {
  const collectionRef = collection(db, collecitonKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
  if (!userAuth) return;

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
        ...additionalInfo,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }
  // if user data exists  return userDocRef
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
