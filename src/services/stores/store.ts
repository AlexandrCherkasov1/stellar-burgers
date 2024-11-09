import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

// Импортируем редьюсеры
import burgerConstructorReducer from '../slices/burgerConstructorSlice';
import ingredientsReducer from '../slices/ingredientsSlice';
import userAuthReducer from '../slices/authSlice';
import feedsReducer from '../slices/feedSlice';
import orderReducer from '../slices/orderSlice';

// Создаем корневой редьюсер
const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  userAuth: userAuthReducer,
  feed: feedsReducer,
  order: orderReducer
});

// Создаем store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Типизация для TypeScript
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Типизированные хуки
export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
