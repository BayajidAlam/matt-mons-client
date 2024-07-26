"use client";
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const AddSection = React.lazy(
  () => import("@/components/ui/Home/AddSection/AddSection")
);
const HeaderBottom = React.lazy(
  () => import("@/components/ui/Home/Header/HeaderBottom")
);
const TopBanner = React.lazy(
  () => import("@/components/ui/Home/TopBanner/TopBanner")
);
const AddsModal = React.lazy(
  () => import("@/components/ui/Modal/AddsModal")
);
const ContactUs = React.lazy(
  () => import("@/components/ui/Home/ContactUs")
);

const UserPage = () => {
  
  return (
    <div>
      <HeaderBottom />
      <TopBanner />
      <AddSection />
      <ContactUs />
    </div>
  );
};

export default UserPage;
