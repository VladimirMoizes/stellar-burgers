import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserSelectors } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => (
  <AppHeaderUI userName={useSelector(getUserSelectors).data?.name} />
);
