import React, { useState, useEffect } from 'react';
import lalaland from './lalaland.jpg';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/createaccount'); 
  };

  useEffect(() => {
    setImageLoaded(true);
    const timer = setTimeout(() => {
      setContentVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen">
      
      <div className="absolute inset-0">
        <img
          src={lalaland}
          alt="Hero"
          className={`w-full h-full object-cover transition-opacity duration-700 ease-in
            ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-black/30" /> 
      </div>

      
      <div className="relative z-10 max-w-5xl mx-auto h-full flex flex-col justify-center px-4">
        <div 
          className={`space-y-4 transition-all duration-500 ease-out
            ${contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <h1 className="text-5xl font-bold text-white">
            Track films you've watched.
          </h1>
          <h2 className="text-2xl text-white">
            Save those you want to see.
          </h2>
          <h2 className="text-2xl text-white">
            Tell your friends what's good.
          </h2>
          
          <button 
            className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors" 
            onClick={handleNavigate} 
          >
            Get started — it's free!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
