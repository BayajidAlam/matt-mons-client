"use client";
import ActionBar from "@/components/ui/ActionBar";
import { useDebounced } from "@/redux/hooks";
import { EditOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Tag } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import UMTable from "@/components/ui/Table";
import ModalTriggerButton from "@/components/ui/ModalTriggerButton";
import Loader from "@/components/Utils/Loader";
import EComModalWrapper from "@/components/ui/EComModalWrapper";
import { UserInfo } from "@/types";
import { getUserInfo } from "@/services/auth.service";
import AddUpdateOrders from "@/components/addUpdateFrom/AddUpdateOrder";
import { useGetAllSellsOrdersQuery } from "@/redux/api/orders/orderApi";
import Image from "next/image";
import { OrderStatus } from "@/constants/global";

const DeliveredOrders = () => {
  const { shopId, role } = getUserInfo() as UserInfo;
  const query: Record<string, any> = {};
  const [id, setId] = useState("");
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
  query["orderStatus"] = OrderStatus.delivered;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const columns = [
    {
      title: "Product",
      dataIndex: "OrderItems",
      width: "25%",
      render: (orderItems: any) => {
        return (
          <table
            className="min-w-full"
            style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
          >
            <thead>
              <tr>
                <th className="text-left">Image</th>
                <th className="text-left">Name</th>
                <th className="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderItems.map((item: any) => (
                <tr key={item.id}>
                  <td style={{ verticalAlign: "top" }}>
                    <Image
                      src={item.Product.productMainImage}
                      alt={item.Product.productName}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td
                    style={{ verticalAlign: "top" }}
                    className="font-bold mx-2"
                  >
                    {item.Product.productName.length > 20
                      ? item.Product.productName.slice(0, 40) + "..."
                      : item.Product.productName}
                  </td>
                  <td style={{ verticalAlign: "top" }} className="font-bold">
                    {item.Product.minPrice}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      },
    },

    {
      title: "Customer Name",
      dataIndex: "fullName",
      render: function (data: any) {
        return <p>{data}</p>;
      },
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      render: function (data: any) {
        return <p>{data}</p>;
      },
    },
    {
      title: "Address",
      dataIndex: "address",
      render: function (data: any) {
        return <p>{data}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "total",
      render: function (data: any) {
        return <p>{data}</p>;
      },
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      render: function (data: any) {
        return (
          <Tag color={"green"} key={data}>
            {data.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Ordered At",
      dataIndex: "orderPlacedAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    // {
    //   title: "Change Order Status",
    //   dataIndex: "id",
    //   render: function (data: any) {
    //     return (
    //       <div className="flex">
    //         <div
    //           onClick={() => {
    //             setId(data);
    //           }}
    //           style={{
    //             margin: "0px 5px",
    //           }}
    //         >
    //           <ModalTriggerButton
    //             setShowModel={setShowModalWithId}
    //             icon={<EditOutlined />}
    //           />
    //         </div>
    //       </div>
    //     );
    //   },
    // },
  ];

  const { data, isLoading } = useGetAllSellsOrdersQuery({ ...query });

  const ordersData = data?.data;
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
      <ActionBar inline title="Delivered orders List">
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
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={ordersData}
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
        <AddUpdateOrders id={id} />
      </EComModalWrapper> */}
    </div>
  );
};

export default DeliveredOrders;
