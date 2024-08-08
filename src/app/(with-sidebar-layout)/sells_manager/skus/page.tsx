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
import { IoMdAdd } from "react-icons/io";
import UMTable from "@/components/ui/Table";
import ModalTriggerButton from "@/components/ui/ModalTriggerButton";
import Loader from "@/components/Utils/Loader";
import EComModalWrapper from "@/components/ui/EComModalWrapper";
import {
  useDeleteSkuMutation,
  useGetAllSkusQuery,
} from "@/redux/api/sku/skuApi";
import AddUpdateProductSku from "@/components/addUpdateFrom/AddUpdateSku";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";

const ProductSkuPage = () => {
  const { shopId } = getUserInfo() as UserInfo;
  const query: Record<string, any> = {};

  const [id, setId] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [showModalWithId, setShowModalWithId] = useState(false);

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

  const [deleteSku] = useDeleteSkuMutation();

  const deleteSkuHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");
      const res = await deleteSku(id).unwrap();
      console.log(res?.data);
      if (res?.data) {
        message.success("Successfully Deleted!");
      }
    } catch (error: any) {
      message.error(`${error.data}`);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Available Color",
      dataIndex: "availableColor",
      key: "availableColor",
      render: (availableColors: string[]) =>
        availableColors ? availableColors.join(", ") : "N/A",
    },
    {
      title: "Available Size",
      dataIndex: "availableSize",
      key: "availableSize",
      render: (availableSizes: string[]) =>
        availableSizes ? availableSizes.join(", ") : "N/A",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (data: any) => (data ? data : "0"),
    },
    {
      title: "Created At",
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
              onClick={() => deleteSkuHandler(data)}
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

  const { data, isLoading } = useGetAllSkusQuery({ ...query });

  // const data = [];
  const managersData = data?.data;
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
      <ActionBar inline title="Sku List">
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
            buttonText="Add Sku"
            icon={<IoMdAdd />}
          >
            <AddUpdateProductSku />
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
        <AddUpdateProductSku id={id} />
      </EComModalWrapper>
    </div>
  );
};

export default ProductSkuPage;
