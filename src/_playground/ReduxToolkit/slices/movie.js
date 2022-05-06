import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieShowing } from "apis/movieAPI";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

// Tạo action thông qua createAsyncThunk
export const getShowing = createAsyncThunk(
  "home/movie/getShowing",
  // async (_, { rejectWithValue }) => {
  //   try {
  //     const data = await getMovieShowing();
  //     return { data };
  //   } catch (error) {
  //     return rejectWithValue({ error: error.response.data.content });
  //   }
  // }
  async () => {
    const data = await getMovieShowing();
    return { data };
  }
);

const homeMovieSlice = createSlice({
  name: "home/movie",
  initialState,
  reducers: {},
  extraReducers: {
    [getShowing.pending]: (state, action) => {
      return { ...state, isLoading: true };
    },
    [getShowing.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, data: action.payload.data };
    },
    [getShowing.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    },
  },
});
// export {} = homeMovieSlice.actions
export default homeMovieSlice.reducer;
