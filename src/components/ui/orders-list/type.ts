import { TOrder } from '@utils-types';

export type OrdersListUIProps = {
  orderByDate: TOrder[];
  handleOpenModal?(number: number): void | undefined;
};
