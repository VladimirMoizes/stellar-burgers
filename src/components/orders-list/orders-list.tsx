// import { FC, memo } from 'react';

// import { OrdersListProps } from './type';
// import { OrdersListUI } from '@ui';
// import { useNavigate } from 'react-router-dom';

// export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
//   const navigate = useNavigate();
//   const orderByDate = [...orders].sort(
//     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//   );

//   const handleClick = (number: number) => {
//     navigate(`/feed/${number}`, { state: { background: true } });
//   };

//   return <OrdersListUI handleClick={handleClick} orderByDate={orderByDate} />;
// });

import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const navigate = useNavigate();
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const handleOpenModal = (orderNumber: number) => {
    navigate(`/feed/${orderNumber}`, {
      state: { background: window.location.pathname }
    });
  };

  return (
    <OrdersListUI orderByDate={orderByDate} handleOpenModal={handleOpenModal} />
  );
});
