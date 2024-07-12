import Image from "next/image";
import React from "react";

const OrderSummary = ({ order }) => {


  const orderedItems = order.OrderItems;
  return (
    <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
      {orderedItems?.map((item, i: number) => (
        <div key={i} className="space-y-4 p-6">
          <div className="flex items-center gap-6">
            <a href="#" className="h-14 w-14 shrink-0">
              <Image
                width={100}
                height={100}
                className="h-full w-full"
                src={item?.Product?.productMainImage}
                alt={item?.Product?.productName}
              />
            </a>

            <h1>{item?.Product?.productName}</h1>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-white">
                Product ID:
              </span>{" "}
              {item?.productId}
            </p>

            <div className="flex items-center justify-end gap-4">
              <p className="text-base font-normal text-gray-900 dark:text-white">
                x1
              </p>

              <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                ${item?.Product?.minPrice}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="font-normal text-gray-500 dark:text-gray-400">
              Sub total
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white">
              ${order?.subTotal}
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="font-normal text-gray-500 dark:text-gray-400">
              Shipping
            </dt>
            <dd className="text-base font-medium text-green-500">${order?.shippingCharge}</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="font-normal text-gray-500 dark:text-gray-400">
              Tax
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white">${order?.tax}</dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt className="text-lg font-bold text-gray-900 dark:text-white">
            Total
          </dt>
          <dd className="text-lg font-bold text-gray-900 dark:text-white">
            ${order?.total}
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default OrderSummary;
