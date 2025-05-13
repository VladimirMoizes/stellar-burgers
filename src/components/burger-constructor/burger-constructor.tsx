import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectConstructor } from '../../services/slices/constructorSlice';
import { RootState } from 'src/services/store';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectConstructor).bun;
  const ingredients = useSelector(selectConstructor).ingredients;
  const orderRequest = false;
  const orderModalData = null;

  const constructorItems = {
    bun: bun || null,
    ingredients: ingredients || []
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice =
      ingredients.reduce((sum, item) => sum + item.price, 0) || 0;
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;
    // Логика создания заказа
  };

  const closeOrderModal = () => {
    // Логика закрытия модального окна
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
