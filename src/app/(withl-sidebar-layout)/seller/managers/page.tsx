"use client";
import ActionBar from "@/components/ui/ActionBar";
import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import ModalComponent from "@/components/ui/Modal";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import UMTable from "@/components/ui/Table";
import AddUpdateManager from "@/components/addUpdateFrom/addUpdateManager";
import {
  useDeleteSellsManagerMutation,
  useGetAllManagerQuery,
} from "@/redux/api/manager/managerApi";
import Loader from "@/components/Utils/Loader";
import { IMeta, UserInfo } from "@/types";
import ModalTriggerButton from "@/components/ui/ModalTriggerButton";
import EComModalWrapper from "@/components/ui/EComModalWrapper";
import { getUserInfo } from "@/services/auth.service";

const AllManagesPage = () => {
  const { shopId } = getUserInfo() as UserInfo;

  const query: Record<string, any> = {};

  const [showModel, setShowModel] = useState(false);
  const [showModalWithId, setShowModalWithId] = useState(false);

  const [id, setId] = useState("");

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["shopId"] = shopId;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const [deleteSellsManager] = useDeleteSellsManagerMutation();

  const deleteSellsManagerHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");
      const res = await deleteSellsManager(id).unwrap();
      if (res) {
        message.success("Successfully Deleted!");
      }
    } catch (error: any) {
      message.error(`${error.data}`);
    }
  };

  const columns = [
    {
      title: "",
      dataIndex: "profileImg",
      render: function (data: any) {
        const image = `${
          data ||
          "https://res.cloudinary.com/dnzlgpcc3/image/upload/v1704419785/oiav6crzfltkswdrrrli.png"
        } `;
        return (
          <Image
            src={image}
            width={100}
            height={100}
            alt=""
            style={{ width: "70px", height: "50px" }}
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "NID Number",
      dataIndex: "nidNumber",
    },
    {
      title: "Contact No",
      dataIndex: "contactNumber",
      render: (data: any) => (data ? data : "N/A"),
    },
    // {
    //   title: "Active",
    //   dataIndex: "isActive",
    //   render: (isActive: boolean) =>
    //     isActive ? (
    //       <Tag color="green">Active</Tag>
    //     ) : (
    //       <Tag color="red">Not Active</Tag>
    //     ),
    // },
    {
      title: "Emg Contact No",
      dataIndex: "emergencyContactNumber",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Joined at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      // width: "15%",
      render: function (data: any) {
        return (
          <div className="flex">
            <div
              onClick={() => {
                setId(data);
              }}
              style={{
                margin: "0px 5px",
              }}
            >
              <ModalTriggerButton
                setShowModel={setShowModalWithId}
                icon={<EditOutlined />}
              />
            </div>
            <Button
              onClick={() => deleteSellsManagerHandler(data)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const { data, isLoading } = useGetAllManagerQuery({ ...query });

  // const data = [];
  const managersData = data?.data;
  const meta = data?.meta;
  console.log(managersData);
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
  };

  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  if (isLoading) {
    return <Loader className="h-[50vh] flex items-end justify-center" />;
  }

  return (
    <div className="bg-white border border-blue-200 rounded-lg shadow-md shadow-blue-200 p-5 space-y-3">
      <ActionBar inline title="Managers List">
        <div className="flex items-center justify-between flex-grow gap-2">
          <Input
            // size="large"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              // width: "300px",
              textAlign: "center",
            }}
          />
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}

          {/* <ModalTriggerButton
            setShowModel={setShowModalWithId}
            icon={<IoMdAdd />}
             buttonText="Add Managers"
          /> */}

          <ModalComponent
            showModel={showModel}
            setShowModel={setShowModel}
            buttonText="Add Managers"
            icon={<IoMdAdd />}
          >
            <AddUpdateManager />
          </ModalComponent>
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={managersData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      <EComModalWrapper
        showModel={showModalWithId}
        setShowModel={setShowModalWithId}
      >
        <AddUpdateManager id={id} />
      </EComModalWrapper>
    </div>
  );
};

export default AllManagesPage;
