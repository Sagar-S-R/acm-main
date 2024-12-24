"use client"
import Link from 'next/link';
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
                        <h1 className="text-4xl font-bold text-blue-600 mb-4">HACKVENTURE 1.0</h1>
                        <p className="text-lg text-gray-700">
                            Join us for an exciting event that brings together Java enthusiasts !
                        </p>
                    </div>
                    <div className="max-w-2xl w-full rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Event Details</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li><strong>Date :</strong>20th - 27th December 2024</li>
                            <li><strong>Location : </strong> Ramaiah Institute of Technology RIT campus.</li>
                            <li><strong>Duration : </strong> 1 Days of Non-Stop Coding & Innovation!</li>
                            <li><strong>Eligibility :</strong> Open to all students  </li>
                        </ul>
                    </div>
                    <div className="max-w-3xl w-full rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About HackVenture 2025</h2>
                        <p className="text-gray-700">
                            1. Team size: 2-4 members.  <br />
                            2. 20th Dec: 1st round (Online).<br />
                            3. 22nd Dec: Result announcement of 1st round.<br />
                            4. 27th Dec: 2nd round (Offline).<br />
                            5. 2nd round Location: Des Hi-Tech Seminar Hall-1.<br />
                        </p>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Note</h2>
                        <p className="text-gray-700">
                            
                            • 1st round will be only idea presentation with PPT (compulsory).<br />
                            • 2nd round is offline and every team member is required to be
                            present (conditions apply) along with GitHub code.<br />
                            • Video (optional) for 1st round to be uploaded on YouTube and
                            made public (Unlisted) and that same link should be provided in
                            the form.<br />
                            • Code is required only for 2nd round and has no impact on 1st
                            round.<br />

                            <Link href={"https://docs.google.com/presentation/d/1CFR3OnVZY8HTc4euBVtL5txMrZZbB1do/edit?pli=1#slide=id.p1"} className='mt-2 text-blue-600 hover:text-red-500' >
                              ppt : Link
                            </Link>

                            </p>
                            
                    </div>
                    <div className="max-w-3xl w-full flex justify-center mt-8">
                        <Link href="https://form.jotform.com/243444897423465">
                        <button className="bg-blue-600 text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-700 transition duration-200">
                            Register Now
                        </button>
                        
                        </Link>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingDesc;
