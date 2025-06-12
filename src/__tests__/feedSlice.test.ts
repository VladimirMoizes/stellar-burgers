import { feedsSlice, getFeeds } from '../services/slices/feedSlice';
import { TOrder } from '../utils/types';

const reducer = feedsSlice.reducer;

describe('Редьюсер feeds', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    loading: false,
    error: null,
    isLoaded: false
  };

  it('при запросе ленты loading = true', () => {
    const action = { type: getFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('при успешной загрузке ленты данные сохраняются, loading = false, isLoaded = true', () => {
    const mockPayload = {
      orders: [
        { _id: '1', number: 1234 } as TOrder,
        { _id: '2', number: 5678 } as TOrder
      ],
      total: 1000,
      totalToday: 100
    };

    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockPayload
    };

    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(1000);
    expect(state.totalToday).toBe(100);
    expect(state.isLoaded).toBe(true);
    expect(state.error).toBeNull();
  });

  it('при ошибке загрузки ленты error сохраняется, loading = false', () => {
    const errorMessage = 'Ошибка получения данных';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };

    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
