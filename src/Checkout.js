import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';

const Checkout = () => {
  const location = useLocation();
  const hash = location.hash.substring(1); // Get the order data from the URL hash
  const orderData = JSON.parse(atob(hash)); // Decode the data

  const [selectedUserIndex, setSelectedUserIndex] = useState(null); // Track the selected user

  const handlePickupSelection = (index) => {
    setSelectedUserIndex(index);
    alert(`User ${index + 1} is selected to pick up the order.`);
  };

  const getTotalPrice = (user) => {
    return user.cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="checkout bg-gray-100 p-6 rounded-lg shadow-lg mt-4 w-80 mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <h3 className="text-lg mb-2">Total Amounts:</h3>
      <ul>
        {orderData.map((user, index) => {
          const totalPrice = getTotalPrice(user);
          return (
            <li key={index} className="flex justify-between mb-2 text-sm">
              <span>User {index + 1}: ₹{totalPrice.toFixed(2)}</span>
              <button 
                className="ml-4 text-blue-500" 
                onClick={() => handlePickupSelection(index)}
              >
                Select
              </button>
            </li>
          );
        })}
      </ul>

      {selectedUserIndex !== null && ( // Only show QR codes if a user is selected
        <>
          <h3 className="text-lg mt-4">QR Codes:</h3>
          {orderData.map((user, index) => {
            if (index === selectedUserIndex) {
              return null; // Skip generating QR code for the selected user
            }

            const selectedUser = orderData[selectedUserIndex]; // Get selected user for the pickup
            if (!selectedUser) {
              return null; // If selectedUser somehow is undefined, skip QR code generation
            }

            const selectedUserPhone = selectedUser.phoneNumber; // Get the phone number of person picking up
            const totalPrice = getTotalPrice(user); // Get total amount for current user

            // Construct the UPI payload
            const upiPayload = `upi://${selectedUserPhone}@upi?amt=${totalPrice.toFixed(2)}`;

            return (
              <div key={index} className="mt-4">
                <h4 className="text-md mb-2">QR Code for User {index + 1}:</h4>
                <QRCodeSVG 
                  value={upiPayload} // Generate QR code with UPI payload
                  size={256}
                  level={"H"}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Checkout;
