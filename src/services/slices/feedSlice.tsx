import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrdersData } from '../../utils/types';
import { getFeedsApi } from '@api';

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

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  selectors: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  reducers: {}
});

export default feedsSlice.reducer;
