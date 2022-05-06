import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  let navigate = useNavigate();

  return (
    <header
      id="header"
      className="p-0 dark:bg-coolGray-800 dark:text-coolGray-100 bg-purple-200 fixed w-full z-[999]"
    >
      <div className="flex justify-between items-center h-16 mx-auto">
        <NavLink to="/" className="flex items-center p-2">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAMAAABHPGVmAAABNVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////7QibkNivkNCn/+/v9q577Si/+8/L/7uz62tj8jHvvh4D8g3HqX1bMzc37SC3Rvrv+9/bwkozsbVn/8/HMzc7kOS7mOyW/LSP+8O/5y8joUkj8QibvgXr8/f35+frQ0ND5SS/iNSrYMyj9ppnQMSb39vbg39/W1tbfNCnHLyT//fz9+fjv7+/8qZzwPSbz8/Pr6+vn5+fj4+Pb29v6xsLyopr5opTnnJHhlIj7Ryz+6ef9rqP0qaH5UzrlOjD7RSnqOyW6KyL/4t3kz8zgzcrQtrP9tar9sqfte3TCd3L6emftbVrsbFnpUj3mQjgGeX2GAAAAF3RSTlMA+9EF9vDruKakj2lPSS8sGQ3i4b69OIta07gAAAM+SURBVGje1drpUhNBFIbhnuwrYe9JIIoLERQJqAkkJmELsqNsIu77/V+CJrH8JsxUf52R6SrfG3iqq7t/nSOchXPpZChmyX/KioWS6VxYeDeSSYwSQBsaTWRGPIhwNh6RN1gknnWdZjgVlTdcNDXcbwyNywAaH3IakyEZSKFJGEPM8K/8PcvwhAysiT/3Ek7JAEv13lg2KgMsmu3+wbgMtHjnV2YiMtAiGSHCCRlwibDIjcmAG8uJtCUDzkqLpAy8pAjJwAuJmAy8mLBk4FlCGuh/QZrtilTEkJnzOW7srK20qqfTt30iM/cfz1OluTY7u/D+q31PoQiVUShQpXrw23jw3bZVilAZ+TxTqq2O8dC2lYpQGkyp7MNQKEJlUGVvBYZCEQqDKrswlIpQGExpw1ArghpQ3I8XBhSOwKBK9QAGUYTKgJI/cj9eGEwRKgPIk2XX44VBFaFtzG05jb0FGFQRusbSs+694PHCoIrQNpy334ZBFSDccL6xnTUYXAHCDShNGHqK0DWgVA9w51wBwg0olRYMTUVoGlBaKzA0FaE0fh72DFRrfPnwTcuAAuSo4HWQ056BGlflH09tVycXl7ar4uF15NbdvFt5PX/4Oe+sflVetD2M7XevVl3G9BQQLwVMoc8olxdxDnTxtrIPBQaQPkXZOoz+Lo+nKntQYAAhCowNGNcqPZ+Suy+hwACipdRgeCttKDCA6Ci1RtdQKTtdBQYQXaVnqJXm0SoMF0KVWp0YHWVLVs+LMFwIU+obHYMox1ty81OxBAMIUWDQTjrKxzMYQBQKHi/+ObuXzU3JESgwGjCIMi2RA+FKDQZFzrQQKHhY3MAf9EaoUn/j1wDClHX/BhCi1F74N4AQxafBESh+DY5A8W1wBMod7f8BQxNBj6BQgyH8LNxgCFe4QRGucIMjXOEGR+jt87fLEa5wgyNc4QZHuMINjnCFGxzhCjc4whVucIQr3OAIV7jBEa5wgyNcgaEfRhuDKKWBDAtDmgGU0jYMjWIYN+kqMHQLYXCmrRRh6JUcfAS4tDygYaWNDDONjGVNDJiNjMpNDP2NrC+YWMQwsVJiYjnGxJqPiYUlE6tXRpfIjKzD/QKIj6Xp8VGBdwAAAABJRU5ErkJggg=="
            alt="logoTix"
            className="w-[50px] h-[50px] cursor-pointer"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex mb-0 gap-5">
          <li className="flex">
            <a
              href="#lichChieu"
              className="flex items-center text-purple-700 font-semibold"
            >
              Lịch chiếu
            </a>
          </li>
          <li className="flex">
            <a
              href="#cumRap"
              className="flex items-center text-purple-700 font-semibold"
            >
              Cụm rạp
            </a>
          </li>
          <li className="flex">
            <a
              href="#tinTuc"
              className="flex items-center text-purple-700 font-semibold "
            >
              Tin tức
            </a>
          </li>
          <li className="flex">
            <a
              href="#ungDung"
              className="flex items-center text-purple-700 font-semibold"
            >
              Ứng dụng
            </a>
          </li>
        </ul>
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            {" "}
            <span className="text-blue-800 font-semibold text-md">
              Welcome, <span className="font-bold">{user?.hoTen}</span>{" "}
            </span>{" "}
            <img
              src="https://images.unsplash.com/photo-1554126807-6b10f6f6692a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Ym95fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="user_logo"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />{" "}
            {user?.maLoaiNguoiDung === 'QuanTri' ? <button  className="bg-red-300 px-2 py-1 rounded-lg text-red-700 text-md font-semibold mr-2 hover:bg-red-400 transition-all"
              onClick={() => {
                navigate("/admin/add-movie");
              }}> ADMIN PAGE </button> : ""}
            <button
              className="bg-red-300 px-2 py-1 rounded-lg text-red-700 text-md font-semibold mr-2 hover:bg-red-400 transition-all"
              onClick={() => {
                localStorage.removeItem("user");
                navigate("/");
                window.location.reload();
              }}
            >
              ĐĂNG XUẤT
            </button>{" "}
          </div>
        ) : (
          <div className="items-center flex-shrink-0 hidden lg:flex">
            <NavLink to="/login">
              <button className="self-center px-4 py-2 rounded-lg text-purple-600 font-semibold bg-white hover:bg-purple-300">
                Sign in
              </button>
            </NavLink>
            <NavLink to="/register">
              <button className="self-center px-4 py-2 font-semibold rounded-lg dark:bg-violet-400 dark:text-coolGray-900 text-purple-600 bg-white mx-3 hover:bg-purple-300 ">
                Sign up
              </button>
            </NavLink>
          </div>
        )}
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-coolGray-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
