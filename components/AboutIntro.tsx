"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import "../app/globals.css";

const AboutIntro = () => {
    return (
        <section className="relative bg-deepBlue overflow-hidden h-auto pt-8">
            <div className="relative w-11/12 max-w-[1080px] mx-auto pt-4">
                <h2
                    className="font-extrabold text-center font-titillium 
        leading-tight 
        text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
                >
                    <span className="text-lightBlue300">ACM</span>{' '}
                    <span className="text-red-600">RIT</span>{' '}
                    <span className="text-white">-STUDENT CHAPTER</span>
                </h2>

                <div className="w-10 h-1 bg-greenLight mx-auto mt-4 mb-6"></div>
                <div className="w-full min-h-[520px] bg-deepBlue flex gap-5 rounded-md relative p-4 md:p-10 py-12 flex-col lg:flex-row">
                    <div className="flex flex-col justify-between w-full">
                        <div className="space-y-8" >
                            <h1 className="text-lightBlue500 font-extrabold text-2xl sm:text-3xl md:text-4xl font-titillium leading-[1.2]">About ACM - Student Chapter</h1>
                            <div className="w-10 h-1 bg-greenLight"></div>
                            <p className="font-titillium text-[18px] leading-7 text-white opacity-70">
                                The RIT ACM Chapter is a vibrant community dedicated to empowering students at the Ramaiah Institute of Technology with the skills, knowledge, and networks needed to excel in the tech world. As part of the global Association for Computing Machinery, our chapter brings together passionate RITians who are driven to explore, innovate, and lead in all areas of computing.
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

export default AboutIntro;
