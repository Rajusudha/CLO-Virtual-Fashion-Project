import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paid: false,
  free: false,
  viewOnly: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter(state, action) {
      const { filter, value } = action.payload;
      state[filter] = value;
    },
    resetFilters() {
      return { ...initialState };
    },
    setFilters(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFilter, resetFilters, setFilters } = filtersSlice.actions;
export default filtersSlice.reducer; 