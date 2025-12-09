"use client";

import { Select } from "antd";

interface StatusFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const options = [
  { label: "All Statuses", value: null },
  { label: "Completed", value: "COMPLETED" },
  { label: "Incomplete", value: "INCOMPLETE" },
  { label: "Missing", value: "MISSING" },
];

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
  return (
    <Select
      placeholder="Status"
      style={{ width: "100%", maxWidth: 200 }}
      value={value}
      onChange={onChange}
      options={options}
      allowClear
    />
  );
};

export default StatusFilter;
