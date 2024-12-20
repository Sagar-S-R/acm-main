"use client"
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
const Growth = () => {
    return (
        <div>

            <section className="bg-black text-gray-100 relative  overflow-hidden h-auto pt-8">
                <div className="relative w-11/12 max-w-[1080px] mx-auto pt-4">
                    <h2 className="font-extrabold text-2xl sm:text-3xl md:text-6xl text-lightBlue500 font-titillium leading-[1.2] pl-4 ">
                        Explore, engagae , and<br />  elevate with<span className="text-red-600 gap-2" > RITs</span>- <span className='text-white'>activities</span>
                    </h2>

                    {/* <div className="w-6 h-1 bg-greenLight mx-auto mt-4 mb-6"></div> */}
                    <div className="w-full min-h-[520px] bg-black flex justify-around gap-10 rounded-md relative p-1 md:p-10 py-12 flex-col lg:flex-row">
                        <div className="flex flex-col justify-between w-full">
                            <div className="space-y-8" >
                                <h1 className="text-lightBlue500 font-extrabold text-2xl sm:text-3xl md:text-4xl font-titillium leading-[1.2]"></h1>
                                <div className="w-10 h-1 bg-greenLight"></div>
                                <p className="font-titillium text-[18px] leading-7 text-white opacity-70">
                                    We host regular workshops, coding competitions, guest lectures, and technical seminars that cover a broad spectrum of computing fields, from artificial intelligence and machine learning to cybersecurity and data science. Our members gain access to exclusive ACM resources, networking opportunities, and career development tools that help them grow personally and professionally.
                                </p>
                                <div className="flex flex-row items-center space-x-4">
                                    {/* <button className="bg-lightBlue w-fit text-white py-[14px] px-[18px] rounded-md font-mullish font-bold hover:bg-lightBlue500 transition-all duration-200">
                                         <Link href={'/#joinus'} >
                                            Join Us Now
                                        </Link> 
                                    </button> */}
                                    <div className="flex items-center cursor-pointer group">
                                        <Link href="/aboutus" className="font-mullish font-bold text-lightBlue group-hover:text-grayBlue-500 transition-all duration-200">
                                            Know More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Image className="rounded-md"
                            src="/elevate.jpg.webp"
                            width={400}
                            height={200}
                            layout="intrinsic"
                            alt="Picture of the author"
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Growth;