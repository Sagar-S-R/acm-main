"use client"
import React from 'react';
import Link from 'next/link';

export default function Ubutton() {
  return (
    <Link
      href={"/#upm"} 
      rel="noopener noreferrer"
      className="fixed md:top-40 z-10 right-5 bg-blue-500 text-white rounded-md w-auto h-auto flex items-center justify-center shadow-lg hover:bg-red-600 transition duration-300 p-2 "
    >
      Upcoming events
    </Link>
  );
}
