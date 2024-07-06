import Image from "next/image";
import React from "react";
import OrderHistory from "./OrderHistory";
import OrderSummary from "./OrderSummary";

const MyOrderComponent = () => {
  return (
    <div>
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Track the delivery of order #957684673
          </h2>

          <div className="mt-6 sm:mt-8 lg:flex lg:gap-8">
            <OrderHistory />
            <OrderSummary />
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyOrderComponent;
