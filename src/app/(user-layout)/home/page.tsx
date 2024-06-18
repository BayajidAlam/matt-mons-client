"use client";
import AddSection from "@/components/ui/Home/AddSection/AddSection";
import HeaderBottom from "@/components/ui/Home/Header/HeaderBottom";
import TopBanner from "@/components/ui/Home/TopBanner/TopBanner";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AddsModal from "@/components/ui/Modal/AddsModal";


const UserPage = () => {
  
  return (
    <div>
      <HeaderBottom />
      <TopBanner />
      <AddSection />
      <AddsModal />
    </div>
  );
};

export default UserPage;
