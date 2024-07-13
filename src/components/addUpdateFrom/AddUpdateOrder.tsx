"use client";
import Form from "@/components/Forms/Form";
import { Button, Col, Row, message } from "antd";
import FormSelectField from "../Forms/FormSelectField";
import { OrderStatus, orderStatusOptions } from "@/constants/global";
import {
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} from "@/redux/api/orders/orderApi";

const AddUpdateOrders = ({ id }: { id: string }) => {
  // const { data } = useGetSingleOrderQuery(id);
  // const orderStatus = data?.data?.orderStatus ;
  
  // const orderStatusDefaultValue = { label: orderStatus, value: orderStatus };

  //Update
  const [updateOrder, { isLoading: updateLoad }] = useUpdateOrderMutation();

  const onSubmit = async (values: any) => {
    message.loading("Updating....");

    let orderStatusData = {};
    if (values.orderStatus === OrderStatus.delivered_to_curier) {
      orderStatusData = {
        delivered_to_curier: new Date(),
        ...values,
      };
    } else if (values.orderStatus === OrderStatus.curier_wareshouse) {
      orderStatusData = {
        curier_wareshouse: new Date(),
        ...values,
      };
    } else if (values.orderStatus === OrderStatus.being_delivered) {
      orderStatusData = {
        being_delivered: new Date(),
        ...values,
      };
    } else if (values.orderStatus === OrderStatus.delivered) {
      orderStatusData = {
        delivered: new Date(),
        ...values,
      };
    } else {
      orderStatusData = {
        canceledAt: new Date(),
        ...values,
      };
    }
    try {
      console.log(orderStatusData);
      // const res = await updateOrder({
      //   id,
      //   data: {
      //     data: {
      //       ...values,
      //       statusChangeTimeProperty: new Date(),
      //     },
      //   },
      // }).unwrap();

      // if (res?.data) {
      //   message.success("Order status updated successfully");
      // } else {
      //   message.error(res.message);
      // }
      // console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // if (id && getLoad) {
  //   return <Loading />;
  // }

  // console.log(data);

  return (
    <div>
      <h1 className="text-center my-1 font-bold text-2xl">
        Update order status
      </h1>
      <div>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "8px",
              padding: "20px",
              marginBottom: "10px",
            }}
            className="my-4"
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                className="gutter-row"
                xs={24}
                md={24}
                lg={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormSelectField
                  // defaultValue={orderStatusDefaultValue}
                  options={orderStatusOptions}
                  name="orderStatus"
                  size="large"
                  label="Order Status"
                  required={true}
                  placeholder="Please enter order status"
                />
              </Col>
            </Row>
            <div className="flex justify-end items-center">
              <Button htmlType="submit" type="primary" disabled={updateLoad}>
                {updateLoad ? "Updating..." : "Update"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUpdateOrders;
