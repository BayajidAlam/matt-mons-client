import React from "react";
import CommonTitle from "../../CommonTitle";
import ProductCard from "@/components/Product/ProductCard";
import { useGetAllMostSoldByCategoryQuery } from "@/redux/api/products/productsApi";

const MostSoldByCategory = () => {
  const { data } = useGetAllMostSoldByCategoryQuery({});
  const prodData = data?.data;

  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto">
      <CommonTitle title="Most sold product">by category</CommonTitle>
      <div
        className="grid grid-cols-1 md:grid-cols-2
     lg:grid-cols-3 xl:grid-cols-4 gap-3"
      >
        {prodData?.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MostSoldByCategory;
