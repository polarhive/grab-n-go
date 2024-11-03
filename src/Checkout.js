import React from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const cartData = location.hash.substring(1); // Get the data from URL hash
  const cart = JSON.parse(atob(cartData)); // Decode the Base64 data

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-inter">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {cart.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>₹{item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <h3 className="mt-4 font-semibold">Total: ₹{totalPrice.toFixed(2)}</h3>
          <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
            Complete Purchase
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Checkout;
