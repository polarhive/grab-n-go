import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [sheetData, setSheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

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
            price: parseFloat(price), // Convert price to a number
            veg: veg.trim(), 
            serves: parseFloat(serves), // Convert serves to a number
            time: time.trim(), 
            pic: pic.trim(), 
            description: description.trim() || "No description available" // Default description if empty
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
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>There was an error fetching the data: {error.message}</p>;
  }

  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-center my-6">Food Cart</h1>
      <div className="container mx-auto flex flex-wrap justify-center gap-6">
        {sheetData.map((item, idx) => (
          <div key={idx} className="food-card bg-white rounded-lg shadow-md p-6 max-w-xs hover:shadow-xl transition-shadow duration-300">
            <img
              src={item.pic || ""}
              alt={item.name}
              className="food-img mb-4 rounded-md"
            />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">Price: ₹{item.price.toFixed(2)}</p>
            <p>{item.veg === "1" ? "Vegetarian" : "Non-Vegetarian"}</p>
            <p>Serves: {item.serves}</p>
            {item.time && <p>Time to prepare: {item.time} min</p>}
            <p className="text-sm text-gray-500">{item.description}</p>
            <button 
              className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="cart bg-gray-100 p-6 mt-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold">Cart ({cart.length} items)</h2>
        {cart.length > 0 ? (
          <>
            <ul className="mt-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between mb-2">
                  <span>{item.name} - ₹{item.price.toFixed(2)}</span>
                  <button 
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => removeFromCart(index)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xl font-semibold">Total: ₹{totalPrice.toFixed(2)}</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
              Checkout
            </button>
          </>
        ) : (
          <p className="mt-4 text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default App;
