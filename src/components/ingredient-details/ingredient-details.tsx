import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectCurrentIngredient,
  setCurrentIngredient
} from '../../services/slices/ingredientDetailsSlice';
import { useParams } from 'react-router-dom';
import { getIngredientsSelector } from '../../services/slices/ingredientSlice';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { items } = useSelector(getIngredientsSelector);
  /** TODO: взять переменную из стора */
  const ingredientData = useSelector(selectCurrentIngredient).currentIngredient;

  // Добавлена логика поиска игредиента по id. При обновлении страницы был вечный Preloader
  useEffect(() => {
    if (!ingredientData && items.length > 0 && id) {
      const found = items.find((item: TIngredient) => item._id === id);
      if (found) {
        dispatch(setCurrentIngredient(found));
      }
    }
  }, [ingredientData, items, dispatch, id]);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
