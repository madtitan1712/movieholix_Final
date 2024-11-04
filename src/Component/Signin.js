import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import suzume from './Suzume.jpg';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Signin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Redirect to /films after form submission
    navigate('/flims');
  };

  const handleNavigate = () => {
    navigate('/createaccount');
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0f1215]">
      {/* Background Image */}
      <img 
        src={suzume}
        alt="background" 
        className="absolute w-full h-full object-cover object-center opacity-30"
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-[#161a1e]/90 rounded-md border border-[#2a3038] shadow-xl backdrop-blur">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">
              Enter the world.
            </h1>
            <div className="h-[2px] w-full bg-[#00ff66] mx-auto mt-2 shadow-[0_0_10px_#00ff66]"></div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <User className="h-5 w-5 text-[#7a8999]" />
              </div>
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-[#1c2127] border border-[#2a3038] rounded-md 
                         text-white placeholder-[#7a8999] focus:outline-none focus:border-[#00ff66]
                         focus:shadow-[0_0_10px_rgba(0,255,102,0.2)] transition-all duration-200"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Lock className="h-5 w-5 text-[#7a8999]" />
              </div>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-[#1c2127] border border-[#2a3038] rounded-md 
                         text-white placeholder-[#7a8999] focus:outline-none focus:border-[#00ff66]
                         focus:shadow-[0_0_10px_rgba(0,255,102,0.2)] transition-all duration-200"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-[#00ff66] text-[#0f1215] rounded-md font-medium
                       hover:bg-[#00ff66]/90 hover:shadow-[0_0_15px_rgba(0,255,102,0.3)]
                       transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center text-[#7a8999]">
            Don't have an account?{' '}
            <button
              onClick={handleNavigate}
              className="text-[#00ff66] hover:text-[#00ff66]/80 transition-colors duration-200 
                       focus:outline-none focus:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
