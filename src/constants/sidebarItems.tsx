import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  MessageOutlined,
  DashboardOutlined,
  HomeOutlined,
  ShopOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";

export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      key: "/home",
      label: (
        <Link className="text-sm" href={`/`}>
          Home
        </Link>
      ),
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link className="text-sm " href={`/dashboard`}>
          Dashboard
        </Link>
      ),
      key: "/dashboard",
      icon: <DashboardOutlined />,
    },
    {
      label: (
        <Link className="text-sm " href={`/inbox`}>
          Inbox
        </Link>
      ),
      key: "/inbox",
      icon: <MessageOutlined />,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/${role}`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/${role}/change-password`}>Change Password</Link>,
          key: `/${role}/change-password`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-student`}>Manage Students</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-student`,
    },
    {
      label: <Link href={`/${role}/manage-faculty`}>Manage Faculty</Link>,
      icon: <TableOutlined />,
      key: `/${role}/manage-faculty`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Manage academic",
      key: "manage-academic",
      icon: <TableOutlined />,
      children: [
        {
          label: <Link href={`/${role}/academic/faculty`}>Faculties</Link>,
          key: `/${role}/academic/faculty`,
        },
        {
          label: <Link href={`/${role}/academic/department`}>Departments</Link>,
          key: `/${role}/academic/department`,
        },
        {
          label: <Link href={`/${role}/academic/semester`}>Semesters</Link>,
          key: `/${role}/academic/semester`,
        },
      ],
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
        {
          label: <Link href={`/${role}/building`}>Building</Link>,
          key: `/${role}/building`,
        },
        {
          label: <Link href={`/${role}/room`}>Rooms</Link>,
          key: `/${role}/room`,
        },
        {
          label: <Link href={`/${role}/course`}>Course</Link>,
          key: `/${role}/course`,
        },
        {
          label: (
            <Link href={`/${role}/semester-registration`}>
              Semester registration
            </Link>
          ),
          key: `/${role}/semester-registration`,
        },
        {
          label: <Link href={`/${role}/offered-course`}>Offered courses</Link>,
          key: `/${role}/offered-course`,
        },
        {
          label: (
            <Link href={`/${role}/offered-course-section`}>
              Course sections
            </Link>
          ),
          key: `/${role}/offered-course-section`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: "Management",
      key: "management",
      icon: <AppstoreOutlined />,
      children: [
        {
          label: <Link href={`/${role}/department`}>Department</Link>,
          key: `/${role}/department`,
        },
      ],
    },
  ];

  const facultySidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${role}/courses`,
    },
  ];

  const studentSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/courses`}>Courses</Link>,
      icon: <TableOutlined />,
      key: `/${role}/courses`,
    },
    {
      label: <Link href={`/${role}/courses/schedule`}>Course schedules</Link>,
      icon: <ScheduleOutlined />,
      key: `/${role}/courses/schedule`,
    },
    {
      label: <Link href={`/${role}/registration`}>Registration</Link>,
      icon: <ThunderboltOutlined />,
      key: `/${role}/registration`,
    },
    {
      label: <Link href={`/${role}/payment`}>Payment</Link>,
      icon: <CreditCardOutlined />,
      key: `/${role}/payment`,
    },
    {
      label: <Link href={`/${role}/academic-report`}>Academic report</Link>,
      icon: <FileTextOutlined />,
      key: `/${role}/academic-report`,
    },
  ];

  const sellerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: "Manage shop",
      key: "manage-products",
      icon: <ShopOutlined />,
      children: [
        {
          label: <Link href={`/${role}/products`}>Products</Link>,
          key: `/${role}/products`,
        },
        {
          label: <Link href={`/${role}/orders`}>Orders</Link>,
          key: `/${role}/orders`,
        },
        {
          label: <Link href={`/${role}/returns`}>Returns</Link>,
          key: `/${role}/returns`,
        },
      ],
    },
    {
      label: "Shop Users",
      key: "shop-users",
      icon: <UserSwitchOutlined />,
      children: [
        {
          label: <Link href={`/${role}/managers`}>Managers</Link>,
          key: `/${role}/managers`,
        },
        {
          label: <Link href={`/${role}/customers`}>Customers</Link>,
          key: `/${role}/customers`,
        },
      ],
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.FACULTY) return facultySidebarItems;
  else if (role === USER_ROLE.STUDENT) return studentSidebarItems;
  else if (role === USER_ROLE.SELLER) return sellerSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
