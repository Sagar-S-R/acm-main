"use client"
import React from 'react';

const UpcomingDesc = () => {
    return (
        <div className="w-full h-full mt-5">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Upcoming Events
            </h2>
            <hr className="border-gray-600 border-t-4 my-4" />
            <div id='javathon' className="min-h-screen flex flex-col max-w-fit border-black shadow-lg p-6">
                <div className='p-5'>
                    <div className="max-w-3xl w-full rounded-lg p-6 mb-3">
                        <h1 className="text-4xl font-bold text-blue-600 mb-4">Javathon 2025</h1>
                        <p className="text-lg text-gray-700">
                            Join us for an exciting event that brings together Java enthusiasts !
                        </p>
                    </div>
                    <div className="max-w-2xl w-full rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Event Details</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li><strong>Date :</strong> January 2025</li>
                            <li><strong>Location : </strong> Ramaiah Institute of Technology RIT campus.</li>
                            <li><strong>Duration : </strong> 2 Days of Non-Stop Coding & Innovation!</li>
                            <li><strong>Eligibility :</strong> Open to all 2nd-year students specializing in Java programming </li>
                        </ul>
                    </div>
                    <div className="max-w-3xl w-full rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Javathon 2025</h2>
                        <p className="text-gray-700">
                            Are you ready to test your coding skills, collaborate with talented peers, and solve real-world problems? Javathon 2025 is here to challenge you in ways that will sharpen your programming expertise and propel your career forward. Hosted by the RIT ACM Student Chapter, this exciting event is designed specifically for 2nd-year students with a passion for the Java programming language. Whether you are a coding enthusiast or aiming to refine your Java knowledge, Javathon is the perfect opportunity to prove your skills and push the boundaries of innovation
                        </p>
                    </div>
                    <div className="max-w-3xl w-full flex justify-center mt-8">
                        <button className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition duration-200">
                            Register Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingDesc;
