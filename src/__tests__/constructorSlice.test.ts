import constructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../services/slices/constructorSlice';
import { TConstructorIngredient, TIngredient } from '../utils/types';

describe('Редьюсер constructorBurger', () => {
  it('обрабатывает добавление ингредиента', () => {
    const initialState = { bun: null, ingredients: [] };

    const mockIngredient = {
      _id: '1',
      name: 'Котлета',
      type: 'main'
    } as TIngredient;

    const state = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]._id).toBe('1');
    expect(state.ingredients[0]).toHaveProperty('id');
  });

  it('обрабатывает удаление ингредиента по id', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          _id: '1',
          name: 'Котлета',
          type: 'main',
          id: 'abc'
        } as TConstructorIngredient,
        {
          _id: '2',
          name: 'Сыр',
          type: 'main',
          id: 'def'
        } as TConstructorIngredient
      ]
    };

    const newState = constructorReducer(state, removeIngredient('abc'));

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0].id).toBe('def');
  });

  it('обрабатывает изменение порядка ингредиентов', () => {
    const state = {
      bun: null,
      ingredients: [
        {
          id: '1',
          name: 'Сыр',
          _id: '1',
          type: 'main'
        } as TConstructorIngredient,
        {
          id: '2',
          name: 'Котлета',
          _id: '2',
          type: 'main'
        } as TConstructorIngredient,
        {
          id: '3',
          name: 'Салат',
          _id: '3',
          type: 'main'
        } as TConstructorIngredient
      ]
    };

    const newState = constructorReducer(
      state,
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );

    expect(newState.ingredients.map((item) => item.id)).toEqual([
      '2',
      '3',
      '1'
    ]);
  });
});
