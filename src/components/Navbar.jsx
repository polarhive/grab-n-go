import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UtensilsCrossed, X, Menu } from "lucide-react";
import axios from "axios";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const [setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [backendStatus, setBackendStatus] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    checkBackendStatus(); // Check backend status when toggling the menu
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const checkBackendStatus = async () => {
    try {
      await axios.get(`${backendUrl}/api`);
      setBackendStatus(true);
      console.log("Backend is online.");
      setShowNotification(false); // Hide notification if backend is online
    } catch (error) {
      setBackendStatus(false);
      console.log("Backend is offline.");
      setShowNotification(true); // Show notification if backend is down
    }
  };

  useEffect(() => {
    // Initial backend health check
    checkBackendStatus();
  }, [backendUrl]);

  useEffect(() => {
    if (!backendStatus) return;

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/auth/user`);
        if (response.data?.name) {
          setUsername(response.data.name);
          setUserAuthenticated(true);
        } else {
          setUsername(null);
          setUserAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setUsername(null);
        setUserAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [backendUrl, backendStatus]);

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/logout`);
      setUserAuthenticated(false);
      setUsername(null);
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },

    ...(userAuthenticated
      ? [
        {
          path: "/cart",
          name: "Cart",
        },
        {
          name: `Welcome, ${username}`,
          path: "/logout",
          className: "bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors",
          onClick: handleLogout,
        },
      ]
      : [
        {
          name: "Login",
          path: "/login",
          className: "bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors",
        },
      ]),
  ];

  return (
    <nav className="container mx-auto px-6 py-4">
      {/* Notification bar for backend status */}
      {showNotification && (
        <div className="fixed top-400 left-100 right-400 bg-red-500 text-white py-2 px-4 text-center transition-all transform translate-y-0 opacity-100 animate-slideIn">
          Backend is down. Please try again later.
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <UtensilsCrossed className="h-8 w-8 text-orange-600" />
          <span className="text-xl font-bold text-gray-800">Grab & Go</span>
          <span
            className={`w-3 h-3 rounded-full ml-2 ${backendStatus ? "bg-green-500" : "bg-red-500"}`}
            title={backendStatus ? "Backend is Online" : "Backend is Offline"}
          />
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {menuItems.slice(0, -1).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-gray-600 hover:text-orange-600 transition-colors ${!backendStatus ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{ pointerEvents: !backendStatus ? "none" : "auto" }}
              title={!backendStatus ? "Backend is currently down. Please try again later." : ""}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to={menuItems[menuItems.length - 1].path}
            onClick={item => item.onClick && item.onClick()}
            className={`${menuItems[menuItems.length - 1].className} ${!backendStatus ? "opacity-50 cursor-not-allowed" : ""}`}
            style={{ pointerEvents: !backendStatus ? "none" : "auto" }}
            title={!backendStatus ? "Backend is currently down. Please try again later." : ""}
          >
            {menuItems[menuItems.length - 1].name}
          </Link>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            {menuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col mt-4 space-y-4 md:hidden">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-gray-600 hover:text-orange-600 transition-colors ${!backendStatus ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{ pointerEvents: !backendStatus ? "none" : "auto" }}
              title={!backendStatus ? "Backend is currently down. Please try again later." : ""}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
