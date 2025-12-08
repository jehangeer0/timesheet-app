// User Mock Data
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

// Timesheet Record Interface
export interface TimesheetRecord {
  id: string;
  userId: string;
  week: number;
  year: number;
  startDate: string;
  endDate: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  totalHours: number;
  createdAt: string;
  updatedAt: string;
}

// Timesheet Entry Interface
export interface TimesheetEntry {
  id: string;
  timesheetId: string;
  taskName: string;
  projectName: string;
  workType: string;
  description: string;
  hours: number;
  date: string;
  createdAt: string;
  updatedAt: string;
}

// Task Interface
export interface Task {
  id: string;
  name: string;
  hours: number;
  projectName: string;
  description?: string;
  workType?: string;
  date: string;
}
