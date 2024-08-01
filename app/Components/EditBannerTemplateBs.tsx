"use client";

import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';
import BannerContainer from './BannerContainer';
import images from "../utils/images.json";
import axios from "axios";
import Image from 'next/image';

interface BannerDetails {
    background: string;
    title: string;
    description: string;
    cta: string;
    image: string;
    id: number;
    _id: string;
}

interface EditBannerTemplateProps {
    bannerDetails: BannerDetails;
    setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBannerTemplateBs: React.FC<EditBannerTemplateProps> = ({ bannerDetails, setIsEditOpen }) => {
    const [bannerTitle, setBannerTitle] = useState<string>(bannerDetails.title);
    const [bannerDesc, setBannerDesc] = useState<string>(bannerDetails.description);
    const [selectedImage, setSelectedIamge] = useState<string>(bannerDetails.image);
    const [allImages, setAllImages] = useState<string[]>(images);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = () => {
        if (photoInputRef.current) {
            photoInputRef.current.click();
        }
    };

    const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        try {
            const file = event.target.files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    setSelectedIamge(e.target?.result as string);
                    setAllImages((imgs: any) => [...imgs, e.target?.result as string]);
                };
                reader.readAsDataURL(file);
            }
        } catch (err) {
            console.error(err);
            window.alert("Error while uploading Photo");
        }
    };

    const handleSaveBanner = async () => {
        try {
            await axios.put("http://localhost:3000/api/banner", { id: bannerDetails._id, title: bannerTitle, description: bannerDesc, image: selectedImage });
            setIsEditOpen(false);
            window.location.reload();
        } catch (err: any) {
            console.error(err.message);
            alert("Error while Saving banner");
        }
    };

    return (
        <div className='overlay fixed inset-0 bg-white bg-opacity-50  z-20'>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center h-[95vh] justify-center m-auto max-w-[520px] bg-white z-40 rounded-md bg-opacity-100 overflow-y-auto"
            >
                <div className="flex flex-col w-full px-4 h-full">
                    <div className="flex justify-between px-1 py-2 items-center">
                        <h1 className="text-gray text-xl">Edit Banner</h1>
                        <button onClick={() => setIsEditOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7 text-gray">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className='flex justify-center bg-blue-400 relative'>
                        <div className="w-full h-full transform scale-50 origin-top-center absolute">
                            <BannerContainer bannerDetails={bannerDetails} setIsEditOpen={setIsEditOpen} isPreviewMode={true} image={selectedImage} title={bannerTitle} desc={bannerDesc} />
                        </div>
                    </div>

                    {/* Static part */}
                    <div className='flex flex-col mt-44 space-y-3 py-3'>
                        <h1 className='text-gray text-lg font-semibold'>Images</h1>
                        <div className='flex gap-x-4 px-2 flex-wrap items-center gap-y-2'>
                            <div className='flex flex-col justify-center items-center bg-slate-200 w-14 h-14 rounded-full cursor-pointer hover:scale-105' onClick={handlePhotoUpload}>
                                <input type='file' accept='image/*' className='hidden' ref={photoInputRef} onChange={handlePhotoChange} />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="4" stroke="currentColor" className="size-8 text-slate-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                </svg>
                            </div>
                            {allImages.map((image: string, idx: number) => (
                                <Image 
                                    src={image} 
                                    alt='example-image' 
                                    key={idx} 
                                    width={100}
                                    height={100}
                                    quality={90}
                                    className={`w-14 h-14 rounded-full object-cover cursor-pointer hover:scale-105 ${selectedImage === image && 'border-[3px] border-red-500'}`}
                                    onClick={() => setSelectedIamge(image)}
                                />
                            ))}
                        </div>
                        <div>
                            <label className='text-gray text-lg font-semibold' htmlFor='title'>Title</label>
                            <input id="title" type='text' className="w-full border border-slate-300 p-2 rounded-md focus:outline-slate-500"
                                value={bannerTitle}
                                onChange={(e) => setBannerTitle(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className='text-gray text-lg font-semibold' htmlFor='desc'>Description</label>
                            <input id="desc" type='text' className="w-full border border-slate-300 p-2 rounded-md focus:outline-slate-500"
                                value={bannerDesc}
                                onChange={(e) => setBannerDesc(e.target.value)}
                            />
                        </div>
                        <button className='bg-slate-600 w-full py-2 text-white text-xl font-bold rounded-lg hover:bg-slate-700 relative top-4 mb-5' onClick={handleSaveBanner}>Done</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default EditBannerTemplateBs;
