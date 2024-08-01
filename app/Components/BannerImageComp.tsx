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
    _id: string,
}

interface BannerImageCompProps {
    bannerDetails: BannerDetails;
    key: number;
    fetchBanners: () => Promise<void>;
}

const BannerImageComp: React.FC<BannerImageCompProps> = ({ bannerDetails, key,fetchBanners }) => {
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
    return (
        <div key={key}>
            {isEditOpen && <EditBannerTemplateBs bannerDetails={bannerDetails} setIsEditOpen={setIsEditOpen} fetchBanners={fetchBanners} />}
            <BannerContainer bannerDetails={bannerDetails} setIsEditOpen = {setIsEditOpen} isPreviewMode={false} title={bannerDetails.title} desc={bannerDetails.description} image={bannerDetails.image} />
        </div>
    );
};

export default BannerImageComp;
