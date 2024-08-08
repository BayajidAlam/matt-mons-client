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
import AddUpdateOrders from "@/components/addUpdateFrom/AddUpdateOrder";
import { useGetAllOrdersQuery } from "@/redux/api/orders/orderApi";

const MyOrdersPage = () => {
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
      title: "Product Name",
      dataIndex: "bloodGroup",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Customer Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "driverId",
    },
    {
      title: "Contact No",
      dataIndex: "contactNumber",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Em. Contact No",
      dataIndex: "emergencyContactNumber",
      render: (data: any) => (data ? data : "N/A"),
    },
    {
      title: "Address",
      dataIndex: "address",
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

  const { data, isLoading } = useGetAllOrdersQuery({ ...query });
  // const data: any = [];
  const drivers = data?.data;
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
      <ActionBar inline title="Customers List">
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
            buttonText="Add Customers"
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
