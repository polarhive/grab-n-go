import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [srn, setSrn] = useState('');  // Changed from username to srn
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        srn,  // Changed from username to srn
        password,
      });

      if (response.data.message === 'Login successful') {  // Check for success message
        navigate('/'); // Redirect to home page
        window.location.reload();
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Login</h1>

        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="srn" className="block text-gray-700 mb-2">SRN</label>
            <input
              type="text"
              id="srn"
              value={srn}
              onChange={(e) => setSrn(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              placeholder="PES2UG23CS100"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-orange-600 hover:text-orange-700 transition-colors"
            >
              Sign up
            </Link>
          </p>
          <p className="text-sm text-gray-600">
            <Link
              to="/forgotpassword"
              className="text-orange-600 hover:text-orange-700 transition-colors"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;