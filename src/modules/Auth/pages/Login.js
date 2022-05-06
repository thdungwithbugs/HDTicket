import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, NavLink, useSearchParams } from "react-router-dom";
import { login } from "../slices/auth";
import Header from "modules/Home/layout/Header/Header";
import Footer from "modules/Home/layout/Footer/Footer";
import { ToastContainer } from "react-toastify";
// import InputText from "components/InputText";

const schema = yup.object({
  taiKhoan: yup.string().required("Tài khoản không được để trống"),
  // .min(5, "Tài khoản phải từ 5 đến 20 kí tự")
  // .max(20, "Tài khoản phải từ 5 đến 20 kí tự"),
  matKhau: yup.string().required("Mật khẩu không được để trống"),
  // .matches(
  //   /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  //   "Mật khẩu không đúng định dang"
  // ),
});

function Login() {
  const {
    register,
    control, // Sử dụng kèm với component Controller để tương tác với UI component
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { taiKhoan: "", matKhau: "" },
    mode: "onTouched", // Cơ chế kích hoạt validation,
    resolver: yupResolver(schema), // Sử dụng schema để validate
  });

  const dispatch = useDispatch();
  const { isLoggedIn, isLoading, error } = useSelector((state) => state.auth);

  const [searchParams] = useSearchParams();

  const onSubmit = (values) => {
    console.log(values);
    dispatch(login(values)); // dispatch action login
  };

  const onError = (errors) => {
    console.log(errors);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  if (isLoggedIn) {
    // Nếu isLoggedIn là true
    // Nếu trên url có search params là successUrl thì sẽ navigate về page đó
    // Nếu không có thì navigate về HomePage
    const url = searchParams.get("successUrl") || "/";
    return <Navigate to={url} replace={true} />;
  }

  return (
    <>
      <Header></Header>
      <div
        style={{
          background: "url(ungDung.jpg)",
        }}
      >
        <div className="flex p-[80px] h-[100vh] container bg-white bg-opacity-80">
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
                placeholder="haoadmin"
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
                type="password"
                className="max-w-[400px] p-2 border border-slate-400 rounded-md"
                id="password"
                placeholder="123456789"
                {...register("matKhau")}
              />
              {errors.matKhau && (
                <span className="text-red-600">{errors.matKhau.message}</span>
              )}
              <button
                className="max-w-[200px] px-3 py-2 bg-purple-300 font-semibold rounded-sm text-purple-700 hover:bg-purple-400"
                disabled={isLoading}
              >
                Đăng Nhập
              </button>
              <p>
                Bạn chưa có tài khoản ?{" "}
                <NavLink to="/register">
                  <span>Đăng ký</span>
                </NavLink>{" "}
              </p>
              <div className="text-purple-700 font-semibold">
                <p className="mb-0">*Nếu bạn không muốn đăng ký tài khoản,</p>
                <p className="m-0">
                  bạn có thể sử dụng tài khoản test có sẵn ghi theo placeholder.
                </p>
              </div>
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
                src="https://images.unsplash.com/photo-1620177088163-012f511de69d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80"
                alt="cinema"
                className="h-[60vh] object-cover rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Footer></Footer>
    </>
  );
}

export default Login;
