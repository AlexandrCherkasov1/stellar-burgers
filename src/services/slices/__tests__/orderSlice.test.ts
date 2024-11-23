import reducer, { createOrder, getOrders, closeModal } from '../orderSlice';

describe('orderSlice', () => {
  const initialState = {
    order: null,
    userOrders: [],
    orderRequest: false,
    orderModalData: null,
    loading: false,
    error: undefined
  };

  const mockOrder = {
    _id: '1',
    number: 1234,
    name: 'Test Burger',
    status: 'done',
    ingredients: ['1', '2'],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обработать closeModal', () => {
    const state = {
      ...initialState,
      orderRequest: true,
      orderModalData: mockOrder
    };
    const action = closeModal();
    const newState = reducer(state, action);
    expect(newState.orderRequest).toBe(false);
    expect(newState.orderModalData).toBeNull();
  });

  it('должен обработать createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('должен обработать createOrder.fulfilled', () => {
    const action = {
      type: createOrder.fulfilled.type,
      payload: mockOrder
    };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  it('должен обработать getOrders.fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: [mockOrder]
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual([mockOrder]);
  });
}); 
