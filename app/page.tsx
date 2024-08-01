"use client";
import BannerImageComp from "./Components/BannerImageComp";
import { FC, useState, useEffect } from "react";
import axios from "axios";


const Home: FC = () => {
  const [banners,setBanners] = useState<any>([]);

  const fetchBanners = async (): Promise<void> => {
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/banner`);
      setBanners(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchBanners();
  },[])
  return (
    <div className="overflow-hidden p-5">
      <main className="grid gird-cols-1 md:grid-cols-2 gap-3 w-full box-border">
        {banners.map((bannerDetails: any, indx: number) => <BannerImageComp bannerDetails = {bannerDetails} key={indx} fetchBanners={fetchBanners} /> )}
      </main>

    </div>
  );
}

export default Home;