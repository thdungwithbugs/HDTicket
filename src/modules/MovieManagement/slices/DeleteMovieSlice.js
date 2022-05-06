import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteMovie } from "apis/movieAPI";
import { toast } from "react-toastify";


const initialState = {
    data: {},
    isLoading: false,
    error: null,
  };

export const xoaPhim = createAsyncThunk(
    "admin/deleteMovie",
    async (maPhim)=>{
        const data = await deleteMovie(maPhim);
        return {data}
    }
)
const deleteMovieSlice = createSlice({
    name:"admin/management/deleteMovie",
    initialState,
    extraReducers:{
        [xoaPhim.pending]:(state,action)=>{
            return {...state, isLoading: true, error: null};
        },
        [xoaPhim.fulfilled]:(state,action)=>{
            toast("Xóa phim thành công!")
            return {...state, isLoading: false, data:action.payload};
        },
        [xoaPhim.rejected]:(state,action)=>{
            return {...state, isLoading: false, error: action.error.message};
        }
    }
})

export default deleteMovieSlice.reducer;