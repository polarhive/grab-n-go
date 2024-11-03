// Pickup.js
import React from "react";
import { useLocation } from "react-router-dom";

const Pickup = () => {
  const location = useLocation();
  const { selectedUserIndex, orderData } = location.state; // Get the selected user index and order data from state

  // Function to get total price for all users
  const getTotalPriceForAll = () => {
    return orderData.reduce((total, user) => {
      return total + user.cart.reduce((userTotal, item) => userTotal + item.price, 0);
    }, 0);
  };

  // Calculate total for all users
  const totalAmount = getTotalPriceForAll();

  // Function to aggregate items and their quantities
  const aggregateItems = () => {
    const itemCount = {};

    orderData.forEach(user => {
      user.cart.forEach(item => {
        if (itemCount[item.name]) {
          itemCount[item.name].quantity += 1; // Increment quantity if item exists
          itemCount[item.name].price += item.price; // Sum up total price for this item
        } else {
          itemCount[item.name] = { quantity: 1, price: item.price }; // Initialize if it's the first occurrence
        }
      });
    });

    return itemCount;
  };

  const aggregatedItems = aggregateItems();

  return (
    <div className="pickup bg-white shadow-lg rounded-lg p-6 mt-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Pickup Details</h2>      
      <h4 className="text-md mb-2 text-gray-600">Items:</h4>
      <ul className="mb-4 border-t border-gray-300 pt-2">
        {/* List aggregated items */}
        {Object.entries(aggregatedItems).map(([itemName, { quantity, price }]) => (
          <li key={itemName} className="flex justify-between items-center py-2 border-b border-gray-200">
            <span className="text-gray-700">{itemName} - ₹{(price).toFixed(2)} ({quantity}x)</span>
          </li>
        ))}
      </ul>
      
      <h3 className="text-lg mb-2 text-gray-800">Total Bill Amount: ₹{totalAmount.toFixed(2)}</h3>
      
      <p className="text-center text-gray-600">Please confirm your order at the counter.</p>
    </div>
  );
};

export default Pickup;
