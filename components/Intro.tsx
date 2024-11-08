"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import "../app/globals.css";

const Intro = () => {
    return (
        <section className="relative mt-[100px] overflow-hidden h-auto p-10">
            <div className="relative w-11/12 max-w-[1080px] mx-auto pt-4">
                <h2 className="font-extrabold text-2xl sm:text-3xl md:text-6xl text-black font-titillium leading-[1.2] text-center typewriter">
                    {/* ACM <span className="text-red-600" >RIT</span>-STUDENT CHAPTER */}
                    Need To be changed
                </h2>

                <div className="w-6 h-1 bg-greenLight mx-auto mt-4 mb-6"></div>
                <div className="w-full min-h-[520px] bg-deepBlue flex gap-5 rounded-md relative p-4 md:p-10 py-12 border flex-col lg:flex-row">
                    <div className="flex flex-col justify-between w-full">
                        <div className="space-y-8" >
                            <h1 className="text-lightBlue500 font-extrabold text-2xl sm:text-3xl md:text-4xl font-titillium leading-[1.2]">About ACM - Student Chapter</h1>
                            <div className="w-6 h-1 bg-greenLight"></div>
                            <p className="font-titillium text-[18px] leading-7 text-white opacity-70">
                                Welcome to the Ramaiah Institute of Technology (RIT) Student Chapter of the Association for
                                Computing Machinery (ACM). Founded on March 24, 2023, by Ms. Jamuna S Murthy, Assistant
                                Professor, Department of Computer Science and Engineering. The RIT ACM Student Chapter
                                stands as a vibrant community dedicated to advancing computing knowledge, fostering
                                innovation, and building a collaborative space for students with a passion for technology.
                                Officially recognized under Group ID: 192244, we are proud to be an active chapter within ACM,
                                the worlds largest computing society.
                            </p>
                            <div className="flex flex-row items-center space-x-4">
                                <button className="bg-lightBlue w-fit text-white py-[14px] px-[18px] rounded-md font-mullish font-bold hover:bg-lightBlue500 transition-all duration-200">
                                    <Link href={'/#joinus'} >
                                        Join Us Now
                                    </Link>
                                </button>
                                <div className="flex items-center cursor-pointer group">
                                    <Link href="/aboutus" className="font-mullish font-bold text-lightBlue group-hover:text-grayBlue-500 transition-all duration-200">
                                        Know More
                                    </Link>
                                    <FiChevronRight className="w-5 h-5 text-lightBlue500 hover:text-greyBlue transition-all duration-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Image className="rounded-md"
                        src="/background.jpg"
                        width={600}
                        height={400}
                        alt="Picture of the author"
                    />
                </div>
            </div>

        </section>
    );
};

export default Intro;
