import app from "..";
import {
  getAuth,
  updateProfile,
  signOut,
  UserInfo,
  User,
  updateEmail as setEmail,
  updatePassword as setPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

export const getUser = (): User | null => {
  const auth = getAuth(app);
  return auth.currentUser;
};

export const updateUser = (
  userInfo: Partial<UserInfo>,
  callback: () => void
) => {
  const auth = getAuth(app);
  if (auth.currentUser)
    updateProfile(auth.currentUser, userInfo).then(callback);
};

export const updateEmail = (email: string, callback: () => void) => {
  const auth = getAuth(app);
  if (auth.currentUser)
    setEmail(auth.currentUser, email)
      .then(callback)
      .catch((error) => {
        console.log(error);
      });
};

export const updatePassword = (password: string, callback: () => void) => {
  const auth = getAuth(app);
  if (auth.currentUser)
    setPassword(auth.currentUser, password)
      .then(callback)
      .catch((error) => {
        console.log(error);
      });
};

export const deleteUser = (callback: () => void) => {
  const auth = getAuth(app);
  if (auth.currentUser) {
    auth.currentUser
      .delete()
      .then(callback)
      .catch((error) => {
        console.log(error);
      });
  }
};

export const isLoggedIn = () => {
  const user = getUser();
  return user !== null;
};

export const logOut = () => {
  const auth = getAuth(app);
  if (auth.currentUser) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  }
};

export const reAuthenticate = async (email, password) => {
  const auth = getAuth(app);
  const user = auth.currentUser;
  const credential = EmailAuthProvider.credential(email, password);

  if (user) {
    return reauthenticateWithCredential(user, credential)
      .then(() => {
        // User re-authenticated.
        console.log("reauthenticated");
        return "reauthenticated";
      })
      .catch((error) => {
        // An error ocurred
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
        // alert(errorCode);
        return errorCode;
      });
  }
};
