import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // Import the QRCode component

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch order data
  useEffect(() => {
    const orderData = atob(location.hash.substring(1)); // Decode order data
    setUsers(JSON.parse(orderData));
  }, [location]);

  // Calculate total for all users
  useEffect(() => {
    const total = users.reduce(
      (total, user) => total + user.cart.reduce((userTotal, item) => userTotal + item.price, 0),
      0
    );
    setTotalAmount(total);
  }, [users]);

  // Handle user selection to pay for the bill
  const handlePaymentUserSelect = (index) => {
    setSelectedUserIndex(index);
  };

  // Handle 'Proceed to Pickup' button click
  const handleProceedToPickup = () => {
    if (selectedUserIndex === null) {
      alert("Please select a user to pay the bill.");
      return;
    }
    navigate(`/pickup#${btoa(JSON.stringify({ users, selectedUserIndex }))}`);
  };

  // Get the total for a particular user
  const getUserTotal = (user) => {
    return user.cart.reduce((total, item) => total + item.price, 0);
  };

  // Calculate the amount each user owes
  const calculateUserOwedAmount = (userIndex) => {
    return getUserTotal(users[userIndex]);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Checkout Header */}
      <h1 className="text-4xl font-bold text-orange-700 mb-6">Checkout</h1>

      {/* Total Amount Section */}
      <div className="py-1 border-b border-gray-300 mb-6">
        <h2 className="text-2xl font-semibold text-orange-800">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </h2>
      </div>

      {/* Payment Section */}
      <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-800 mb-4">Select Payment User</h2>
        <div className="mb-4">
          {users.map((user, index) => (
            <div
              key={index}
              className={`p-4 border mb-2 rounded cursor-pointer ${selectedUserIndex === index ? "bg-orange-200" : "bg-white"
                }`}
              onClick={() => handlePaymentUserSelect(index)}
            >
              <p>User {index + 1}</p>
              <p>Total: ₹{getUserTotal(user).toFixed(2)}</p>
              <p>{user.phoneNumberOrUpi}</p>
            </div>
          ))}
        </div>


        {/* Display details for the selected user */}
        {selectedUserIndex !== null && (
          <div className="mt-6">

            {/* Show QR Codes for all users except the selected one */}
            <div className="mt-6">
              {users.map((user, index) => {
                // Exclude the selected user from seeing their own QR code
                if (index !== selectedUserIndex) {
                  return (
                    <div key={index} className="mt-4">
                      <h5 className="text-md font-semibold">QR Code for User {index + 1}</h5>
                      <QRCodeSVG
                        value={`upi://pay?pa=${users[selectedUserIndex].phoneNumberOrUpi}&am=${calculateUserOwedAmount(index).toFixed(2)}&cu=INR`}
                        size={256}
                        level={"H"}
                        includeMargin={true}
                      />
                    </div>
                  );
                }
                return null; // Don't render anything for the selected user
              })}
            </div>
          </div>
        )}

        {/* Proceed to Pickup button */}
        <button
          className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
          onClick={handleProceedToPickup}
        >
          Proceed to Pickup
        </button>
      </div>
    </div>
  );
}
