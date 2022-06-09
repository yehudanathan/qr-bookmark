import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification as sendVerification
} from "firebase/auth";
import app from "..";

export const emailSignUp = async (email, password) => {
  const auth = getAuth(app);
  return await createUserWithEmailAndPassword(auth, email, password)
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
  return await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    return userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({ errorCode, errorMessage });
    return errorCode;
  });
}

export const sendEmailVerification = () => {
  const auth = getAuth(app);
  if (auth.currentUser) {
    return sendVerification(auth.currentUser);
  }
}