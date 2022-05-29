import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification as sendVerification
} from "firebase/auth";
import app from "..";

export const emailSignUp = (email, password) => {
  const auth = getAuth(app);
  createUserWithEmailAndPassword(auth, email, password)
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
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
  });
}

export const sendEmailVerification = () => {
  const auth = getAuth(app);
  if (auth.currentUser) {
    return sendVerification(auth.currentUser);
  }
}