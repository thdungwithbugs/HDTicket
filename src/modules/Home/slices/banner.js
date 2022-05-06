import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMovieBanners } from "apis/movieAPI";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const getBanner = createAsyncThunk("home/movie/getBanner", async () => {
  const data = await getMovieBanners();
  return { data };
});

const homeBannerSlice = createSlice({
  name: "home/movie",
  initialState,
  reducers: {},
  extraReducers: {
    [getBanner.pending]: (state, action) => {
      return { ...state, isLoading: true };
    },
    [getBanner.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, data: action.payload.data };
    },
    [getBanner.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    },
  },
});
export default homeBannerSlice.reducer;
