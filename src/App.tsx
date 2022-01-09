import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Config from './pages/Config';
import Links from './pages/Links';
import SignIn from './pages/SignIn';
import { isSignedIn, authLogin } from './apis/auth';
import { useEffect, useState } from 'react';

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(() => true);
    isSignedIn().then(state => setSignedIn(state)).then(state => setLoading(false));
  }, [])

  console.log("signed in: " + signedIn);
  console.log("loading: " + loading);
  
  return (
    <>
      { !loading &&
        <Router>
        <Routes>
          <Route path = '/' render = {() => {signedIn? <Home/> : <Navigate to="/signin"/>}}></Route>
          <Route path = '/config' element = {signedIn? <Config/> : <Navigate to="/signin"/>}></Route>
          <Route path = '/links' element = {signedIn? <Links/> : <Navigate to="/signin"/>}></Route>
          <Route path = '/signin' element = {<SignIn/>}></Route> 
        </Routes>
        </Router>
      }
    </>
    );
}

// TODO: fix the navigate bug :(

export default App;
