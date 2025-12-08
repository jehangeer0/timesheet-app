"use client"

import type React from "react"
import { useState } from "react"
import { Table, Select, Pagination } from "antd"
import type { TableColumnsType, PaginationProps } from "antd"

interface TimesheetRecord {
  key: string
  week: number
  date: string
  status: "COMPLETED" | "INCOMPLETE" | "MISSING"
  action: string
}

const TimesheetTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [dateRange, setDateRange] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<string | null>(null)

  const allData: TimesheetRecord[] = [
    { key: "1", week: 1, date: "1 - 5 January, 2024", status: "COMPLETED", action: "View" },
    { key: "2", week: 2, date: "8 - 12 January, 2024", status: "COMPLETED", action: "View" },
    { key: "3", week: 3, date: "15 - 19 January, 2024", status: "INCOMPLETE", action: "Update" },
    { key: "4", week: 4, date: "22 - 26 January, 2024", status: "COMPLETED", action: "View" },
    { key: "5", week: 5, date: "28 January - 1 February, 2024", status: "MISSING", action: "Create" },
    { key: "6", week: 6, date: "5 - 9 February, 2024", status: "COMPLETED", action: "View" },
    { key: "7", week: 7, date: "12 - 16 February, 2024", status: "INCOMPLETE", action: "Update" },
    { key: "8", week: 8, date: "19 - 23 February, 2024", status: "MISSING", action: "Create" },
    { key: "9", week: 9, date: "26 February - 1 March, 2024", status: "COMPLETED", action: "View" },
    { key: "10", week: 10, date: "4 - 8 March, 2024", status: "COMPLETED", action: "View" },
  ]

  // Filter data based on selected filters
  const filteredData = allData.filter((item) => {
    if (statusFilter && item.status !== statusFilter) return false
    return true
  })

  // Paginate the filtered data
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "#03543F" 
      case "INCOMPLETE":
        return "#723B13" 
      case "MISSING":
        return "#99154B" 
      default:
        return "#d9d9d9" 
    }
  }

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "#DEF7EC" 
      case "INCOMPLETE":
        return "#FDF6B2" 
      case "MISSING":
        return "#FCE8F3" 
      default:
        return "#fafafa" 
    }
  }

  const columns: TableColumnsType<TimesheetRecord> = [
    {
      title: "WEEK #",
      dataIndex: "week",
      key: "week",
      width: "10%",
      sorter: (a, b) => a.week - b.week,
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      width: "35%",
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      width: "25%",
      render: (status: string) => (
        <div
          style={{
            display: "inline-block",
            padding: "2px 8px",
            borderRadius: "6px",
            backgroundColor: getStatusBgColor(status),
            color: getStatusColor(status),
            fontWeight: "600",
            fontSize: "12px",
            letterSpacing: "0.5px",
          }}
        >
          {status}
        </div>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "ACTIONS",
      dataIndex: "action",
      key: "action",
      width: "20%",
      render: (action: string) => (
        <a href="#" className="text-blue-500 hover:text-blue-700 font-medium" onClick={(e) => e.preventDefault()}>
          {action}
        </a>
      ),
    },
  ]

  const onPaginationChange: PaginationProps["onChange"] = (page, pageSize) => {
    setCurrentPage(page)
    setPageSize(pageSize)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Timesheets</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Select
          placeholder="Date Range"
          style={{ width: "100%", maxWidth: "200px" }}
          value={dateRange}
          onChange={setDateRange}
          options={[
            { label: "Last Week", value: "last-week" },
            { label: "Last Month", value: "last-month" },
            { label: "Last 3 Months", value: "last-3-months" },
          ]}
        />
        <Select
          placeholder="Status"
          style={{ width: "100%", maxWidth: "200px" }}
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { label: "All Statuses", value: null },
            { label: "Completed", value: "COMPLETED" },
            { label: "Incomplete", value: "INCOMPLETE" },
            { label: "Missing", value: "MISSING" },
          ]}
          allowClear
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        <Table
          columns={columns}
          dataSource={paginatedData}
          pagination={false}
          size="large"
          className="timesheet-table"
          bordered={false}
          locale={{
            emptyText: "No timesheets found",
          }}
        />
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <Select
          value={pageSize}
          onChange={setPageSize}
          style={{ width: "120px" }}
          options={[
            { label: "5 per page", value: 5 },
            { label: "10 per page", value: 10 },
            { label: "20 per page", value: 20 },
          ]}
        />
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={onPaginationChange}
          showSizeChanger={false}
          className="flex justify-center"
        />
      </div>
    </div>
  )
}

export default TimesheetTable
