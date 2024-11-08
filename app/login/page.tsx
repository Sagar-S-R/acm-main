import React from 'react';

const Login = () => {
  return (
    <div className="flex flex-col items-center p-8 bg-black min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-lightBlue">Login</h2>
      
      <form className="flex flex-col w-full max-w-xs space-y-4">
        {/* Login Section */}
        <input 
          type="text" 
          placeholder="Name" 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        
        <input 
          type="text" 
          placeholder="USN" 
          className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
        />
        <div className='h-1 w-1/12 bg-green-600 relative'></div>

        {/* Register Section */}
        <h3 className="text-xl mt-8 text-lightBlue300 text-center font-semibold">Register</h3>
        
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
