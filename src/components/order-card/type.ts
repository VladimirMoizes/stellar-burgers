import { TOrder } from '@utils-types';

export type OrderCardProps = {
  order: TOrder;
  onClick?(number: number): void;
};
