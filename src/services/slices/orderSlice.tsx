import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '../../utils/types';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const result = await orderBurgerApi(ingredients);
    return result.order;
  }
);

export const getOrders = createAsyncThunk('order/getOrders', getOrdersApi);

export type TOrderState = {
  order: TOrder | null;
  userOrders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  loading: boolean;
  error?: string;
};

export const initialState: TOrderState = {
  order: null,
  userOrders: [],
  orderRequest: false,
  orderModalData: null,
  loading: false,
  error: undefined
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = undefined;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.userOrders = action.payload;
      });
  }
});

export const { closeModal } = orderSlice.actions;
export default orderSlice.reducer;
