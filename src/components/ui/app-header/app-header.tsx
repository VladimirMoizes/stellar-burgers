import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isConstructorActive = location.pathname === '/';
  const isFeedActive = location.pathname.startsWith('/feed');
  const isProfileActive = location.pathname.startsWith('/profile');

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <>
          <BurgerIcon
            type={isConstructorActive ? 'secondary' : 'primary'}
            onClick={() => navigate('/')}
          />
          <p
            className={clsx('text text_type_main-default ml-2 mr-10', {
              [styles.menu_item_active]: isConstructorActive
            })}
            onClick={() => navigate('/')}
          >
            Конструктор
          </p>

          <ListIcon
            type={isFeedActive ? 'secondary' : 'primary'}
            onClick={() => navigate('/feed')}
          />
          <p
            className={clsx('text text_type_main-default ml-2', {
              [styles.menu_item_active]: isFeedActive
            })}
            onClick={() => navigate('/feed')}
          >
            Лента заказов
          </p>
        </>

        <Logo
          className={styles.logo}
          // onClick={() => navigate('/')}
        />

        <>
          <ProfileIcon
            type={isProfileActive ? 'secondary' : 'primary'}
            onClick={() => navigate('/profile')}
          />
          <p
            className={clsx('text text_type_main-default ml-2', {
              [styles.menu_item_active]: isProfileActive
            })}
            onClick={() => {
              userName ? navigate('/profile') : navigate('/login');
            }}
          >
            {userName || 'Личный кабинет'}
          </p>
        </>
      </nav>
    </header>
  );
};
