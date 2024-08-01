"use client";
import React from "react";
import Image from "next/image";

interface BannerDetails {
    background: string;
    title: string;
    description: string;
    cta: string;
    image: string;
    id: number;
}

interface BannerContainerProps {
    bannerDetails: BannerDetails;
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isPreviewMode: boolean;
    image: string;
    title: string;
    desc: string;
}

const BannerContainer: React.FC<BannerContainerProps> = ({ bannerDetails, setIsEditOpen, isPreviewMode, image, title, desc}) => {
    return (
        <div className={`relative h-80 w-full rounded-md object-cover ${isPreviewMode && "pointer-events-none"}`} key={bannerDetails.id}>
            <Image
                src={bannerDetails.background}
                alt="Banner Background"
                className="w-full h-full rounded-md object-cover"
                width={80}
                height={100}
                quality={100}
                unoptimized={true}
                priority={true}
            />
            <div className="absolute top-0 left-0 w-full h-full flex justify-between z-10 bg-black bg-opacity-30 p-6">
                <div className="text-center text-white bg-transparent flex flex-col gap-y-3 items-start justify-center">
                    <h1 className="text-4xl font-bold mb-2 bg-transparent">{title || bannerDetails.title}</h1>
                    <p className="mb-4 bg-transparent text-lg text-left flex-wrap">{desc || bannerDetails.description}</p>
                    <button className="bg-blue-600 hover:bg-blue-800 text-white py-2 px-5 rounded mt-5">
                        {bannerDetails.cta}
                    </button>
                </div>
                <div className='border rounded-t-[100px] shrink-0'>
                    <Image src={image || bannerDetails.image} alt="image" className='h-full w-56 object-cover rounded-t-[100px]' width={100} height={100} quality={90} unoptimized={true} />
                </div>
            </div>
            <button className='absolute top-2 right-2 bg-transparent z-10 hover:scale-110 transition-all' onClick={() => setIsEditOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 text-white bg-transparent">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
        </div>
    );
};

export default BannerContainer;
