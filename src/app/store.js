import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filtersSlice';
import searchReducer from '../features/searchSlice';
import contentReducer from '../features/contentSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    search: searchReducer,
    content: contentReducer,
    // Add new reducers here: content
  },
});
