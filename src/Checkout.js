import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { QRCodeSVG } from 'qrcode.react';

const Checkout = () => {
  const location = useLocation();
  const hash = location.hash.substring(1); // Get the order data from the URL hash
  const orderData = JSON.parse(atob(hash)); // Decode the data

  const [selectedUserIndex, setSelectedUserIndex] = useState(null); // Track the selected user
  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  const getTotalPrice = (user) => {
    return user.cart.reduce((total, item) => total + item.price, 0);
  };

  // Calculate total amounts for all users
  const userTotals = orderData.map(user => getTotalPrice(user));
  const totalBillAmount = userTotals.reduce((total, amount) => total + amount, 0); // Total for all users
  const hasNonZeroTotal = userTotals.some(total => total > 0); // Check if any user has a non-zero total

  const handlePickupSelection = (index) => {
    const selectedUser = orderData[index];
    const totalPrice = getTotalPrice(selectedUser);

    // Check if the selected user has items in their cart
    if (totalPrice <= 0) {
      setErrorMessage(`User ${index + 1} has an empty cart. Please select another user.`);
      return;
    }

    setSelectedUserIndex(index);
    setErrorMessage(""); // Clear any previous error messages
    alert(`User ${index + 1} is selected to pick up the order.`);
  };

  return (
    <div className="checkout bg-white shadow-lg rounded-lg p-6 mt-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Checkout</h2>
      {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>} {/* Display error messages */}

      {/* Total Bill Amount */}
      {hasNonZeroTotal && (
        <div className="mb-4">
          <h3 className="text-lg mb-2 text-gray-800">Total Bill Amount: ₹{totalBillAmount.toFixed(2)}</h3>
          <h3 className="text-lg mb-2 text-gray-800">Who is picking up the order?</h3>
          <ul className="mb-4 border-t border-gray-300 pt-2">
            {orderData.map((user, index) => {
              const totalPrice = getTotalPrice(user);
              return (
                totalPrice > 0 && ( // Only show users with non-zero totals
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-700">User {index + 1} (Total: ₹{totalPrice.toFixed(2)})</span>
                    <button 
                      className="ml-4 bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600 transition"
                      onClick={() => handlePickupSelection(index)}
                    >
                      Select
                    </button>
                  </li>
                )
              );
            })}
          </ul>
        </div>
      )}
      
      {selectedUserIndex !== null && ( // Only show QR codes and totals if a user is selected
        <>
          <h3 className="text-lg mt-4 text-gray-800">QR Codes:</h3>
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

            // Only render QR code if totalPrice is greater than 0
            if (totalPrice > 0) {
              // Construct the UPI payload
              const upiPayload = `upi://${selectedUserPhone}@upi?amt=${totalPrice.toFixed(2)}`;

              return (
                <div key={index} className="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                  <h4 className="text-md mb-2 font-semibold">QR Code for User {index + 1}:</h4>
                  <QRCodeSVG 
                    value={upiPayload} // Generate QR code with UPI payload
                    size={256}
                    level={"H"}
                    includeMargin={true}
                  />
                  {/* Total Amount Bar */}
                  <div className="mt-2 bg-green-200 text-center text-sm font-semibold rounded p-1">
                    Total Amount: ₹{totalPrice.toFixed(2)}
                  </div>
                </div>
              );
            }

            return null; // Return null if the totalPrice is 0
          })}
        </>
      )}
      
      {!hasNonZeroTotal && ( // Display message if all totals are zero
        <p className="text-red-500 text-center mt-4">All users have an empty cart. No QR codes can be generated.</p>
      )}
    </div>
  );
};

export default Checkout;
