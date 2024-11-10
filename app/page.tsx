// "use client"
import Joinus from "@/components/Joinus";
import { Startsection } from "@/components/Startsection";
import AboutIntro from "@/components/AboutIntro";
import Growth from "@/components/Growth";
import Upcomingevents from "@/components/Upcomingevents";
export default function Home() {
  return (

    <div className="">
      <Startsection/>
      <div className="bg-gradient-to-b from-gray-400 to-[#02042a] h-[96px] w-full"></div>
      <AboutIntro/>
      <div className="bg-gradient-to-b from-[#02042a] to-black h-[96px] w-full"></div>
      <Growth/>
      <Upcomingevents/>
      <Joinus/>
    </div>

  );
}
