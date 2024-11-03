import React from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; // Use QRCodeSVG for rendering

const Checkout = () => {
  const location = useLocation();
  const orderData = location.hash.substring(1); // Get the data from URL hash
  const { cart, phoneNumbers } = JSON.parse(atob(orderData)); // Decode the Base64 data

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const individualAmount = (totalPrice / phoneNumbers.length).toFixed(2); // Divide total by number of users

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
          <h3 className="mt-4 font-semibold">Amount per person: ₹{individualAmount}</h3>

          {/* QR Codes Generation */}
          <div className="mt-4">
            <h3 className="font-semibold">QR Codes for Payment:</h3>
            {phoneNumbers.map((number, index) => (
              <div key={index} className="mt-2 flex flex-col items-center">
                <QRCodeSVG value={`upi://${number}@upi?amt=${individualAmount}`} />
                <p className="mt-1 text-sm">Scan for ₹{individualAmount} payment to {number}</p>
              </div>
            ))}
          </div>
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
