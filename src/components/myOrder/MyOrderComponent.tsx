"use client";
import React, { useState } from "react";
import OrderHistory from "./OrderHistory";
import OrderSummary from "./OrderSummary";
import { getUserInfo } from "@/services/auth.service";
import { useGetAllOrdersQuery } from "@/redux/api/orders/orderApi";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";
import { UserInfo } from "@/types";

const MyOrderComponent = () => {
  const { id } = getUserInfo() as UserInfo;
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["userId"] = id;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const { data } = useGetAllOrdersQuery({ ...query });
  const orderData = data?.data;

  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-20">
      {orderData?.length > 0 ? (
        orderData?.map((order, i: number) => (
          <div key={i}>
            <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
              <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Track the delivery of order #{order?.id}
                </h2>

                <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
                  <OrderHistory order={order} />
                  <OrderSummary order={order} />
                </div>
              </div>
            </section>
          </div>
        ))
      ) : (
        <>
          <div>
            <h1 className="text-center">
              You have no order! <Link href={"/products"}>Shop Now</Link>
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrderComponent;
