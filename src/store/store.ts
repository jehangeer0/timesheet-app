import { configureStore } from '@reduxjs/toolkit';
import timesheetsReducer from './slices/timesheetsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      timesheets: timesheetsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['timesheets/setTimesheets'],
          ignoredPaths: ['timesheets.timesheets'],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];