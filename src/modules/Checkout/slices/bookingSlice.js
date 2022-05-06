import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTicket, datVePhim } from "apis/movieAPI";
import { connection } from "index";
import { ThongTinDatVe } from "models/ThongTinDatVe";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  data: [],
  isLoading: false,
  error: null,
  danhSachGheDangDat: [],
  danhSachGheKhachDat: [],
};

export const getSeat = createAsyncThunk(
  "home/booking/ticketId",
  async (ticketId) => {
    const data = await getTicket(ticketId);
    return { data };
  }
);

export const datVeXemPhim = createAsyncThunk(
  "booking/sendBooking",
  async (thongTinDatVe = new ThongTinDatVe()) => {
    const data = await datVePhim(thongTinDatVe);
    // console.log('Ve phim gui len server:',data);
    return {data}
  }
);

const movieSeatSlice = createSlice({
  name: "movie/booking",
  initialState,
  reducers: {
    datVe: (state = initialState, action) => {
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];
      let index = danhSachGheCapNhat.findIndex(
        (gheDangDat) => gheDangDat?.maGhe === action.payload?.maGhe
      );
      if (index !== -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.payload);
      }
      
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    },
    datGhe: (state=initialState, action)=>{
      state.danhSachGheKhachDat = action.payload;
      console.log(action )
      return {...state}
    }
  },
  extraReducers: {
    [getSeat.pending]: (state, action) => {
      return { ...state, isLoading: true, error: null };
    },
    [getSeat.fulfilled]: (state, action) => {
      return { ...state, isLoading: false, data: action.payload.data };
    },
    [getSeat.rejected]: (state, action) => {
      return { ...state, isLoading: false, error: action.error.message };
    },
    [datVeXemPhim.pending]:(state,action)=>{
      console.log('pending');
    },
    [datVeXemPhim.fulfilled]:(state,action)=>{
      state.danhSachGheDangDat=[]
      toast.success('Đặt vé thành công! Kiểm tra lịch sử ở tab 02')

    },
    [datVeXemPhim.rejected]:(state,action)=>{
      console.log('fail');
      return { ...state, isLoading: false, error: action.error.message }
    },
  },
});

//Tạo action đặt vé realtime để gửi lên server
export const datGheAction = (ghe, maLichChieu)=>{
  return async (dispatch,getState)=>{
    await dispatch(datVe(ghe))
    let danhSachGheDangDat = getState().seat.danhSachGheDangDat;
    let taiKhoan = getState().auth.user.taiKhoan
    //parse string các data trả về ứng với điều kiện server
    danhSachGheDangDat = JSON.stringify(danhSachGheDangDat)
    // Call singalR
    connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);
    // console.log(danhSachGheDangDat);
    // console.log(taiKhoan);
    // console.log(maLichChieu);

  }
}

export const { datVe, datGhe} = movieSeatSlice.actions;
export default movieSeatSlice.reducer;
