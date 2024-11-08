"use client"
import React from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='bg-black text-white'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 p-5'>
        <div className="flex flex-col gap-10">
          <h5>About Us</h5>
          <p className='break-words'>
            The ACM Student Chapter at MSRIT is dedicated to fostering a vibrant community for computing enthusiasts. Through workshops, hackathons, and events, we provide students with opportunities to enhance their technical skills and engage with the latest in computer science. Join us in advancing knowledge, innovation, and professional growth in the field!
          </p>
        </div>
        <div className="flex flex-col gap-7">
          <h5>Quick links</h5>
          <div className='flex flex-col gap-3 p-1'>
            <Link href={"/"}>Home</Link>
            <Link href={"/aboutus"}>About</Link>
            <Link href={"/events"}>Events</Link>
            <Link href={"/teams"}>Teams</Link>
            <Link href={"/resources"}>Resources</Link>
            <Link href={"/joinus"}>Join Us</Link>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <h5>Follow us</h5>
          <div className='flex gap-3 flex-col p-1'>
            <Link className='flex gap-3' href={"/"}><span><FaWhatsapp/> </span>WhatsApp</Link>
            <Link className='flex gap-3' href={"/"}><span><FaInstagram/></span> Instagram</Link>
            <Link className='flex gap-3' href={"/"}><span><FaLinkedin/></span> LinkedIn</Link>
          </div>
        </div>
        <div className="flex flex-col gap-7">
          <h5>Contact Us</h5>
          <div className='flex flex-col gap-3 p-1'>
            <h5>M S Ramaiah Institute of Technology</h5>
            <h5>M.S.Ramaiah Nagar, MSRIT Post Bengaluru 560054</h5>
            <h5> <Link href={"https://www.msrit.edu/"}>msrit.edu</Link></h5>
            <h5>Contact: +91 80 2360 0822 / 6934</h5>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center py-4'>
        <span>© All rights reserved</span>
      </div>
    </div>
  );
}

export default Footer;
