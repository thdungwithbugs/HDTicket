import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as movieAPI from "apis/movieAPI";

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export const getMovieDetails = createAsyncThunk(
  "movie/details/getMovieDetails",
  async (movieId) => {
    const data = await movieAPI.getMovieDetails(movieId);
    return { data };
  }
);

const movieDetailsSlice = createSlice({
  name: "movie/details",
  initialState,
  extraReducers: {
    [getMovieDetails.pending]: (state, action) => {
      return { ...state, isLoading: true, error: null };
    },
    [getMovieDetails.fulfilled]: (state, action) => {
   
      return { ...state, isLoading: false, data: action.payload.data };
    },
    [getMovieDetails.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    },
  },
});

export default movieDetailsSlice.reducer;
