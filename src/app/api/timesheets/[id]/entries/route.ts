import { NextRequest, NextResponse } from "next/server";
import { mockTimesheetEntries } from "@/data/mockData";
import { auth } from "@/lib/auth";

// GET entries for a timesheet
export async function GET(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { id: timesheetId } = await context.params; 
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entries = mockTimesheetEntries.filter(
      (entry) => entry.timesheetId === timesheetId
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

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
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { id: timesheetId } = await context.params;
    const session = await auth();
    if (!session || !session.user) {
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

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

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

// DELETE: remove an entry
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { id: entryId } = await context.params;
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const index = mockTimesheetEntries.findIndex((e) => e.id === entryId);
    if (index === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    mockTimesheetEntries.splice(index, 1);

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      message: "Entry deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: update an entry
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { id: entryId } = await context.params;
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const index = mockTimesheetEntries.findIndex((e) => e.id === entryId);

    if (index === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    mockTimesheetEntries[index] = {
      ...mockTimesheetEntries[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      data: mockTimesheetEntries[index],
      message: "Entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
