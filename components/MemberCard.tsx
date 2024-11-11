import React from 'react'
import Image from 'next/image'

const MemberCard = ({member} : any) => {
    return (        
        <div>
            <div className='flex flex-col  justify-evenly bg-slate-100 items-center rounded-lg p-5 hover:bg-slate-300 hover:scale-105 transition duration-500  group'>
                <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-105 cursor-pointer">
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
    )
}

export default MemberCard