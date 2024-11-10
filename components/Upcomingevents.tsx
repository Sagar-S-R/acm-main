"use client";
import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import Javathon from "@/app/events/javathon";

export function Upcomingevents() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-red-500 mb-5 font-extrabold text-2xl sm:text-3xl md:text-4xl font-titillium leading-[1.2]">
        Upcoming Events
      </h2>
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
        buttons={[
          { label: "Learn More", href: "/events/javathon" },
          // { label: "Register", href: "/register" },
        ]}
      />
    </div>
  );
}

const testimonials = [
  {
    quote: "Experience the coding extravaganza!",
    name: "Javathon",
    title: "A Tale of Two Cities",
  },
  {
    quote: "An event that redefines collaboration!",
    name: "Code Fusion",
    title: "Code Together, Grow Together",
  },
];

export default Upcomingevents;
