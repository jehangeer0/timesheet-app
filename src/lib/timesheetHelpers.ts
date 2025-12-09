import { TimesheetRecord, Task } from "@/interface/timeSheetInterface";
import { generateWeekDates } from "@/data/timesheets";

export const addTaskToTimesheet = (
  timesheet: TimesheetRecord,
  data: any
): TimesheetRecord => {
  const newTask: Task = {
    id: `task-${Date.now()}`,
    name: data.taskDescription,
    hours: data.hours,
    projectName: data.project,
    description: data.taskDescription,
    workType: data.workType,
  };

  if (!timesheet.tasks || Object.keys(timesheet.tasks).length === 0) {
    const weekDates = generateWeekDates(timesheet.week);
    timesheet.tasks = {};
    weekDates.forEach(date => (timesheet.tasks![date] = []));
  }

  const firstDate = Object.keys(timesheet.tasks)[0];
  timesheet.tasks[firstDate] = [...(timesheet.tasks[firstDate] || []), newTask];

  timesheet.status = "INCOMPLETE";
  timesheet.action = "Update";

  return timesheet;
};
