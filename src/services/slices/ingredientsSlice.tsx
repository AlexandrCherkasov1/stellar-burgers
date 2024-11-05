import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string;
}

const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: ''
};

export const ingredientsSlice = createSlice({
  name: 'ingridient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const getIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients',
  async () => getIngredientsApi()
);

// Action creators are generated for each case reducer function
export const {} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
