import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from "boring-avatars";

function AboutPage() {
  const teamMembers = [
    {
      name: 'Nathan Paul',
      role: 'Frontend Developer',
      quote: 'Creating delightful user experiences one bite at a time.'
    },
    {
      name: 'Nilay Srivastava',
      role: 'Backend Developer',
      quote: 'Building robust systems that keep our kitchen running smoothly.'
    },
    {
      name: 'Nisschay Khandelwal',
      role: 'Product Manager',
      quote: 'Bringing campus food innovation to every student.'
    }
  ];

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 px-6 py-16">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            Revolutionizing
            <span className="block text-orange-600">Campus Dining</span>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            From a simple idea in PES University's cafeteria to a modern food court solution.
            We're three students who believed campus dining could be better.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1469&auto=format&fit=crop"
            alt="Students in lecture hall"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Team Members Section */}
      <div className="px-6 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-8">Development Team</h2>
        <div className="flex flex-wrap gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}

              className="flex-1 min-w-[300px] bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative overflow-hidden">

                <Avatar name={member.name} colors={["#dadd7e", "#ce694d","#fc8d4d", "#fc694d", "#faba32"]} variant="beam" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </div>

              <div className="p-6 transform transition-all duration-300 group-hover:translate-y-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-500 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.quote}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Join Our Journey Section */}
        <div className="bg-orange-600 rounded-2xl p-12 text-white text-center mt-12">
          <h2 className="text-3xl font-bold mb-6">Want to Join Our Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for passionate people to join our team. Whether
            you're a developer, designer, or food enthusiast, we'd love to hear
            from you.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-orange-600 px-8 py-3 rounded-md font-semibold hover:bg-orange-50 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;