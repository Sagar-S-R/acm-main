import React from 'react'

const developers = () => {
    return (
        <div className='flex flex-col pt-32'>
            <div className='flex flex-row justify-center items-center bg-gradient-to-b from-deepBlueHead to-black '>
                <div className='flex flex-col gap-10 p-10 mt-10'>
                    <h2 className='font-semibold text-3xl hover:scale-110 font-titillium text-red-600 transition duration-300 mt-5'> Website Developers</h2>
                    <div className='flex flex-col  justify-evenly bg-slate-100 items-center rounded-lg p-5 hover:bg-slate-300 hover:scale-110 transition duration-500  group'>
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-105 cursor-pointer">
                            {/* <Image
              src={'/background.jpg'}
              alt={``}
              layout="fill"
              objectFit="cover"
            /> */}
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold hover:scale-125 transition duration-600 p-2">Sagar S R</h3>
                            <p className="text-gray-600"> Chapter Member</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-10 p-10 mt-10'>
                    <h2 className='font-semibold text-3xl hover:scale-110 font-titillium text-red-600 transition duration-300 mt-5'> Website Developers</h2>
                    <div className='flex flex-col  justify-evenly bg-slate-100 items-center rounded-lg p-5 hover:bg-slate-300 hover:scale-110 transition duration-500  group'>
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-105 cursor-pointer">
                            {/* <Image
              src={'/background.jpg'}
              alt={``}
              layout="fill"
              objectFit="cover"
            /> */}
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold hover:scale-125 transition duration-600 p-2">Samrudh P</h3>
                            <p className="text-gray-600"> Chapter Member</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-10 p-10 mt-10'>
                    <h2 className='font-semibold text-3xl hover:scale-110 font-titillium text-red-600 transition duration-300 mt-5'> Website Content Writer</h2>
                    <div className='flex flex-col  justify-evenly bg-slate-100 items-center rounded-lg p-5 hover:bg-slate-300 hover:scale-110 transition duration-500  group'>
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-105 cursor-pointer">
                            {/* <Image
              src={'/background.jpg'}
              alt={``}
              layout="fill"
              objectFit="cover"
            /> */}
                        </div>
                        <div className="mt-4 text-center">
                            <h3 className="text-lg font-semibold hover:scale-125 transition duration-600 p-2">Varsha M</h3>
                            <p className="text-gray-600"> Chapter Member</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-10 p-10 mt-10'>
                    <h2 className='font-semibold text-4xl hover:scale-110 font-titillium text-red-600 transition duration-300 mt-5'> Website Content Writer</h2>
                    <div className='flex flex-col  justify-evenly bg-slate-100 items-center rounded-lg p-5 hover:bg-slate-300 hover:scale-110 transition duration-500  group'>
                        <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg transition-transform transform group-hover:scale-105 cursor-pointer">
                            {/* <Image
              src={'/background.jpg'}
              alt={``}
              layout="fill"
              objectFit="cover"
            /> */}
                        </div>
                        <div className="mt-4 text-center">
                            <h2 className="text-lg font-semibold hover:scale-125 transition duration-600 p-2">Ranjita V Nayak</h2>
                            <p className="text-gray-600"> Chapter Member</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default developers