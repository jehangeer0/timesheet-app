"use client"

import { useState } from "react"
import { Progress, Row, Col } from "antd"
import TimesheetRow from "../TimeSheetRow/TimeSheetRow"

interface Task {
  id: string
  name: string
  hours: number
  projectName: string
}

interface TimesheetData {
  [date: string]: Task[]
}

const TimesheetComponent = () => {
  const [timesheetData] = useState<TimesheetData>({
    "Jan 21": [
      { id: "1", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      { id: "2", name: "Homepage Development", hours: 4, projectName: "Project Name" },
    ],
    "Jan 22": [
      { id: "3", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      { id: "4", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      { id: "5", name: "Homepage Development", hours: 4, projectName: "Project Name" },
    ],
    "Jan 23": [
      { id: "6", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      { id: "7", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      { id: "8", name: "Homepage Development", hours: 4, projectName: "Project Name" },
    ],
    "Jan 24": [
      { id: "9", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      { id: "10", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      { id: "11", name: "Homepage Development", hours: 4, projectName: "Project Name" },
    ],
    "Jan 25": [],
  })

  const totalHours = Object.values(timesheetData)
    .flat()
    .reduce((sum, task) => sum + task.hours, 0)

  const maxHours = 40
  const progressPercent = (totalHours / maxHours) * 100

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-4 md:p-8">

      {/* Header */}
      <Row className="gap-4 mb-8" justify="space-between">
        {/* Left Side */}
        <Col xs={24} md={12}>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            This week's timesheet
          </h1>
          <p className="text-sm text-gray-600">21 - 26 January, 2024</p>
        </Col>

        {/* Right Side – Hours Summary */}
        <Col xs={24} md={10}>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                {totalHours}/40 hrs
              </p>
              <p className="text-xs text-gray-500">100%</p>
            </div>
            <div className="w-32">
              <Progress
                percent={Math.round(progressPercent)}
                strokeColor="#ff8c00"
                trailColor="#e5e7eb"
                showInfo={false}
                size="small"
              />
            </div>
          </div>
        </Col>
      </Row>

      {/* Timesheet Entries */}
      <div className="space-y-6">
        {Object.entries(timesheetData).map(([date, tasks]) => (
          <div key={date}>
            {/* Date Header */}
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{date}</h2>

            {/* Task Rows */}
            <div className="space-y-2 mb-3">
              {tasks.length > 0 ? (
                tasks.map((task) => <TimesheetRow key={task.id} task={task} />)
              ) : (
                <div className="text-center py-4"></div>
              )}
            </div>

            {/* Add Task */}
            <button className="w-full border-2 border-dashed border-blue-300 rounded-lg py-3 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 text-sm md:text-base">
              <span className="text-lg">+</span>
              Add new task
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimesheetComponent
