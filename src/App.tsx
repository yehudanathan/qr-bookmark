import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Config from "./pages/Config";
import Links from "./pages/Links";
import { isSignedIn } from "./apis/auth";
import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import About from "./pages/About";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isSignedIn().then((res) => {
      console.log("before: " + isAuthenticated);
      setIsAuthenticated(res);
      console.log("after: " + isAuthenticated);
      setIsLoading(false);
    });
  }, [isAuthenticated]);

  return (
    <>
      {!isLoading && (isAuthenticated ? <Outlet /> : <Navigate to="/signin" />)}
    </>
  );
};

const SignInRoute = () => {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    isSignedIn().then((res) => {
      console.log("Info retrieved; signed in state set.");
      setSignedIn(res);
    });
  }, [signedIn]);

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
              <Route path="config" element={<Config />} />
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
      {/* <Links /> */}
    </>
  );
}

export default App;
