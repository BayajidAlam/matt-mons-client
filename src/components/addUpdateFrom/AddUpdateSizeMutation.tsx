"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Button, Col, Row, message } from "antd";
import {
  useCreateSizeMutation,
  useGetSingleSizeQuery,
  useUpdateSizeMutation,
} from "@/redux/api/size/sizeApi";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";

const AddUpdateSize = ({ id }: { id?: string }) => {
  const { shopId } = getUserInfo() as UserInfo;

  //Get
  const { data, isLoading: getLoad } = useGetSingleSizeQuery(id ? id : "");
  const colorData = data?.data;

  //Update
  const [updateSize, { isLoading: isUpdateLoading }] = useUpdateSizeMutation();

  //Create
  const [createSize, { isLoading: isCreateLoading }] = useCreateSizeMutation();

  const onSubmit = async (values: any) => {
    message.loading(id ? "Updating...." : "Adding....");
    try {
      const res = id
        ? await updateSize({
            id,
            data: {
              title: values.title,
            },
          }).unwrap()
        : await createSize({
            ...values,
            shopId,
          }).unwrap();
      if (res.data) {
        message.success(`Size ${id ? "updated" : "added"} successfully`);
      } else {
        message.error(res.message);
      }
      console.log(res);
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
        {id ? "Update Color" : "Add Color"}
      </h1>
      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={id ? { ...colorData } : {}}
        >
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
                  label="Size"
                  required={true}
                  placeholder="Please enter Size"
                />
              </Col>
            </Row>
            <div className="flex justify-end items-center">
              <Button
                htmlType="submit"
                type="primary"
                disabled={isCreateLoading || isUpdateLoading}
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

export default AddUpdateSize;
