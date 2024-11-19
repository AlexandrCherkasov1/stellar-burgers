import { FC, useMemo, useState } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/stores/store';
import { createOrder, closeModal } from '../../services/slices/orderSlice';
import { useNavigate } from 'react-router-dom';
import { resetConstructor } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector((state) => state.burgerConstructor);
  const { orderRequest, orderModalData } = useSelector((state) => state.order);
  const user = useSelector((state) => state.userAuth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [constructorErrors, setConstructorErrors] = useState<{
    bun?: string;
  }>({});

  const onOrderClick = async () => {
    if (orderRequest) return;

    if (!constructorItems.bun) {
      setConstructorErrors({ bun: 'Выберите булки' });
      setTimeout(() => setConstructorErrors({}), 2000);
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }

    // Создаем массив ID ингредиентов
    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    try {
      await dispatch(createOrder(ingredientIds)).unwrap();
      // После успешного создания заказа
      dispatch(resetConstructor());
    } catch (error) {
      console.error('Ошибка при создании заказа:', error);
    }
  };

  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const totalPrice = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((sum, item) => sum + item.price, 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
