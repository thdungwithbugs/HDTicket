import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
} from "react-router-dom";
import { getUserInfo } from "./slices/GetUserInfo";
import { updateUser } from "./slices/UpdateUser";
import { getUserList } from "./slices/user";

const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  matKhau: yup.string().required("Mật khẩu không được để trống"),
  email: yup
    .string()
    .required("Email không được để trống")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email phải đúng định dạng"),
  soDt: yup
    .number()
    .required("Số điện thoại không được để trống")
    .typeError("Số điện thoại phải là ký tự số"),
  hoTen: yup
    .string()
    .required("Họ tên không được để trống")
    .typeError("Họ tên phải là ký tự chữ"),
  maLoaiNguoiDung: yup
    .string()
    .required("Mã loại không được để trống")
    .oneOf(["KhachHang","QuanTri"],"Loại người dùng chỉ có thể là KhachHang hoặc QuanTri")
    // .typeError("Mã loại phải là KhachHang / QuanTri"),
});

function UpdateUser() {
  let { id } = useParams();
  const { data, isLoading, error } = useSelector((state) => state.getUserInfomation);
  console.log(data);
  useEffect(() => {
    dispatch(getUserInfo(id));
  }, []);
  const {
    register,
    control, // Sử dụng kèm với component Controller để tương tác với UI component
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maLoaiNguoiDung:"",
    },
    mode: "onTouched", // Cơ chế kích hoạt validation,
    resolver: yupResolver(schema), // Sử dụng schema để validate
  });

  const dispatch = useDispatch();
 
  useEffect(()=>{
    if(!Object.keys(data).length) return;

    setValue("taiKhoan", data.taiKhoan)
    setValue("matKhau", data.matKhau)
    setValue("email", data.email)
    setValue("soDt", data.soDT)
    setValue("hoTen", data.hoTen)
    setValue("maLoaiNguoiDung", data.maLoaiNguoiDung)
  },[data])

  
  const onSubmit = (values) => {
    console.log(values);
    dispatch(updateUser(values)).then(()=>{
        dispatch(getUserList())
    })
  };

  const onError = (errors) => {
    console.log(errors);
  };

  if (isLoading) {
    return <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent border-t-4 border-violet-800 mx-auto animate-spin"></div>;
  }

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   });

  return (
    <>
      <h1 className="text-2xl font-bold">Cập nhật tài khoản</h1>
      <div>
        <div className="flex p-10 h-[100vh] container bg-white bg-opacity-80">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="w-[40vw]">
            <div className="flex flex-col gap-3 ">
              <label
                htmlFor="username"
                className="text-lg font-semibold text-purple-600"
              >
                Tài khoản
              </label>
              <input
                className="p-2 border border-slate-400 rounded-md max-w-[400px]"
                type="text"
                id="username"
                {...register("taiKhoan")}
              />
              {errors.taiKhoan && (
                <span className="text-red-600">{errors.taiKhoan.message}</span>
              )}
              <label
                htmlFor="username"
                className="text-lg font-semibold text-purple-600 "
              >
                Mật khẩu
              </label>
              <input
                type="text"
                className="max-w-[400px] p-2 border border-slate-400 rounded-md"
                id="password"
                {...register("matKhau")}
              />
              {errors.matKhau && (
                <span className="text-red-600">{errors.matKhau.message}</span>
              )}
              <label
                htmlFor="email"
                className="text-lg font-semibold text-purple-600"
              >
                Email
              </label>
              <input
                className="p-2 border border-slate-400 rounded-md max-w-[400px]"
                type="text"
                id="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
              <label
                htmlFor="soDt"
                className="text-lg font-semibold text-purple-600"
              >
                Số điện thoại
              </label>
              <input
                className="p-2 border border-slate-400 rounded-md max-w-[400px]"
                type="text"
                id="soDt"
                {...register("soDt")}
              />
              {errors.soDt && (
                <span className="text-red-600">{errors.soDt.message}</span>
              )}

              <label
                htmlFor="hoTen"
                className="text-lg font-semibold text-purple-600"
              >
                Họ tên
              </label>
              <input
                className="p-2 border border-slate-400 rounded-md max-w-[400px]"
                type="text"
                id="hoTen"
                {...register("hoTen")}
              />
              {errors.hoTen && (
                <span className="text-red-600">{errors.hoTen.message}</span>
              )}
              <label
                htmlFor="maLoaiNguoiDung"
                className="text-lg font-semibold text-purple-600"
              >
                Loại (KhachHang / QuanTri)
              </label>
              <input
                className="p-2 border border-slate-400 rounded-md max-w-[400px]"
                type="text"
                id="maLoaiNguoiDung"
                {...register("maLoaiNguoiDung")}
              />
              {errors.maLoaiNguoiDung && (
                <span className="text-red-600">{errors.maLoaiNguoiDung.message}</span>
              )}
              <button
                className="max-w-[200px] px-3 py-2 bg-purple-300 font-semibold rounded-sm text-purple-700 hover:bg-purple-400"
              >
                Cập nhật
              </button>
            </div>

            {/* Show lỗi từ phía server */}
            {error && (
              <div>
                <span>{error}</span>
              </div>
            )}
          </form>
          <div>
            <div className="pt-3">
              <img
                src="https://images.unsplash.com/photo-1586087475805-18830d2c526b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80"
                alt="cinema"
                className="h-[60vh] object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUser;
