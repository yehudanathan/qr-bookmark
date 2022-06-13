import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification as sendVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import app from "..";

export const emailSignUp = (email, password) => {
  const auth = getAuth(app);
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    // ..
  });
}
export const emailSignIn = (email, password) => {
  const auth = getAuth(app);
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
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