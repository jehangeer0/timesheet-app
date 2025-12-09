import { NextRequest, NextResponse } from "next/server";
import { mockTimesheetEntries } from "@/data/mockData";
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

    if (!taskName || !projectName || !workType || !hours || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEntry = {
      id: `entry-${Date.now()}`,
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

    mockTimesheetEntries.push(newEntry);

    return NextResponse.json({
      success: true,
      data: newEntry,
      message: "Entry created successfully",
    });
  } catch (error) {
    console.error("Error creating entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}