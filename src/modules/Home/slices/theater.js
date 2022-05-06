import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTheaterInfomation } from "apis/movieAPI";

const initialState = {
    data: [],
    isLoading: false,
    error: null,
  };
  
  export const getTheaters = createAsyncThunk("home/movie/getTheaterMovie", async () => {
    const data = await getTheaterInfomation();
    // console.log(data)
    return { data };
  });
  
  const homeTheaterSlice = createSlice({
    name: "home/theater",
    initialState,
    reducers: {},
    extraReducers: {
      [getTheaters.pending]: (state, action) => {
        return { ...state, isLoading: true };
      },
      [getTheaters.fulfilled]: (state, action) => {
        return { ...state, isLoading: false, data: action.payload.data };
      },
      [getTheaters.rejected]: (state, action) => {
        return { ...state, isLoading: false, error: action.error.message };
      },
    },
  });
  export default homeTheaterSlice.reducer;