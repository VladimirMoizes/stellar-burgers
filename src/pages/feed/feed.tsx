import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds, getFeedsSelectors } from '../../services/slices/feedSlice';
import { AppDispatch } from '../../services/store';
import { Outlet, useLocation } from 'react-router-dom';
import { getOrders } from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch<AppDispatch>();
  const orders: TOrder[] = useSelector(getFeedsSelectors).orders;

  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(getFeeds());
    dispatch(getOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(getFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <>
      {background && <Outlet />}
      <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />
    </>
  );
};
