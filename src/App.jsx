import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Pickup from './components/Pickup';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pickup" element={<Pickup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
