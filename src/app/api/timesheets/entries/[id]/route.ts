import { NextRequest, NextResponse } from "next/server";
import { mockTimesheetEntries } from "@/data/mockData";
import { auth } from "@/lib/auth";

// DELETE a specific entry
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { id: entryId } = await context.params;
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const index = mockTimesheetEntries.findIndex((e) => e.id === entryId);
    if (index === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }

    mockTimesheetEntries.splice(index, 1);

    return NextResponse.json({ success: true, message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT: update a specific entry
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    const { id: entryId } = await context.params;
    const session = await auth();
    if (!session?.user) {
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

    return NextResponse.json({
      success: true,
      data: mockTimesheetEntries[index],
      message: "Entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating entry:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
