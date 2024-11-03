import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Checkout from './Checkout';
import Pickup from './Pickup'; // Add this import

function App() {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([{ cart: [], phoneNumber: '' }]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const sheetUrl = process.env.REACT_APP_GOOGLE_SHEET_URL;

    axios
      .get(sheetUrl)
      .then((response) => {
        const rows = response.data.split("\n");
        const parsedData = rows.slice(1).map((row) => {
          const [name, price, veg, serves, time, pic, description] = row.split(",").map(value => value.replace(/^"|"$/g, '').trim());

          return {
            name,
            price: parseFloat(price),
            veg: veg.trim(),
            serves: parseFloat(serves),
            time: time.trim(),
            pic: pic.trim(),
            description: description.trim() || "No description available"
          };
        });
        setSheetData(parsedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
        setError(error);
        setLoading(false);
      });
  }, []);

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
    const orderData = btoa(JSON.stringify(users)); // Encode all users' data
    navigate(`/checkout#${orderData}`); // Redirect to checkout page with encoded data
  };

  const handleNext = () => {
    const currentUser = users[currentUserIndex];

    if (!currentUser.phoneNumber) {
      alert("Please enter a phone number for the current user before proceeding to the next user.");
      return;
    }

    // Add a new user object if the current user has a phone number
    const updatedUsers = [...users];
    updatedUsers.push({ cart: [], phoneNumber: '' });
    setUsers(updatedUsers);
    setCurrentUserIndex(updatedUsers.length - 1); // Move to the next user
  };

  const totalPrice = users[currentUserIndex].cart.reduce((total, item) => total + item.price, 0);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>There was an error fetching the data: {error.message}</p>;
  }

  return (
    <div className="App flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center my-6">Food Cart</h1>

      <div className="food-container flex-grow flex flex-wrap justify-center gap-4">
        {sheetData.map((item, idx) => (
          <div key={idx} className="food-card bg-gray-100 border border-gray-300 rounded-lg p-4 w-44 shadow-md transition-transform duration-200 transform hover:scale-105">
            <img src={item.pic || ""} alt={item.name} className="mb-2 rounded-md max-w-full" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
            <p>{item.veg === "1" ? "Vegetarian" : "Non-Vegetarian"}</p>
            <p>Serves: {item.serves}</p>
            {item.time && <p>Time: {item.time} min</p>}
            <button className="mt-2 w-full bg-green-500 text-white py-1 rounded hover:bg-green-600 transition" onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart bg-gray-100 p-6 rounded-lg shadow-lg mt-4 w-80">
        <h2 className="text-2xl font-semibold">Cart for User {currentUserIndex + 1} ({users[currentUserIndex].cart.length} items)</h2>
        {users[currentUserIndex].cart.length > 0 ? (
          <>
            <ul className="mt-2">
              {users[currentUserIndex].cart.map((item, index) => (
                <li key={index} className="flex justify-between mb-2 text-sm">
                  <span>{item.name} - ₹{item.price.toFixed(2)}</span>
                  <button className="text-red-500 hover:text-red-700 transition" onClick={() => removeFromCart(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>
          </>
        ) : (
          <p className="mt-2 text-gray-600">Your cart is empty.</p>
        )}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter Phone Number"
            className="border border-gray-300 rounded p-2 w-full"
            value={users[currentUserIndex].phoneNumber}
            onChange={(e) => {
              const updatedUsers = [...users];
              updatedUsers[currentUserIndex].phoneNumber = e.target.value;
              setUsers(updatedUsers);
            }}
          />
          <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition" onClick={() => {
            if (!users[currentUserIndex].phoneNumber) {
              handleCheckout(); // Proceed to checkout if no phone number
            } else {
              handleNext(); // Proceed to next user if phone number is present
            }
          }}>
            {users[currentUserIndex].phoneNumber ? "Next" : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Wrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/pickup" element={<Pickup />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}
