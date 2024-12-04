import React from 'react'
import MemberCard from '@/components/MemberCard'
import { members } from '@/eventsData/membersDetails'
import { chapterOfficers } from '@/eventsData/chapterOfficerDetils'
import Image from 'next/image'

const page = () => {
  return (
    <div className='flex flex-col justify-center items-center bg-gradient-to-b from-deepBlueHead to-black ' >
      <div className='flex flex-col gap-10 p-10 mt-10'>
        <h2 className='font-semibold text-5xl hover:scale-110 font-titillium text-red-600 transition duration-300 mt-5'>Faculty Sponsor</h2>
        <div className='flex flex-col  justify-evenly bg-slate-100 items-center rounded-lg p-5 hover:bg-slate-300 hover:scale-125 transition duration-500  group'>
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-105 cursor-pointer">
            <Image
              src={'/coreTeam/jamuna.jpg'}
              alt={``}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-lg font-semibold hover:scale-125 transition duration-600 p-2">Jamuna S Murthy</h3>
            <p className="text-gray-600"> Faculty Advisor</p>
          </div>
        </div>
      </div>
      <div className='bg-green-600 w-3/12 items-center h-1 rounded-sm'></div>
      <div className="flex flex-col items-center space-y-12 mb-20 justify-evenly ">
        <h2 className="text-4xl font-semibold font-titillium text-red-600 hover:scale-110 transition duration-300 mt-5">Chapter Officers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {chapterOfficers.map((member, index) => (
            <MemberCard
              key={index}
              member={member}
            />))}
        </div>
      </div>
      <div className='bg-green-600 w-3/12 items-center h-1 rounded-sm'></div>
      <div className="flex flex-col items-center space-y-12 mb-20">
        <h2 className="text-4xl text-red-600 font-semibold hover:scale-110 transition duration-300 mt-5">Members</h2>
        <div className="grid grid-cols-2 p-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map((member, index) => (
            <MemberCard
              key={index}
              member={member}
            />))}
        </div>
      </div>
    </div>
  )
}

export default page