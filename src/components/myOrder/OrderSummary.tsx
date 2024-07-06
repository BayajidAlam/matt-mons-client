import Image from "next/image";
import React from "react";

const OrderSummary = () => {
  return (
    <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
      <div className="space-y-4 p-6">
        <div className="flex items-center gap-6">
          <a href="#" className="h-14 w-14 shrink-0">
            <Image
              width={100}
              height={100}
              className="h-full w-full dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
              alt="imac image"
            />
            <Image
              width={100}
              height={100}
              className="hidden h-full w-full dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
              alt="imac image"
            />
          </a>

          <a
            href="#"
            className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
          >
            {" "}
            PC system All in One APPLE iMac (2023) mqrq3ro/a, Apple M3, 24"
            Retina 4.5K, 8GB, SSD 256GB, 10-core GPU, macOS Sonoma, Blue,
            Keyboard layout INT{" "}
          </a>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              Product ID:
            </span>{" "}
            BJ8364850
          </p>

          <div className="flex items-center justify-end gap-4">
            <p className="text-base font-normal text-gray-900 dark:text-white">
              x1
            </p>

            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              $1,499
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-6">
          <a href="#" className="h-14 w-14 shrink-0">
            <Image
              width={100}
              height={100}
              className="h-full w-full dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg"
              alt="phone image"
            />
            <Image
              width={100}
              height={100}
              className="hidden h-full w-full dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg"
              alt="phone image"
            />
          </a>

          <a
            href="#"
            className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
          >
            {" "}
            Restored Apple Watch Series 8 (GPS) 41mm Midnight Aluminum Case with
            Midnight Sport Band{" "}
          </a>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              Product ID:
            </span>{" "}
            BJ8364850
          </p>

          <div className="flex items-center justify-end gap-4">
            <p className="text-base font-normal text-gray-900 dark:text-white">
              x2
            </p>

            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              $598
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-6">
          <a href="#" className="h-14 w-14 shrink-0">
            <Image
              width={100}
              height={100}
              className="h-full w-full dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-light.svg"
              alt="console image"
            />
            <Image
              width={100}
              height={100}
              className="hidden h-full w-full dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ps5-dark.svg"
              alt="console image"
            />
          </a>

          <a
            href="#"
            className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
          >
            {" "}
            Sony Playstation 5 Digital Edition Console with Extra Blue
            Controller, White PULSE 3D Headset and Surge Dual Controller{" "}
          </a>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              Product ID:
            </span>{" "}
            BJ8364850
          </p>

          <div className="flex items-center justify-end gap-4">
            <p className="text-base font-normal text-gray-900 dark:text-white">
              x1
            </p>

            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              $799
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-6">
          <a href="#" className="h-14 w-14 shrink-0">
            <Image
              width={100}
              height={100}
              className="h-full w-full dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-light.svg"
              alt="xbox image"
            />
            <Image
              width={100}
              height={100}
              className="hidden h-full w-full dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/xbox-dark.svg"
              alt="xbox image"
            />
          </a>

          <a
            href="#"
            className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
          >
            {" "}
            Xbox Series X Diablo IV Bundle + 2 Xbox Wireless Controller Carbon
            Black + Controller Charger{" "}
          </a>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              Product ID:
            </span>{" "}
            BJ8364850
          </p>

          <div className="flex items-center justify-end gap-4">
            <p className="text-base font-normal text-gray-900 dark:text-white">
              x1
            </p>

            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              $699
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center gap-6">
          <a href="#" className="h-14 w-14 shrink-0">
            <Image
              width={100}
              height={100}
              className="h-full w-full dark:hidden"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg"
              alt="phone image"
            />
            <Image
              width={100}
              height={100}
              className="hidden h-full w-full dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg"
              alt="phone image"
            />
          </a>

          <a
            href="#"
            className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
          >
            {" "}
            APPLE iPhone 15 5G phone, 256GB, Gold{" "}
          </a>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-900 dark:text-white">
              Product ID:
            </span>{" "}
            BJ8364850
          </p>

          <div className="flex items-center justify-end gap-4">
            <p className="text-base font-normal text-gray-900 dark:text-white">
              x3
            </p>

            <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
              $2,997
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-gray-50 p-6 dark:bg-gray-800">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="font-normal text-gray-500 dark:text-gray-400">
              Original price
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white">
              $6,592.00
            </dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="font-normal text-gray-500 dark:text-gray-400">
              Savings
            </dt>
            <dd className="text-base font-medium text-green-500">-$299.00</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="font-normal text-gray-500 dark:text-gray-400">
              Store Pickup
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white">$99</dd>
          </dl>

          <dl className="flex items-center justify-between gap-4">
            <dt className="font-normal text-gray-500 dark:text-gray-400">
              Tax
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white">$799</dd>
          </dl>
        </div>

        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
          <dt className="text-lg font-bold text-gray-900 dark:text-white">
            Total
          </dt>
          <dd className="text-lg font-bold text-gray-900 dark:text-white">
            $7,191.00
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default OrderSummary;
