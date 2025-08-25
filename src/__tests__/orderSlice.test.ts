import ordersReducer, {
  orderBurger,
  getOrders,
  closeOrder
} from '../services/slices/ordersSlice';
import { TOrder } from '@utils-types';

describe('ordersSlice редьюсер', () => {
  const initialState = {
    order: null,
    name: '',
    orders: [],
    total: 0,
    totalToday: 0,
    isRequest: false
  };

  const mockOrder = {
    _id: '123',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  } as TOrder;

  it('устанавливает isRequest в true при pending orderBurger', () => {
    const action = { type: orderBurger.pending.type };
    const state = ordersReducer(initialState, action);
    expect(state.isRequest).toBe(true);
  });

  it('устанавливает order и name и isRequest в false при fulfilled orderBurger', () => {
    const payload = { order: mockOrder, name: 'Заказ №1' };
    const action = { type: orderBurger.fulfilled.type, payload };
    const state = ordersReducer(initialState, action);
    expect(state.order).toEqual(payload.order);
    expect(state.name).toBe(payload.name);
    expect(state.isRequest).toBe(false);
  });

  it('устанавливает isRequest в false при rejected getOrders', () => {
    const action = { type: getOrders.rejected.type };
    const state = ordersReducer({ ...initialState, isRequest: true }, action);
    expect(state.isRequest).toBe(false);
  });

  it('записывает orders и устанавливает isRequest в false при fulfilled getOrders', () => {
    const mockOrders: TOrder[] = [
      {
        _id: 'order1',
        status: 'done',
        name: 'Заказ 1',
        createdAt: '2025-01-01',
        updatedAt: '2025-01-01',
        number: 1,
        ingredients: []
      },
      {
        _id: 'order2',
        status: 'pending',
        name: 'Заказ 2',
        createdAt: '2025-01-02',
        updatedAt: '2025-01-02',
        number: 2,
        ingredients: []
      }
    ];
    const action = { type: getOrders.fulfilled.type, payload: mockOrders };
    const state = ordersReducer({ ...initialState, isRequest: true }, action);
    expect(state.orders).toEqual(mockOrders);
    expect(state.isRequest).toBe(false);
  });

  it('сбрасывает order, name и isRequest при вызове closeOrder', () => {
    const prevState = {
      order: mockOrder,
      name: 'Заказ',
      orders: [],
      total: 0,
      totalToday: 0,
      isRequest: true
    };
    const state = ordersReducer(prevState, closeOrder());
    expect(state.order).toBeNull();
    expect(state.name).toBe('');
    expect(state.isRequest).toBe(false);
  });
});
