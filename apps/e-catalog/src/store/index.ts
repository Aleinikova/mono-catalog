import { configureStore } from '@reduxjs/toolkit';
import { categoriesSlice } from './categoriesStore';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
