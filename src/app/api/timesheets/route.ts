import { NextRequest, NextResponse } from "next/server";
import { mockTimesheets } from "@/data/mockData";
import { auth } from "@/lib/auth";

// GET all timesheets
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get("status");
    const yearFilter = searchParams.get("year");

    let filteredTimesheets = mockTimesheets.filter(
      ts => ts.userId === session.user.id
    );

    if (statusFilter) {
      filteredTimesheets = filteredTimesheets.filter(
        ts => ts.status === statusFilter
      );
    }

    if (yearFilter) {
      filteredTimesheets = filteredTimesheets.filter(
        ts => ts.year === parseInt(yearFilter)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredTimesheets,
      total: filteredTimesheets.length,
    });
  } catch (error) {
    console.error("Error fetching timesheets:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: create new timesheet
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { week, year, startDate, endDate } = body;

    if (!week || !year || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTimesheet: any = {
      id: `ts-${Date.now()}`,
      userId: session.user.id,
      week,
      year,
      startDate,
      endDate,
      status: "INCOMPLETE",
      totalHours: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockTimesheets.push(newTimesheet);

    return NextResponse.json({
      success: true,
      data: newTimesheet,
      message: "Timesheet created successfully",
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating timesheet:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}