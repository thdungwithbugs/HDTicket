import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { layThongTinNguoiDung } from "apis/movieAPI"

const initialState = {
    data:{},
    isLoading: false,
    error: null,
}

export const getUserInfo = createAsyncThunk(
    "admin/getUserInfo",
    async (taiKhoan)=>{
        const data = await layThongTinNguoiDung(taiKhoan);
        return {data}
    }
)
const getUserInfoSlice = createSlice({
    name:"admin/management/getUserInfo",
    initialState,
    extraReducers:{
        [getUserInfo.pending]:(state,action)=>{
            return {...state, isLoading:true, error: null}
        },
        [getUserInfo.fulfilled]:(state,action)=>{
            // console.log(action)
            return {...state, isLoading:false, data:action.payload.data}
        },
        [getUserInfo.rejected]:(state,action)=>{
            return {...state, isLoading:false, error: action.error.message}
        },
    }
})

export default getUserInfoSlice.reducer;