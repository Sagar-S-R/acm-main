"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { upcoming } from "@/eventsData/upComing/upComingEvents"

export function Upcomingevents() {

  return (
    <div id="upm" className="h-[30rem] mt-10 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-red-500 mb-5 font-extrabold text-3xl md:text-4xl font-titillium leading-[1.2]">
        Upcoming Events
      </h2>
      {upcoming.length ?
        <InfiniteMovingCards
          items={upcoming}
          direction="right"
          speed="fast"
          buttons={[
            { label: "Learn More", href: "/events/#javathon" },
            // { label: "Register", href: "/register" },
          ]}
        /> :
        <div className="w-full h-full mt-5 text-center">
          <h1 className="text-3xl max-w-max sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            Stay tuned for more exciting events coming your way...!
          </h1>
        </div>
      }
    </div>
  );
}



export default Upcomingevents;
