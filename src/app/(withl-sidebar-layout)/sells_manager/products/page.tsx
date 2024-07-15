"use client";
import ActionBar from "@/components/ui/ActionBar";
import { useDebounced } from "@/redux/hooks";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import UMTable from "@/components/ui/Table";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/api/products/productsApi";
import Loader from "@/components/Utils/Loader";
import Link from "next/link";
import { getUserInfo } from "@/services/auth.service";
import { UserInfo } from "@/types";

const ManagerAllProductsPage = () => {
  const { role, shopId } = getUserInfo() as UserInfo;

  const query: Record<string, any> = {};

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

  const [deleteProduct] = useDeleteProductMutation();

  const deleteProductHandler = async (id: string) => {
    try {
      message.loading("Deleting.....");
      const res = await deleteProduct(id).unwrap();
      if (res?.data) {
        message.success("Successfully Deleted!");
      }
    } catch (error: any) {
      message.error(`${error.data}`);
    }
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
      render: (text: string) => {
        const words = text.split(" ");
        return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : text;
      },
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
      title: "SKU",
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
              <Link href={`/${role}/products/${data}`}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  className="!flex !items-center !gap-2 !justify-center"
                >
                  <EyeOutlined />
                </Button>
              </Link>
            </div>
            <div className="">
              <Link href={`/${role}/products/update-product/${data}`}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  className="!flex !items-center !gap-2 !justify-center"
                >
                  <EditOutlined />
                </Button>
              </Link>
            </div>

            <Button
              onClick={() => deleteProductHandler(data)}
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

  const productsData = data?.data;
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
        loading={isLoading}
        columns={columns}
        dataSource={productsData}
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

export default ManagerAllProductsPage;
