import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { CategoryType } from '@mono-catalog/types';
import { RootState } from '.';

type State = 'idle' | 'loading' | 'succeeded' | 'failed';

const categoriesAdapter = createEntityAdapter<CategoryType, number>({
  selectId: (category) => category.id,
});

export const getCategories = createAsyncThunk('categories/getAll', async () => {
  const response = await fetch('categories.json');
  return (await response.json()) as CategoryType;
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: categoriesAdapter.getInitialState({
    status: 'idle' as State,
  }),
  reducers: {
    bookAdded: categoriesAdapter.addOne,
    booksReceived(state, action: PayloadAction<{ books: CategoryType[] }>) {
      categoriesAdapter.setAll(state, action.payload.books);
    },
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
