import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addNewMovie } from "apis/movieAPI";
import { toast } from "react-toastify";

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export const addMovie = createAsyncThunk(
  "admin/addMovie/Upload", 
  async (movie) => {
  const data = await addNewMovie(movie);
  console.log(movie);
  //   console.log(values);
  return { data };
}
);

const addMovieSlice = createSlice({
  name: "admin/addMovie",
  initialState,
  extraReducers: {
    [addMovie.pending]: (state, action) => {
      return { ...state, isLoading: true, error: null };
    },
    [addMovie.fulfilled]: (state, action) => {
      //   state.data = "";
      toast.success("Upload phim mới thành công!");
      return { ...state, isLoading: false, data: action.meta.arg };
    },
    [addMovie.rejected]: (state, action) => {
      console.log(action);
      toast.error( action.error.message );
      //   console.log("Upload phim thất bại");
      return { ...state, isLoading: false, error: action.error.message };
    },
  },
});

export default addMovieSlice.reducer;
