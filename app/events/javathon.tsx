import React from 'react';

const Javathon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      {/* Event Header */}
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8 mb-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">Javathon 2024</h1>
        <p className="text-lg text-center text-gray-700">
          Join us for an exciting event that brings together Java enthusiasts from around the world!
        </p>
      </div>

      {/* Event Details */}
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Event Details</h2>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li><strong>Date:</strong> March 24, 2024</li>
          <li><strong>Location:</strong> Tech Convention Center, San Francisco, CA</li>
          <li><strong>Duration:</strong> 9:00 AM - 6:00 PM</li>
        </ul>
      </div>

      {/* Event Description */}
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">About Javathon 2024</h2>
        <p className="text-gray-700">
          Javathon 2024 is a one-day event that offers workshops, talks, and networking opportunities for Java developers
          of all skill levels. Learn from industry leaders, enhance your coding skills, and connect with fellow developers
          to explore the latest trends and innovations in Java programming.
        </p>
      </div>

      {/* Call to Action */}
      <div className="max-w-3xl w-full flex justify-center mt-8">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-blue-700 transition duration-200">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default Javathon;


