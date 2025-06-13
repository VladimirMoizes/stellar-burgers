import {
  ingredientsSlice,
  getIngredients
} from '../services/slices/ingredientSlice';
import { TIngredient } from '../utils/types';

const reducer = ingredientsSlice.reducer;

describe('Редьюсер ingredients', () => {
  const initialState = {
    items: [],
    loading: false,
    error: null
  };

  it('при запросе ингредиентов loading = true', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('при успешной загрузке ингредиентов данные сохраняются, loading = false', () => {
    const mockIngredients: TIngredient[] = [
      { _id: '1', name: 'Булка', type: 'bun' } as TIngredient,
      { _id: '2', name: 'Мясо', type: 'main' } as TIngredient
    ];

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.items).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('при ошибке загрузки ингредиентов error сохраняется, loading = false', () => {
    const errorMessage = 'Ошибка загрузки';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };

    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
