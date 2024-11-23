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

  it('должен оформлять заказ', () => {
    // Добавляем булку
    cy.get('[data-test="ingredient-bun"]')
      .contains('Добавить')
      .click();

    // Добавляем начинку
    cy.get('[data-test="ingredient-main"]')
      .contains('Добавить')
      .click();

    // Оформляем заказ
    cy.get('[data-test="order-button"]')
      .click();

    // Проверяем модальное окно
    cy.get('[data-test="modal"]')
      .should('exist');
    cy.get('[data-test="order-number"]')
      .should('have.text', '12345');

    // Закрываем модальное окно
    cy.get('[data-test="modal-close"]')
      .click();
  });
});
