import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthenticationContainer } from './authentication.styles';

const Authentication = () => {
  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;

///////////// Sign in with Redirect //////////////////

// import { useEffect } from 'react';
//import { getRedirectResult } from 'firebase/auth';

// useEffect(() => {
//   const getGoogleResponse = async () => {
//     const response = await getRedirectResult(auth);
//     if (response) {
//       const userDocRef = await createUserDocFromAuth(response.user);
//     }
//   };
//   getGoogleResponse();
// }, []);

/* <button onClick={signInWithGoogleRedirect}>
        Sign In with Google Redirect
      </button> */
