import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-xl font-semibold mb-4">Fine Dining</h3>
            <p className="text-gray-300 mb-4">
              Experience exceptional cuisine in an elegant atmosphere. Perfect for special occasions and memorable dining experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Hours</h4>
            <div className="flex items-start mb-2">
              <Clock className="h-5 w-5 mr-2 text-secondary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-300">Monday - Thursday: 5pm - 10pm</p>
                <p className="text-gray-300">Friday - Saturday: 5pm - 11pm</p>
                <p className="text-gray-300">Sunday: 4pm - 9pm</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2 text-secondary-500" />
              <p className="text-gray-300">123 Gourmet Avenue, Culinary District</p>
            </div>
            <div className="flex items-center mb-2">
              <Phone className="h-5 w-5 mr-2 text-secondary-500" />
              <p className="text-gray-300">(123) 456-7890</p>
            </div>
            <div className="flex items-center mb-2">
              <Mail className="h-5 w-5 mr-2 text-secondary-500" />
              <p className="text-gray-300">info@finedining.com</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-300 mb-2">Subscribe to receive special offers and updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-secondary-500 w-full"
              />
              <button className="bg-secondary-500 text-gray-900 px-4 py-2 rounded-r-md font-medium hover:bg-secondary-600 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fine Dining Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;