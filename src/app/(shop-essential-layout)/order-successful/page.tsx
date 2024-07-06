import React from "react";
import { Button, Result } from "antd";
import Image from "next/image";
import Link from "next/link";

const App: React.FC = () => (
  <div className="p-20">
    <Result
      status="success"
      title="Your order has been created"
      subTitle="Order number: 2017182818828182881, Track your order on My Order Page"
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
);

export default App;
