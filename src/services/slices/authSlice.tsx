import {
  TRegisterData,
  getUserApi,
  registerUserApi,
  logoutApi,
  loginUserApi
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/cookie';
import { TUser } from '@utils-types';

export const registerUser = createAsyncThunk(
  'user/loginUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((data) => {
          dispatch(setUserInfo(data.user));
          dispatch(isUserAuthenticated(true));
        })
        .finally(() => {
          dispatch(authChecked(true));
        });
    } else {
      dispatch(authChecked(true));
      dispatch(isUserAuthenticated(false));
    }
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '');
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: { email: string; password: string }) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    setCookie('accessToken', response.accessToken);
    return response;
  }
);

interface TUserAuthState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: TUser | null;
  loginUserError: string | undefined;
  loginUserRequest: boolean;
}

export interface TError {
  success: boolean;
  message: string;
}

const initialState: TUserAuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: undefined,
  loginUserRequest: false
};

const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    authChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUserInfo: (state, action) => {
      state.user = action.payload;
    },
    isUserAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    isUserLogin: (state, action) => {
      state.loginUserRequest = action.payload;
    },
    setLoginError: (state, action) => {
      state.loginUserError = action.payload;
    },
    setUserLoginError: (state, action) => {
      state.loginUserError = action.payload;
    },
    updateUserInfo: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loginUserRequest = true;
        state.loginUserError = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        // state.loginUserError = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserError = undefined;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      });
  }
});

export default userAuthSlice.reducer;
export const {
  authChecked,
  setUserInfo,
  isUserAuthenticated,
  isUserLogin,
  setLoginError,
  updateUserInfo
} = userAuthSlice.actions;
