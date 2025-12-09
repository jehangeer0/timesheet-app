
Timesheet Management System
A modern, full-featured timesheet management application built with Next.js 16, TypeScript, Redux Toolkit, and Ant Design. This system allows employees to efficiently track their work hours, manage timesheets, and monitor project progress.
-------

🚀 Features
✅ Core Functionality
User Authentication - Secure login system with mock user data

Timesheet Management - Create, view, update, and delete timesheets

Task Tracking - Add, edit, and remove tasks within timesheets

Real-time Updates - Immediate UI updates without page refresh using Redux

Filter & Search - Filter timesheets by status and date range

Responsive Design - Fully responsive UI for desktop and mobile

-------
🏗️ Technical Stack
Frontend Framework: Next.js 16 (App Router)

Language: TypeScript

State Management: Redux Toolkit

UI Library: Ant Design

Styling: Tailwind CSS

Authentication: NextAuth.js (with mock implementation)

-------

src/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/
│   │   │   ├── layout.tsx       # Dashboard layout
│   │   │   └── page.tsx         # Dashboard main page
│   │   └── ...
│   ├── api/                     # API routes
│   │   ├── auth/                # Authentication endpoints
│   │   ├── timesheets/          # Timesheet CRUD operations
│   │   └── ...
│   └── layout.tsx              # Root layout
├── components/                  # Reusable UI components
│   ├── TimeSheetTable/         # Main timesheet table
│   ├── TimeSheetsDetails/      # Timesheet detail view
│   ├── CreateTimeSheetModal/   # Modal for creating entries
│   ├── Filters/                # Filter components
│   └── ...
├── store/                      # Redux state management
│   ├── slices/                 # Redux slices
│   │   └── timesheetsSlice.ts  # Timesheet state management
│   ├── hooks.ts               # Redux hooks
│   └── store.ts               # Redux store configuration
├── services/                  # API service layer
│   └── timesheetService.ts    # Timesheet API calls
├── data/                      # Mock data
│   └── mockData.ts           # Mock users, timesheets, entries
├── lib/                       # Utility functions
│   ├── dataTransformers.ts   # Data transformation utilities
│   └── auth.ts              # Authentication utilities
├── interface/                 # TypeScript interfaces
│   ├── timeSheetInterface.ts # UI component interfaces
│   └── mockData.ts          # API data interfaces
└── providers/                # Context providers
    └── StoreProvider.tsx    # Redux store provider

-------

🔄 Redux State Management
Implemented Redux Toolkit for centralized state management with:

Async thunks for API calls

Real-time updates without page refresh

Type-safe actions and reducers

Loading and error state handling
-------


🔌 API Integration
Created comprehensive API endpoints:

/api/timesheets - CRUD operations for timesheets

/api/timesheets/[id]/entries - Manage timesheet entries

/api/auth/[...nextauth] - Authentication endpoints
-------


🎨 UI/UX Features
Interactive Modal: Add/edit timesheet entries with validation

Filter System: Filter by status (COMPLETED, INCOMPLETE, MISSING)

Progress Tracking: Visual progress bars for hours worked

Responsive Design: Mobile-friendly interface

Status Badges: Color-coded status indicators
-------


📊 Mock Data
The application includes comprehensive mock data:

2 user accounts (employee & admin)

10 timesheets with varying statuses

17 timesheet entries with realistic tasks

Data hosted within the project

-------

📱 Application Flow
Login Page → Redirects to dashboard if authenticated

Dashboard → Overview of all timesheets with filtering options

Timesheet Details → View/Add/Delete tasks for a specific week

Task Management → Add new tasks with project, work type, and hours

Real-time Updates → Changes reflected immediately via Redux

-------

Architecture Decisions
Next.js App Router: For better routing and server components

Redux Toolkit: Simplified state management with TypeScript

Ant Design: Consistent and professional UI components

Modular Structure: Separation of concerns with clear boundaries
-------

Code Quality
TypeScript: Full type safety throughout the application

Clean Architecture: Separation of API, state, and UI layers

Reusable Components: Modular and maintainable codebase

Error Handling: Comprehensive error handling and user feedback

Performance Optimizations
Client-side Rendering: For interactive features

Efficient State Updates: Minimal re-renders with Redux

Optimized API Calls: Batched requests where possible

Lazy Loading: Components loaded as needed
--------

Timesheets
GET /api/timesheets - List all timesheets (with filters)

POST /api/timesheets - Create new timesheet

GET /api/timesheets/[id]/entries - Get timesheet entries

POST /api/timesheets/[id]/entries - Add new entry

DELETE /api/timesheets/entries/[id] - Delete entry

PUT /api/timesheets/entries/[id] - Update entry




------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started



First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
