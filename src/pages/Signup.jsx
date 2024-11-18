import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [name, setName] = useState('');
    const [srn, setSrn] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();

    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Assuming you have this in your .env file
    const srnRegex = /^PES2UG(1[5-9]|2[0-4])(CS|EC|AM)\d{3}$/; // SRN validation regex

    const handleSignup = async (e) => {
        e.preventDefault();

        // Basic validations
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!srnRegex.test(srn)) {
            setError('Invalid SRN format. Please use the correct SRN format.');
            return;
        }

        try {
            const response = await axios.post(`${backendUrl}/api/auth/signup`, {
                name,
                srn,
                password,
            });

            if (response.data.message === 'User created successfully') {
                setSuccess(response.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setError(response.data.message || 'Signup failed');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="max-w-sm mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">Signup</h1>

                {error && (
                    <div className="mb-4 text-red-500 text-center">{error}</div>
                )}
                {success && (
                    <div className="mb-4 text-green-500 text-center">{success}</div>
                )}

                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="srn" className="block text-gray-700 mb-2">SRN</label>
                        <input
                            type="text"
                            id="srn"
                            value={srn}
                            onChange={(e) => setSrn(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-orange-600 text-white font-bold rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        Signup
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account? <a href="/login" className="text-orange-600 hover:text-orange-700">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
