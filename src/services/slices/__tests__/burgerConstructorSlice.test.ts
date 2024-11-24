import reducer, {
  addBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  initialState
} from '../burgerConstructorSlice';

describe('burgerConstructorSlice', () => {
  // Используем импортированный initialState
  const mockBun = {
    _id: '60d3b41abdacab0026a733c6',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockIngredient = {
    _id: '60d3b41abdacab0026a733c8',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен добавить булку', () => {
    const action = addBun(mockBun);
    const state = reducer(initialState, action);
    expect(state.bun).toEqual(mockBun);
  });

  it('должен добавить ингредиент', () => {
    const action = addIngredient(mockIngredient);
    const state = reducer(initialState, action);
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      ...mockIngredient,
      id: expect.any(String)
    });
  });

  it('должен удалить ингредиент', () => {
    const state = {
      bun: null,
      ingredients: [{ ...mockIngredient, id: '123' }]
    };
    const action = removeIngredient({ id: '123' });
    const newState = reducer(state, action);
    expect(newState.ingredients).toHaveLength(0);
  });

  it('должен сбросить конструктор', () => {
    const state = {
      bun: mockBun,
      ingredients: [{ ...mockIngredient, id: '123' }]
    };
    const action = resetConstructor();
    const newState = reducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
