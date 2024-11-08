'use client'
import React from 'react'
import Cards from '@/components/Cards'
import eventData from '@/eventsData/previousEvents';


export default function Events() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-5xl font-bold mb-6 text-center font-titillium">Events</h2>
            <div className="mb-16 p-10 bg-deepBlue rounded-lg ">

                <p className="text-lg text-white leading-relaxed font-titillium">
                    The ACM Student Chapter at our college is dedicated to fostering a vibrant community of technology enthusiasts and aspiring professionals through a diverse range of engaging events. Among our flagship activities is the highly anticipated Tech Trek quiz, which challenges participants technical knowledge in a fun and competitive environment. In addition to this, we organize a variety of technical talks featuring industry experts and faculty, providing valuable insights into emerging technologies, best practices, and career advice. Our workshops and hands-on sessions cover a wide array of topics, from programming languages and web development to data science and machine learning, ensuring that students gain practical skills alongside their academic knowledge. Networking events and hackathons are also a staple of our chapter, encouraging collaboration and innovation among members. These initiatives not only enhance learning but also create a supportive environment where students can connect, share ideas, and build lasting friendships. Through our events, the ACM Student Chapter empowers students to explore their passions, develop their skills, and prepare for successful careers in the tech industry.
                </p>
            </div>
            <div>
                <h1 className="text-4xl font-bold mb-6 text-center font-titillium">
                    Recent Events
                </h1>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {eventData.map(event => (
                        <Cards
                            key={event.id}
                            title={event.title}
                            description={event.description}
                            details={event.details}
                            img={event.img}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
