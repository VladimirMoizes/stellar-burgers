import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientSlice';
import { constructorSlice } from './slices/constructorSlice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientDetailsSlice } from './slices/ingredientDetailsSlice';
import { feedsSlice } from './slices/feedSlice';
import { userSlice } from './slices/userSlice';
import { ordersSlice } from './slices/ordersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  constructorBurger: constructorSlice.reducer,
  ingredientDetails: ingredientDetailsSlice.reducer,
  feeds: feedsSlice.reducer,
  user: userSlice.reducer,
  orders: ordersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
