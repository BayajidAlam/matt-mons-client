"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Button, Col, Row, message } from "antd";
import AvailableColorOptions from "../Forms/SkuAvailableColor";
import AvailableSizeOptions from "../Forms/SkuAvailableSize";
import {
  useCreateSkuMutation,
  useGetSingleSkuQuery,
  useUpdateSkuMutation,
} from "@/redux/api/sku/skuApi";
import Loading from "@/app/loading";

const AddUpdateProductSku = ({ id }: { id?: string }) => {
  //Get
  const { data, isLoading: getLoad } = useGetSingleSkuQuery(id ? id : "");

  //Update
  const [updateSku, { isLoading: updateLoad }] = useUpdateSkuMutation();

  //Create
  const [createSku, { isLoading: createLoad }] = useCreateSkuMutation();

  const onSubmit = async (values: any) => {
    console.log(values);
    message.loading(id ? "Updating...." : "Adding....");
    try {
      const res = id
        ? await updateSku({
            id,
            data: {
              ...values,
            },
          }).unwrap()
        : await createSku(values).unwrap();
      if (res?.data) {
        message.success(`Sku ${id ? "updated" : "added"} successfully`);
      } else {
        message.error(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  if (id && getLoad) {
    return <Loading />;
  }

  // console.log(data);

  return (
    <div>
      <h1 className="text-center my-1 font-bold text-2xl">
        {id ? "Update SKU" : "Add SKU"}
      </h1>
      <div>
        <Form submitHandler={onSubmit} defaultValues={id ? { ...data?.data } : {}}>
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
                <FormInput
                  type="text"
                  name={id ? "title" : "title"}
                  size="large"
                  label="Title"
                  required={true}
                  placeholder="Please enter product title"
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <AvailableColorOptions
                  name="availableColor"
                  label="Available Color"
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <AvailableSizeOptions
                  name="availableSize"
                  label="Available Size"
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={12}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name={id ? "quantity" : "quantity"}
                  size="large"
                  label="Quantity"
                  // required={true}
                  placeholder="Please enter product quantity"
                />
              </Col>
            </Row>
            <div className="flex justify-end items-center">
              <Button
                htmlType="submit"
                type="primary"
                disabled={createLoad || updateLoad}
              >
                {id ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddUpdateProductSku;
