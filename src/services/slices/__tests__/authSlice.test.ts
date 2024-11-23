import reducer, {
    authChecked,
    setUserInfo,
    isUserAuthenticated,
    loginUser
  } from '../authSlice';
  
  describe('authSlice', () => {
    const initialState = {
      isAuthChecked: false,
      isAuthenticated: false,
      user: null,
      loginUserError: undefined,
      loginUserRequest: false
    };
  
    it('должен вернуть начальное состояние', () => {
      expect(reducer(undefined, { type: '' })).toEqual(initialState);
    });
  
    it('должен обработать authChecked', () => {
      const action = authChecked(true);
      const state = reducer(initialState, action);
      expect(state.isAuthChecked).toBe(true);
    });
  
    it('должен обработать setUserInfo', () => {
      const user = { email: 'test@test.com', name: 'Test User' };
      const action = setUserInfo(user);
      const state = reducer(initialState, action);
      expect(state.user).toEqual(user);
    });
  
    it('должен обработать isUserAuthenticated', () => {
      const action = isUserAuthenticated(true);
      const state = reducer(initialState, action);
      expect(state.isAuthenticated).toBe(true);
    });
  
    it('должен обработать loginUser.pending', () => {
      const action = { type: loginUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(true);
      expect(state.loginUserError).toBeUndefined();
    });
  
    it('должен обработать loginUser.fulfilled', () => {
      const user = { email: 'test@test.com', name: 'Test User' };
      const action = {
        type: loginUser.fulfilled.type,
        payload: { user }
      };
      const state = reducer(initialState, action);
      expect(state.user).toEqual(user);
      expect(state.loginUserRequest).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
    });
  
    it('должен обработать loginUser.rejected', () => {
      const error = 'Error message';
      const action = {
        type: loginUser.rejected.type,
        error: { message: error }
      };
      const state = reducer(initialState, action);
      expect(state.loginUserRequest).toBe(false);
      expect(state.loginUserError).toBe(error);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    });
  });
