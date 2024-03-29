import { Product, StoreState } from '@mono-catalog/types';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '.';
import { selectCategoryByName } from './categoriesStore';

const productsAdapter = createEntityAdapter<Product, string>({
  selectId: (product) => product.id,
});

export const getProducts = createAsyncThunk('products/getAll', async () => {
  const response = await fetch('products.json');
  return await response.json();
});

export const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState({
    status: 'idle' as StoreState,
  }),
  reducers: {
    Product: productsAdapter.addOne,
    removeProduct: productsAdapter.removeOne,
    updateProduct: productsAdapter.updateOne,
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
  (state: Product[], category) => {
    return state.filter((product) => product.categoryId === category?.id);
  }
);

export const addProductAction = productsSlice.actions.Product;
export const removeProductAction = productsSlice.actions.removeProduct;
export const updateProductAction = productsSlice.actions.updateProduct;
