"use client";

import { Select } from "antd";

interface DateRangeFilterProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const options = [
  { label: "Last Week", value: "last-week" },
  { label: "Last Month", value: "last-month" },
  { label: "Last 3 Months", value: "last-3-months" },
];

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ value, onChange }) => {
  return (
    <Select
      placeholder="Date Range"
      style={{ width: "100%", maxWidth: 200 }}
      value={value}
      onChange={onChange}
      options={options}
      allowClear
    />
  );
};

export default DateRangeFilter;
