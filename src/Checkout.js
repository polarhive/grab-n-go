// Checkout.js
import React from "react";

function Checkout() {
  // Get the cart data from the URL
  const hash = window.location.hash.substring(1);
  const cartData = hash ? JSON.parse(atob(hash)) : [];

  const totalPrice = cartData.reduce((total, item) => total + item.price, 0);

  return (
    <div className="checkout p-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      {cartData.length > 0 ? (
        <>
          <ul className="mt-4 space-y-2">
            {cartData.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>₹{item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
            Confirm Order
          </button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Checkout;
