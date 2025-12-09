// app/api/timesheets/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { mockTimesheets } from "@/data/mockData";

// GET all timesheets for logged-in user
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get query params
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const year = searchParams.get("year");

    // TypeScript knows session.user exists here because of the check above
    const userId = session.user.id;

    // Filter timesheets for the logged-in user
    let userTimesheets = mockTimesheets.filter(
      (ts) => ts.userId === userId
    );

    // Apply filters
    if (status) {
      userTimesheets = userTimesheets.filter((ts) => ts.status === status);
    }

    if (year) {
      userTimesheets = userTimesheets.filter((ts) => ts.year.toString() === year);
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
      { error: "Failed to fetch timesheets" },
      { status: 500 }
    );
  }
}

// POST: Create new timesheet
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { week, year, startDate, endDate } = body;

    if (!week || !year || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userId = session.user.id;

    const newTimesheet = {
      id: `ts-${Date.now()}`,
      userId: userId,
      week: parseInt(week),
      year: parseInt(year),
      startDate,
      endDate,
      status: "INCOMPLETE" as const,
      totalHours: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

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
      { error: "Failed to create timesheet" },
      { status: 500 }
    );
  }
}