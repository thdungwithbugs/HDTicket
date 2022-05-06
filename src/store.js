// Redux-toolkit configuration
import { configureStore } from "@reduxjs/toolkit";
import homeMovie from "./modules/Home/slices/movie";
import movieDetails from "./modules/Movies/slices/movieDetails";
import auth from "./modules/Auth/slices/auth";
import banner from "./modules/Home/slices/banner";
import theater from "modules/Home/slices/theater";
import seat from "./modules/Checkout/slices/bookingSlice";
import history from "./modules/LichSuDatVe/slices/LichSuDatVeSlice";
import addFilm from "./modules/MovieManagement/slices/AddMovieSlice";
import deleFilm from "./modules/MovieManagement/slices/DeleteMovieSlice";
import getDetail from "./modules/MovieManagement/slices/GetMovieDetail";
import getUser from "./modules/UserManagement/slices/user";
import deleteUser from "./modules/UserManagement/slices/DeleteUser";
import getUserInfomation from "./modules/UserManagement/slices/GetUserInfo";
import updateUserInfo from './modules/UserManagement/slices/UpdateUser';
import findUserInfo from './modules/UserManagement/slices/FindUser'
// Mặc định configureStore đã bao gồm redux-devtool và redux thunk
const store = configureStore({
  // Tự động combine các child reducers
  reducer: {
    // Home module
    homeMovie,
    // Movies module
    movieDetails,
    //Auth module
    auth,
    //Banner module
    banner,
    //Theater module
    theater,
    //Seat module
    seat,
    //history module
    history,
    //add Movie module
    addFilm,
    //delete Movie module
    deleFilm,
    //get movie detail
    getDetail,
    //get user list module
    getUser,
    //delete user module
    deleteUser,
    //get user infomation module
    getUserInfomation,
    //update user module
    updateUserInfo,
    //find user module
    findUserInfo,
  },
});

export default store;
