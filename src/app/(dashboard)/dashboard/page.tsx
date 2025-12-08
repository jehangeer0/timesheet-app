"use client"

import Footer from "@/components/Footer/Footer"
import TimesheetTable from "@/components/TimeSheetTable/TimeSheetTable"

export default function Home() {
  return (
    <div className="h-full"> 
      <main className="flex-1">
        <TimesheetTable />
      </main>
    </div>
  )
}
