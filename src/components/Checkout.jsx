import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react"; // Import the QRCode component
import html2canvas from "html2canvas"; // Import html2canvas

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const checkoutRef = useRef(null); // Reference to the container to capture

  // Fetch order data
  useEffect(() => {
    const orderData = atob(location.hash.substring(1)); // Decode order data
    setUsers(JSON.parse(orderData));
  }, [location]);

  // Calculate total for all users
  useEffect(() => {
    const total = users.reduce(
      (total, user) =>
        total +
        user.cart.reduce(
          (userTotal, item) => userTotal + item.price * item.quantity,
          0
        ),
      0
    );
    setTotalAmount(total);
  }, [users]);

  // Handle user selection to pay for the bill
  const handlePaymentUserSelect = (event) => {
    setSelectedUserIndex(Number(event.target.value)); // Set selected user index from dropdown
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
    return user.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate the amount each user owes
  const calculateUserOwedAmount = (userIndex) => {
    return getUserTotal(users[userIndex]);
  };

  // Function to download the screenshot
  const downloadScreenshot = () => {
    if (checkoutRef.current) {
      html2canvas(checkoutRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "checkout-screenshot.png";
        link.click();
      });
    }
  };

  return (
    <div className="container mx-auto px-6 py-16" ref={checkoutRef}>
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
        <h2 className="text-2xl font-semibold text-orange-700 mb-4">Who is going to pickup?</h2>

        {/* Dropdown for selecting the user */}
        <div className="mb-4">
          <select
            className="p-2 border rounded-md w-full"
            value={selectedUserIndex !== null ? selectedUserIndex : ''}
            onChange={handlePaymentUserSelect}
          >
            <option value="" disabled>Select a user</option>
            {users.map((user, index) => (
              <option key={index} value={index}>
                {user.phoneNumberOrUpi}: ₹{getUserTotal(user).toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {/* Add horizontal line or break */}
        <hr className="my-4" />

        {/* Show QR Codes for all users except the selected one */}
        {selectedUserIndex !== null && (
          <div className="mt-6">
            {users.map((user, index) => {
              // Exclude the selected user from seeing their own QR code
              if (index !== selectedUserIndex) {
                return (
                  <div key={index} className="mt-4">
                    <h5 className="text-md image-center font-semibold">QR Code for: </h5>
                    {user.phoneNumberOrUpi}: ₹{getUserTotal(user).toFixed(2)}

                    <QRCodeSVG
                      value={`upi://pay?pa=${users[selectedUserIndex].phoneNumberOrUpi}&am=${calculateUserOwedAmount(
                        index
                      ).toFixed(2)}&cu=INR`}
                      size={256}
                      level={"H"}
                      marginSize={4}
                    />
                  </div>
                );
              }
              return null; // Don't render anything for the selected user
            })}
          </div>
        )}

        {/* Proceed to Pickup button */}

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          onClick={downloadScreenshot}
        >
          Download Screenshot

        </button>

        {/* Screenshot Download Button */}
        <button
          className="mt-4 w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"
          onClick={handleProceedToPickup}
        >
          Proceed to Pickup
        </button>
      </div>
    </div >
  );
}
