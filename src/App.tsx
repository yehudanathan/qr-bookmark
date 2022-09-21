import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import Home from "./pages/Home";
import Config from "./pages/Config";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";
import EditProfilePage from "./pages/EditProfilePage";
import ConfigureAccountPage from "./pages/ConfigureAccountPage";
import BookmarkPage from "./pages/BookmarkPage";

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
      }
    });
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
                <Route path="edit-profile" element={<EditProfilePage />} />
                <Route path="account" element={<ConfigureAccountPage />} />
              </Route>
              <Route path="links" element={<BookmarkPage />} />
              <Route path="about" element={<About />} />
            </Route>
            <Route path="/signin" element={<SignInRoute />}>
              <Route path="" element={<AuthPage />} />
            </Route>
            <Route path="/register" element={<AuthPage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </Router>
      }
    </>
  );
}

export default App;
