import { RootState } from './store';

export const getOrderSelectorById =
  (numberOrder: number) => (state: RootState) => {
    const fromOrders = state.orders.orders.find(
      (order) => order.number === numberOrder
    );
    if (fromOrders) return fromOrders;

    const fromFeeds = state.feeds.orders.find(
      (order) => order.number === numberOrder
    );
    if (fromFeeds) return fromFeeds;

    if (state.orderByNumber.order?.number === numberOrder) {
      return state.orderByNumber.order;
    }

    return null;
  };
