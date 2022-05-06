import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { layDanhSachNguoiDung } from "apis/movieAPI"


const initialState = {
    data: [],
    isLoading: false,
    error: null,
}

export const getUserList = createAsyncThunk(
    "admin/user/getList",
    async (tuKhoa='')=>{
        const data = await layDanhSachNguoiDung(tuKhoa);
        return {data}
    }
)

const getUserListSlice = createSlice({
    name:"admin/user",
    initialState,
    extraReducers:{
        [getUserList.pending]:(state, action)=>{
            return {...state, isLoading:true, error:null}
        },
        [getUserList.fulfilled]:(state, action)=>{
            return {...state, isLoading:false, data: action.payload.data}
        },
        [getUserList.rejected]:(state, action)=>{
            return {...state, isLoading:false, error:action.error.message}
        },
    }
})
export default getUserListSlice.reducer;