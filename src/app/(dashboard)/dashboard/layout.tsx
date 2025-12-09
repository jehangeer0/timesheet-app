'use client';

import React from 'react';
import { Layout } from 'antd';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const { Content } = Layout;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout className="h-screen flex flex-col overflow-hidden"> 
      <Navbar />
      <Content className="flex-1 bg-gray-50 overflow-auto"> 
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </Content>
      <Footer />

    </Layout>
  );
}
