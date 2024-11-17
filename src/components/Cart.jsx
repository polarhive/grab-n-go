import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [phoneNumberOrUpi, setPhoneNumberOrUpi] = useState(""); // For phone number or UPI entry
  const [addingUser, setAddingUser] = useState(true); // Initially asking for phone number or UPI
  const [isValid, setIsValid] = useState(false); // To track the validity of the phone number/UPI
  const navigate = useNavigate();

  useEffect(() => {
    const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
    console.log("Google Sheet URL:", sheetUrl);

    axios
      .get(sheetUrl)
      .then((response) => {
        const rows = response.data.split("\n");
        const parsedData = rows.slice(1).map((row) => {
          const [name, price, veg, serves, time, pic, description] = row
            .split(",")
            .map((value) => value.replace(/^"|"$/g, "").trim());

          return {
            name,
            price: parseFloat(price),
            veg: veg.trim(),
            serves: parseFloat(serves),
            time: time.trim(),
            pic: pic.trim(),
            description: description.trim() || "No description available",
          };
        });
        setSheetData(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
        setError("There was an error fetching the data from the Google Sheet.");
        setLoading(false);
      });
  }, []);

  const handlePhoneNumberOrUpiChange = (event) => {
    const value = event.target.value;
    setPhoneNumberOrUpi(value);

    const regexPhone = /^[0-9]{10}$/; // Phone number validation
    const regexUpi = /^[a-zA-Z0-9._%+-]+@[a-zA0-9._%+-]+$/; // UPI validation

    if (regexPhone.test(value) || regexUpi.test(value)) {
      setIsValid(true); // Valid phone number or UPI ID
    } else {
      setIsValid(false); // Invalid input
    }
  };

  const handleAddUser = () => {
    const regexPhone = /^[0-9]{10}$/; // Phone number validation
    const regexUpi = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+$/;
    if (regexPhone.test(phoneNumberOrUpi) || regexUpi.test(phoneNumberOrUpi)) {
      // Add new user with phone number/UPI ID and empty cart
      setUsers([
        ...users,
        {
          cart: [], // Reset cart for new user
          phoneNumberOrUpi: phoneNumberOrUpi,
        },
      ]);
      setPhoneNumberOrUpi(""); // Reset input field after adding user
      setAddingUser(false); // Stop asking for user info
      setCurrentUserIndex(users.length); // Move to the next user
    } else {
      alert("Please enter a valid 10-digit phone number or UPI ID.");
    }
  };

  const addToCart = (item) => {
    const updatedUsers = [...users];
    updatedUsers[currentUserIndex].cart.push(item);
    setUsers(updatedUsers);
  };

  const removeFromCart = (index) => {
    const updatedUsers = [...users];
    updatedUsers[currentUserIndex].cart.splice(index, 1);
    setUsers(updatedUsers);
  };

  const handleCheckout = () => {
    if (users.length <= 1) {
      alert("At least 2 users are required to proceed.");
      return;
    }

    const orderData = btoa(JSON.stringify(users));
    navigate(`/checkout#${orderData}`);
  };

  const totalPrice = users[currentUserIndex]?.cart.reduce(
    (total, item) => total + item.price,
    0
  );

  // Check if both users have empty carts
  const allCartsEmpty = users.every(user => user.cart.length === 0);

  if (loading) {
    return (
      <div className="w-full p-4 bg-green-500 text-white text-center lg mb-4">
        Loading items...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-4 bg-red-500 text-white text-center lg mb-4">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="flex container mx-auto px-6 py-16 gap-12 relative">
      {/* Left Pane: Food Items List */}
      <div
        className={`flex-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12 animate__animated animate__fadeIn ${addingUser ? "blur-sm" : ""
          }`}
      >
        {sheetData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-orange-300 rounded-lg p-4 w-full shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            <img
              src={item.pic || ""}
              alt={item.name}
              className="mb-4 rounded-md w-full object-cover h-36"
            />
            <h3 className="text-lg font-semibold text-orange-800">{item.name}</h3>
            <p className="text-sm text-gray-600">₹{item.price.toFixed(2)}</p>
            <p className="text-sm">{item.veg === "1" ? "Vegetarian" : "Non-Vegetarian"}</p>
            <p className="text-sm">Serves: {item.serves}</p>
            {item.time && <p className="text-sm">Time: {item.time} min</p>}
            <button
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300 transform hover:scale-105"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Right Pane: Sidebar */}
      <div className="fixed bottom-0 right-0 w-full sm:w-[300px] bg-green shadow-lg rounded-lg p-4 sm:p-6 max-h-screen overflow-y-auto z-10">
        <h1 className="text-2xl font-bold text-orange-700 mb-4 text-center animate__animated animate__fadeIn">
          Your Cart
        </h1>

        {/* Cart Display for Current User */}
        <div className="w-full mb-6 animate__animated animate__fadeIn">
          <h2 className="text-xl font-semibold text-orange-800 mb-4">
            Cart for User {currentUserIndex + 1} ({users[currentUserIndex]?.cart.length} items)
          </h2>
          {users[currentUserIndex]?.cart.length > 0 ? (
            <>
              <ul className="mb-4">
                {users[currentUserIndex]?.cart.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-300 py-2"
                  >
                    <span className="text-gray-700">
                      {item.name} - ₹{item.price.toFixed(2)}
                    </span>
                    <button
                      className="text-orange-500 hover:text-orange-700 transition"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-semibold text-orange-700">
                Total: ₹{users[currentUserIndex]?.cart.reduce(
                  (total, item) => total + item.price,
                  0
                ).toFixed(2)}
              </p>
            </>
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </div>

        {/* Add Another User Button */}
        {!addingUser && !allCartsEmpty && users.length < 3 && (
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setAddingUser(true)} // Set state to allow adding another user
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300 transform hover:scale-105"
            >
              Add User
            </button>
          </div>
        )}

        {/* Prompt for phone number/UPI */}
        {addingUser && (
          <div className="mb-6 animate__animated animate__fadeIn">
            <h3 className="text-xl font-semibold text-orange-700 mb-4">Enter Phone Number or UPI ID</h3>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phoneNumberOrUpi}
              onChange={handlePhoneNumberOrUpiChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <button
              onClick={handleAddUser}
              className={`mt-4 w-full py-2 rounded transition duration-300 transform hover:scale-105 ${isValid ? "bg-green-500 text-white hover:bg-green-600" : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              disabled={!isValid} // Disable button until input is valid
            >
              Add User
            </button>
          </div>
        )}

        {/* Proceed to Checkout Button */}
        {users.length > 1 && (
          <button
            className={`mt-4 w-full py-2 rounded transition duration-300 transform hover:scale-105 ${allCartsEmpty || !users.some(user => user.cart.length > 0) ? "bg-gray-400 cursor-not-allowed" : "bg-orange-600 text-white hover:bg-orange-700"
              }`}
            onClick={handleCheckout}
            disabled={allCartsEmpty || !users.some(user => user.cart.length > 0)}
          >
            Proceed to Checkout
          </button>
        )}
      </div>
    </div>
  );
}
