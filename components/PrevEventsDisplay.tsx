"use client";
import Image from "next/image";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import previousEvents from '@/eventsData/recentEvents/previousEvents';

export function EventsDisplay() {
    const cards = previousEvents.map((event, index) => (
        <Card key={event.id} card={{
            category: event.title,
            title: event.description,
            src: event.img,
            content: (
                <div>
                    {(event.guest || event.faculty) ? (
                        <>    
                            {event.guest && (
                                <div className="flex items-center gap-3 p-4 border-gray-300 mb-5 dark:border-neutral-700">
                                    <h2 className="text-xl md:text-3xl font-semibold text-lightBlue tracking-wide">
                                        <span>Speaker :</span>
                                    </h2>
                                    <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 capitalize">
                                        {event.guest.name}
                                    </h2>
                                </div>
                            )}
                            {event.faculty && (
                                <div className="flex items-center gap-3 p-4 border-b-2 border-gray-300 mb-5 dark:border-neutral-700">
                                    <h2 className="text-xl md:text-3xl font-semibold text-lightBlue tracking-wide">
                                        <span>Faculty Coordinator :</span>
                                    </h2>
                                    <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 capitalize">
                                        {event.faculty.name}
                                    </h2>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center gap-3 p-4 border-b-2 border-gray-300 mb-5 dark:border-neutral-700">
                            <h2 className="text-xl md:text-3xl font-semibold text-lightBlue tracking-wide">
                                <span>Host :</span>
                            </h2>
                            <h2 className="text-xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 capitalize">
                                Jamuna S Murthy
                            </h2>
                        </div>
                    )}

                    <p className="whitespace-pre-line text-base leading-relaxed text-gray-800 dark:text-gray-200">
                        {event.details?.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
                        {Object.values(event.details).slice(1).map((img, imgIndex) => (
                            <div key={imgIndex} className="relative overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:scale-105">
                                <Image
                                    src={img}
                                    alt={`Event Image ${imgIndex + 1}`}
                                    height={500}
                                    width={500}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ),
        }} index={index} />
    ));

    return (
        <div className="w-full h-full py-20">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
                Recent Events
            </h2>
            <Carousel items={cards} />
        </div>
    );
}
