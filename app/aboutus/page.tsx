import React from 'react'
import Ourjourney from "@/components/Ourjourney";
import Ourmission from "@/components/Ourmission";
import Activities from "@/components/Activities";
import Intro from '@/components/Intro';

const aboutus = () => {
  return (
    <div>
      <Intro/>
      <Ourjourney/>
      <Ourmission/>
      <Activities/>
    </div>
  )
}

export default aboutus