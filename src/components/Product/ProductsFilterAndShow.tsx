"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useGetAllProductInfinityQuery } from "@/redux/api/products/productsApi";
import { useDebounced } from "@/redux/hooks";
import { useGetAllCategoryQuery } from "@/redux/api/category/categoryApi";
import { useGetAllSizesQuery } from "@/redux/api/size/sizeApi";
import { useGetAllColorsQuery } from "@/redux/api/color/colorApi";
import { Pagination } from "antd";
import Loading from "@/app/loading";

const ProductFilter = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(6);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sizeFilter, setSizeFilter] = useState("");
  const [colorFilter, setColorFilter] = useState("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["discountPrice"] = priceFilter;
  query["category"] = categoryFilter;
  query["size"] = sizeFilter;
  query["color"] = colorFilter;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useGetAllProductInfinityQuery({ ...query });

  const productData = data?.data;
  const meta = data?.meta;

  const { data: categoryAllData,isLoading:isCategoryLoading } = useGetAllCategoryQuery({});
  const categoryData = categoryAllData?.data;

  const { data: sizeAllData,isLoading:SizeLoading } = useGetAllSizesQuery({});
  const sizeData = sizeAllData?.data;

  const uniqueSizes = sizeData?.reduce((acc, current) => {
    const x = acc.find((item) => item.title === current.title);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const { data: allColorData,isLoading:isColorLoading } = useGetAllColorsQuery({});
  const colorData = allColorData?.data;

  const uniqueColor = colorData?.reduce((acc, current) => {
    const x = acc.find((item) => item.title === current.title);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  // Handle pagination change
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  if(isLoading || isCategoryLoading || isColorLoading) return <Loading/>

  return (
    <>
      <div className="container lg:px-8 lg:py-20 w-[92%] mx-auto">
        <div className="lg:flex gap-5 ">
          <div className="p-10 lg:p-0">
            <div className="flex items-center">
              <h4 className="text-xl font-semibold">Price</h4>
              <input
                className="border outline-none p-2 mx-2 rounded-lg"
                type="number"
                min="0"
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="my-5">
              <h4 className="text-xl font-semibold">Category</h4>
              {categoryData?.map((category) => (
                <>
                  {" "}
                  <div className="gap-2 flex items-center my-3 ">
                    <input
                      type="checkbox"
                      value={category.title}
                      className="cursor-pointer"
                      checked={categoryFilter === category.title}
                      onChange={(e) =>
                        setCategoryFilter(
                          e.target.checked ? category.title : ""
                        )
                      }
                    />
                    <label>{category.title}</label>
                  </div>
                </>
              ))}
            </div>

            {/* Size Filter */}
            <div className="my-5">
              <h4 className="text-xl font-semibold">Size</h4>
              {uniqueSizes?.map((size) => (
                <>
                  {" "}
                  <div className="gap-2 flex items-center my-3">
                    <input
                      type="checkbox"
                      value={size.title}
                      checked={sizeFilter === size.title}
                      onChange={(e) =>
                        setSizeFilter(e.target.checked ? size.title : "")
                      }
                    />
                    <label>{size.title}</label>
                  </div>
                </>
              ))}
            </div>

            {/* Color Filter */}
            <div className="my-5">
              <h4 className="text-xl font-semibold">Color</h4>
              {uniqueColor?.map((color) => (
                <>
                  {" "}
                  <div className="gap-2 flex items-center my-3">
                    <input
                      type="checkbox"
                      value="red"
                      checked={colorFilter === color.title}
                      onChange={(e) =>
                        setColorFilter(e.target.checked ? color.title : "")
                      }
                    />
                    <label>{color.title}</label>
                  </div>
                </>
              ))}
            </div>
          </div>
          {/* here Filter Results */}

          <div className="w-full">
            <div
              className="grid grid-cols-1 md:grid-cols-2
           lg:grid-cols-3 xl:grid-cols-3 gap-3 "
            >
              {productData?.map((product: any, i: any) => (
                <Link href={`/products/${product.id}`} key={i}>
                  <ProductCard product={product} />
                </Link>
              ))}
            </div>
            <div className="flex justify-end">
              <Pagination
                total={meta?.total}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                defaultPageSize={size}
                defaultCurrent={page}
                onChange={onPaginationChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilter;
