import { Category, StoreState } from '@mono-catalog/types';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '.';

const categoriesAdapter = createEntityAdapter<Category, string>({
  selectId: (category) => category.id,
});

export const getCategories = createAsyncThunk('categories/getAll', async () => {
  const response = await fetch('categories.json');
  return await response.json();
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState({
    status: 'idle' as StoreState,
  }),
  reducers: {
    categoryAdded: categoriesAdapter.addOne,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        categoriesAdapter.addMany(state, action.payload);
      })
      .addCase(getCategories.rejected, (state) => {
        state.status = 'failed';
      }),
});

export const {
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
  selectEntities: selectCategoryEntities,
  selectAll: selectAllCategories,
  selectTotal: selectTotalCategories,
} = categoriesAdapter.getSelectors((state: RootState) => state.categories);

export const selectCategoriesStatus = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.categories.status
);

export const selectCategoryByName = createSelector(
  (state: RootState) => selectAllCategories(state),
  (_, categoryName) => categoryName,
  (state: Category[], categoryName: string) =>
    state.find((category) => category.name === categoryName)
);
