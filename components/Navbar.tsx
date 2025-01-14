"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prev) => !prev);
    };

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            <nav className={`bg-deepBlue transition-all duration-500 ${isScrolled ? 'h-24' : 'h-28'} fixed top-0 left-0 w-full z-50`}>
                <div className="relative w-full max-w-[1080px] mx-auto flex items-center justify-between gap-10 px-4">
                    <Link href="/" className="cursor-pointer py-4  pr-5">
                        <Image
                            src="/main-logo.png"
                            width={isScrolled ? 60 : 80}
                            height={20}
                            alt="Logo"
                            className="transition-all duration-500"
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
                        <Link href="/login">
                            <button className="py-2 px-5 font-mullish text-white border-lightBlue border-2 rounded-sm text-sm font-bold">
                                Log in
                            </button>
                        </Link>
                    </div>
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
                        <Link href="/teams" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            Teams
                        </Link>
                        <Link href="#" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            Resource
                        </Link>
                        <Link href="/#joinus" className="text-white font-mullish py-2 text-lg" onClick={toggleDrawer}>
                            Join Us
                        </Link>
                        <div className="sm:flex space-x-6">
                            <Link href="/login" onClick={toggleDrawer}> {/* Ensure the menu closes on login click */}
                                <button className="py-2 px-5 font-mullish text-white border-lightBlue border-2 rounded-sm text-sm font-bold">
                                    Log in
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;