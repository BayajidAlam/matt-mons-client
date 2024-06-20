"use client";
import ActionBar from "@/components/ui/ActionBar";

import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, Tag } from "antd";
import { useState } from "react";

import dayjs from "dayjs";

import ModalComponent from "@/components/ui/Modal";
import { USER_ROLE } from "@/constants/role";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import UMTable from "@/components/ui/Table";
import AddUpdateManager from "@/components/addUpdateFrom/addUpdateManager";
import { useGetAllManagerQuery } from "@/redux/api/manager/managerApi";
import Loader from "@/components/Utils/Loader";

const AllManagesPage = () => {
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
      title: "Emergency Contact Number",
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

  const { data, isLoading } = useGetAllManagerQuery({ ...query });
  console.log(data);
  const managers = data?.data;
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
        // loading={isLoading}
        columns={columns}
        dataSource={managers}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      {/* <UMModal
        title="Remove admin"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => deleteGeneralUserHandler(adminId)}
      >
        <p className="my-5">Do you want to remove this admin?</p>
      </UMModal> */}
    </div>
  );
};

export default AllManagesPage;
