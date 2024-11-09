import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '../../utils/types';
import { getFeedsApi } from '@api';
import { RootState } from '../stores/store';

export const getFeeds = createAsyncThunk('order/getFeeds', getFeedsApi);

export interface IFeedsState extends TOrdersData {
  loading: boolean;
  error?: string;
}

const initialState: IFeedsState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: undefined
};

// Типизированные селекторы
export const selectOrders = (state: RootState): TOrder[] => state.feed.orders;
export const selectTotal = (state: RootState): number => state.feed.total;
export const selectTotalToday = (state: RootState): number =>
  state.feed.totalToday;

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.loading = false;
      })
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default feedsSlice.reducer;
