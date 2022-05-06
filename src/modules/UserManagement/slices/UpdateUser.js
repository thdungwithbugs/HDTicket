import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { capNhatThongTinUser } from "apis/movieAPI"
import { toast } from "react-toastify";

const initialState = {
    data:{},
    isLoading: false,
    error: null,
}
export const updateUser = createAsyncThunk("admin/updateUser", async (user)=>{
    console.log('push',user)
    const data = await capNhatThongTinUser(user);
    return {data}
})
const updateUserInfo = createSlice({
    name:"admin/management/updateUser",
    initialState,
    extraReducers:{
        [updateUser.pending]:(state, action) => {
            return {...state, isLoading: true, error: null}
        },
        [updateUser.fulfilled]:(state, action) => {
            toast.success("Update thông tin thành công!")
            return {...state, isLoading: false, data: action.meta.arg}
        },
        [updateUser.rejected]:(state, action) => {
            console.log(action)
            toast.error(action.error.message)
            return {...state, isLoading: false, error: action.error.message}
        },
    }
})

export default updateUserInfo.reducer;