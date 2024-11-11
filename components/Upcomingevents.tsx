"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { upcoming } from "@/eventsData/upComing/upComingEvents"

export function Upcomingevents() {
  return (
    <div id="upm" className="h-[30rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-red-500 mb-5 font-extrabold text-3xl md:text-4xl font-titillium leading-[1.2]">
        Upcoming Events
      </h2>
      <InfiniteMovingCards
        items={upcoming}
        direction="right"
        speed="fast"
        buttons={[
          { label: "Learn More", href: "/events/#javathon" },
          // { label: "Register", href: "/register" },
        ]}
      />
    </div>
  );
}



export default Upcomingevents;
