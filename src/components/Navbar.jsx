import { Link } from 'react-router-dom';
import { UtensilsCrossed, MenuIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="h-8 w-8 text-orange-600" />
          <span className="text-xl font-bold text-gray-800">Grab & Go</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-orange-600 transition-colors">Home</Link>
          <Link to="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">Contact</Link>
          <Link to="/about" className="text-gray-600 hover:text-orange-600 transition-colors">About</Link>
          <Link to="/login" className="text-gray-600 hover:text-orange-600 transition-colors">Login</Link>
          <Link
            to="/cart"
            className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
          >
            <MenuIcon className="h-5 w-5" />
            <span>Menu</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
