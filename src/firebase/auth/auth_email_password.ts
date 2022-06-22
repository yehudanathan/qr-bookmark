import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification as sendVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "..";

export const emailSignUp = async (email, password) => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    console.log(userCredential.user);
    return userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    // alert(errorCode);
    return errorCode;
  });
}
export const emailSignIn = async (email, password) => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    if (userCredential.user.emailVerified) {
      return userCredential.user;
    }
    return "auth/unverified-email";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    return errorCode;
  });
}

export const sendEmailVerification = (callback: VoidFunction) => {
  const auth = getAuth(app);
  if (auth.currentUser) {
    return sendVerification(auth.currentUser).then(callback);
  }
}

export const resetPassword = (email: string, callback: VoidFunction) => {
  const auth = getAuth(app);
  sendPasswordResetEmail(auth, email).then(callback);
}