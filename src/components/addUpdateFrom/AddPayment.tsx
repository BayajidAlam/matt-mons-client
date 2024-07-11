import { useGetAllCartQuery } from "@/redux/api/cart/cartApi";
import { useGetSingleCustomerQuery } from "@/redux/api/customer/customerApi";
import { useCreateNewOrdersMutation } from "@/redux/api/orders/orderApi";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MakePayment = ({ clientSecret, isLoading, setIsLoading }) => {
  const query: Record<string, any> = {};
  const { fullName, email, id, shopId } = getUserInfo() as UserInfo;

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [tnxId, setTnxId] = useState("");

  //get cart data
  query["limit"] = 100;
  query["page"] = 1;
  query["userId"] = id;
  const { data: cartAllData } = useGetAllCartQuery({ ...query });
  const cartData = cartAllData?.data.cartItems;
  console.log(cartData);
  //Get customer info
  const { data, isLoading: getLoad, refetch } = useGetSingleCustomerQuery(id);
  const customerData = data?.data;

  //create order and save payment
  const [createNewOrders] = useCreateNewOrdersMutation();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message as string);
    } else {
      setCardError("");
    }

    setSuccess("");
    setIsLoading(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: fullName,
            email: email,
            phone: customerData?.contactNumber,
            address: customerData?.address,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent?.status === "succeeded") {
      setSuccess("Your payment successful");
      setTnxId(paymentIntent?.id);
      setIsLoading(false);

      // set payment info to own db
      const orderData = {
        products: cartData,
        userId: id,
        shopId,
        fullName: customerData.fullName,
        email,
        contactNumber: customerData.contactNumber,
        emergencyContactNumber: customerData.emergencyContactNumber,
        address: customerData.address,
        trnsId: paymentIntent?.id,
      };

      const res = await createNewOrders({ ...orderData }).unwrap();
      console.log(res);
      if (res?.data?.transId) {
        router.push(`/order-successful?orderNumber=${res.data.orderId}`);
      }
    }
  };

  return (
    <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto my-12">
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <Button
          className="mt-4 px-3"
          type="primary"
          htmlType="submit"
          disabled={!stripe || isLoading || !clientSecret}
        >
          Pay
        </Button>
      </form>
      {cardError && <p className="text-red-500 mt-2 text-base">{cardError}</p>}
      {success && <p className="text-green-500 mt-2 text-base">{success}</p>}
    </div>
  );
};

export default MakePayment;
