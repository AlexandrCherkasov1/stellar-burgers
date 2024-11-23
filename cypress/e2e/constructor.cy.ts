describe('Конструктор бургеров', () => {
  beforeEach(() => {
    window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
    cy.setCookie('accessToken', 'test-accessToken');

    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', { fixture: 'login-response.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order-response.json' }).as('createOrder');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен открывать и закрывать модальное окно ингредиента', () => {
    // Открываем модальное окно по клику на ингредиент
    cy.get('[data-test="ingredient-link"]').first().click();
    cy.get('[data-test="modal"]').should('exist');

    // Закрываем по крестику
    cy.get('[data-test="modal-close"]').click();
    cy.get('[data-test="modal"]').should('not.exist');

    // Открываем снова и закрываем по оверлею
    cy.get('[data-test="ingredient-link"]').first().click();
    cy.get('[data-test="modal-overlay"]').click({ force: true });
    cy.get('[data-test="modal"]').should('not.exist');
  });

  it('должен корректно добавлять ингредиенты в конструктор', () => {
    // Проверяем пустой конструктор
    cy.get('[data-test="constructor-bun"]').should('contain', 'Выберите булки');
    cy.get('[data-test="constructor-ingredients"]').should('contain', 'Выберите начинку');

    // Добавляем булку
    cy.get('[data-test="ingredient-bun"]').contains('Добавить').click();
    cy.get('[data-test="constructor-bun"]').should('contain', 'Краторная булка');

    // Добавляем начинку
    cy.get('[data-test="ingredient-main"]').contains('Добавить').click();
    cy.get('[data-test="constructor-ingredients"]').should('contain', 'Филе Люминесцентного тетраодонтимформа');
  });

  it('должен оформлять заказ и отправлять корректные данные', () => {
    // Добавляем ингредиенты
    cy.get('[data-test="ingredient-bun"]').contains('Добавить').click();
    cy.get('[data-test="ingredient-main"]').contains('Добавить').click();

    // Перехватываем запрос на создание заказа
    cy.intercept('POST', 'api/orders', (req) => {
      // Проверяем тело запроса
      expect(req.body).to.deep.equal({
        ingredients: [
          "60d3b41abdacab0026a733c6", // id булки
          "60d3b41abdacab0026a733c8", // id начинки
          "60d3b41abdacab0026a733c6"  // id булки (дважды, т.к. верх и низ)
        ]
      });
      
      // Возвращаем моковый ответ
      req.reply({ fixture: 'order-response.json' });
    }).as('createOrder');

    // Оформляем заказ
    cy.get('[data-test="order-button"]').click();
    
    // Ждем выполнения запроса
    cy.wait('@createOrder');

    // Проверяем модальное окно
    cy.get('[data-test="modal"]').should('exist');
    cy.get('[data-test="order-number"]').should('have.text', '12345');

    // Закрываем модальное окно
    cy.get('[data-test="modal-close"]').click();

    // Проверяем, что конструктор очистился
    cy.get('[data-test="constructor-bun"]').should('contain', 'Выберите булки');
    cy.get('[data-test="constructor-ingredients"]').should('contain', 'Выберите начинку');
  });
});
