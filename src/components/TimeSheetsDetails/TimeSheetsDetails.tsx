"use client";

import { TimesheetRecord } from "@/interface/timeSheetInterface";
import { Col, message, Progress, Row } from "antd";
import { useState } from "react";
import CreateTimeSheetModal from "../CreateTimeSheetModal/CreateTimeSheetModal";
import TimesheetRow from "../TimeSheetRow/TimeSheetRow";
import { useAppDispatch } from "@/store/hooks";
import { addTimesheetEntry, deleteTimesheetEntry } from "@/store/slices/timesheetsSlice";

interface TimeSheetsDetailsProps {
  timesheet: TimesheetRecord;
  onUpdate?: () => Promise<void>;
}

const TimeSheetsDetails = ({ timesheet, onUpdate }: TimeSheetsDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  
  const dispatch = useAppDispatch();

  const timesheetData = timesheet.tasks || {};

  const totalHours = Object.values(timesheetData)
    .flat()
    .reduce((sum, task) => sum + task.hours, 0);

  const maxHours = 40;
  const progressPercent = (totalHours / maxHours) * 100;

  const handleAddTask = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleTaskSubmit = async (data: any) => {
    try {
      // Convert display date (e.g., "Jan 1") to API date format
      const apiDate = convertToApiDate(selectedDate, timesheet.week);

      await dispatch(addTimesheetEntry({
        timesheetId: timesheet.key,
        entryData: {
          taskName: data.taskDescription,
          projectName: data.project,
          workType: data.workType,
          description: data.taskDescription,
          hours: data.hours,
          date: apiDate,
        }
      })).unwrap();

      message.success("Task added successfully!");
      setIsModalOpen(false);
      
      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      message.error("Failed to create task");
    }
  };

  const handleDeleteTask = async (date: string, taskId: string) => {
    try {
      await dispatch(deleteTimesheetEntry(taskId)).unwrap();
      message.success("Task deleted successfully!");
      
      if (onUpdate) {
        await onUpdate();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      message.error("Failed to delete task");
    }
  };

  const convertToApiDate = (displayDate: string, week: number): string => {
    const year = new Date().getFullYear();
    const [monthStr, day] = displayDate.split(" ");
    const months: any = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
    const date = new Date(year, months[monthStr], parseInt(day));
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6 md:p-8">
      <Row className="gap-4 mb-8" justify="space-between">
        <Col xs={24} md={12}>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Week {timesheet.week}'s timesheet
          </h1>
          <p className="text-sm text-gray-600">{timesheet.dateRange}</p>
        </Col>

        <Col xs={24} md={10}>
          <div className="flex flex-col items-end gap-2">
            <p className="text-lg font-semibold">
              {totalHours}/{maxHours} hrs
            </p>
            <Progress
              percent={Math.round(progressPercent)}
              strokeColor="#ff8c00"
              showInfo={false}
              className="w-32"
            />
          </div>
        </Col>
      </Row>

      <div className="space-y-8">
        {Object.entries(timesheetData).map(([date, tasks]) => (
          <div key={date}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{date}</h2>

            <div className="space-y-2 mb-3">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <TimesheetRow
                    key={task.id}
                    task={task}
                    onDelete={() => handleDeleteTask(date, task.id)}
                  />
                ))
              ) : (
                <div className="py-4 text-gray-400 text-sm text-center">
                  No tasks for this day
                </div>
              )}
            </div>

            <button
              onClick={() => handleAddTask(date)}
              className="w-full border-2 border-dashed border-blue-300 rounded-lg py-2 text-blue-600 hover:bg-blue-50 transition font-medium cursor-pointer"
            >
              + Add new task
            </button>
          </div>
        ))}
      </div>

      <CreateTimeSheetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTaskSubmit}
      />
    </div>
  );
};

export default TimeSheetsDetails;