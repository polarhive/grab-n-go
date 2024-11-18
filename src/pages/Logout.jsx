import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const [message, setMessage] = useState(null); // For storing success or error message
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Assuming you have this in your .env file

  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      // Call the API to log out
      const response = await axios.post(`${backendUrl}/api/auth/logout`);

      // Check if the response is successful
      if (response.data.success) {
        // If logout is successful, set the success message
        setMessage('Logout successful!');
      } else {
        // In case the response is not successful, set an error message
        setMessage('Error logging out. Please try again.');
      }

      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/'); // Redirect to the home page
        window.location.reload(); // Refresh the page
      }, 100);
    } catch (error) {
      // If there's an error, set the error message
      setMessage('Error logging out. Please try again.');
      console.error("Error logging out:", error);
    }
  };

  // Trigger logout automatically when the component mounts
  useEffect(() => {
    handleLogout();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Logging Out...</h1>

        {/* Show success or error message */}
        <p className="text-center text-gray-600 mb-4">{message}</p>

        {/* Optionally, add any other UI elements you want here */}
      </div>
    </div>
  );
}

export default LogoutPage;
