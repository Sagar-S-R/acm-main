"use client";
import React, { useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../app/globals.css";
import Link from "next/link";

const Joinus = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        usn: "",
        message: "",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        toast.success("Form submitted successfully!");
        
        setFormData({
            name: "",
            email: "",
            mobile: "",
            usn: "",
            message: "",
        });
    };

    return (
        <section className="relative mt-[50px] overflow-hidden h-auto" id="joinus">
            <div className="relative w-11/12 max-w-[1080px] mx-auto pt-4">
                <h1 className="text-black font-extrabold text-2xl sm:text-3xl md:text-4xl font-titillium leading-[1.2] text-center">
                    Join Us
                </h1>
                <div className="w-6 h-1 bg-greenLight mx-auto mt-4 mb-6"></div>
                <div className="w-full min-h-[520px] flex justify-between bg-deepBlue rounded-md relative p-10 md:p-10 py-12 border flex-col lg:flex-row">
                    <div className="flex flex-col justify-evenly w-full lg:w-1/2 m-5">
                        <h1 className="text-white mb-5 font-extrabold text-2xl sm:text-3xl md:text-5xl font-titillium leading-[1.2]">
                            Welcome to
                            <br />
                            <span className="text-red-600">RIT</span>
                            <span className="text-lightBlue300">- STUDENT CHAPTER</span>
                        </h1>
                        <p className="font-titillium text-[18px] leading-7 text-white opacity-70">
                            Whether you are a beginner looking to dive into computing or an advanced student seeking a
                            challenging environment, the RIT ACM Student Chapter offers something for everyone. Join us
                            in our mission to shape the future of technology—right here at Ramaiah Institute of Technology.
                        </p>
                    </div>
                    <div className="flex flex-col justify-evenly w-full lg:w-1/2 m-2">
                        <form className="flex flex-col space-y-4 w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your Name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Your Email"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                                <input
                                    type="tel"
                                    id="mobile"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleInputChange}
                                    placeholder="Your Mobile"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                                <input
                                    type="text"
                                    id="usn"
                                    name="usn"
                                    value={formData.usn}
                                    onChange={handleInputChange}
                                    placeholder="Your USN"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    required
                                />
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your Message"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px]"
                                    required
                                ></textarea>
                            </div>
                            <Link 
                                href="https://docs.google.com/forms/d/e/1FAIpQLSezd-zILtS9gEaeNNaPkvEqnxblM9AX7dzXS2Q98ADIh4jtHg/viewform?usp=dialog"
                                target="_blank"
                                className="w-full"
                            >
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-500 transform hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    Submit
                                </button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </section>
    );
};

export default Joinus;