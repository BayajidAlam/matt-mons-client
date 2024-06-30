"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import {
  useCreateTagMutation,
  useGetSingleTagQuery,
  useUpdateTagMutation,
} from "@/redux/api/tags/tagsApi";
import { Button, Col, Row, message } from "antd";

const AddUpdateTags = ({ id }: { id?: string }) => {
  //Get
  const { data, isLoading: getLoad } = useGetSingleTagQuery(id ? id : "");

  //Update
  const [updateTag, { isLoading: updateLoad }] = useUpdateTagMutation();

  //Create
  const [createTag, { isLoading: createLoad }] = useCreateTagMutation();

  const onSubmit = async (values: any) => {
    message.loading(id ? "Updating...." : "Adding....");

    try {
      const res = id
        ? await updateTag({
            id,
            data: {
              ...values,
            },
          }).unwrap()
        : await createTag(values).unwrap();
      if (res?.data) {
        message.success(`Tags ${id ? "updated" : "added"} successfully`);
      } else {
        message.error(res?.message);
      }
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
          defaultValues={id ? { ...data?.data } : {}}
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
                  label="Tags title"
                  required={true}
                  placeholder="Please enter tag Name"
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

export default AddUpdateTags;
