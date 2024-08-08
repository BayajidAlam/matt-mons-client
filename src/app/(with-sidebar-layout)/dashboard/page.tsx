import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "ECOM | Dashboard",
};

const SellerDashboard = () => {
  return <AdminDashboard />;
};

export default SellerDashboard;
