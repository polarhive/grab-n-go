import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

function ContactPage() {
  const teamContacts = [
    {
      name: "Nathan Paul",
      role: "Frontend Developer",
      email: "nathan.paul@pes.edu",
      phone: "+91 98765 43210"
    },
    {
      name: "Nilay Srivastava",
      role: "Backend Developer",
      email: "nilay.srivastava@pes.edu",
      phone: "+91 98765 43211"
    },
    {
      name: "Nisschay Khandelwal",
      role: "Product Manager",
      email: "nisschay.khandelwal@pes.edu",
      phone: "+91 98765 43212"
    }
  ];

  const vendors = [
    {
      name: "Main Block canteen-4th floor",
      contact: "Rahul Sharma",
      phone: "+91 98765 43213",
      type: "Fast-Food"
    },
    {
      name: "Main Block canteen-5th floor",
      contact: "Priya Kumar",
      phone: "+91 98765 43214",
      type: "South Indian"
    },
    {
      name: "Pixel canteen",
      contact: "Ahmed Khan",
      phone: "+91 98765 43215",
      type: "Juice and North Indian"
    },
    {
      name: "Mrd Canteen",
      contact: "Ram Kapoor",
      phone: "+91 98765 43216",
      type: "South Indian"
    }
   
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have questions about our service? Want to partner with us? 
          We're here to help!
        </p>
      </div>

      {/* Team Contact Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Development Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamContacts.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-bold text-xl mb-2">{member.name}</h3>
              <p className="text-orange-600 mb-4">{member.role}</p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-orange-600">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <a href={`tel:${member.phone}`} className="text-gray-600 hover:text-orange-600">
                    {member.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vendors Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Food Partners</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {vendors.map((vendor, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-xl mb-1">{vendor.name}</h3>
                  <p className="text-orange-600 text-sm mb-3">{vendor.type}</p>
                </div>
                <div className="bg-orange-100 px-3 py-1 rounded-full">
                  <p className="text-orange-600 text-sm">Vendor</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">Contact: {vendor.contact}</p>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <a href={`tel:${vendor.phone}`} className="text-gray-600 hover:text-orange-600">
                    {vendor.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Visit Our Campus</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          PES University Electronic city campus<br />
          VM67+HVP, Hosur Rd, Konappana Agrahara, Electronic City<br />
          Bengaluru 560100
        </p>
      </div>
    </div>
  );
}

export default ContactPage;