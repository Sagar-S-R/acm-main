"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronRight } from "react-icons/fi";
import "../app/globals.css";

const Ourmission = () => {
    return (
        <section className="relative mt-[50px] overflow-hidden h-auto p-2 md:p-10">
            <div className="relative w-11/12 max-w-[1080px] mx-auto pt-4">
                <div className="w-6 h-1 bg-greenLight mx-auto mt-4 mb-6"></div>
                <div className="w-full min-h-[520px] bg-deepBlue flex flex-col lg:flex-row gap-5 rounded-md relative p-4 md:p-10 py-12 transition-transform duration-300 transform hover:scale-105">
                    <div className="flex flex-col justify-between w-full">
                        <div className="space-y-8" >
                            <h1 className="text-lightBlue500 font-extrabold text-2xl sm:text-3xl md:text-4xl font-titillium leading-[1.2]">Our Mission</h1>
                            <div className="w-6 h-1 bg-greenLight"></div>
                            <p className="font-titillium text-[18px] leading-7 text-white opacity-70">
                                The RIT ACM Student Chapter aims to empower students by bridging academic learning with
                                real-world applications. Our mission is to inspire curiosity, foster collaboration, and encourage
                                leadership within the computing community, providing a platform for students to connect with
                                industry experts, participate in hands-on projects, and stay updated on the latest advancements
                                in the field.
                            </p>
                            <div className="flex flex-row items-center space-x-4">
                                <div className="flex items-center cursor-pointer group">
                                    <Link href="#" className="font-mullish font-bold text-lightBlue group-hover:text-grayBlue-500 transition-all duration-200">
                                        Know More
                                    </Link>
                                    <FiChevronRight className="w-5 h-5 text-lightBlue500 hover:text-greyBlue transition-all duration-200" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Image className="rounded-md"
                        src="/mission.jpg"
                        width={400}
                        height={300}
                        alt="Picture of the author"
                    />
                </div>
            </div>

        </section>
    );
};

export default Ourmission;
