import WeOffer from "@/components/layout/home/WeOffer";
import HomeBanner from "@/components/layout/home/HomeBanner";
import HeroSection from "@/components/layout/home/HeroSection";
import MostBookedProduct from "@/components/layout/home/MostBookedProduct";
import CategoriesYouMayLike from "@/components/layout/home/CategoriesYouMayLike";
import YoutubeVideo from "@/components/layout/home/YoutubeVideoSection";
import OwnerImageSection from "@/components/layout/home/OwnerImageSection";
import Blogs from "@/components/layout/home/blogs/Blogs";
import Image from "next/image";
import VisionSection from "@/components/layout/home/VisionSection";
import Content from "@/components/layout/home/Content";
import TrendingVideo from "@/components/layout/trendingVideo/TrendingVideo";
import Testimonial from "@/components/layout/home/testimonial/Testimonial";
import SareeCollection from "@/components/layout/home/SareeCollection";
import LehengaCollection from "@/components/layout/home/LehengaCollection";
import SuitCollection from "@/components/layout/home/SuitCollection";
import StateSection from "@/components/layout/home/StateSection";
import BannerSection from "@/components/layout/home/BannerSection";
import ReligiousCollection from "@/components/layout/home/ReligiousCollection";
import MusicalCollection from "@/components/layout/home/MusicalCollection";
// import DiscountSection from "@/components/layout/home/discount/DiscountSection";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <CategoriesYouMayLike />
      <MostBookedProduct />
      <ReligiousCollection />
      <MusicalCollection />
      {/* <SuitCollection /> */}
      <StateSection />
      {/* <WeOffer /> */}
      <HomeBanner />
      <OwnerImageSection />
      <BannerSection />
      {/* <VisionSection /> */}
      <Testimonial />
      <Blogs />
      <YoutubeVideo />
      <TrendingVideo />
      <Content />
    </main>
  );
}
