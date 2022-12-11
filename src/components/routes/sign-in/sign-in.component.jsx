// import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';

import SignUpForm from '../../sign-up-form/sign-up-form.component';

import {
  //auth,
  signInWithGooglePopup,
  createUserDocFromAuth,
  //signInWithGoogleRedirect,
} from '../../../utils/firebase/firebase.utils';

const SignIn = () => {
  // SignIn With Google Popup
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);

    ///////////// Sign in with Redirect //////////////////
    // useEffect(() => {
    //   const getGoogleResponse = async () => {
    //     const response = await getRedirectResult(auth);
    //     if (response) {
    //       const userDocRef = await createUserDocFromAuth(response.user);
    //     }
    //   };
    //   getGoogleResponse();
    // }, []);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In with Google Popup</button>
      <SignUpForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign In with Google Redirect
      </button> */}
    </div>
  );
};

export default SignIn;
