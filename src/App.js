import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'; // Add styles for the cards

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
          const [name, price, veg, serves, time, pic, description] = row.split(",");

          // Sanitize each field to remove extra whitespace and quotes
          const sanitizedName = name.trim().replace(/^"|"$/g, '');
          const sanitizedPrice = price.trim().replace(/^"|"$/g, '');
          const sanitizedVeg = veg.trim().replace(/^"|"$/g, '');
          const sanitizedServes = serves.trim().replace(/^"|"$/g, '');
          const sanitizedTime = time ? time.trim().replace(/^"|"$/g, '') : "N/A"; // default "N/A" if empty
          const sanitizedPic = pic ? pic.trim().replace(/^"|"$/g, '') : "https://via.placeholder.com/150"; // default placeholder if empty
          const sanitizedDescription = description.trim().replace(/^"|"$/g, '') || "No description available"; // default if empty

          return {
            name: sanitizedName,
            price: sanitizedPrice,
            veg: sanitizedVeg,
            serves: sanitizedServes,
            time: sanitizedTime,
            pic: sanitizedPic,
            description: sanitizedDescription
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
    alert(`${item.name} added to cart!`);
  };

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>There was an error fetching the data: {error.message}</p>;
  }

  return (
    <div className="App">
      <h1>Food Cart</h1>
      <div className="food-container">
        {sheetData.map((item, idx) => (
          <div key={idx} className="food-card">
            <img
              src={item.pic}
              alt={item.name}
              className="food-img"
            />
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price}</p>
            <p>{item.veg === "1" ? "Vegetarian" : "Non-Vegetarian"}</p>
            <p>Serves: {item.serves}</p>
            {item.time !== "N/A" && <p>Time to prepare: {item.time} min</p>}
            <p>{item.description}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className="cart">
        <h2>Cart ({cart.length})</h2>
        {cart.map((item, idx) => (
          <p key={idx}>{item.name} - ₹{item.price}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
