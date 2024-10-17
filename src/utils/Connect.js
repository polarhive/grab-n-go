import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from '../pages/hero/Hero.js'
import SignUp from '../pages/auth/SignUp.js';
import Login from '../pages/auth/Login.js';

export default function Link() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/auth/Login.js" element={<Login />} />
        <Route path="/auth/SignUp.js" element={<SignUp />} />
      </Routes>
    </Router>
  );
}