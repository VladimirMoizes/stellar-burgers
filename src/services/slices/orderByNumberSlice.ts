import { getOrderByNumberApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderByNumberState {
  order: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderByNumberState = {
  order: null,
  loading: false,
  error: null
};

export const fetchOrderByNumber = createAsyncThunk(
  'orderByNumber/fetch',
  async (orderNumber: number) => {
    const response = await getOrderByNumberApi(orderNumber);
    return response.orders[0];
  }
);

export const orderByNumberSlice = createSlice({
  name: 'orderByNumber',
  initialState,
  reducers: {
    clearOrder(state) {
      state.order = null;
      state.loading = false;
      state.error = null;
    }
  },
  selectors: {
    getOrderSelector: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearOrder } = orderByNumberSlice.actions;
export const { getOrderSelector } = orderByNumberSlice.selectors;
