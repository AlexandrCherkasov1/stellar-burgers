import { getIngredientsApi } from '@api';
import {
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../stores/store';

export interface IIngredientsState {
  ingredients: TIngredient[];
  loading: boolean;
  error?: string;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  loading: false,
  error: ''
};

// Базовый селектор
const selectIngredients = (state: RootState) => state.ingredients.ingredients;

// Мемоизированные селекторы для каждого типа ингредиентов
export const selectBuns = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((item) => item.type === 'bun')
);

export const selectMains = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((item) => item.type === 'main')
);

export const selectSauces = createSelector([selectIngredients], (ingredients) =>
  ingredients.filter((item) => item.type === 'sauce')
);

export const ingredientsSlice = createSlice({
  name: 'ingredient',
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

export default ingredientsSlice.reducer;
