"use client"

import type React from "react"
import { Dropdown, Button } from "antd"
import { UserOutlined, DownOutlined } from "@ant-design/icons"

const Navbar: React.FC = () => {
  const menu = [
    {
      key: "1",
      label: "Profile",
    },
    {
      key: "2",
      label: "Settings",
    },
    {
      key: "3",
      label: "Logout",
    },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Navigation Links */}
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-gray-900">ticktock</div>
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">
              Timesheets
            </a>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="flex items-center">
          <Dropdown menu={{ items: menu }} trigger={["click"]}>
            <Button type="text" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <UserOutlined />
              <span className="hidden sm:inline">John Doe</span>
              <DownOutlined className="text-xs" />
            </Button>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden mt-4 flex items-center gap-4">
        <a href="#" className="text-gray-700 hover:text-gray-900 font-medium text-sm">
          Timesheets
        </a>
      </div>
    </nav>
  )
}

export default Navbar
