import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Home from "./pages/Home";
import Config from "./pages/Config";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";
import EditProfile from "./pages/EditProfile";
import ConfigureAccount from "./components/ConfigureAccount";
import Bookmark from "./pages/Bookmark";

// Instead of using PrivateRoute and SignInRoute here, where the content are actually quite similar, using a context should be better?
// Then the usage can be like

// <UserContext>
//   <Routes />
// </UserContext>

// function Routes() {
//   const { isLoggedIn } = useUserContext();
//   return {
//     isLoggedIn ? <LoggedInRoutes /> : <SignInRoutes />
//   }
// }

const PrivateRoute = () => {
  const auth = getAuth();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => { // TODO masukin firebase api
      if (user?.emailVerified) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    })
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.emailVerified) {
        setSignedIn(true);
      } else {
        setSignedIn(false);
      }});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (signedIn) {
    return (<Navigate to="/" />);
  } else {
    return (<Outlet />);
  }
}

function App() {
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
              {/* Not sure if it is just me, but I feel the bookmark cards page and add bookmark page should be on one page*/}
              {/* But anyway I'm not a UX designer so maybe I am wrong haha */}
              <Route path="links" element={<Bookmark />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="/signin" element={<SignInRoute />}>
              <Route path="" element={<AuthPage />} />
            </Route>
            {/*Usually when the body is empty <Component /> is preferable than <Component></Component>*/}
            <Route path="/register" element={<AuthPage />}></Route>
            <Route path='*' element={<Navigate to='/'/>}></Route>
          </Routes>
        </Router>
      }
    </>
  );
}

export default App;
