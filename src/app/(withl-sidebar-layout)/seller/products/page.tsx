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
import { IoMdAdd, IoMdExit } from "react-icons/io";
import UMTable from "@/components/ui/Table";
import {
  useDeleteSellsManagerMutation,
  useGetAllManagerQuery,
} from "@/redux/api/manager/managerApi";
import ModalTriggerButton from "@/components/ui/ModalTriggerButton";
import EComModalWrapper from "@/components/ui/EComModalWrapper";
import { useGetAllProductsQuery } from "@/redux/api/products/productsApi";
import Loader from "@/components/Utils/Loader";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";

const ManagerAllProductsPage = () => {
  const { role } = getUserInfo() as any;
  console.log(role);
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

  const showModal = () => {
    setShowModel(true);
  };

  const columns = [
    {
      title: "",
      dataIndex: "productMainImage",
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
      title: "Product Name",
      dataIndex: "productName",
    },
    {
      title: "Min Price",
      dataIndex: "minPrice",
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
    },
    {
      title: "Discount",
      dataIndex: "moneySaved",
    },
    {
      title: "Sku Name",
      dataIndex: "ProductSku",
      key: "ProductSku",
      render: (ProductSku: { title: string }) => ProductSku.title,
    },
    {
      title: "Sku Name",
      dataIndex: "ProductSku",
      key: "ProductSku",
      render: (ProductSku: { title: string }) => ProductSku.title,
    },
    {
      title: "Quantity",
      dataIndex: "ProductSku",
      key: "quantity",
      render: (ProductSku: { quantity: string }) => ProductSku.quantity,
    },
    {
      title: "Available Sizes",
      dataIndex: "ProductSku",
      key: "availableSize",
      render: (ProductSku: { availableSize: string[] }) =>
        ProductSku.availableSize.join(", "),
    },
    {
      title: "Available Colors",
      dataIndex: "ProductSku",
      key: "availableColor",
      render: (ProductSku: { availableColor: string[] }) =>
        ProductSku.availableColor.join(", "),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      render: (data: any) => (data ? data : "N/A"),
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
          <div className="flex gap-2">
            <div className="">
              <Link href={`/${role}/products/update-product/${data}`}>
                <Button
                  onClick={showModal}
                  type="primary"
                  style={{ width: "100%" }}
                  className="!flex !items-center !gap-2 !justify-center"
                >
                  <EditOutlined />
                </Button>
              </Link>
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

  const { data, isLoading } = useGetAllProductsQuery({ ...query });

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
      <ActionBar inline title="Products List">
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

          <div className="md:hidden">
            <Link href={`/${role}/products/add-product`}>
              <Button
                onClick={showModal}
                type="primary"
                style={{ width: "100%" }}
                className="!flex !items-center !gap-2 !justify-center"
              >
                <IoMdAdd />
              </Button>
            </Link>
          </div>
          <div className="hidden md:block">
            <Link href={`/${role}/products/add-product`}>
              <Button
                style={{ width: "100%" }}
                type="primary"
                onClick={showModal}
                className="!flex !items-center !gap-2 !justify-center"
              >
                <IoMdAdd />
                Add Product
              </Button>
            </Link>
          </div>
        </div>
      </ActionBar>

      <UMTable
        // loading={isLoading}
        columns={columns}
        dataSource={managersData}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      />

      {/* <EComModalWrapper
        showModel={showModalWithId}
        setShowModel={setShowModalWithId}
      >
        <AddUpdateProduct id={id} />
      </EComModalWrapper> */}
    </div>
  );
};

export default ManagerAllProductsPage;
