import { Task, TimesheetRecord } from "@/interface/timeSheetInterface";

export const mockTimesheets: TimesheetRecord[] = [
  {
    key: "1",
    week: 1,
    date: "1 - 5 January, 2024",
    dateRange: "Jan 1 - Jan 5, 2024",
    status: "COMPLETED",
    action: "View",
    tasks: {
      "Jan 1": [
        { id: "1-1", name: "Homepage Development", hours: 4, projectName: "Project A" },
        { id: "1-2", name: "API Integration", hours: 4, projectName: "Project A" },
      ],
      "Jan 2": [
        { id: "1-3", name: "Database Design", hours: 6, projectName: "Project B" },
        { id: "1-4", name: "Testing", hours: 2, projectName: "Project B" },
      ],
      "Jan 3": [
        { id: "1-5", name: "Code Review", hours: 4, projectName: "Project A" },
        { id: "1-6", name: "Bug Fixes", hours: 4, projectName: "Project C" },
      ],
      "Jan 4": [
        { id: "1-7", name: "Documentation", hours: 5, projectName: "Project A" },
        { id: "1-8", name: "Client Meeting", hours: 3, projectName: "Project B" },
      ],
      "Jan 5": [
        { id: "1-9", name: "Sprint Planning", hours: 4, projectName: "Project A" },
        { id: "1-10", name: "Code Refactoring", hours: 4, projectName: "Project C" },
      ],
    },
  },
  {
    key: "2",
    week: 2,
    date: "8 - 12 January, 2024",
    dateRange: "Jan 8 - Jan 12, 2024",
    status: "COMPLETED",
    action: "View",
    tasks: {
      "Jan 8": [
        { id: "2-1", name: "Feature Development", hours: 6, projectName: "Project A" },
        { id: "2-2", name: "Code Review", hours: 2, projectName: "Project B" },
      ],
      "Jan 9": [
        { id: "2-3", name: "Testing", hours: 5, projectName: "Project A" },
        { id: "2-4", name: "Bug Fixes", hours: 3, projectName: "Project C" },
      ],
      "Jan 10": [
        { id: "2-5", name: "UI Design", hours: 6, projectName: "Project B" },
        { id: "2-6", name: "Documentation", hours: 2, projectName: "Project A" },
      ],
      "Jan 11": [
        { id: "2-7", name: "API Development", hours: 7, projectName: "Project C" },
        { id: "2-8", name: "Team Meeting", hours: 1, projectName: "Project A" },
      ],
      "Jan 12": [
        { id: "2-9", name: "Deployment", hours: 4, projectName: "Project A" },
        { id: "2-10", name: "Client Demo", hours: 4, projectName: "Project B" },
      ],
    },
  },
  {
    key: "3",
    week: 3,
    date: "15 - 19 January, 2024",
    dateRange: "Jan 15 - Jan 19, 2024",
    status: "INCOMPLETE",
    action: "Update",
    tasks: {
      "Jan 15": [
        { id: "3-1", name: "Homepage Development", hours: 4, projectName: "Project Name" },
        { id: "3-2", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      ],
      "Jan 16": [
        { id: "3-3", name: "Homepage Development", hours: 4, projectName: "Project Name" },
      ],
      "Jan 17": [],
      "Jan 18": [],
      "Jan 19": [],
    },
  },
  {
    key: "4",
    week: 4,
    date: "22 - 26 January, 2024",
    dateRange: "Jan 22 - Jan 26, 2024",
    status: "COMPLETED",
    action: "View",
    tasks: {
      "Jan 22": [
        { id: "4-1", name: "Backend Development", hours: 5, projectName: "Project D" },
        { id: "4-2", name: "Database Optimization", hours: 3, projectName: "Project D" },
      ],
      "Jan 23": [
        { id: "4-3", name: "Frontend Development", hours: 6, projectName: "Project E" },
        { id: "4-4", name: "Code Review", hours: 2, projectName: "Project D" },
      ],
      "Jan 24": [
        { id: "4-5", name: "Testing", hours: 5, projectName: "Project E" },
        { id: "4-6", name: "Bug Fixes", hours: 3, projectName: "Project D" },
      ],
      "Jan 25": [
        { id: "4-7", name: "Documentation", hours: 4, projectName: "Project E" },
        { id: "4-8", name: "Sprint Review", hours: 4, projectName: "Project D" },
      ],
      "Jan 26": [
        { id: "4-9", name: "Deployment", hours: 5, projectName: "Project E" },
        { id: "4-10", name: "Client Meeting", hours: 3, projectName: "Project D" },
      ],
    },
  },
  {
    key: "5",
    week: 5,
    date: "28 January - 1 February, 2024",
    dateRange: "Jan 28 - Feb 1, 2024",
    status: "MISSING",
    action: "Create",
    tasks: {},
  },
  {
    key: "6",
    week: 6,
    date: "5 - 9 February, 2024",
    dateRange: "Feb 5 - Feb 9, 2024",
    status: "COMPLETED",
    action: "View",
    tasks: {
      "Feb 5": [
        { id: "6-1", name: "New Feature Development", hours: 6, projectName: "Project F" },
        { id: "6-2", name: "Code Review", hours: 2, projectName: "Project F" },
      ],
      "Feb 6": [
        { id: "6-3", name: "Testing", hours: 5, projectName: "Project F" },
        { id: "6-4", name: "Bug Fixes", hours: 3, projectName: "Project G" },
      ],
      "Feb 7": [
        { id: "6-5", name: "UI/UX Improvements", hours: 6, projectName: "Project F" },
        { id: "6-6", name: "Documentation", hours: 2, projectName: "Project G" },
      ],
      "Feb 8": [
        { id: "6-7", name: "API Integration", hours: 7, projectName: "Project F" },
        { id: "6-8", name: "Team Sync", hours: 1, projectName: "Project G" },
      ],
      "Feb 9": [
        { id: "6-9", name: "Deployment", hours: 4, projectName: "Project F" },
        { id: "6-10", name: "Client Demo", hours: 4, projectName: "Project G" },
      ],
    },
  },
  {
    key: "7",
    week: 7,
    date: "12 - 16 February, 2024",
    dateRange: "Feb 12 - Feb 16, 2024",
    status: "INCOMPLETE",
    action: "Update",
    tasks: {
      "Feb 12": [
        { id: "7-1", name: "Feature Development", hours: 5, projectName: "Project H" },
      ],
      "Feb 13": [
        { id: "7-2", name: "Code Review", hours: 3, projectName: "Project H" },
      ],
      "Feb 14": [],
      "Feb 15": [],
      "Feb 16": [],
    },
  },
  {
    key: "8",
    week: 8,
    date: "19 - 23 February, 2024",
    dateRange: "Feb 19 - Feb 23, 2024",
    status: "MISSING",
    action: "Create",
    tasks: {},
  },
  {
    key: "9",
    week: 9,
    date: "26 February - 1 March, 2024",
    dateRange: "Feb 26 - Mar 1, 2024",
    status: "COMPLETED",
    action: "View",
    tasks: {
      "Feb 26": [
        { id: "9-1", name: "Sprint Planning", hours: 4, projectName: "Project I" },
        { id: "9-2", name: "Architecture Design", hours: 4, projectName: "Project I" },
      ],
      "Feb 27": [
        { id: "9-3", name: "Backend Development", hours: 6, projectName: "Project I" },
        { id: "9-4", name: "Database Setup", hours: 2, projectName: "Project J" },
      ],
      "Feb 28": [
        { id: "9-5", name: "API Development", hours: 7, projectName: "Project I" },
        { id: "9-6", name: "Testing", hours: 1, projectName: "Project J" },
      ],
      "Feb 29": [
        { id: "9-7", name: "Frontend Development", hours: 6, projectName: "Project J" },
        { id: "9-8", name: "Code Review", hours: 2, projectName: "Project I" },
      ],
      "Mar 1": [
        { id: "9-9", name: "Integration Testing", hours: 5, projectName: "Project I" },
        { id: "9-10", name: "Documentation", hours: 3, projectName: "Project J" },
      ],
    },
  },
  {
    key: "10",
    week: 10,
    date: "4 - 8 March, 2024",
    dateRange: "Mar 4 - Mar 8, 2024",
    status: "COMPLETED",
    action: "View",
    tasks: {
      "Mar 4": [
        { id: "10-1", name: "Bug Fixes", hours: 5, projectName: "Project K" },
        { id: "10-2", name: "Performance Optimization", hours: 3, projectName: "Project K" },
      ],
      "Mar 5": [
        { id: "10-3", name: "Feature Development", hours: 6, projectName: "Project L" },
        { id: "10-4", name: "Code Review", hours: 2, projectName: "Project K" },
      ],
      "Mar 6": [
        { id: "10-5", name: "Testing", hours: 5, projectName: "Project L" },
        { id: "10-6", name: "Documentation", hours: 3, projectName: "Project K" },
      ],
      "Mar 7": [
        { id: "10-7", name: "Client Meeting", hours: 2, projectName: "Project L" },
        { id: "10-8", name: "Sprint Review", hours: 6, projectName: "Project K" },
      ],
      "Mar 8": [
        { id: "10-9", name: "Deployment", hours: 4, projectName: "Project L" },
        { id: "10-10", name: "Team Retrospective", hours: 4, projectName: "Project K" },
      ],
    },
  },
];



export const generateWeekDates = (weekNumber: number): string[] => {
  const dates: string[] = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  for (let i = 0; i < 5; i++) {
    const day = (weekNumber - 1) * 7 + i + 1;
    const month = Math.floor(day / 30);
    const dayOfMonth = (day % 30) + 1;
    dates.push(`${months[month % 12]} ${dayOfMonth}`);
  }
  
  return dates;
};

export const createNewTimesheet = (weekNumber: number): TimesheetRecord => {
  const weekDates = generateWeekDates(weekNumber);
  const tasks: { [date: string]: Task[] } = {};
  
  weekDates.forEach(date => {
    tasks[date] = [];
  });

  return {
    key: `new-${Date.now()}`,
    week: weekNumber,
    date: `Week ${weekNumber} - ${new Date().getFullYear()}`,
    dateRange: `${weekDates[0]} - ${weekDates[4]}, ${new Date().getFullYear()}`,
    status: "INCOMPLETE",
    action: "Update",
    tasks,
  };
};