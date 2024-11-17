import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Pickup() {
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [groupedItems, setGroupedItems] = useState([]); // To store grouped items with quantities

  // Fetch passed data from the URL
  useEffect(() => {
    const { users, selectedUserIndex } = JSON.parse(atob(location.hash.substring(1))); // Decode the data
    setUsers(users);
    setSelectedUserIndex(selectedUserIndex);

    // Combine all items from users' carts into one array
    let combinedItems = [];
    users.forEach((user) => {
      combinedItems = [...combinedItems, ...user.cart];
    });

    // Group items by name and calculate quantities and total prices
    const grouped = combinedItems.reduce((acc, item) => {
      if (acc[item.name]) {
        acc[item.name].quantity += 1;
        acc[item.name].totalPrice += item.price;
      } else {
        acc[item.name] = {
          quantity: 1,
          totalPrice: item.price,
        };
      }
      return acc;
    }, {});

    // Convert grouped object to array for easier rendering
    const groupedArray = Object.keys(grouped).map((itemName) => ({
      name: itemName,
      quantity: grouped[itemName].quantity,
      totalPrice: grouped[itemName].totalPrice,
    }));

    // Calculate the total amount
    const total = Object.values(grouped).reduce((total, item) => total + item.totalPrice, 0);
    setTotalAmount(total);
    setGroupedItems(groupedArray);
  }, [location]);

  if (selectedUserIndex === null) {
    return <div>Error: No user selected for pickup.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Pickup: User {selectedUserIndex + 1}</h1>

      <div className="bg-orange-50 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-orange-800 mb-4">Order Summary</h2>

        {/* Show grouped items with quantities */}
        <h3 className="text-xl font-semibold mb-2">Items Ordered:</h3>
        <ul className="mb-4">
          {groupedItems.map((item, idx) => (
            <li key={idx} className="flex justify-between py-2 border-b border-gray-300">
              <span>{item.quantity}x {item.name}</span>
              <span>₹{item.totalPrice.toFixed(2)}</span>
            </li>
          ))}
        </ul>

        {/* Total Amount for all items ordered */}
        <h3 className="text-lg font-bold mb-4">Total Amount: ₹{totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
}
