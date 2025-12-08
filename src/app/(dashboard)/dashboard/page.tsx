"use client"

import Navbar from "@/components/Navbar/Navbar"
import TimesheetTable from "@/components/TimeSheetTable/TimeSheetTable"


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="flex-1">
        <TimesheetTable />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        © 2025 tentwenty. All rights reserved.
      </footer>
    </div>
  )
}
