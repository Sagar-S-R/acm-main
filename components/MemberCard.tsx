import React from 'react';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const MemberCard = ({ member, isFaculty = false } : any) => {
    return (
        <div className={`${isFaculty ? 'w-64' : 'w-48'}`}>
            <div className='flex flex-col justify-evenly bg-slate-100 items-center rounded-lg p-5 hover:bg-slate-300 hover:scale-105 transition duration-500 group h-full'>
                <div className={`${isFaculty ? 'w-32 h-32' : 'w-24 h-24'} rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-105 cursor-pointer`}>
                    <Image
                        src={member.image}
                        alt={`${member.name}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-semibold hover:scale-125 transition duration-600 p-2">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                </div>
            </div>
        </div>
    );
};

export default MemberCard