import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  createSelector,
} from '@reduxjs/toolkit';
import { ProductType, StoreState } from '@mono-catalog/types';
import { RootState } from '.';
import { selectCategoryByName } from './categoriesStore';

const productsAdapter = createEntityAdapter<ProductType, number>({
  selectId: (Product) => Product.id,
});

export const getProducts = createAsyncThunk('products/getAll', async () => {
  const response = await fetch('products.json');
  return (await response.json()) as ProductType;
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    status: 'idle' as StoreState,
  }),
  reducers: {
    productAdded: productsAdapter.addOne,
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        productsAdapter.addMany(state, action.payload);
      })
      .addCase(getProducts.rejected, (state) => {
        state.status = 'failed';
      }),
});

export const {
  selectById: selectProductById,
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectTotalProducts,
} = productsAdapter.getSelectors((state: RootState) => state.products);

export const selectProductsStatus = createSelector(
  (state: RootState) => state,
  (state: RootState) => state.products.status
);

export const selectProductsByCategoryName = createSelector(
  (state: RootState) => selectAllProducts(state),
  (state: RootState, categoryName) => selectCategoryByName(state, categoryName),
  (state: ProductType[], category) => {
    return state.filter((product) => product.categoryId === category.id);
  }
);
