import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UtensilsCrossed, MenuIcon, X } from "lucide-react";
import axios from "axios";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null); // User state
  const [loading, setLoading] = useState(true); // Loading state for user fetch
  const [userAuthenticated, setUserAuthenticated] = useState(false); // State to check if user is authenticated

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // Fetch user details from the backend
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/user`);

        if (response.data && response.data.name) {
          setUsername(response.data.name); // Set username if it exists
          setUserAuthenticated(true); // Mark user as authenticated
        } else {
          setUsername(null); // If no username, mark as not authenticated
          setUserAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUsername(null); // In case of error, mark as not authenticated
        setUserAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const currentPath = window.location.pathname;
  const isHome = currentPath === "/";

  // Menu items with dynamic last button
  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    {
      name: isHome ? "Login" : "Logout", // Show Login on homepage
      path: isHome ? "/login" : "/logout", // Redirect to login or logout
      className: "bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
    },
  ];

  return (
    <nav className="container mx-auto px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="h-8 w-8 text-orange-600" />
          <span className="text-xl font-bold text-gray-800">Grab & Go</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {menuItems.slice(0, -1).map((item) => (
            <Link key={item.name} to={item.path} className="text-gray-600 hover:text-orange-600 transition-colors">
              {item.name}
            </Link>
          ))}

          {/* The login/logout button */}
          <Link to={menuItems[menuItems.length - 1].path} className={menuItems[menuItems.length - 1].className}>
            {menuItems[menuItems.length - 1].name}
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {menuOpen ? <X className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col mt-4 space-y-4 md:hidden">
          {menuItems.slice(0, -1).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-600 hover:text-orange-600 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* The login/logout button */}
          <Link
            to={menuItems[menuItems.length - 1].path}
            className={menuItems[menuItems.length - 1].className}
            onClick={() => setMenuOpen(false)}
          >
            {menuItems[menuItems.length - 1].name}
          </Link>
        </div>
      )}
    </nav>
  );
}
