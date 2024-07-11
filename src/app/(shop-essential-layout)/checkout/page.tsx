"use client";
import Loading from "@/app/loading";
import MakePayment from "@/components/addUpdateFrom/AddPayment";
import { useGetAllCartQuery } from "@/redux/api/cart/cartApi";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_P_KEY as string
);

const CheckoutPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const query: Record<string, any> = {};

  const { id, shopId, email } = getUserInfo() as UserInfo;

  query["limit"] = 100;
  query["page"] = 1;
  query["userId"] = id;

  const { data: cartAllData } = useGetAllCartQuery({ ...query });
  const cartData = cartAllData?.data.cartItems;

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/payments/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data?.data?.clientSecret);
        setIsLoading(false);
      });
  }, [cartData]);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <MakePayment
            clientSecret={clientSecret}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutPage;
