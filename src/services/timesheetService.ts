export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
}

class TimesheetService {
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || error.message || `HTTP ${response.status}`);
    }
    return response.json();
  }

  async getTimesheets(filters?: { status?: string; year?: string }): Promise<ApiResponse<any[]>> {
    try {
      const params = new URLSearchParams();
      if (filters?.status) params.append("status", filters.status);
      if (filters?.year) params.append("year", filters.year);

      const response = await fetch(`/api/timesheets?${params.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      return this.handleResponse(response);
    } catch (error: any) {
      console.error("Get timesheets error:", error);
      throw new Error(error.message || "Failed to fetch timesheets");
    }
  }

  async createTimesheet(data: {
    week: number;
    year: number;
    startDate: string;
    endDate: string;
  }): Promise<ApiResponse<any>> {
    try {
      const response = await fetch("/api/timesheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return this.handleResponse(response);
    } catch (error: any) {
      console.error("Create timesheet error:", error);
      throw new Error(error.message || "Failed to create timesheet");
    }
  }

  async getTimesheetEntries(timesheetId: string): Promise<ApiResponse<any[]>> {
    try {
      const response = await fetch(`/api/timesheets/${timesheetId}/entries`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
      });

      return this.handleResponse(response);
    } catch (error: any) {
      console.error("Get entries error:", error);
      throw new Error(error.message || "Failed to fetch entries");
    }
  }

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
  ): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`/api/timesheets/${timesheetId}/entries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return this.handleResponse(response);
    } catch (error: any) {
      console.error("Create entry error:", error);
      throw new Error(error.message || "Failed to create entry");
    }
  }

  async deleteEntry(entryId: string): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`/api/timesheets/entries/${entryId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      return this.handleResponse(response);
    } catch (error: any) {
      console.error("Delete entry error:", error);
      throw new Error(error.message || "Failed to delete entry");
    }
  }

  async updateEntry(entryId: string, data: Partial<any>): Promise<ApiResponse<any>> {
    try {
      const response = await fetch(`/api/timesheets/entries/${entryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      return this.handleResponse(response);
    } catch (error: any) {
      console.error("Update entry error:", error);
      throw new Error(error.message || "Failed to update entry");
    }
  }
}

export const timesheetService = new TimesheetService();