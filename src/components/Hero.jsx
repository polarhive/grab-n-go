import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import MenuCard from './MenuCard';

export default function Hero() {
  const navigate = useNavigate(); // Hook to navigate to login page
  const [isRedirecting, setIsRedirecting] = useState(false); // State to manage redirection

  const popularItems = [
    'Chicken Roll ₹80',
    'Chicken 65 ₹120',
    'Cup Noodles ₹50'
  ];

  const specialItems = [
    'Paneer Roll ₹90',
    'Vada Pav ₹40'
  ];

  // Handle the Order Now button click with delay before redirecting
  const handleOrderNowClick = () => {
    setIsRedirecting(true); // Trigger the loading/redirect effect
    setTimeout(() => {
      navigate('/login'); // Redirect after 1 second
    }, 1000);
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">

        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Quick & Tasty<br />
            <span className="text-orange-600">Indian Street Food</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            From crispy Chicken 65 to flavorful rolls, enjoy your favorite Indian snacks and meals.
            Fresh, fast, and full of flavor!
          </p>

          {/* Cards for Popular Items and Specials */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <MenuCard title="Popular Items" items={popularItems} />
            <MenuCard title="Today's Special" items={specialItems} />
          </div>

          {/* Call to Action */}
          <button
            onClick={handleOrderNowClick}
            className="bg-orange-600 text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Order Now
          </button>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 relative">
          <img
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1090"
            alt="Indian Street Food Spread"
            className="rounded-lg shadow-2xl object-cover w-full h-[300px] sm:h-[400px] md:h-[600px] transition-all duration-500 ease-in-out transform"
          />
          {/* Wipe effect */}
          <div className={`absolute top-0 left-0 right-0 bottom-0 ${isRedirecting ? 'wipe-animation' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}
