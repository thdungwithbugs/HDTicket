import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "apis/authAPI";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: user,
  isLoggedIn: Boolean(user), //Dùng để xác định xem user đã đăng nhập hay chưa
  isLoading: false,
  error: null,
};


export const login = createAsyncThunk("auth/login", async (values) => {
  const data = await authAPI.login(values);
  //Neu user ko can dang nhap lai khi f5 hoac close browser
  //Dang nhap thanh cong => luu thong tin user vao localStprage
  // console.log(data)
  localStorage.setItem("user", JSON.stringify(data));
  return { data };
});

export const registerAccount = createAsyncThunk(
  "auth/register",
  async (values) => {
    const data = await authAPI.registerAccount(values);
    localStorage.setItem('user',JSON.stringify(data));
    return { data };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [login.fulfilled]: (state, { payload }) => {
      toast.success('Đăng nhập thành công!')
      // console.log('Đăng nhập thành công!')
      return {
        ...state,
        isLoading: false,
        user: payload.data,
        isLoggedIn: true,
      };
    },
    [login.rejected]: (state, { error }) => {
      return { ...state, isLoading: false, error: error.message };
    },
    [registerAccount.pending]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [registerAccount.fulfilled]: (state, { payload }) => {
    //  localStorage.removeItem('user')
    //  console.log('Đăng ký thành công')
      return {       
        isLoading: false,
        user: payload.data,
        isLoggedIn: true,
      };
    },
    [registerAccount.rejected]: (state, { error }) => {
      console.log('Đăng ký thất bại');
      return { ...state, isLoading: false, error: error.message };
    },
  },
});
export default authSlice.reducer;
