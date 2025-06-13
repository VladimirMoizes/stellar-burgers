import { getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  name: string;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
  isRequest: boolean;
};

const initialState: TOrderState = {
  order: null,
  name: '',
  orders: [],
  total: 0,
  totalToday: 0,
  isRequest: false
};

export const orderBurger = createAsyncThunk(
  'order/postOrder',
  async (data: string[]) => {
    const response = await orderBurgerApi(data);
    return response;
  }
);

export const getOrders = createAsyncThunk('orders/getAll', async () => {
  const response = await getOrdersApi();
  return response;
});

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrder: (state) => {
      state.order = null;
      state.name = '';
      state.isRequest = false;
    }
  },
  selectors: { getOrdersSelectors: (state) => state },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.name = action.payload.name;
        state.isRequest = false;
      })
      .addCase(orderBurger.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isRequest = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isRequest = true;
      })
      .addCase(getOrders.rejected, (state) => {
        state.isRequest = false;
      });
  }
});

export const { getOrdersSelectors } = ordersSlice.selectors;
export const { closeOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
