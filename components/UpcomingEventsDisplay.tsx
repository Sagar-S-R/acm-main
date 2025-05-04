"use client"
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { useState } from 'react';

const UpcomingDesc = () => {
    const [showRules, setShowRules] = useState(false);
    return (
        <div id="upcoming" className="w-full h-full mt-5">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Upcoming Events
            </h2>
            <hr className="border-gray-600 border-t-4 my-4" />
            {/* <div id='javathon' className="min-h-screen flex flex-col max-w-fit border-black shadow-lg p-6">
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
            </div> */}
            <div id="codegolf" className="min-h-screen flex flex-col items-center px-4 py-6">
                <div className="w-full max-w-4xl bg-gray-50 shadow-lg rounded-2xl p-6 sm:p-10">
                    {/* 💥 Heading */}
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-700 text-center mb-6">
                        Code Golf - When Less is More
                    </h1>

                    {/* 📸 Flyer */}
                    <div className="w-full max-w-md md:max-w-2xl mb-8">
                        <Image
                            src="/eventsImages/codegolf/flyer.jpg"
                            alt="Code Golf Flyer"
                            width={1200}
                            height={1600}
                            className="rounded-lg shadow-md w-full h-auto"
                            priority
                        />
                    </div>

                    {/* 📅 Event Details */}
                    <div className="max-w-2xl w-full rounded-lg p-6 bg-white shadow mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Event Details</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li><strong>Date:</strong> 9th May 2025</li>
                            <li><strong>Timings:</strong> 12 PM to 4 PM</li>
                            <li><strong>Location:</strong> MS Ramaiah Institute of Technology, ESB Seminar Hall 1</li>
                            <li><strong>Prize Pool:</strong> ₹15,000</li>
                            <li><strong>Team Size:</strong> 2 or 3 members</li>
                            <li><strong>Last Date to Register:</strong> 8th May 2025</li>
                        </ul>
                    </div>

                    {/* 💸 Registration Fees */}
                    <div className="max-w-2xl w-full rounded-lg p-6 bg-white shadow mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Registration Fees</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li><strong>Team with ACM Members only:</strong> ₹50</li>
                            <li><strong>Team with One or More Non-ACM Members:</strong> ₹100</li>
                        </ul>
                    </div>

                    {/* 🏦 Payment Details */}
                    <div className="max-w-2xl w-full rounded-lg p-6 bg-white shadow mb-4">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Payment Details</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2 pl-4">
                            <li><strong>Payment UPI ID:</strong> 8539900733@ptsbi</li>
                            <li><strong>Phone Number:</strong> +91 85399 00733</li>
                        </ul>
                    </div>

                    {/* 📜 Collapsible Rules Section */}
                    <div className="max-w-2xl w-full rounded-lg p-6 bg-gray-100 shadow mb-6">
                        <h2
                            className="text-2xl font-semibold text-gray-800 mb-3 cursor-pointer"
                            onClick={() => setShowRules(!showRules)}
                        >
                            {showRules ? '🔽 Hide Rules' : '▶️ Show Full Rules & Format'}
                        </h2>

                        {showRules && (
                            <div className="text-gray-700 space-y-3 text-sm sm:text-base">
                                <ul className="list-disc list-inside space-y-2 pl-4">
                                    <li><strong>Event Format:</strong> Two rounds. Solve problems using the fewest characters possible.</li>
                                    <li><strong>Languages Allowed:</strong> Java, Python, C (No other languages permitted)</li>
                                    <li><strong>Scoring:</strong> Fewer characters = more points. Ties broken by correctness & submission time.</li>
                                    <li><strong>Rules:</strong>
                                        <ul className="list-disc pl-6 mt-1">
                                            <li>Use only standard input/output</li>
                                            <li>No external libraries</li>
                                            <li>Self-contained, runnable code only</li>
                                            <li>No compilation tricks allowed</li>
                                        </ul>
                                    </li>
                                    <li><strong>Strictly Enforced:</strong>
                                        <ul className="list-disc pl-6 mt-1">
                                            <li>Only Java, Python, C allowed</li>
                                            <li>No ChatGPT or AI tools</li>
                                            <li>No online compilers or search engines</li>
                                            <li>No collaboration or code copying</li>
                                            <li>No mobile devices for coding/reference</li>
                                            <li>One login per team for code submission</li>
                                        </ul>
                                    </li>
                                    <li><strong>Round Format:</strong>
                                        <ul className="list-disc pl-6 mt-1">
                                            <li>Round 1: Warm-up problems (Practice)</li>
                                            <li>Round 2: Final problems (Scored)</li>
                                            <li>Use your own system for both rounds</li>
                                            <li>Submit code via designated platform</li>
                                        </ul>
                                    </li>
                                    <li><strong>Violation:</strong> Any rule break = Disqualification</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* 🚀 Register Button */}
                    <div className="max-w-2xl w-full flex justify-center">
                        <Link target='__blank' href="https://forms.gle/kxfcYZGhesR4x7F67">
                            <button className="bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition duration-200">
                                Register Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* <div className="w-full h-full mt-16 text-center ">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                    We&apos;ll Catch You Guys Soon 😉
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mt-4">
                    Stay tuned for more exciting events coming your way!
                </p>
            </div> */}

        </div>
    );
};

export default UpcomingDesc;
