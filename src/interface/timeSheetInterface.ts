export interface Task {
  id: string;
  name: string;
  hours: number;
  projectName: string;
  description?: string;
  workType?: string;
}

export interface TimesheetRecord {
  key: string;
  week: number;
  date: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  action: string;
  dateRange: string;
  tasks?: { [date: string]: Task[] };
}