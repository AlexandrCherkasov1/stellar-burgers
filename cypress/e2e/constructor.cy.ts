const Selectors = {
  modal: '[data-test="modal"]',
  modalClose: '[data-test="modal-close"]',
  modalOverlay: '[data-test="modal-overlay"]',
  ingredientLink: '[data-test="ingredient-link"]',
  ingredientBun: '[data-test="ingredient-bun"]',
  ingredientMain: '[data-test="ingredient-main"]',
  constructorBun: '[data-test="constructor-bun"]',
  constructorIngredients: '[data-test="constructor-ingredients"]',
  orderButton: '[data-test="order-button"]',
  orderNumber: '[data-test="order-number"]'
};

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
    cy.get(Selectors.ingredientLink).first().click();
    cy.get(Selectors.modal).should('exist');

    cy.get(Selectors.modalClose).click();
    cy.get(Selectors.modal).should('not.exist');

    cy.get(Selectors.ingredientLink).first().click();
    cy.get(Selectors.modalOverlay).click({ force: true });
    cy.get(Selectors.modal).should('not.exist');
  });

  it('должен корректно добавлять ингредиенты в конструктор', () => {
    cy.get(Selectors.constructorBun).should('contain', 'Выберите булки');
    cy.get(Selectors.constructorIngredients).should('contain', 'Выберите начинку');

    cy.get(Selectors.ingredientBun).contains('Добавить').click();
    cy.get(Selectors.constructorBun).should('contain', 'Краторная булка');

    cy.get(Selectors.ingredientMain).contains('Добавить').click();
    cy.get(Selectors.constructorIngredients).should('contain', 'Филе Люминесцентного тетраодонтимформа');
  });

  it('должен оформлять заказ и отправлять корректные данные', () => {
    cy.get(Selectors.ingredientBun).contains('Добавить').click();
    cy.get(Selectors.ingredientMain).contains('Добавить').click();

    cy.intercept('POST', 'api/orders', (req) => {
      expect(req.body).to.deep.equal({
        ingredients: [
          "60d3b41abdacab0026a733c6",
          "60d3b41abdacab0026a733c8",
          "60d3b41abdacab0026a733c6"
        ]
      });
      req.reply({ fixture: 'order-response.json' });
    }).as('createOrder');

    cy.get(Selectors.orderButton).click();
    cy.wait('@createOrder');

    cy.get(Selectors.modal).should('exist');
    cy.get(Selectors.orderNumber).should('have.text', '12345');

    cy.get(Selectors.modalClose).click();

    cy.get(Selectors.constructorBun).should('contain', 'Выберите булки');
    cy.get(Selectors.constructorIngredients).should('contain', 'Выберите начинку');
  });
});
