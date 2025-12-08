'use client';

import React from 'react';
import { Layout, Button } from 'antd';
import { ClockCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import Navbar from '@/components/Navbar/Navbar';

const { Header, Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    console.log('Logout clicked');
    // We'll add logout logic later
  };

  return (
    <Layout className="min-h-screen">
    <Navbar/>
      {/* Main Content */}
      <Content className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </Content>
    </Layout>
  );
}