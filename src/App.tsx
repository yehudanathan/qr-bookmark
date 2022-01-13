import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Config from './pages/Config';
import Links from './pages/Links';
import SignIn from './pages/SignIn';
import SideBar from './components/SideBar'

function App() {
  return (
    <Router>
      <SideBar />
      <Routes>
        <Route path = '/' element = {<Home/>} />
        <Route path = '/config' element = {<Config/>} />
        <Route path = '/links' element = {<Links/>} />
        <Route path = '/signin' element = {<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
