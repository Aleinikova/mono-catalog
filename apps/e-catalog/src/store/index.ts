import { configureStore } from '@reduxjs/toolkit';
import { categoriesSlice } from './categoriesStore';
import { productsSlice } from './productsStore';

export const store = configureStore({
  reducer: {
    categories: categoriesSlice.reducer,
    products: productsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
