import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EntryPage = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 left-0 right-0 z-50">
      <nav className="bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 
                onClick={() => navigate('/')} 
                className="text-2xl font-bold text-white hover:text-purple-300 transition-colors duration-200 cursor-pointer"
              >
                MovieHolix
              </h1>
            </div>

            {/* Navigation */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className={`flex items-center transition-all duration-300 ${
                  isSearchFocused ? 'w-64' : 'w-48'
                }`}>
                  <input
                    type="text"
                    placeholder="Search movies..."
                    className="w-full px-4 py-1 rounded-lg bg-black/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black/50 transition-all duration-300"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white">
                    <Search size={18} />
                  </button>
                </div>
              </div>
              <button 
                onClick={() => navigate('/signin')} 
                className="px-4 py-2 text-white bg-purple-600/80 hover:bg-purple-600 rounded-lg transition-colors duration-200"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/createaccount')} 
                className="px-4 py-2 text-purple-900 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default EntryPage;