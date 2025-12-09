"use client";

import { useState, useEffect } from "react";
import { Button, Table, message, Spin } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import CreateTimeSheetModal from "../CreateTimeSheetModal/CreateTimeSheetModal";
import DateRangeFilter from "../Filters/DateRangeFilter/DateRangeFilter";
import StatusFilter from "../Filters/StatusFilter/StatusFilter";
import TimesheetPagination from "../Pagination/Pagination";
import StatusBadge from "../StatusBadge/StatusBadge";
import ActionButton from "../ActionButton/ActionButton";
import { TimesheetRecord } from "@/interface/timeSheetInterface";
import TimeSheetsDetails from "../TimeSheetsDetails/TimeSheetsDetails";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchTimesheets, 
  setSelectedTimesheet,
  addTimesheetEntry 
} from "@/store/slices/timesheetsSlice";

const TimesheetTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [dateRange, setDateRange] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const dispatch = useAppDispatch();
  const { timesheets, loading, selectedTimesheet } = useAppSelector(
    (state) => state.timesheets
  );

  // Fetch timesheets on mount and when filters change
  useEffect(() => {
    const filters: any = {};
    if (statusFilter) filters.status = statusFilter;
    
    dispatch(fetchTimesheets(filters));
  }, [dispatch, statusFilter]);

  const filteredData = timesheets.filter(item => 
    !statusFilter || item.status === statusFilter
  );
  
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleActionClick = (record: TimesheetRecord) => {
    dispatch(setSelectedTimesheet(record));
    if (record.action === "Create") {
      setIsCreateModalOpen(true);
    }
  };

  const handleCreateTimesheet = async (data: any) => {
    if (!selectedTimesheet) return;

    try {
      const timesheetId = selectedTimesheet.key;
      const dates = Object.keys(selectedTimesheet.tasks || {});
      const taskDate = dates[0] || new Date().toISOString().split('T')[0];

      await dispatch(addTimesheetEntry({
        timesheetId,
        entryData: {
          taskName: data.taskDescription,
          projectName: data.project,
          workType: data.workType,
          description: data.taskDescription,
          hours: data.hours,
          date: taskDate,
        }
      })).unwrap();

      message.success("Task added successfully!");
      setIsCreateModalOpen(false);
      
      // Refetch timesheets to update the list
      await dispatch(fetchTimesheets()).unwrap();
    } catch (error) {
      console.error("Error creating task:", error);
      message.error("Failed to create task. Please try again.");
    }
  };

  const handleBackToTimesheets = () => {
    dispatch(setSelectedTimesheet(null));
  };

  // Create a wrapper function for onUpdate that returns Promise<void>
  const handleUpdateTimesheets = async (): Promise<void> => {
    try {
      await dispatch(fetchTimesheets()).unwrap();
    } catch (error) {
      console.error("Failed to update timesheets:", error);
    }
  };

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
      render: (status) => <StatusBadge status={status} />,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "ACTIONS",
      dataIndex: "action",
      key: "action",
      width: "20%",
      render: (_, record) => (
        <ActionButton record={record} onClick={handleActionClick} />
      ),
    },
  ];

  if (selectedTimesheet && !isCreateModalOpen) {
    return (
      <div>
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={handleBackToTimesheets}
          className="mb-4 text-blue-600 hover:text-blue-700"
        >
          Back to Timesheets
        </Button>
        <TimeSheetsDetails
          timesheet={selectedTimesheet}
          onUpdate={handleUpdateTimesheets}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-4 py-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Timesheets</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <DateRangeFilter value={dateRange} onChange={setDateRange} />
        <StatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={paginatedData}
            pagination={false}
            size="middle"
            className="timesheet-table"
            bordered={false}
            locale={{ emptyText: "No timesheets found" }}
          />
        )}
      </div>

      <TimesheetPagination
        currentPage={currentPage}
        pageSize={pageSize}
        total={filteredData.length}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
      />

      <CreateTimeSheetModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          dispatch(setSelectedTimesheet(null));
        }}
        onSubmit={handleCreateTimesheet}
      />
    </div>
  );
};

export default TimesheetTable;