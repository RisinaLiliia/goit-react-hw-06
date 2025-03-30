import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
    resetFilter: (state) => {
      state.name = '';
    },
  },
});

export const selectFilter = (state) => state.filters.name;

export const { changeFilter, resetFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
