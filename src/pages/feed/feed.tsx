import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeeds, getFeedsSelectors } from '../../services/slices/feedSlice';
import { AppDispatch, RootState } from '../../services/store';
import { Outlet, useLocation } from 'react-router-dom';
import { getOrders } from '../../services/slices/ordersSlice';
import { getUser, getUserSelectors } from '../../services/slices/userSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  /** TODO: взять переменную из стора */
  const { orders, isLoaded } = useSelector(getFeedsSelectors);

  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    if (!isLoaded) {
      dispatch(getFeeds());
    }
  }, [dispatch, isLoaded]);

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
