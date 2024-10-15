import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './signup-page/Login.js';
import App from './App';
import Hero from './heropage/hero.js'
import SignUp from './signup-page/SignUp.js';


export default function Link() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup-page/Login.js" element={<Login />} />
        <Route path="/signup-page/SignUp.js" element={<SignUp />} />
      </Routes>
    </Router>
  );
}