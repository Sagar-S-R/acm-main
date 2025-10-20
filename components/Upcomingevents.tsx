"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { useState, useEffect } from "react";

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  speakers?: string[];
}

export function Upcomingevents() {
  const [upcoming, setUpcoming] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/documentation/events?status=upcoming');
        if (response.ok) {
          const data = await response.json();
          setUpcoming(data.events);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div id="upm" className="h-[30rem] mt-10 rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-red-500 mb-5 font-extrabold text-3xl md:text-4xl font-titillium leading-[1.2]">
        Upcoming Events
      </h2>
      {upcoming.length ?
        <InfiniteMovingCards
          items={upcoming.map(event => ({
            quote: event.description,
            name: event.title,
            title: new Date(event.date).toLocaleDateString(),
          }))}
          direction="right"
          speed="fast"
          buttons={[
            { label: "Learn More", href: "/events/#upcoming" },
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
