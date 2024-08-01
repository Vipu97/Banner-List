"use client";

import React, { useState } from 'react';
import EditBannerTemplateBs from './EditBannerTemplateBs';
import BannerContainer from './BannerContainer';

interface BannerDetails {
    background: string;
    title: string;
    description: string;
    cta: string;
    image: string;
    id: number;
}

interface BannerImageCompProps {
    bannerDetails: BannerDetails;
}

const BannerImageComp: React.FC<BannerImageCompProps> = ({ bannerDetails }) => {
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    return (
        <>
            {isEditOpen && <EditBannerTemplateBs bannerDetails={bannerDetails} setIsEditOpen={setIsEditOpen}  />}
            <BannerContainer bannerDetails={bannerDetails} setIsEditOpen = {setIsEditOpen} isPreviewMode={false} />
        </>
    );
};

export default BannerImageComp;
