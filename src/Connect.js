import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './signup-page/SignUp.js';
import Hero from './heropage/hero.js';

export default function Link() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/hero" element={<Hero />} />
      </Routes>
    </Router>
  );
}