import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteUser } from "apis/authAPI"
import { toast } from "react-toastify";


const initialState = {
    data:{},
    isLoading: false,
    error: null,
}
export const xoaTaiKhoan = createAsyncThunk(
    "admin/user/deleteUser",
    async (taiKhoan) => {
        const data = await deleteUser(taiKhoan);
        return {data}
    }
)
const deleteUserSlice = createSlice({
    name:"admin/management/deleteUser",
    initialState,
    extraReducers:{
        [xoaTaiKhoan.pending]:(state,action)=>{
            return {...state, isLoading: true, error: null}
        },
        [xoaTaiKhoan.fulfilled]:(state,action)=>{
            toast("Xóa tài khoản thành công!")
            return {...state, isLoading: false, data: action.payload}
        },
        [xoaTaiKhoan.rejected]:(state,action)=>{
            toast(action.error.message)
            return {...state, isLoading: false, error: action.error.message}
        },
    }
})

export default deleteUserSlice.reducer;