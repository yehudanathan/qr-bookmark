import app from '..';
import {
  getAuth,
  updateProfile,
  signOut,
  UserInfo,
  User,
  updateEmail as setEmail,
  updatePassword as setPassword,
  onAuthStateChanged,
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
  if (auth.currentUser) setEmail(auth.currentUser, email).then(callback);
};

export const updatePassword = (password: string, callback: () => void) => {
    const auth = getAuth(app);
    if (auth.currentUser) setPassword(auth.currentUser, password).then(callback);
}

export const deleteUser = (callback: () => void) => {
    const auth = getAuth(app);
    if (auth.currentUser) auth.currentUser.delete().then(callback);
}

export const isVerified = () => {
  const user = getUser();
  if (user !== null) {
    return user.emailVerified;
  }
  return false;
};

export const callAuthAndThen = (callback: () => void, callbackFalse: () => void) => {
  const auth = getAuth(app);
  // bingung cara pake listener gimana :(

  // 1) i tried buat panggil callAuthAndThen() buat both PrivateRoute sama SignInRoute di App
  // doesn't work karena listenernya trigger call terus terusan, jadi ga ke redirect ke anything. jadi left with white screen

  // 2) also tried buat pake (getUser() && isVerified()) untuk useEffect di PrivateRoute doang, sedangkan SignInRoute tetep callAuthAndThen()
  // PrivateRoutenya tetep kerender terus"an even when the SignedIn state is set to true. jadi also left with white screen

  // 3) also tried buat gapake listener, jadi getUser && isVerified for both, works - ada signin screen showing,
  // tapi abis pencet button signin balik ke /signin (maybe getUser()nya belom selesai fetching(?))

  // 3a) apakah option 3) aja terus tapi disuruh nunggu sampe usernya dapet? ini caranya gimana ya, pake async kah?

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("user is signed in");
      callback();
    } else {
      console.log("user is not signed in");
      callbackFalse();
    }
  });
};

// if (getUser()) {
//   console.log("user is signed in");
//   callback();
// } else {
//   console.log("user is not signed in");
//   callbackFalse();
// }


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
