import reducer, { getFeeds, initialState } from '../feedSlice';

describe('feedSlice', () => {
  const mockOrders = {
    orders: [
      {
        _id: '1',
        number: 1234,
        name: 'Test Burger',
        status: 'done',
        ingredients: ['1', '2'],
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01'
      }
    ],
    total: 100,
    totalToday: 10
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обработать getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('должен обработать getFeeds.fulfilled', () => {
    const action = {
      type: getFeeds.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer(initialState, action);
    expect(state.orders).toEqual(mockOrders.orders);
    expect(state.total).toBe(mockOrders.total);
    expect(state.totalToday).toBe(mockOrders.totalToday);
    expect(state.loading).toBe(false);
  });

  it('должен обработать getFeeds.rejected', () => {
    const error = 'Error message';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: error }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});
