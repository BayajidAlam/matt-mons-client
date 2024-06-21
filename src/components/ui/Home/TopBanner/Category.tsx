"use client";
import { useGetAllCategoryQuery } from "@/redux/api/category/categoryApi";
import React, { useState } from "react";
import { GiClothes } from "react-icons/gi";

const Category = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(8);
  const [sortBy, setSortBy] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<string>("desc");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useGetAllCategoryQuery({ ...query });
  const categories = data?.data;
  console.log(categories);
  return (
    <div>
      <div className="w-full lg:w-[250px] xl:w-[290px] border h-[430px] hidden lg:block">
        <h1 className="bg-[#f5f5f5] uppercase font-bold text-black pl-8 py-3 text-[16px]">
          Browse Category
        </h1>
        <ul>
          {categories?.map((category, i) => (
            <li
              className=" text-black px-6 py-3 border-b hover:bg-brandMainColor hover:text-white capitalize text-[15px] flex justify-start items-center gap-2"
              key={i}
            >
              <GiClothes />
              {category.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
