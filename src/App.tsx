import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import Home from "./pages/Home";
import Config from "./pages/Config";
import Links from "./pages/Links";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";
import EditProfile from "./pages/EditProfile";
import ConfigureAccount from "./components/ConfigureAccount";
// PART FOR MOCK DATA
// uncomment this part if backend is not available
// import { isSignedIn } from "./apis/auth";
// import { isSignedIn } from "./firebase/auth/auth_user";

const PrivateRoute = () => {
  const auth = getAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, loading, error] = useAuthState(auth);

  // useEffect(() => {
  //   isSignedIn().then((res) => {
  //     console.log("before: " + isAuthenticated);
  //     setIsAuthenticated(res);
  //     console.log("after: " + isAuthenticated);
  //     setIsLoading(false);
  //   });;
  // }, [isAuthenticated]);

  useEffect(() => {
    auth.onAuthStateChanged(user => { // TODO masukin firebase api
      if (user?.emailVerified) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    })
  }, []);
  
  return (
    <>
      {!isLoading && (isAuthenticated ? <Outlet /> : <Navigate to="/signin" />)}
    </>
  );
};

const SignInRoute = () => {
  const [signedIn, setSignedIn] = useState(false);
  const auth = getAuth();

  // useEffect(() => {
  //   isSignedIn().then((res) => {
  //     console.log("Info retrieved; signed in state set.");
  //     setSignedIn(res);
  //   });
  // }, [signedIn]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }});
  }, []);

  if (signedIn) {
    return (<Navigate to="/" />);
  } else {
    return (<Outlet />);
  }
}

function App() {
  // console.log("rendering app");
  return (
    <>
      {
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="" element={<Home />} />
              <Route path="config" element={<Config />}> 
                <Route path="edit-profile" element={<EditProfile />} />
                <Route path="account" element={<ConfigureAccount />} />
              </Route>
              <Route path="links" element={<Links />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="/signin" element={<SignInRoute />}>
              <Route path="" element={<AuthPage />} />
            </Route>
            <Route path="/register" element={<AuthPage />}></Route>
            <Route path='*' element={<Navigate to='/'/>}></Route>
          </Routes>
        </Router>
      }
    </>
  );
}

export default App;
