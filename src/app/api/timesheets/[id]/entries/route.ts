// app/api/timesheets/[id]/entries/route.ts

import { NextRequest, NextResponse } from "next/server";
import { mockTimesheetEntries, mockTimesheets } from "@/data/mockData";
import { auth } from "@/lib/auth";

// GET entries for a timesheet
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: timesheetId } = await params;
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entries = mockTimesheetEntries.filter(
      (entry) => entry.timesheetId === timesheetId
    );

    return NextResponse.json({
      success: true,
      data: entries,
      total: entries.length,
    });
  } catch (error) {
    console.error("Error fetching entries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: create a new entry
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: timesheetId } = await params;
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { taskName, projectName, workType, description, hours, date } = body;

    // Validation
    if (!taskName || !projectName || !workType || !hours || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify timesheet exists
    const timesheet = mockTimesheets.find(ts => ts.id === timesheetId);
    if (!timesheet) {
      return NextResponse.json(
        { error: "Timesheet not found" },
        { status: 404 }
      );
    }

    // Create new entry
    const newEntry = {
      id: `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timesheetId,
      taskName,
      projectName,
      workType,
      description: description || "",
      hours: parseFloat(hours),
      date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to mock data
    mockTimesheetEntries.push(newEntry);

    // Update timesheet totals
    const timesheetEntries = mockTimesheetEntries.filter(e => e.timesheetId === timesheetId);
    const totalHours = timesheetEntries.reduce((sum, e) => sum + e.hours, 0);
    
    timesheet.totalHours = totalHours;
    timesheet.status = totalHours >= 40 ? "COMPLETED" : "INCOMPLETE";
    timesheet.updatedAt = new Date().toISOString();

    return NextResponse.json({
      success: true,
      data: newEntry,
      message: "Entry created successfully",
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}