import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { layLichSuDatVe } from "apis/movieAPI"


const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

export const layLichSuDatVePhim = createAsyncThunk(
    "booking/history",
    async ()=>{
        const data = await layLichSuDatVe();
        console.log(data);
        return {data}
    }
)
const bookingHistory = createSlice({
    name:"booking/history",
    initialState,
    reducers:{},
    extraReducers:{
        [layLichSuDatVePhim.pending]:(state,action)=>{
            return {...state, isLoading: true, error:null}
        },
        [layLichSuDatVePhim.fulfilled]:(state,action)=>{
            return {...state, isLoading: false, data: action.payload.data}
        },
        [layLichSuDatVePhim.rejected]:(state,action)=>{
            return {...state, isLoading: false, error:action.error.message}
        },

    }
})

export default bookingHistory.reducer;