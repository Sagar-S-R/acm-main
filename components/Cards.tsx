import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const Cards = ({ title, description, details, img }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div>
            <Card>
                <div className='bg-slate-600 m-5'>
                    <Image
                        className=''
                        src={img}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                    />
                </div>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>

                <CardFooter>
                    <Button onClick={toggleModal} className="text-blue-500 underline">
                        More
                    </Button>
                </CardFooter>
            </Card>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full h-3/4 overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-4">{title}</h3>
                        <p className="mb-4">{details.desc}</p>
                        <div className='grid gap-6 md:grid-cols-1 lg:grid-cols-2 p-10'>
                            <Image
                                src={details.img1}
                                width={500}
                                height={500}
                                alt="Picture of the author"
                            />
                            <Image
                                src={details.img2}
                                width={500}
                                height={500}
                                alt="Picture of the author"
                            />
                            <Image
                                src={details.img3}
                                width={500}
                                height={500}
                                alt="Picture of the author"
                            />
                            <Image
                                src={details.img4}
                                width={500}
                                height={500}
                                alt="Picture of the author"
                            />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button onClick={toggleModal} className="text-blue-500 underline">
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cards;
