import React from 'react';
import MenuCard from './MenuCard';

export default function Hero() {
  const popularItems = [
    'Chicken Roll ₹80',
    'Chicken 65 ₹120',
    'Veg Sandwich ₹60',
    'Cup Noodles ₹50'
  ];

  const specialItems = [
    'Paneer Roll ₹90',
    'Masala Dosa ₹70',
    'Chilli Chicken ₹140',
    'Vada Pav ₹40'
  ];

  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Quick & Tasty<br />
            <span className="text-orange-600">Indian Street Food</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            From crispy Chicken 65 to flavorful rolls, enjoy your favorite Indian snacks and meals. 
            Fresh, fast, and full of flavor!
          </p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <MenuCard title="Popular Items" items={popularItems} />
            <MenuCard title="Today's Special" items={specialItems} />
          </div>
          <button className="bg-orange-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Order Now
          </button>
        </div>
        
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=2070"
            alt="Indian Street Food Spread"
            className="rounded-lg shadow-2xl object-cover h-[600px] w-full"
          />
        </div>
      </div>
    </div>
  );
}