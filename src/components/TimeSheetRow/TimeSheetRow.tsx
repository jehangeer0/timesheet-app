"use client"

import { useState, useRef, useEffect } from "react"
import { MoreOutlined } from "@ant-design/icons"
import { Row, Col } from "antd"

interface Task {
  id: string
  name: string
  hours: number
  projectName: string
}

interface TimesheetRowProps {
  task: Task
}

const TimesheetRow = ({ task }: TimesheetRowProps) => {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <Row
      className="bg-gray-50 p-3 md:p-4 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-4"
      align="middle"
      justify="space-between"
    >
      {/* Task Name */}
      <Col xs={24} sm={12} className="flex-1 min-w-0">
        <p className="text-sm md:text-base text-gray-900 font-medium truncate">
          {task.name}
        </p>
      </Col>

      {/* Right Section */}
      <Col
        xs={24}
        sm={12}
        className="flex items-center justify-between sm:justify-end gap-3 md:gap-4"
      >
        {/* Hours */}
        <span className="text-sm md:text-base text-gray-600 whitespace-nowrap font-medium">
          {task.hours} hrs
        </span>

        {/* Project Badge */}
        <button className="px-2 md:px-3 py-1 bg-blue-100 text-blue-600 text-xs md:text-sm font-medium rounded hover:bg-blue-200 transition-colors whitespace-nowrap">
          {task.projectName}
        </button>

        {/* More Options */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-200 rounded-md transition-colors text-gray-600"
            aria-label="More options"
          >
            <MoreOutlined className="text-lg" />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-max">
              <button
                onClick={() => setShowMenu(false)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors text-gray-700 font-medium"
              >
                Edit
              </button>

              <button
                onClick={() => setShowMenu(false)}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors border-t border-gray-100 text-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default TimesheetRow
