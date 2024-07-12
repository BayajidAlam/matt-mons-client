import React from "react";
import dayjs from "dayjs";
import { CheckOutlined } from "@ant-design/icons";
import { LiaShippingFastSolid } from "react-icons/lia";
import { IoHomeOutline } from "react-icons/io5";

const OrderHistory = ({ order }) => {
  return (
    <div className="mt-6 grow sm:mt-8 lg:mt-0">
      <div className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Order history
        </h3>

        <ol className="relative ms-3 border-s border-gray-200 dark:border-gray-700">
          <li className="mb-10 ms-6">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
              <IoHomeOutline className="text-lg" />
            </span>
            <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">
              {order?.delivered
                ? dayjs(order.delivered).format("MMM D, YYYY")
                : `Estimated Date: ${
                    order?.being_delivered
                      ? dayjs(order.being_delivered)
                          .add(1, "day")
                          .format("MMM D, YYYY")
                      : dayjs(order.created_at)
                          .add(3, "day")
                          .format("MMM D, YYYY")
                  }`}
            </h4>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Products delivered
            </p>
          </li>

          <li className="mb-10 ms-6">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white dark:bg-gray-700 dark:ring-gray-800">
              <LiaShippingFastSolid className="text-lg" />
            </span>
            <h4 className="mb-0.5 text-base font-semibold text-gray-900 dark:text-white">
              {order?.being_delivered
                ? dayjs(order.being_delivered).format("MMM D, YYYY hh:mm A")
                : "Estimated date: " +
                  (order.curier_wareshouse
                    ? dayjs(order.curier_wareshouse)
                        .add(1, "day")
                        .format("MMM D, YYYY")
                    : dayjs(order.createAt)
                        .add(2, "day")
                        .format("MMM D, YYYY"))}
            </h4>
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Products being delivered
            </p>
          </li>

          <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
              <CheckOutlined />
            </span>
            <h4 className="mb-0.5 font-semibold text-base">
              {order?.curier_wareshouse
                ? dayjs(order.curier_wareshouse).format("MMM D, YYYY")
                : "Estimated date: " +
                  (order?.delivered_to_curier
                    ? dayjs(order.delivered_to_curier)
                        .add(1, "day")
                        .format("MMM D, YYYY")
                    : dayjs(order?.payment_acceptedAt)
                        .add(1, "day")
                        .format("MMM D, YYYY"))}
            </h4>
            <p className="text-sm">Products in the courier's warehouse</p>
          </li>

          <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
              <CheckOutlined />
            </span>
            <h4 className="mb-0.5 text-base font-semibold">
              {order?.delivered_to_curier
                ? dayjs(order.delivered_to_curier).format("MMM D, YYYY hh:mm A")
                : "Products are preparing for delivery"}
            </h4>
            <p className="text-sm">
              Products delivered to the courier - DHL Express
            </p>
          </li>

          <li className="mb-10 ms-6 text-primary-700 dark:text-primary-500">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
              <CheckOutlined />
            </span>
            <h4 className="mb-0.5 font-semibold text-base">
              {dayjs(order?.payment_acceptedAt).format("MMM D, YYYY hh:mm A")}
            </h4>
            <p className="text-sm">Payment accepted - VISA Credit Card</p>
          </li>

          <li className="ms-6 text-primary-700 dark:text-primary-500">
            <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 ring-8 ring-white dark:bg-primary-900 dark:ring-gray-800">
              <CheckOutlined />
            </span>
            <div>
              <h4 className="mb-0.5 font-semibold text-base">
                {dayjs(order?.createAt).format("MMM D, YYYY hh:mm A")}
              </h4>
              <a href="#" className="text-sm font-medium hover:underline">
                Order placed - Receipt #647563
              </a>
            </div>
          </li>
        </ol>

        <div className="gap-4 sm:flex sm:items-center">
          <button
            type="button"
            className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            Cancel the order
          </button>

          <a
            href="#"
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0"
          >
            Order details
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
