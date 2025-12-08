import { TimesheetRecord as ApiTimesheet, TimesheetEntry } from "@/interface/mockData";
import { TimesheetRecord as UiTimesheet, Task } from "@/interface/timeSheetInterface";

// Transform API timesheet + entries to UI format
export function transformTimesheetForUI(
  apiTimesheet: ApiTimesheet,
  entries: TimesheetEntry[]
): UiTimesheet {
  // Group entries by date
  const tasksByDate: { [date: string]: Task[] } = {};

  entries.forEach((entry) => {
    const dateKey = formatDate(entry.date);
    if (!tasksByDate[dateKey]) {
      tasksByDate[dateKey] = [];
    }

    tasksByDate[dateKey].push({
      id: entry.id,
      name: entry.taskName,
      hours: entry.hours,
      projectName: entry.projectName,
      description: entry.description,
      workType: entry.workType,
    });
  });

  // Generate all weekday dates even if no entries
  const weekDates = generateWeekDates(apiTimesheet.startDate, apiTimesheet.endDate);
  weekDates.forEach((date) => {
    const dateKey = formatDate(date);
    if (!tasksByDate[dateKey]) {
      tasksByDate[dateKey] = [];
    }
  });

  return {
    key: apiTimesheet.id,
    week: apiTimesheet.week,
    date: `${formatDateRange(apiTimesheet.startDate)} - ${formatDateRange(apiTimesheet.endDate)}, ${apiTimesheet.year}`,
    dateRange: `${formatDateRange(apiTimesheet.startDate)} - ${formatDateRange(apiTimesheet.endDate)}, ${apiTimesheet.year}`,
    status: apiTimesheet.status,
    action: getAction(apiTimesheet.status),
    tasks: tasksByDate,
  };
}

// Get action based on status
function getAction(status: string): string {
  switch (status) {
    case "COMPLETED":
      return "View";
    case "INCOMPLETE":
      return "Update";
    case "MISSING":
      return "Create";
    default:
      return "View";
  }
}

// Format date for display (e.g., "Jan 1")
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}

// Format date range (e.g., "1 January")
function formatDateRange(dateString: string): string {
  const date = new Date(dateString);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${date.getDate()} ${months[date.getMonth()]}`;
}

// Generate all dates in a week
function generateWeekDates(startDate: string, endDate: string): string[] {
  const dates: string[] = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}