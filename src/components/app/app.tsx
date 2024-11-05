import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/stores/store';
import { checkUserAuth } from '../../services/slices/authSlice';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth } from '../protectedRoute/protectedRoute';
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

// Конфигурация маршрутов
const ROUTES = {
  PUBLIC: [
    { path: '/', element: <ConstructorPage /> },
    { path: '/feed', element: <Feed /> },
    { path: '/ingredients/:id', element: <IngredientDetails /> },
    { path: '/feed/:id', element: <OrderInfo /> },
    { path: '*', element: <NotFound404 /> }
  ],
  PROTECTED: [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password', element: <ResetPassword /> }
  ],
  AUTH_REQUIRED: [
    { path: '/profile', element: <Profile /> },
    { path: '/profile/orders', element: <ProfileOrders /> },
    { path: '/profile/orders/:id', element: <OrderInfo /> }
  ],
  MODAL: [
    {
      path: '/feed/:id',
      title: 'Детали заказа',
      element: <OrderInfo />
    },
    {
      path: '/ingredients/:id',
      title: 'Детали ингредиента',
      element: <IngredientDetails />
    },
    {
      path: '/profile/orders/:id',
      title: 'Детали заказа',
      element: <OnlyAuth component={<OrderInfo />} />
    }
  ]
};

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngredients());
  }, [dispatch]); // добавил dispatch в зависимости

  const onModalClose = () => navigate(-1);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        {/* Публичные маршруты */}
        {ROUTES.PUBLIC.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Маршруты только для неавторизованных */}
        {ROUTES.PROTECTED.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<OnlyUnAuth component={element} />}
          />
        ))}

        {/* Маршруты только для авторизованных */}
        {ROUTES.AUTH_REQUIRED.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<OnlyAuth component={element} />}
          />
        ))}
      </Routes>

      {/* Модальные окна */}
      {background && (
        <Routes>
          {ROUTES.MODAL.map(({ path, title, element }) => (
            <Route
              key={path}
              path={path}
              element={
                <Modal title={title} onClose={onModalClose}>
                  {element}
                </Modal>
              }
            />
          ))}
        </Routes>
      )}
    </div>
  );
};

export default App;
