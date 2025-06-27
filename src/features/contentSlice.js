import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchContent = createAsyncThunk(
  'content/fetchContent',
  async () => {
    const response = await fetch('https://closet-recruiting-api.azurewebsites.net/api/data');
    if (!response.ok) throw new Error('Failed to fetch content');
    const data = await response.json();
    return data.map(item => ({
      ...item,
      userName: item.creator,
      imageUrl: item.imagePath,
      pricingOption:
        item.pricingOption === 0
          ? 'Paid'
          : item.pricingOption === 1
          ? 'Free'
          : item.pricingOption === 2
          ? 'View Only'
          : '',
    }));
  }
);

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    items: [],
    loading: false,
    error: null,
    hasMore: true,
    page: 1,
  },
  reducers: {
    resetContent(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
    incrementPage(state) {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetContent, incrementPage } = contentSlice.actions;
export default contentSlice.reducer; 