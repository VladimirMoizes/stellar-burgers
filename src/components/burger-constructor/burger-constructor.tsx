import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'react-redux';
import { selectConstructor } from '../../services/slices/constructorSlice';
import { AppDispatch, RootState } from 'src/services/store';
import { useNavigate } from 'react-router-dom';
import {
  getOrdersSelectors,
  orderBurger
} from '../../services/slices/ordersSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const newOrder = useSelector(getOrdersSelectors).order;

  const bun = useSelector(selectConstructor).bun;
  const ingredients = useSelector(selectConstructor).ingredients;
  const orderRequest = false;
  const orderModalData = null;

  const constructorItems = {
    bun: bun || null,
    ingredients: ingredients || []
  };

  const ingredientIds = [
    bun?._id,
    ...ingredients.map((item) => item._id),
    bun?._id
  ];

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice =
      ingredients.reduce((sum, item) => sum + item.price, 0) || 0;
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(orderBurger(ingredientIds)).then(() => {
      navigate('/profile/orders');
    });
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
