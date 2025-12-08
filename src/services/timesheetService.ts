export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

export const timesheetService = {
  // Get all timesheets
  async getTimesheets(filters?: { status?: string; year?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append("status", filters.status);
    if (filters?.year) params.append("year", filters.year);

    const response = await fetch(`/api/timesheets?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch timesheets");
    }

    return response.json();
  },

  // Create new timesheet
  async createTimesheet(data: {
    week: number;
    year: number;
    startDate: string;
    endDate: string;
  }) {
    const response = await fetch("/api/timesheets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create timesheet");
    }

    return response.json();
  },

  // Get entries for a timesheet
  async getTimesheetEntries(timesheetId: string) {
    const response = await fetch(`/api/timesheets/${timesheetId}/entries`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch entries");
    }

    return response.json();
  },

  // Create new entry
  async createEntry(
    timesheetId: string,
    data: {
      taskName: string;
      projectName: string;
      workType: string;
      description: string;
      hours: number;
      date: string;
    }
  ) {
    const response = await fetch(`/api/timesheets/${timesheetId}/entries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to create entry");
    }

    return response.json();
  },

  // Delete entry
  async deleteEntry(entryId: string) {
    const response = await fetch(`/api/timesheets/entries/${entryId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete entry");
    }

    return response.json();
  },

  // Update entry
  async updateEntry(entryId: string, data: Partial<any>) {
    const response = await fetch(`/api/timesheets/entries/${entryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update entry");
    }

    return response.json();
  },
};