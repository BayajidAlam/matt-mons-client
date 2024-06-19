"use client";

import Form from "@/components/Forms/Form";
import FormSelectField from "@/components/Forms/FormSelectField";
import { useCreateConversationMutation } from "@/redux/api/conversation/conversationApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import FormTextArea from "../Forms/FormTextArea";
import { useGetAllUserQuery } from "@/redux/api/user/userApi";
import Loader from "../Utils/Loader";

const NewConversation = ({ setShowModel }: { setShowModel: any }) => {
  const user = getUserInfo() as any;
  //Get
  const { data: userData, isSuccess } = useGetAllUserQuery({ limit: "100" });

  const users = userData?.users?.data ;

  //Create
  const [createConversation, { isLoading: createLoad }] =
    useCreateConversationMutation();

  const onSubmit = async (values: any) => {
    message.loading("Sending....");
    try {
      const res = await createConversation({
        ...values,
        participants: `${user.id}_${values.receiverId}`,
        senderId: user.id,
      }).unwrap();
      // console.log(res);
      if (res.conversation.id) {
        message.success(`Message send successfully!`);
        setShowModel(false);
      } else {
        message.error(res.message);
      }
    } catch (err: any) {
      message.error(err.message);
    }
  };

  if (!isSuccess) {
    return <Loader className="h-[40vh] flex items-center justify-center" />;
  }
  return (
    <div>
      <h1 className="text-center my-1 font-bold text-2xl">Send Message</h1>
      {/*  */}
      <div>
        <Form submitHandler={onSubmit}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "20px",
              marginBottom: "10px",
            }}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                  size="large"
                  name="receiverId"
                  options={users.map((u: any) => ({
                    label: u.userName,
                    value: u.id,
                  }))}
                  label="User Name"
                  // placeholder="Select"
                  required={true}
                />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                md={24}
                lg={24}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormTextArea
                  name="message"
                  label="Message"
                  rows={3}
                  placeholder="Enter your message"
                  required={true}
                />
              </Col>
            </Row>
            <div className="flex justify-center items-center mt-[5px]">
              <Button
                htmlType="submit"
                type="primary"
                style={{ width: "100%" }}
                disabled={createLoad}
              >
                Send
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default NewConversation;
