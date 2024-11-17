import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [srn, setSrn] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (isSignUp && name.trim() === "") {
      newErrors.name = "Name is required";
    }

    const srnRegex = /^PES2UG(1[5-9]|2[0-4])(CS|ECE|AM)\d{3}$/;
    if (srn.trim() === "") {
      newErrors.srn = "SRN is required";
    } else if (!srnRegex.test(srn)) {
      newErrors.srn = "Please enter a valid SRN format";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const loginUser = async ({ srn, password }) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ srn, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  const registerUser = async ({ name, srn, password }) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, srn, password }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Registration failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (!isValid) return;

    try {
      if (isSignUp) {
        const response = await registerUser({ name, srn, password });
        if (response.message === "User created successfully") {
          navigate("/");
        } else {
          setErrors({ submit: response.message });
        }
      } else {
        const response = await loginUser({ srn, password });
        if (response.message === "Login successful") {
          navigate("/hero");
        } else {
          setErrors({ submit: response.message });
        }
      }
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100 p-4">
      <div className="w-96 bg-white rounded-xl shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-5" />
        
        <div className="relative p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-orange-600">
              {isSignUp ? "Sign Up" : "Login"}
            </h1>
            <div className="mt-1 h-1 w-16 bg-gradient-to-r from-orange-400 to-orange-600 mx-auto rounded-full" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="space-y-2">
                <label 
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={() => handleBlur("name")}
                  className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:bg-white 
                    focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200
                    ${errors.name && touched.name ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.name && touched.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label 
                htmlFor="srn"
                className="block text-sm font-medium text-gray-700"
              >
                SRN
              </label>
              <input
                id="srn"
                type="text"
                placeholder="Enter your SRN"
                value={srn}
                onChange={(e) => setSrn(e.target.value)}
                onBlur={() => handleBlur("srn")}
                className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:bg-white 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200
                  ${errors.srn && touched.srn ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.srn && touched.srn && (
                <p className="text-red-500 text-sm mt-1">{errors.srn}</p>
              )}
            </div>

            <div className="space-y-2">
              <label 
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur("password")}
                className={`w-full px-3 py-2 border rounded-md bg-gray-50 focus:bg-white 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200
                  ${errors.password && touched.password ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.password && touched.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {errors.submit && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <span className="block sm:inline">{errors.submit}</span>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white 
                bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
            >
              {isSignUp ? "Sign Up" : "Login"}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                  setTouched({});
                }}
                className="text-orange-600 hover:text-orange-700 font-medium focus:outline-none"
              >
                {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;