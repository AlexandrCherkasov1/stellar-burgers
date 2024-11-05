import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/stores/store';

export const AppHeader: FC = () => {
  const { user } = useSelector((state) => state.userAuth);

  return <AppHeaderUI userName={user ? 'Личный кабинет' : 'Войти'} />;
};
