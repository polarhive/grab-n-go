import React from 'react';

export default function MenuCard({ title, items }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <ul className="mt-2 space-y-1 text-gray-600">
        {items.map((item, index) => (
          <li key={index}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}