import {
  orderByNumberSlice,
  clearOrder,
  fetchOrderByNumber
} from '../services/slices/orderByNumberSlice';

import { TOrder } from '../utils/types';

const orderByNumberReducer = orderByNumberSlice.reducer;

describe('Редьюсер orderByNumber', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null
  };

  const mockOrder = {
    _id: 'order1',
    number: 1234
  } as TOrder;

  it('при pending loading становится true, error null', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = orderByNumberReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('при fulfilled loading становится false, order сохраняется', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = orderByNumberReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.order).toEqual(mockOrder);
  });

  it('при rejected loading становится false, error сохраняется', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const state = orderByNumberReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });

  it('при clearOrder state сбрасывается', () => {
    const modifiedState = {
      order: mockOrder,
      loading: true,
      error: 'что-то'
    };
    const state = orderByNumberReducer(modifiedState, clearOrder());
    expect(state).toEqual(initialState);
  });
});
