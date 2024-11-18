import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const popularItems = [
    'Chicken Roll ₹80',
    'Chicken 65 ₹120',
    'Veg Sandwich ₹60',
    'Cup Noodles ₹50',
  ];

  const specialItems = [
    'Paneer Roll ₹90',
    'Masala Dosa ₹70',
    'Chilli Chicken ₹140',
    'Vada Pav ₹40',
  ];

  const handleOrderNowClick = () => {
    setIsRedirecting(true);
    setTimeout(() => {
      // Check for the text "Welcome" in the body of the page
      const userAuthenticated = document.body.textContent.includes('Welcome,');

      if (userAuthenticated) {
        navigate('/cart'); // Redirect to cart if "Welcome" is found
      } else {
        navigate('/login'); // Redirect to login if "Welcome" is not found
      }
    }, 1200); // Redirect after 1 second
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 md:py-24">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Quick & Tasty
            <br />
            <span className="text-orange-600">Indian Street Food</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            From crispy Chicken 65 to flavorful rolls, enjoy your favorite Indian snacks and meals. Fresh, fast, and full of flavor!
          </p>

          {/* Order Now Button (Desktop only) */}
          <button
            onClick={handleOrderNowClick}
            className="bg-orange-600 text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 mt-6 md:block hidden"
          >
            Order Now
          </button>
        </div>

        <div className="flex-1 relative">
          <img
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=1090"
            alt="Samosa"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
          <div
            className={`absolute top-0 left-0 right-0 bottom-0 ${isRedirecting ? 'wipe-animation' : ''}`}
          ></div>
        </div>
      </div>

      {/* Order Now Button (Mobile only) */}
      <div className="text-center md:hidden mt-6">
        <button
          onClick={handleOrderNowClick}
          className="bg-orange-600 text-white px-6 sm:px-8 py-3 rounded-md text-base sm:text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Order Now
        </button>
      </div>

      {/* Text Section - Top Items */}
      <div className="mt-8">
        {/* Popular Items */}
        <div className="border rounded-lg shadow-md p-4 bg-white mb-6">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Popular Items</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {popularItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Today's Special */}
        <div className="border rounded-lg shadow-md p-4 bg-white">
          <h3 className="text-lg font-bold text-gray-700 mb-2">Today's Special</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            {specialItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
