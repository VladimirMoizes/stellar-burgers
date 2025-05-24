import { FC, useMemo } from 'react';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  selectConstructor
} from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import {
  closeOrder,
  getOrdersSelectors,
  orderBurger
} from '../../services/slices/ordersSlice';
import { getUserSelectors } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUserSelectors).data;

  const bun = useSelector(selectConstructor).bun;
  const ingredients = useSelector(selectConstructor).ingredients;
  const orderRequest = useSelector(getOrdersSelectors).isRequest;
  const orderModalData = useSelector(getOrdersSelectors).order;

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

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    if (user) {
      dispatch(orderBurger(ingredientIds));
      dispatch(clearConstructor());
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    // Логика закрытия модального окна
    dispatch(closeOrder());
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
