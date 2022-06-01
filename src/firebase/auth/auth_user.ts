import { getAuth, updateProfile, signOut } from "firebase/auth";

export const getUser = () => {
    const auth = getAuth();
    return auth.currentUser;
}

export const updateUser = (user: AuthUser) => {
    const auth = getAuth();
    if (auth.currentUser) {
        return updateProfile(auth.currentUser, user);
    }
}

export const logOut = () => {
    const auth = getAuth();
    if (auth.currentUser) {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
}