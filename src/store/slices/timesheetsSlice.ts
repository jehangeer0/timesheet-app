import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TimesheetRecord } from '@/interface/timeSheetInterface';
import { timesheetService } from '@/services/timesheetService';
import { transformTimesheetForUI } from '@/lib/dataTransformers';

interface TimesheetsState {
  timesheets: TimesheetRecord[];
  loading: boolean;
  error: string | null;
  selectedTimesheet: TimesheetRecord | null;
}

const initialState: TimesheetsState = {
  timesheets: [],
  loading: false,
  error: null,
  selectedTimesheet: null,
};

// Async thunks
export const fetchTimesheets = createAsyncThunk(
  'timesheets/fetchTimesheets',
  async (filters?: { status?: string; year?: string }) => {
    const response = await timesheetService.getTimesheets(filters);
    
    if (response.success && response.data) {
      // Fetch entries for each timesheet
      const timesheetsWithEntries = await Promise.all(
        response.data.map(async (ts: any) => {
          try {
            const entriesResponse = await timesheetService.getTimesheetEntries(ts.id);
            return transformTimesheetForUI(ts, entriesResponse.data || []);
          } catch (error) {
            console.error(`Error fetching entries for timesheet ${ts.id}:`, error);
            return transformTimesheetForUI(ts, []);
          }
        })
      );
      
      return timesheetsWithEntries;
    }
    return [];
  }
);

export const addTimesheetEntry = createAsyncThunk(
  'timesheets/addEntry',
  async ({ 
    timesheetId, 
    entryData 
  }: { 
    timesheetId: string; 
    entryData: any 
  }) => {
    const response = await timesheetService.createEntry(timesheetId, entryData);
    return response;
  }
);

export const deleteTimesheetEntry = createAsyncThunk(
  'timesheets/deleteEntry',
  async (entryId: string) => {
    const response = await timesheetService.deleteEntry(entryId);
    return { entryId, response };
  }
);

export const updateTimesheetEntry = createAsyncThunk(
  'timesheets/updateEntry',
  async ({ entryId, data }: { entryId: string; data: any }) => {
    const response = await timesheetService.updateEntry(entryId, data);
    return { entryId, data, response };
  }
);

const timesheetsSlice = createSlice({
  name: 'timesheets',
  initialState,
  reducers: {
    setSelectedTimesheet: (state, action: PayloadAction<TimesheetRecord | null>) => {
      state.selectedTimesheet = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateTimesheetInList: (state, action: PayloadAction<TimesheetRecord>) => {
      const index = state.timesheets.findIndex(ts => ts.key === action.payload.key);
      if (index !== -1) {
        state.timesheets[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch timesheets
    builder
      .addCase(fetchTimesheets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimesheets.fulfilled, (state, action) => {
        state.loading = false;
        state.timesheets = action.payload;
        
        // Update selected timesheet if it exists
        if (state.selectedTimesheet) {
          const updated = action.payload.find(
            (ts: TimesheetRecord) => ts.key === state.selectedTimesheet?.key
          );
          if (updated) {
            state.selectedTimesheet = updated;
          }
        }
      })
      .addCase(fetchTimesheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch timesheets';
      });

    // Add entry
    builder
      .addCase(addTimesheetEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTimesheetEntry.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addTimesheetEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add entry';
      });

    // Delete entry
    builder
      .addCase(deleteTimesheetEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTimesheetEntry.fulfilled, (state, action) => {
        state.loading = false;
        // The actual data update will happen when we refetch
      })
      .addCase(deleteTimesheetEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete entry';
      });
  },
});

export const { 
  setSelectedTimesheet, 
  clearError,
  updateTimesheetInList 
} = timesheetsSlice.actions;

export default timesheetsSlice.reducer;