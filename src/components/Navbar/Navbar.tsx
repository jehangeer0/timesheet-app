"use client";

import { Layout, Button, message } from "antd";
import { LogoutOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const { Header } = Layout;

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      message.success("Logged out successfully");
      router.push("/login");
      router.refresh();
    } catch (error) {
      message.error("Error logging out");
      console.error("Logout error:", error);
    }
  };

  return (
    <Header className="!bg-white shadow-sm px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
          <ClockCircleOutlined className="text-white text-xl" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 m-0">
          Timesheets
        </h1>
      </div>

      <Button
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className="flex items-center"
      >
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </Header>
  );
}