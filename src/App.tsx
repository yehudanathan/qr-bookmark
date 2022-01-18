import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Config from "./pages/Config";
import Links from "./pages/Links";
import SignIn from "./pages/SignIn";
import { isSignedIn, authLogin } from "./apis/auth";
import { useEffect, useState } from "react";
import { truncate } from "fs";
import Register from "./pages/Register";

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

function App() {
  return (
    <>
      {/* {
        <Router>
          <Routes>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="" element={<Home />} />
              <Route path="config" element={<Config />} />
              <Route path="links" element={<Links />} />
            </Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path='*' element={<Navigate to='/'/>}></Route>
          </Routes>
        </Router>
      } */}
      <Register/>
    </>
  );
}

export default App;
