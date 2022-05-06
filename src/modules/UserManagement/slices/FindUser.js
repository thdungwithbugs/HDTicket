import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { findUser } from "apis/authAPI"

const initialState = {
    data: [],
    isLoading:false,
    error:null,
}

export const timNguoiDung = createAsyncThunk(
    "admin/user/findUser",
    async (tuKhoa='')=>{
        const data = await findUser(tuKhoa);
        return {data}
    }
);
export const findUserSlice = createSlice({
    name:"admin/findUser",
    initialState,
    extraReducers:{
        [timNguoiDung.pending]:(state,action)=>{
            return {...state, isLoading: true, error: null}
        },
        [timNguoiDung.fulfilled]:(state,action)=>{
            return {...state, isLoading: false, data: action.payload.data}
        },
        [timNguoiDung.rejected]:(state,action)=>{
            return {...state, isLoading: false, error:action.error.message}
        },
    }
})
export default findUserSlice.reducer;