"use client";

import { useState, useRef, useEffect } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Modal, Tag } from "antd";

interface Task {
  id: string;
  name: string;
  hours: number;
  projectName: string;
}

interface TimesheetRowProps {
  task: Task;
  onDelete?: () => void;
  onEdit?: () => void;
}

const TimesheetRow = ({ task, onDelete, onEdit }: TimesheetRowProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const handleDelete = () => {
    Modal.confirm({
      title: "Delete Task",
      content: "Are you sure want to delete this task?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => onDelete?.(),
    });
    setShowMenu(false);
  };

  return (
    <div className="w-full border border-gray-200 rounded-lg px-4 py-1 bg-white 
                    hover:bg-gray-50 flex items-center justify-between gap-3 transition">

      <p className="flex-1 font-medium text-gray-900 truncate">{task.name}</p>

      <p className="w-20 text-sm font-semibold text-gray-700 text-right">{task.hours} hrs</p>

      <Tag
        bordered={false}
        className="!px-4 py-1 text-sm font-semibold text-blue-700 
             flex items-center justify-center 
             cursor-pointer select-none"
        style={{
          background: "#E1EFFE",
          borderRadius: "6px",
        }}
      >
        {task.projectName}
      </Tag>


      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded hover:bg-gray-200 transition cursor-pointer"
        >
          <MoreOutlined className="text-lg" />
        </button>

        {showMenu && (
          <div className="absolute right-0 top-9 w-32 bg-white border border-gray-200 rounded-md 
                          shadow-md overflow-hidden z-50">

            <button
              onClick={() => { onEdit?.(); setShowMenu(false); }}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 
                         cursor-pointer"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimesheetRow;
