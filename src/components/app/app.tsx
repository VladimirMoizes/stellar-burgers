import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { checkUserAuth } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from '../../services/store';
import {
  getIngredients,
  getIngredientsSelector
} from '../../services/slices/ingredientSlice';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;

  const { items } = useSelector(getIngredientsSelector);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(getIngredients());
    }
  }, [dispatch, items.length]);

  const pathname = location.pathname;

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={(() => {
              const FeedWithParams = () => {
                const { number } = useParams<{ number: string }>();
                return (
                  <Modal
                    title={`#${number?.padStart(6, '0')}`}
                    onClose={() => navigate(-1)}
                  >
                    <OrderInfo />
                  </Modal>
                );
              };
              return <FeedWithParams />;
            })()}
          />
          <Route
            path='/profile/orders/:number'
            element={(() => {
              const ProfileOrdersWithParams = () => {
                const { number } = useParams<{ number: string }>();
                return (
                  <Modal
                    title={`#${number?.padStart(6, '0')}`}
                    onClose={() => navigate(-1)}
                  >
                    <OrderInfo />
                  </Modal>
                );
              };
              return (
                <ProtectedRoute>
                  <ProfileOrdersWithParams />
                </ProtectedRoute>
              );
            })()}
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
