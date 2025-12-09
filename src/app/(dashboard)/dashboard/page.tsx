"use client"

import TimesheetTable from "@/components/TimeSheetTable/TimeSheetTable"
import { Provider } from "react-redux"
import { makeStore } from "@/store/store"

export default function Home() {
  return (
    <div className="h-full"> 
      <main className="flex-1">
        <TimesheetTable />
      </main>
    </div>
  )
}