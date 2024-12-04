import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-b from-deepBlueHead to-white min-h-screen">
      <h2 className="text-3xl  font-titillium mb-6 text-red-600">Login </h2>
      <h3 className='text-xl font-titillium mb-6 text-white'>For RIT-ACM Members</h3>
      
      <form className="flex flex-col w-full max-w-xs space-y-4">
        <input 
          type="text" 
          placeholder="USN" 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        
        <input 
          type="password" 
          placeholder="password" 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />

<button 
          type="submit" 
          className="w-full py-3 bg-lightBlue text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          LogIn
        </button>

        <h3 className="text-xl mt-8 text-red-600 text-center font-semibold">Register</h3>
        
        <input 
          type="text" 
          placeholder="USN" 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <input 
          type="password" 
          placeholder="New Password" 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        
        <input 
          type="password" 
          placeholder="Confirm Password" 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />

        <button 
          type="submit" 
          className="w-full py-3 bg-lightBlue text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Login;
