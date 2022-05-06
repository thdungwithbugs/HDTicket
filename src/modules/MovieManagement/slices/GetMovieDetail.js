import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { layThongTinPhim } from "apis/movieAPI"

const initialState = {
    data:{},
    isLoading:false,
    error:null,
}

export const getMovieDetail = createAsyncThunk(
    "admin/getMovieDetail",
    async(maPhim)=>{
        const data = await layThongTinPhim(maPhim);
        return {data}
    }
)
const getMovieDetailSlice = createSlice({
    name:"admin/management/getMovieDetail",
    initialState,
    extraReducers:{
        [getMovieDetail.pending]:(state,action)=>{
            return {...state, isLoading: true, error: null}
        },
        [getMovieDetail.fulfilled]:(state,action)=>{
            console.log(action);
            return {...state, isLoading: false, data: action.payload.data}
        },
        [getMovieDetail.rejected]:(state,action)=>{
            return {...state, isLoading: false, error: action.error.message}
        },

    }
})
export default getMovieDetailSlice.reducer;