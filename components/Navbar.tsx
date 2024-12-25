"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            <nav className="bg-deepBlue">
                <div className="relative w-full max-w-[1080px] mx-auto flex items-center justify-between px-4 ">
                    <Link href="/" className="cursor-pointer py-5 pr-5">
                        <Image
                            src="/acmlogo.png"
                            width={150}
                            height={40}
                            alt="Logo"
                        />
                    </Link>
                    <div className="hidden sm:flex gap-6">
                        <Link href="/" className="text-white font-mullish py-5 hover:text-lightBlue transition-all duration-200 relative group">
                            Home
                            <div className="absolute bottom-0 w-full h-1 bg-lightBlue hidden group-hover:block transition-all duration-200"></div>
                        </Link>

                        <Link href="/aboutus" className="text-white font-mullish py-5 hover:text-lightBlue transition-all duration-200 relative group">
                            About
                            <div className="absolute bottom-0 w-full h-1 bg-lightBlue hidden group-hover:block transition-all duration-200"></div>
                        </Link>

                        <Link href="/events" className="text-white font-mullish py-5 hover:text-lightBlue transition-all duration-200 relative group">
                            Events
                            <div className="absolute bottom-0 w-full h-1 bg-lightBlue hidden group-hover:block transition-all duration-200"></div>
                        </Link>

                        <Link href="/teams" className="text-white font-mullish py-5 hover:text-lightBlue transition-all duration-200 relative group">
                            Teams
                            <div className="absolute bottom-0 w-full h-1 bg-lightBlue hidden group-hover:block transition-all duration-200"></div>
                        </Link>

                        <Link href="#" className="text-white font-mullish py-5 hover:text-lightBlue transition-all duration-200 relative group">
                            Resource
                            <div className="absolute bottom-0 w-full h-1 bg-lightBlue hidden group-hover:block transition-all duration-200"></div>
                        </Link>

                        <Link href="/#joinus" className="text-white font-mullish py-5 hover:text-lightBlue transition-all duration-200 relative group">
                            Join Us
                            <div className="absolute bottom-0 w-full h-1 bg-lightBlue hidden group-hover:block transition-all duration-200"></div>
                        </Link>
                    </div>
                    <div className="sm:hidden">
                        <button onClick={toggleDrawer} className="text-white text-2xl">
                            {isOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                    <div className="hidden sm:flex space-x-6">
                        <Link href={'/login'}><button className="py-2 px-5 font-mullish text-white border-lightBlue border-2 rounded-sm text-sm font-bold ">
                            Log in
                        </button>
                        </Link>
                        {/* <button className="py-2 px-4 font-mullish text-sm font-bold bg-white text-lightBlue300 transition-all duration-200 hover:text-lightBlue300">
                            Sign Up
                        </button> */}
                    </div>
                    <Link href="https://www.acm.org/" target="_blank" className="cursor-pointer py-5 pr-5">
                        <Image
                            src="/acmMainlogo.png"
                            width={120}
                            height={30}
                            alt="Logo"
                        />
                    </Link>

                    {/* <Link href={'/Developers'} className="text-white font-mullish py-5 hover:text-lightBlue transition-all duration-200 relative group">
                        Developers
                         <div className="absolute bottom-0 w-full h-1 bg-lightBlue hidden group-hover:block transition-all duration-200"></div> 
                    </Link>  */}
                </div>
                {isOpen && (
                    <div className="sm:hidden p-5 bg-deepBlue inset-0 z-50 flex flex-col items-center pt-5 space-y-4">
                        <Link href="/" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            Home
                        </Link>
                        <Link href="/aboutus" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            About
                        </Link>
                        <Link href="/events" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            Events
                        </Link>
                        <Link href="teams" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            Teams
                        </Link>
                        <Link href="#" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            Resource
                        </Link>
                        <Link href="/#joinus" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            Join Us
                        </Link>
                        <div className="flex flex-col items-center space-y-4 mt-6">
                            <Link href={'/login'}><button className="py-2 px-5 font-mullish text-white border-lightBlue border-2 rounded-sm text-sm font-bold ">
                                Log in
                            </button>
                            </Link>
                            {/* <button className="py-2 px-6 font-mullish text-sm font-bold bg-white text-lightBlue300 transition-all duration-200 hover:text-lightBlue300">
                                Sign Up
                            </button> */}
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;