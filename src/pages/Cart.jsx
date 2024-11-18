import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IndianRupee } from "lucide-react";

export default function Cart() {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]); // Track all users
  const [currentUserIndex, setCurrentUserIndex] = useState(-1); // Initialize with no user selected
  const [phoneNumberOrUpi, setPhoneNumberOrUpi] = useState(""); // For phone number or UPI entry
  const [isValid, setIsValid] = useState(false); // To track validity of phone number/UPI
  const [addingUser, setAddingUser] = useState(true); // Start in user addition mode
  const [showCheckout, setShowCheckout] = useState(false); // To track checkout visibility
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
    const regexUpi = /^[a-zA-Z0-9._%+-]+@[a-zA0-9._%+-]+$/; // UPI validation

    let finalPhoneNumberOrUpi = phoneNumberOrUpi;

    // If it's a valid phone number, append @upi to it
    if (regexPhone.test(phoneNumberOrUpi)) {
      finalPhoneNumberOrUpi = phoneNumberOrUpi + "@upi";
    } else if (!regexUpi.test(phoneNumberOrUpi)) {
      // If it's not a valid UPI or phone number, set as invalid
      alert("Please enter a valid 10-digit phone number or name@upi id.");
      return;
    }

    // Add new user with the modified phone number/UPI ID and empty cart
    setUsers([
      ...users,
      {
        cart: [], // Reset cart for new user
        phoneNumberOrUpi: finalPhoneNumberOrUpi,
      },
    ]);

    setPhoneNumberOrUpi(""); // Reset input field after adding user
    setAddingUser(false); // Allow access to the menu
    setCurrentUserIndex(users.length); // Move to the next user

    if (users.length + 1 > 1) {
      setShowCheckout(true); // Show checkout after 2nd user
    }
  };


  const addToCart = (item) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      const userCart = updatedUsers[currentUserIndex].cart;

      // Check if item is already in the cart
      const existingItem = userCart.find((cartItem) => cartItem.name === item.name);

      if (existingItem) {
        // Increment quantity if the item exists
        existingItem.quantity += 1;
      } else {
        // Add item with an initial quantity of 1
        userCart.push({ ...item, quantity: 1 });
      }

      return updatedUsers;
    });
  };


  const removeFromCart = (index) => {
    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[currentUserIndex].cart.splice(index, 1);
      return updatedUsers;
    });
  };

  const handleAddNewUser = () => {
    // Prevent adding a new user if the current user's cart is empty
    if (users[currentUserIndex].cart.length === 0) {
      alert("Current user must add at least one item to the cart before adding a new user.");
      return;
    }
    setAddingUser(true); // Enter blur mode
    setPhoneNumberOrUpi(""); // Reset input field
  };


  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) return; // Prevent quantity from going below 1

    setUsers((prevUsers) => {
      const updatedUsers = [...prevUsers];
      updatedUsers[currentUserIndex].cart[index].quantity = newQuantity;
      return updatedUsers;
    });
  };


  const handleCheckout = () => {
    // Ensure all users have carts with items before proceeding
    const allUsersHaveItems = users.every((user) => user.cart.length > 0);
    if (!allUsersHaveItems) {
      alert("All users must have at least one item in their cart.");
      return;
    }

    if (users.length < 2) {
      alert("At least 2 users are required to proceed.");
      return;
    }

    const orderData = btoa(JSON.stringify(users));
    navigate(`/checkout#${orderData}`);
  };

  const totalPrice = users[currentUserIndex]?.cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-20">
        Loading items...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-20">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap">
      {/* Left Pane: Food Items List */}
      <div className={`w-full md:w-2/3 p-4 ${addingUser ? "blur-sm" : ""}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sheetData.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow-md">
              <img
                src={item.pic || ""}
                alt={item.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
              <p className="text-lg text-orange-600">₹{item.price.toFixed(2)}</p>
              <p className="text-sm text-green-600">{item.veg === "1" ? "Vegetarian" : "Non-Vegetarian"}</p>
              <p className="text-sm text-gray-600">Serves: {item.serves}</p>
              {item.time && <p className="text-sm text-gray-600">Time: {item.time} min</p>}
              <button
                className="mt-2 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
                onClick={() => addToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Pane: Sidebar */}
      <div className="w-full md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg pb-6">
        {addingUser ? (
          <div>
            <h3 className="text-lg font-semibold mb-2">Enter Phone Number or UPI ID</h3>
            <input
              type="text"
              value={phoneNumberOrUpi}
              onChange={handlePhoneNumberOrUpiChange}
              placeholder="Phone Number / UPI"
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleAddUser}
              disabled={!isValid}
              className={`mt-2 w-full bg-green-600 text-white py-2 px-4 rounded-md ${!isValid && "bg-gray-400"}`}
            >
              {/* Add IndianRupee Icon */}
              Add Payment Info
            </button>

          </div>
        ) : (
          <>
            <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
            <h2 className="text-xl font-semibold mb-2">
              Cart for User {currentUserIndex + 1} ({users[currentUserIndex]?.cart.length || 0} items)
            </h2>
            {users[currentUserIndex]?.cart.length > 0 ? (
              <>
                <ul className="space-y-2">
                  {users[currentUserIndex]?.cart.map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>
                        {item.name} - ₹{item.price.toFixed(2)} (x{item.quantity})
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                          onClick={() => updateQuantity(index, item.quantity - 1)}
                          disabled={item.quantity <= 1} // Disable if quantity is 1
                        >
                          -
                        </button>
                        <button
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                          onClick={() => updateQuantity(index, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => removeFromCart(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <p className="font-semibold mt-4">Total: ₹{totalPrice.toFixed(2)}</p>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleAddNewUser}
                className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors"
              >
                Add New User
              </button>
              {showCheckout && (
                <button
                  onClick={handleCheckout}
                  className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>

          </>
        )}
      </div>
    </div>
  );
}
