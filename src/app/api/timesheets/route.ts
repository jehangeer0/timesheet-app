import { NextRequest, NextResponse } from "next/server";
import { mockTimesheets } from "@/data/mockData";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const year = searchParams.get("year");

    // Filter timesheets by user
    let userTimesheets = mockTimesheets.filter((ts) => ts.userId === userId);

    // Apply filters
    if (status) {
      userTimesheets = userTimesheets.filter((ts) => ts.status === status);
    }

    if (year) {
      userTimesheets = userTimesheets.filter(
        (ts) => ts.year === parseInt(year)
      );
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      data: userTimesheets,
      total: userTimesheets.length,
    });
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { week, year, startDate, endDate } = body;

    // Create new timesheet
    const newTimesheet: any = {
      id: `ts-${Date.now()}`,
      userId: session.user.id,
      week,
      year,
      startDate,
      endDate,
      status: "MISSING" as const,
      totalHours: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, save to database
    mockTimesheets.push(newTimesheet);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      success: true,
      data: newTimesheet,
      message: "Timesheet created successfully",
    });
  } catch (error) {
    console.error("Error creating timesheet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}