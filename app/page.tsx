import BannerImageComp from "./Components/BannerImageComp";
import { FC } from "react";
import axios from "axios";

interface BannerDetails {
  id: string;
  title: string;
  description: string;
  image: string;
  background: string;
}

const fetchBanners = async (): Promise<BannerDetails[]> => {
  try {
    const {data} = await axios.get("http://localhost:3000/api/banner");
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const Home: FC = async () => {
  const banners = await fetchBanners();
  console.log(banners);
  if(banners.length === 0){
    return <h1>Banners is Empty</h1>
  }
  return (
    <div className="overflow-hidden p-5">
      <main className="grid gird-cols-1 md:grid-cols-2 gap-3 w-full box-border">
        {banners.map((bannerDetails: any, indx: number) => <BannerImageComp bannerDetails = {bannerDetails} key={indx}/> )}
      </main>

    </div>
  );
}

export default Home;