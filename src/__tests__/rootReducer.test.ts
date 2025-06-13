import { rootReducer } from '../services/store';

describe('Корневой редьюсер', () => {
  it('должен корректно инициализироваться со всеми слайсами', () => {
    const state = rootReducer(undefined, { type: '' });

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('constructorBurger');
    expect(state).toHaveProperty('ingredientDetails');
    expect(state).toHaveProperty('feeds');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('orderByNumber');
  });
});
