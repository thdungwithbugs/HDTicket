import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMovieShowing } from "apis/movieAPI";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
};

// Tạo action thông qua createAsyncThunk
export const getShowing = createAsyncThunk(
  "home/movie/getShowing",
  async (tenPhim='') => {
    const data = await getMovieShowing(tenPhim);
    return { data };
  }
);
export const getPhimDangChieu = createAsyncThunk(
  "home/movie/getShowing/getPhimDangChieu",
  async (tenPhim='') => {
    const dataGet = await getMovieShowing(tenPhim);
    let dataClone = dataGet;
    let data = {
      data: "",
    };
    data.data = dataClone.filter((film) => film.dangChieu === true);
    // console.log(data);
    return data;
  }
);
export const getPhimSapChieu = createAsyncThunk(
  "home/movie/getShowing/getPhimSapChieu",
  async (tenPhim='') => {
    const dataGet = await getMovieShowing(tenPhim);
    let dataClone = dataGet;
    let data = {
      data: "",
    };
    data.data = dataClone.filter((film) => film.sapChieu === true);
    // console.log(data);
    return data;
  }
);

const homeMovieSlice = createSlice({
  name: "home/movie",
  initialState,
  reducers: {
    // danhSachPhim: (state, action) => {
    //   state.data = action.payload.data;
    //   state.arrFilmDefault = state.data;
    //   return { ...state };
    // },
  },
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
    [getPhimDangChieu.pending]: (state, action) => {
      return { ...state, isLoading: true };
    },
    [getPhimDangChieu.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        dangChieu: true,
      };
    },
    [getPhimDangChieu.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    },
    [getPhimSapChieu.pending]: (state, action) => {
      return { ...state, isLoading: true };
    },
    [getPhimSapChieu.fulfilled]: (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        dangChieu: true,
      };
    },
    [getPhimSapChieu.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    },
  },
});

// export const {phimDangChieu, phimSapChieu} = homeMovieSlice.actions;

export default homeMovieSlice.reducer;
