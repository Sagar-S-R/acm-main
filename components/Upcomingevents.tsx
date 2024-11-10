"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export function Upcomingevents() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <h2 className="text-red-500 mb-5 font-extrabold text-2xl sm:text-3xl md:text-4xl font-titillium leading-[1.2]">
        Up Coming Events
      </h2>
      still need to be upadted to glow
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="fast"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "It",
    name: "Javathon",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
];

export default Upcomingevents;