import axios from "./axiosClient";
export const login = (values) => {
  return axios.post("QuanLyNguoiDung/DangNhap", values);
};
export const registerAccount = (values) => {
  return axios.post("QuanLyNguoiDung/DangKy", { ...values, maNhom: "GP01" });
};

export const deleteUser = (taiKhoan) => {
  return axios.delete(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`);
};

export const findUser = (tuKhoa) => {
  if (tuKhoa.trim() !== "") {
    return axios.get(
      `QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01&tuKhoa=${tuKhoa}`
    );
  }
  return axios.get("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01");
};
