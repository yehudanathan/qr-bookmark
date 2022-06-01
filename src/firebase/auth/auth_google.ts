import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../index";

const provider = new GoogleAuthProvider();

export const googleSignIn = () => {
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
    .then((result) => {
        // The signed-in user info.
        const user = result.user;
        return user;
    })
    .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log({ errorCode, errorMessage, email, credential });
    });
}
