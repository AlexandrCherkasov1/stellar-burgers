import reducer, { getIngredients } from '../ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: ''
  };

  const mockIngredients = [
    {
      _id: '1',
      name: 'Булка',
      type: 'bun',
      price: 100,
      image: 'bun.png'
    },
    {
      _id: '2',
      name: 'Котлета',
      type: 'main',
      price: 150,
      image: 'meat.png'
    }
  ];

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обработать getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe('');
  });

  it('должен обработать getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const state = reducer(initialState, action);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.loading).toBe(false);
  });

  it('должен обработать getIngredients.rejected', () => {
    const error = 'Error message';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: error }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
}); 
