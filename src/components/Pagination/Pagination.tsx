"use client";

import { TimesheetPaginationProps } from "@/interface/pagination";
import { Pagination, Select } from "antd";

const TimesheetPagination: React.FC<TimesheetPaginationProps> = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
      <Select
        value={pageSize}
        onChange={onPageSizeChange}
        style={{ width: 120 }}
        options={[
          { label: "5 per page", value: 5 },
          { label: "10 per page", value: 10 },
          { label: "20 per page", value: 20 },
        ]}
      />

      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={onPageChange}
        showSizeChanger={false}
        className="flex justify-center"
      />
    </div>
  );
};

export default TimesheetPagination;
