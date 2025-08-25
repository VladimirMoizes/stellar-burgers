import ingredientDetailsReducer, {
  setCurrentIngredient,
  clearCurrentIngredient
} from '../services/slices/ingredientDetailsSlice';
import { TIngredient } from '../utils/types';

describe('Редьюсер ingredientDetails', () => {
  const initialState = {
    currentIngredient: null
  };

  const mockIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun'
  } as TIngredient;

  it('ингредиент сохраняется в стейт', () => {
    const state = ingredientDetailsReducer(
      initialState,
      setCurrentIngredient(mockIngredient)
    );

    expect(state.currentIngredient).toEqual(mockIngredient);
  });

  it('ингредиент становится null', () => {
    const modifiedState = {
      currentIngredient: mockIngredient
    };

    const state = ingredientDetailsReducer(
      modifiedState,
      clearCurrentIngredient()
    );

    expect(state.currentIngredient).toBeNull();
  });
});
