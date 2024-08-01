"use client";
import BannerImageComp from "./_components/BannerImageComp";
import { FC, useState, useEffect } from "react";
import axios from "axios";
import Loading from "./loading";

const Home: FC = () => {
  const [banners,setBanners] = useState<any>([]);
  const [loading,setLoading] = useState<boolean>(true);
  const fetchBanners = async (): Promise<void> => {
    try {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/banner`);
      setBanners(data);
    } catch (err) {
      console.error(err);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBanners();
  },[])
  if(loading){
    return <Loading />
  }
  return (
    <div className="overflow-hidden p-5">
      <main className="grid gird-cols-1 md:grid-cols-2 gap-3 w-full box-border">
        {banners.map((bannerDetails: any, indx: number) => <BannerImageComp bannerDetails = {bannerDetails} fetchBanners={fetchBanners} /> )}
      </main>
    </div>
  );
}

export default Home;