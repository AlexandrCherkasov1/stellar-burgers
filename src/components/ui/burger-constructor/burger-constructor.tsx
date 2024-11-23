import React, { FC } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import { BurgerConstructorUIProps } from './type';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorElement, Modal } from '@components';
import { Preloader, OrderDetailsUI } from '@ui';

export const BurgerConstructorUI: FC<BurgerConstructorUIProps> = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal
}) => {
  // Проверяем наличие булки и ингредиентов перед отображением кнопки заказа
  const canOrder =
    constructorItems.bun && constructorItems.ingredients.length > 0;

  return (
    <section className={styles.burger_constructor} data-test='constructor'>
      <div className={styles.bun_container} data-test='constructor-bun'>
        {constructorItems.bun ? (
          <div className={`${styles.element} mb-4 mr-4`}>
            <ConstructorElement
              type='top'
              isLocked
              text={`${constructorItems.bun.name} (верх)`}
              price={constructorItems.bun.price}
              thumbnail={constructorItems.bun.image}
            />
          </div>
        ) : (
          <div
            className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите булки
          </div>
        )}
      </div>

      <ul className={styles.elements} data-test='constructor-ingredients'>
        {constructorItems.ingredients.length > 0 ? (
          constructorItems.ingredients.map(
            (item: TConstructorIngredient, index: number) => (
              <BurgerConstructorElement
                ingredient={item}
                index={index}
                totalItems={constructorItems.ingredients.length}
                key={item.id}
              />
            )
          )
        ) : (
          <div
            className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите начинку
          </div>
        )}
      </ul>

      <div className={styles.bun_container} data-test='constructor-bun'>
        {constructorItems.bun ? (
          <div className={`${styles.element} mt-4 mr-4`}>
            <ConstructorElement
              type='bottom'
              isLocked
              text={`${constructorItems.bun.name} (низ)`}
              price={constructorItems.bun.price}
              thumbnail={constructorItems.bun.image}
            />
          </div>
        ) : (
          <div
            className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
          >
            Выберите булки
          </div>
        )}
      </div>

      <div className={`${styles.total} mt-10 mr-4`}>
        <div className={`${styles.cost} mr-10`}>
          <p className={`text ${styles.text} mr-2`}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        {canOrder && (
          <Button
            htmlType='button'
            type='primary'
            size='large'
            onClick={onOrderClick}
            data-test='order-button'
          >
            Оформить заказ
          </Button>
        )}
      </div>

      {orderRequest && (
        <Modal onClose={closeOrderModal} title='Оформляем заказ...'>
          <Preloader />
        </Modal>
      )}

      {orderModalData && !orderRequest && (
        <Modal onClose={closeOrderModal} title=''>
          <OrderDetailsUI orderNumber={orderModalData.number} />
        </Modal>
      )}
    </section>
  );
};
