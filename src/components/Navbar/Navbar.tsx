"use client";

import { Layout, Button, message, Modal } from "antd";
import { LogoutOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const { Header } = Layout;
const { confirm } = Modal;

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    confirm({
      title: 'Are you sure you want to logout?',
      content: 'You will be redirected to the login page.',
      okText: 'Yes, Logout',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          if (typeof window !== 'undefined') {
            localStorage.clear();
            sessionStorage.clear();
          }
          
          await signOut({ 
            redirect: false 
          });
          
          document.cookie.split(";").forEach((c) => {
            document.cookie = c
              .replace(/^ +/, "")
              .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
          });
          
          message.success("Logged out successfully");
          
          setTimeout(() => {
            window.location.href = '/login';
          }, 500);
          
        } catch (error) {
          console.error("Logout error:", error);
          message.error("Error during logout");
          window.location.href = '/login';
        }
      },
    });
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
        type="primary"
        danger
      >
        <span className="hidden sm:inline">Logout</span>
      </Button>
    </Header>
  );
}