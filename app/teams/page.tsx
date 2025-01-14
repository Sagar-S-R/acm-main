import React from 'react';
import MemberCard from '@/components/MemberCard';
import { members } from '@/eventsData/membersDetails';
import { chapterOfficers } from '@/eventsData/chapterOfficerDetils';
// import Image from 'next/image';

const Page = () => {
  type Member = {
    name: string;
    role: string;
  };

  const groupedMembers: Record<string, Member[]> = members.reduce((acc: Record<string, Member[]>, member: Member) => {
    if (!acc[member.role]) {
      acc[member.role] = [];
    }
    acc[member.role].push(member);
    return acc;
  }, {});

  const technicalMembers = groupedMembers['Technical'] || [];
  delete groupedMembers['Technical'];

  return (
    <div className="flex flex-col justify-center pt-20 items-center bg-gradient-to-b from-deepBlueHead to-black text-black">
      {/* Faculty Sponsor Section */}
      <div className="flex flex-col items-center gap-10 p-4 sm:p-10 mt-10 w-full">
        <h2 className="font-semibold text-4xl sm:text-5xl hover:scale-110 font-titillium text-red-600 transition duration-300 text-center">
          Faculty Sponsor
        </h2>
        <div className="flex justify-center w-full">
          <MemberCard
            member={{
              name: "Jamuna S Murthy",
              role: "Faculty Advisor",
              image: '/coreTeam/jamuna.jpg'
            }}
            isFaculty={true}
          />
        </div>
      </div>

      <div className="bg-green-600 w-11/12 sm:w-3/12 h-1 rounded-sm my-8"></div>

      {/* Chapter Officers Section */}
      <div className="flex flex-col items-center w-full space-y-8 sm:space-y-12 mb-16 sm:mb-20 px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold font-titillium text-red-600 hover:scale-110 transition duration-300 text-center">
          Chapter Officers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl place-items-center">
          {chapterOfficers.map((member, index) => (
            <MemberCard key={index} member={member} isFaculty={false} />
          ))}
        </div>
      </div>

      <div className="bg-green-600 w-11/12 sm:w-3/12 h-1 rounded-sm my-8"></div>

      {/* Technical Team Section */}
      <div className="flex flex-col items-center w-full space-y-8 sm:space-y-12 mb-16 sm:mb-20 px-4">
        <h2 className="text-3xl sm:text-4xl font-semibold font-titillium text-red-600 hover:scale-110 transition duration-300 text-center">
          Technical Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl place-items-center">
          {technicalMembers.map((member, index) => (
            <MemberCard key={index} member={member} isFaculty={false} />
          ))}
        </div>
      </div>

      <div className="bg-green-600 w-11/12 sm:w-3/12 h-1 rounded-sm my-8"></div>

      {/* Other Teams Sections */}
      {Object.entries(groupedMembers).map(([role, members]) => (
        <div key={role} className="flex flex-col items-center w-full space-y-8 sm:space-y-12 mb-16 sm:mb-20 px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold font-titillium text-red-600 hover:scale-110 transition duration-300 text-center">
            {role} Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-full max-w-5xl place-items-center">
            {members.map((member, index) => (
              <MemberCard key={index} member={member} isFaculty={false} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;