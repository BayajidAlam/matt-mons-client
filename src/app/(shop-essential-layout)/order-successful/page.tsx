"use client";
import { Button, Result } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const OrderSuccessPage = () => {
  const params = useSearchParams();
  const orderNumber = params.get("orderNumber");
  const transId = params.get("transId");

  return (
    <div>
      <div className="p-20">
        <Result
          status="success"
          title="Your order has been created"
          subTitle={`Order number: ${orderNumber} and transId: ${transId}`}
          icon={
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                src="https://i.ibb.co/SwPgvyz/order.png"
                alt="Custom Image"
                width={250}
                height={250}
              />
            </div>
          }
          extra={[
            <>
              <Link href={`/my-orders`}>
                <Button type="primary" key="console">
                  My order
                </Button>
              </Link>
              ,
              <Link href={`/home`}>
                <Button key="buy">Home</Button>
              </Link>
              ,
            </>,
          ]}
        />
      </div>
    </div>
  );
};

export default OrderSuccessPage;
