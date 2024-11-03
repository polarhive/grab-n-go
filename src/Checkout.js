import React from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; 

const Checkout = () => {
  const location = useLocation();
  const orderData = location.hash.substring(1); // Get the data from URL hash
  const users = JSON.parse(atob(orderData)); // Decode the Base64 data

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-inter">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {users.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold mb-2">Your Orders</h2>
          {users.map((user, userIndex) => {
            const totalPrice = user.cart.reduce((total, item) => total + item.price, 0);
            return (
              <div key={userIndex} className="mb-4">
                <h3 className="font-semibold">User {userIndex + 1}: {user.phoneNumber}</h3>
                <ul className="space-y-2">
                  {user.cart.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>₹{item.price.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <h4 className="mt-2 font-semibold">Total: ₹{totalPrice.toFixed(2)}</h4>

                {/* QR Code Generation */}
                <div className="mt-4">
                  <h5 className="font-semibold">QR Code for Payment:</h5>
                  <QRCodeSVG value={`upi://${user.phoneNumber}@upi?amt=${totalPrice.toFixed(2)}`} />
                  <p className="mt-1 text-sm">Scan for ₹{totalPrice.toFixed(2)} payment to {user.phoneNumber}</p>
                </div>
              </div>
            );
          })}
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
