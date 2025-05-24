import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

type TIngredientDetails = {
  currentIngredient: TIngredient | null;
};

const initialState: TIngredientDetails = {
  currentIngredient: null
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setCurrentIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.currentIngredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.currentIngredient = null;
    }
  },
  selectors: { selectCurrentIngredient: (state) => state }
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  ingredientDetailsSlice.actions;

export const { selectCurrentIngredient } = ingredientDetailsSlice.selectors;

export default ingredientDetailsSlice.reducer;
