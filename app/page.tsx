"use client"
import Joinus from "@/components/Joinus";
import { Startsection } from "@/components/Startsection";
import AboutIntro from "@/components/AboutIntro";
import Growth from "@/components/Growth";
import Upcomingevents from "@/components/Upcomingevents";
export default function Home() {
  return (

    <div className="">
      <Startsection/>
      <AboutIntro/>
      <Growth/>
      <Upcomingevents/>
      <Joinus/>
    </div>

  );
}
