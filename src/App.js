import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Updated import
import axios from "axios";
import Checkout from './Checkout'; // Import the Checkout component

function App() {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const sheetUrl = process.env.REACT_APP_GOOGLE_SHEET_URL;
    axios.get(sheetUrl)
      .then(response => {
        const rows = response.data.split("\n").slice(1);
        const parsedData = rows.map(row => {
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
      .catch(error => {
        console.error("Error fetching the data", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const addToCart = item => setCart([...cart, item]);
  const removeFromCart = index => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>There was an error fetching the data: {error.message}</p>;

  const handleCheckout = () => {
    // Redirect to checkout page with cart data in the URL
    const cartData = btoa(JSON.stringify(cart)); // Base64 encode cart data
    window.location.href = `/checkout/#${cartData}`; // Redirect to checkout page
  };

  return (
    <Router>
      <div className="App flex flex-col min-h-screen font-inter">
        <div className="flex-grow flex flex-wrap justify-center gap-4 p-4">
          {sheetData.map((item, idx) => (
            <div key={idx} className="bg-gray-100 border border-gray-300 rounded-lg p-4 w-44 shadow-md transition-transform duration-200 transform hover:scale-105">
              <img src={item.pic || ""} alt={item.name} className="mb-2 rounded-md max-w-full" />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
              <p>{item.veg === "1" ? "Vegetarian" : "Non-Vegetarian"}</p>
              <p>Serves: {item.serves}</p>
              {item.time && <p>Time: {item.time} min</p>}
              <p className="text-sm text-gray-500">{item.description}</p>
              <button className="mt-2 w-full bg-green-500 text-white py-1 rounded hover:bg-green-600 transition" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* Sticky Cart at Bottom */}
        <div className="cart w-full max-w-md bg-white border border-gray-300 rounded-lg p-4 shadow-lg fixed bottom-0 left-0 right-0 m-4">
          <h2 className="text-xl font-semibold">Cart ({cart.length} items)</h2>
          {cart.length > 0 ? (
            <>
              <ul className="mt-2 space-y-2">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <span className="flex-1">{item.name} - ₹{item.price.toFixed(2)}</span>
                    <button className="text-red-500 hover:text-red-700 transition text-xs" onClick={() => removeFromCart(index)}>Remove</button>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>
              <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition" onClick={handleCheckout}>
                Checkout
              </button>
            </>
          ) : (
            <p className="mt-2 text-gray-600">Your cart is empty.</p>
          )}
        </div>

        <Routes>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
