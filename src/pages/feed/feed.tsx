import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeeds, getFeedsSelectors } from '../../services/slices/feedSlice';
import { Outlet, useLocation } from 'react-router-dom';

export const Feed: FC = () => {
  const dispatch = useDispatch();
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
