"use client";
import ActionBar from "@/components/ui/ActionBar";

import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";

import dayjs from "dayjs";

import ModalComponent from "@/components/ui/Modal";
import { USER_ROLE } from "@/constants/role";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import UMTable from "@/components/ui/Table";
import AddUpdateManager from "@/components/addUpdateFrom/addUpdateManager";
import AddUpdateCustomers from "@/components/addUpdateFrom/AddUpdateCustomers";
import AddUpdateOrders from "@/components/addUpdateFrom/AddUpdateOrder";

const MyOrdersPage = () => {
  const SUPER_ADMIN = USER_ROLE.ADMIN;
  const query: Record<string, any> = {};
  const [showModel, setShowModel] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

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
          // <Avatar shape="square" size={64} icon={<CarOutlined />} />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
    },
    {
      title: "User ID",
      dataIndex: "driverId",
    },
    {
      title: "License No",
      dataIndex: "licenseNo",
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
      title: "Mobile",
      dataIndex: "mobile",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Joined at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      // width: "15%",
      render: function (data: any) {
        return (
          <div className="flex">
            {/* <Link href={`/${SUPER_ADMIN}/general_user/details/${data}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link> */}
            <div
              style={{
                margin: "0px 5px",
              }}
            >
              <ModalComponent
                showModel={showModel}
                setShowModel={setShowModel}
                icon={<EditOutlined />}
              >
                <AddUpdateManager id={data} />
              </ModalComponent>
            </div>
            <Button
              //   onClick={() => deleteGeneralUserHandler(data)}
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

  // const { data, isLoading } = useGetAllDriverQuery({ ...query });
  const data: any = [];
  const drivers = data?.drivers;
  const meta = data?.meta;

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

  // if (isLoading) {
  //   return <Loader className="h-[50vh] flex items-end justify-center" />;
  // }
  return (
    <div className="bg-white border border-blue-200 rounded-lg shadow-md shadow-blue-200 p-5 space-y-3">
      <ActionBar inline title="Orders List">
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
          <ModalComponent
            showModel={showModel}
            setShowModel={setShowModel}
            buttonText="Add Orders"
            icon={<IoMdAdd />}
          >
            <AddUpdateOrders />
          </ModalComponent>
        </div>
      </ActionBar>

      <UMTable
        // loading={isLoading}
        columns={columns}
        dataSource={drivers}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />
    </div>
  );
};

export default MyOrdersPage;
